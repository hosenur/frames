import { createProjectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
    async index({ inertia }: HttpContext) {
        return inertia.render('dashboard/projects')
    }
    async create({ request, inertia }: HttpContext) {
        const payload = await createProjectValidator.validate(request.all())
    }
}