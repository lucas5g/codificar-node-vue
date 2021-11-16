import axios from 'axios'

const baseUrl = () => {
    const { host } = window.location
    if (host === 'dev.appmarketplace.com.br:8000') {
        return 'http://dev.appmarketplace.com.br:8000'
    }

    return 'http://localhost:8000'

}

export const api = axios.create({
    baseURL: `${baseUrl()}/api/`
})