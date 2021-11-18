import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { exec } from 'child_process'
import axios from 'axios'

export const imageBase64 = (file) => {
    const pathUploads = `${path.resolve()}/uploads/${file}`
    try {
        return 'data:image/jpeg;base64,' + readFileSync(pathUploads + '.jpg', 'base64')


    } catch {
        console.log('file not found .jpg')
            // return path('no-image')
    }
    //get image png
    try {
        return 'data:image/jpeg;base64,' + readFileSync(pathUploads + '.png', 'base64')

    } catch {
        console.log('file not found .png')
        return 'data:image/jpeg;base64,' + readFileSync(path.resolve() + '/uploads/no-image.jpg', 'base64')
            // return path('no-image')
    }
}

export const loadImage = (file) => {
    const pathJpg = `${path.resolve()}/uploads/${file}.jpg`
    const pathJpeg = `${path.resolve()}/uploads/${file}.jpeg`
    const pathPng = `${path.resolve()}/uploads/${file}.png`
    const pathNoImage = `${path.resolve()}/uploads/no-image.jpg`

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
export const pathname = () => {
        return path.resolve()
    }
    // const path = (name) => {
    //         // return `http://localhost:8000/uploads/${encodeURI(name)}.jpg`
    //         return `data:image/jpeg;base64,${readFileSync(`./public/uploads/${name}.jpg`, 'base64')}`
    // }

export const unzip = (filename) => {

    exec(`unzip ${path.resolve()}/uploads/${filename} -d ${path.resolve()}/uploads`, (error, sdout, stderr) => {

        if (error) {
            console.log(`error: ${error}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }

        // console.log(sdout)
    })
}

export const checkUrl = async(url) => {
    try {
        await axios.head(url)
        return true
    } catch (error) {
        return false
    }
}