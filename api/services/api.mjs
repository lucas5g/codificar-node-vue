import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()


export const apiRedmine = axios.create({
    baseURL: process.env.REDMINE_URL,
    params: {
        key: process.env.REDMINE_KEY,
        project_id: process.env.REDMINE_PROJECT_ID

    }
})

export const apiRocket = axios.create({
    baseURL: 'https://chat.codificar.com.br/api/v1'
})

export const apiGit = axios.create({
    baseURL: process.env.GIT_URL,
    headers: {
        Authorization: process.env.GIT_KEY
    },
    params: {
        ref_name: 'version'
    }

})
export const api = axios.create({
    baseURL: process.env.BASE_URL
})

// export const api =