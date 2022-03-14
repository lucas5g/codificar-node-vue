import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.VUE_APP_API
})

console.log('0314')
console.log(process.env.VUE_APP_API)