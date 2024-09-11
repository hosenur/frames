import Image from '#models/image'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ImagesController {
    async upload({ request, response, auth }: HttpContext) {
        const images = request.files('images')
        images.forEach((image) => {
            const name = `${cuid()}.${image.extname}`
            const size = image.size
            image.move(app.makePath('storage/uploads'), {
                name: name,
            })
            Image.create({ name, owner: auth.user?.id, size })
        })
        return response.redirect(`/`)
    }
}