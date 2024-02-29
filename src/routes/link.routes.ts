import express from 'express'
import { linkController } from '../controller/link.controller'

const router = express.Router()
router.route('/link')
    .post(linkController.createShortLink)
    .get(linkController.getLinks)
router.route('/:shortLink')
    .get(linkController.goto)

export default router