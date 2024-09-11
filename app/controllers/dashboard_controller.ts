import Image from '#models/image'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
    async index({ auth, request, response, inertia }: HttpContext) {
        const user = await auth.user
        const ID = user?.id
        const images = await Image.findManyBy('owner', ID)
        console.log(images)

        return inertia.render('dashboard/index', { images })
    }
}