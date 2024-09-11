import Image from '#models/image'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ImagesController {
    async upload({ request, response, auth }: HttpContext) {
        const image = request.file('image', {
            extnames: ['jpg', 'jpeg', 'png'],
        })
        if (!image) {
            return response.status(400).send('No image found')
        }
        const name = `${cuid()}.${image.extname}`
        await image?.move(app.makePath('storage/uploads'), {
            name: name,
        })
        await Image.create({ name, owner: auth.user?.id })
        return response.redirect(`/`)
    }
}