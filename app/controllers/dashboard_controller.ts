import Image from '#models/image'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
    async index({ auth, inertia }: HttpContext) {
        const baseURL = env.get('NODE_ENV') === 'production' ? `https://${env.get('DOMAIN')}` : `http://${env.get('DOMAIN')}:${env.get('PORT')}`
        const images = await Image.findManyBy('owner', auth.user!.id)
        return inertia.render('dashboard/index', { images, baseURL })
    }
}