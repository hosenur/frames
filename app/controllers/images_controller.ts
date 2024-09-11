import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ImagesController {
    async upload({ request, response }: HttpContext) {
        const image = request.file('image', {
            extnames: ['jpg', 'jpeg', 'png'],
        })
        await image?.move(app.makePath('storage/uploads'), {
            name: `${cuid()}.${image.extname}`,
        })
        return response.redirect(`/`)
    }
}