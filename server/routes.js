import express from 'express'
import * as db from './db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const wombles = await db.getWombles()
  res.render('home', {wombles})
})

export default router
