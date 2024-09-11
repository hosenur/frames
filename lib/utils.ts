import env from "#start/env"

export const getDomain = () => {
    if(env.get("NODE_ENV")=="production")
    {
        return `https://${env.get("HOST")}`
    }
    else
    {
        return `http://${env.get("HOST")}:${env.get("PORT")}`
    }
}