import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from '../server.js'
import * as db from '../db/db.js'

vi.mock('../db/db.js')

describe('the home route', () => {
  it('lists all the wombles', async () => {
    vi.mocked(db.getWombles).mockImplementation(async () => {
      return [
        {
        id: 88801,
        name: 'Great Uncle Bulgaria',
        trait_id: 99901,
        rubbish_id: 77701
      }, 
      { id: 88802,
        name: 'Tobermory', 
        trait_id: 99902, 
        rubbish_id: 77702 
      }
    ]
    })
    const res = await request(server).get('/')
    expect(res.statusCode).toBe(200)

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('li')).toMatchInlineSnapshot(`
      HTMLCollection [
        <li>
          Great Uncle Bulgaria
        </li>,
        <li>
          Tobermory
        </li>,
      ]
    `)
    expect(db.getWombles).toHaveBeenCalled()
  })
})

describe('search womble by Id', () => {
  it('calls db.getWombleById', async () => {
    vi.mocked(db.getWombleById).mockImplementation(async () => {
      return [
          {
            name: 'Tobermory', 
            description: 'handy' 
          },
      ]
    })
    const res = await request(server).get('/88802')
    expect(res.statusCode).toBe(200)

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('p')).toMatchInlineSnapshot(`
      HTMLCollection [
        <p>
          Tobermory - handy
        </p>,
      ]
    `)
    expect(db.getWombleById).toHaveBeenCalledWith('88802')
  })
})