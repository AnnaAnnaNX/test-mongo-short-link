import { Schema, model } from 'mongoose'

interface Link {
    name: string,
    fullLink: string
}
const linkSchema = new Schema <Link> ({
    name: {
        type: String,
        required: [true, "name should not be empty"]
    },
    fullLink: {
        type: String,
        required: [true, "fullLink should not be empty"]
    },
}, {timestamps: true})
export const Link = model <Link>('Link', linkSchema)
