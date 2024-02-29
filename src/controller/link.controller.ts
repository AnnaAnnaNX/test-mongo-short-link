import {Link} from "../models/link.model";
import * as Nanoid from 'nanoid'
import {StatusCodes } from 'http-status-codes'
import {NextFunction, Request, Response} from 'express'

class LinkController {
    createShortLink = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const {link} = req.body
            if (!link) {
                throw new Error('Link must be provided')
            }
            const newLink = await Link.create({ name: Nanoid.nanoid(), fullLink: link })
            // const newLink = await Link.create({name: '123', fullLink: link})
            res.status(StatusCodes.CREATED).json(newLink)
        } catch (e) {
            next(e)
        }
    }
    getLinks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const links = await Link.find({})
            if (links.length === 0) {
                throw new Error('list empty')
            }
            res.status(StatusCodes.OK).json(links)
        } catch(e) {
            next(e)
        }
    }
    goto = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const {shortLink} = req.params
            const link = await Link.findOne({name: shortLink})
            if (!link || !link.fullLink) {
                throw new Error('not found link')
            }
            res.status(StatusCodes.OK).redirect(link.fullLink)
        } catch (e) {
            next(e)
        }
    }
}
export const linkController = new LinkController()


