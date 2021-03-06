import { Router } from 'express'
import multer from 'multer'

import { storage } from '../config/multer.mjs'

import { ProductController } from '../controllers/ProductController.mjs'


const router = Router()

router.post('/load', multer({ storage }).fields([{ name: 'csv' }, { name: 'images' }]), ProductController.load)
router.post('/', ProductController.create)
router.get('/deleteImages', ProductController.deleteImages)
router.get('/', (req, res) => {
    res.json({
        msg: 'router product'
    })
})

export { router }