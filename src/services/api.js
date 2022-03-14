import axios from 'axios'

const baseUrl = () => {
    const { host } = window.location
    if (host === 'demo.appmarketplace.com.br:8000' || host === 'version.aplicativoderestaurante.com.br') {
        // return 'http://demo.appmarketplace.com.br:8000/api/'
        return 'http://version.aplicativoderestaurante.com.br/api'
    }

    // if (host === '127.0.0.1:8081') {
    //     return 'http://127.0.0.1:8081'
    // }

    return 'http://localhost:8000/api'

}

export const api = axios.create({
    baseURL: `${baseUrl()}/`
})

console.log('BASE_URL' + baseUrl())
console.log('0314')