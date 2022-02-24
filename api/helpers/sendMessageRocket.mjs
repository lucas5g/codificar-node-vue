import { apiRocket } from "../services/api.mjs"

export const sendMessageRocket = async(channel, text) => {

    if (process.env.BASE_URL === 'http://localhost:8000') {
        console.log('no send job localhost')
        console.log({
            channel,
            text
        })
        return
    }

    try {

        const { data } = await apiRocket.post('/login', {
            user: process.env.ROCKET_USERNAME,
            password: process.env.ROCKET_PASSWORD
        })
        const { userId, authToken } = data.data

        await apiRocket.post('/chat.postMessage', {
            channel,
            text
        }, {
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            }
        })
    } catch (error) {
        console.log(error)
    }
}