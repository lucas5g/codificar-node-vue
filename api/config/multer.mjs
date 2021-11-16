import multer from 'multer'
import path from 'path'

export const storage = multer.diskStorage({
    destination: path.resolve() + '/uploads',
    filename: (req, file, cb) => {
        // const {baseUrl} = req.file
        cb(null, `${file.originalname}`)
    }

})


// export storage