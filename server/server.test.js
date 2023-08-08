import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'
import connection from './db/connection.js'
import server from './server.js'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('the home route', () => {
    it('lists all the wombles', async () => {
      const res = await request(server).get('/')
      expect(res.statusCode).toBe(200)
  
      const dom = new JSDOM(res.text).window
      const screen = within(dom.document.body)
    
  
      expect(screen.getAllByRole('listitem')).toHaveLength(7)
    })
})