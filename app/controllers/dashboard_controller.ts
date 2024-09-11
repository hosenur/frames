import Image from '#models/image'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
    async index({ auth, inertia }: HttpContext) {
        const images = await Image.findManyBy('owner', auth.user!.id)
        return inertia.render('dashboard/index', { images })
    }
}