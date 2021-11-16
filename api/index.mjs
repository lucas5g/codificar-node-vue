import express from 'express'
import path from 'path'


import { router as routesIssues } from './routes/issueRoutes.mjs'
import './services/jobs.mjs'


const app = express()

app.use(express.static(path.resolve() + '/dist/'))
app.use('/uploads', express.static(path.resolve() + '/uploads'))
app.use('/api/issues', routesIssues)

const port = '8000'
app.listen(port, () => { console.log('http://localhost:' + port) })