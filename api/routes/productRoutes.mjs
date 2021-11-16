import { Router } from 'express'
import multer from 'multer'

import { storage } from '../config/multer.mjs'

import { ProductController } from '../controllers/ProductController.mjs'


const router = Router()

router.post('/load', multer({ storage }).fields([{ name: 'csv' }, { name: 'images' }]), ProductController.load)

// router.post('/load', (req, res) => {
//     res.json({
//         msg: 'test'
//     })
// })

export { router }