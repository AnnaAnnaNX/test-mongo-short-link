import { Link } from "../models/link.model";
import {StatusCodes } from 'http-status-codes'
import {NextFunction, Request, Response} from 'express'
const prefix = process.env.BASE_URL || 'http://localhost:3000/'

class LinkController {
    createShortLink = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const { link } = req.body
            if (!link) {
                throw new Error('Link must be provided')
            }
            if (await Link.findOne({ fullLink: link })) {
                throw new Error('Duplicate link')
            }
            const name = Math.random().toString(36).substr(2, 4)
            if (await Link.findOne({ name })) {
                throw new Error('Ошибка при генериации имени ссылки')
            }
            const newLink = await Link.create({ name, fullLink: link })
            res.status(StatusCodes.CREATED).json(`${prefix}${name}`)
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
            const { shortLink} = req.params
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


