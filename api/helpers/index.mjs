import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { exec } from 'child_process'
import axios from 'axios'


export const distinctArrayObj = ({ arrayObj, filter }) => {

    const arrayFilter = arrayObj.map(result => result[filter]).filter(result => result !== undefined)

    const arrayDistinct = [...new Map(arrayFilter.map(result => [result.name, result])).values()]

    const arraySort = arrayDistinct.sort((a, b) => a.name.localeCompare(b.name))
    return arraySort
}

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

    if (existsSync(pathJpg)) {

        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.jpg`
    }
    if (existsSync(pathJpeg)) {
        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.jpeg`
    }

    if (existsSync(pathPng)) {
        return `${process.env.BASE_URL}/uploads/${encodeURI(file)}.png`
    }
    // console.log('produtos sem imagens')
    console.log(file)


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
    // const command = `unzip ${path.resolve()}/uploads/"${filename}" -d ${path.resolve()}/uploads/ && mv ${filename}`
    // const command = `unzip ${path.resolve()}/uploads/"${filename}"`
    const folder = filename.replace('.zip', '')

    const command = `unzip -j ${path.resolve()}/uploads/${filename} -d ${path.resolve()}/uploads`

    exec(command, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error}`)
            return
        }

        console.log(`stderr: ${stderr}`)
        console.log(stdout)
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

export const commandFunction = (command) => {

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return false;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        return true
    });
}