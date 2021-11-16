import axios from 'axios'

const baseUrl = () => {
    const { host } = window.location
    if (host === 'dev.appmarketplace.com.br:8000') {
        return 'http://dev.appmarketplace.com.br:8000'
    }

    // if (host === '127.0.0.1:8081') {
    //     return 'http://127.0.0.1:8081'
    // }

    return 'http://localhost:8000'

}

export const api = axios.create({
    baseURL: `${baseUrl()}/api/`
})