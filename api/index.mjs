import express from 'express'
import cors from 'cors'
import path from 'path'


import { router as routesIssues } from './routes/issueRoutes.mjs'
import { router as routesProducts } from './routes/productRoutes.mjs'
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



const port = '8000'
app.listen(port, () => { console.log('http://localhost:' + port) })