import vine from '@vinejs/vine'
export const createProjectValidator = vine.compile(
    vine.object({
        name: vine.string()
    })
)