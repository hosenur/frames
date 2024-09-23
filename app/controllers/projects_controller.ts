import Project from '#models/project'
import { createProjectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
    async index({ inertia }: HttpContext) {
        return inertia.render('dashboard/projects')
    }
    async create({ request, response }: HttpContext) {
        const payload = await createProjectValidator.validate(request.all())
        const project = await Project.create({
            name: payload.name
        })
        return response.redirect(`/projects/${project.id}`)
    }

    async show({ params, inertia }: HttpContext) {
        const project = await Project.find(params.id)
        return inertia.render('project/index', { project })
    }
}