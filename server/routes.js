import express from 'express'
import * as db from './db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const wombles = await db.getWombles()
  res.render('home', {wombles})
})

router.get('/:id', async (req, res) => {
  const wombleId = req.params.id
  const wombles = await db.getWombleById(wombleId)

  res.render('single-womble', wombles[0])
})


export default router
