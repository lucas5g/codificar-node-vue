import express from 'express'
import cors from 'cors'
import path from 'path'


import { router as routesIssues } from './routes/issueRoutes.mjs'
import { router as routesProducts } from './routes/productRoutes.mjs'

import conn from './database/conn.js'

import './services/jobs.mjs'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/issues', routesIssues)
app.use('/api/products', routesProducts)

app.use('/', express.static(path.resolve() + '/dist/'))
app.use('/importacao', express.static(path.resolve() + '/dist/'))
app.use('/issues', express.static(path.resolve() + '/dist/'))
app.use('/uploads', express.static(path.resolve() + '/uploads/'))


app.listen(process.env.PORT, () => { console.log(process.env.BASE_URL) })

// conn
//     .sync()
//     // .sync({ force: true })
//     .then(() => [

//     ])
//     .catch((error) => console.log(error))