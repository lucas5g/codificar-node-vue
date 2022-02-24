import express from 'express'
import cors from 'cors'
import path from 'path'


import { router as routesIssues } from './routes/issueRoutes.mjs'
import { router as routesProducts } from './routes/productRoutes.mjs'
import { router as routesWebhooks } from './routes/webhookRoutes.mjs'

// import conn from './database/conn.js'

import './services/jobs.mjs'


const app = express()

app.use(cors())
app.use(express.json())

/**
 * Routes Api
 */

app.use('/api/issues', routesIssues)
app.use('/api/products', routesProducts)
app.use('/api/webhook', routesWebhooks)

app.use('/api/', (req, res) => {
    res.json({
        api: 'api codificar'
    })
})

/**
 * Routes Statics
 */

app.use('/', express.static(path.resolve() + '/dist/'))
app.use('/importacao', express.static(path.resolve() + '/dist/'))
app.use('/issues', express.static(path.resolve() + '/dist/'))
app.use('/uploads', express.static(path.resolve() + '/uploads/'))
app.use('/assets', express.static(path.resolve() + '/src/assets/'))


app.listen(process.env.PORT, () => { console.log(process.env.BASE_URL) })


// conn
//     .sync()
//     // .sync({ force: true })
//     .then(() => [

//     ])
//     .catch((error) => console.log(error))