import express from 'express'
import * as db from './db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const wombles = await db.getAssignments()

  res.render('assignments', {wombles})
})

export default router
