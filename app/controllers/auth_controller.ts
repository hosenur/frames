import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({ inertia }: HttpContext) {
        return inertia.render('auth/login')
    }
    async register({ inertia }: HttpContext) {
        return inertia.render('auth/register')
    }
    async create({ request, auth, inertia }: HttpContext) {
        const { email, password } = request.body()
        const user = await User.create({ email, password })
        await auth.use('web').login(user)
        return inertia.render('auth/register')
    }
    async verify({ request, auth, inertia, response }: HttpContext) {
        const { email, password } = request.body()
        const user = await User.verifyCredentials(email, password)
        await auth.use('web').login(user)
        return response.redirect('/')
    }
}