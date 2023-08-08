import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from '../server.js'
import * as db from '../db/db.js'

vi.mock('../db/db.js')

describe('assignments route', () => {
    it('lists all the assignments', async () => {
      vi.mocked(db.getAssignments).mockImplementation(async () => {
        return [
            {
                name: 'Great Uncle Bulgaria', 
                rubbish: 'polystyrene' 
            },
            { 
                name: 'Tobermory', 
                rubbish: 'tin can'  
            }
        ]
      })
      const res = await request(server).get('/assignments')
      expect(res.statusCode).toBe(200)
  
      const dom = new JSDOM(res.text).window.document.body
      expect(dom.getElementsByTagName('li')).toMatchInlineSnapshot(`
        HTMLCollection [
          <li>
            Great Uncle Bulgaria - polystyrene
          </li>,
          <li>
            Tobermory - tin can
          </li>,
        ]
      `)
      expect(db.getAssignments).toHaveBeenCalled()
    })
  })