import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { exec } from 'child_process'

export const imageBase64 = (file) => {
    try {
        return path(file)

    } catch {
        return path('no-image')
    }
}

export const loadImage = (file) => {
    const pathJpg = path.resolve() + '/../../public/uploads/${file}.jpg'
    const pathJpeg = path.resolve() + '/../../public/uploads/${file}.jpeg'
    const pathPng = path.resolve() + '/../../public/uploads/${file}.png'
    const pathNoImage = path.resolve() + '/../../public/uploads/no-image.jpg'

    if (existsSync(pathJpg)) {

        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.jpg`
    }
    if (existsSync(pathJpeg)) {
        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.jpeg`
    }

    if (existsSync(pathPng)) {
        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.png`
    }

    return `${process.env.BASE_URL}/uploads/no-image.jpg`


}

const path = (name) => {
        // return `http://localhost:8000/uploads/${encodeURI(name)}.jpg`
        return `data:image/jpeg;base64,${readFileSync(`./public/uploads/${name}.jpg`, 'base64')}`
}

export const unzip = (filename) => {

    exec(`unzip ${__dirname}/../../public/uploads/${filename} -d ${__dirname}/../../public/uploads`, (error, sdout, stderr ) => {

        if(error){
            console.log(`error: ${error}`)
            return
        }
        if(stderr){
            console.log(`stderr: ${stderr}`)
            return
        }

        // console.log(sdout)
    })
}