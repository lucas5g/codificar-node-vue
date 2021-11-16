import express from 'express'
import path from 'path'


import { router as routesIssues } from './routes/issueRoutes.mjs'
import './services/jobs.mjs'


const app = express()

// app.get('*', (req, res) => {
//     res.json({
//         msg: 'test req'
//     })
// })

app.use('/api/issues', routesIssues)

// app.use('*', express.static(path.resolve() + '/dist/'))

// app.use('/uploads', express.static(path.resolve() + '/uploads'))
app.use('/', express.static(path.resolve() + '/dist/'))
app.use('/importacao', express.static(path.resolve() + '/dist/'))
app.use('/issues', express.static(path.resolve() + '/dist/'))

// app.use('/dist', express.static(path.resolve() + '/dist/'))

// console.log(path.resolve() + '/dist/')

const port = '8000'
app.listen(port, () => { console.log('http://localhost:' + port) })