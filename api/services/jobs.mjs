import cron from 'node-cron'
import { AutoController } from '../controllers/AutoController.mjs';
import { BotController } from "../controllers/BotController.mjs";


cron.schedule('0 58 23 * * 1-5', () => {

    BotController.reportDaily()
})


cron.schedule('0 26 16 * * 1-5', () => {

    BotController.testBot()
});


// import urlExist from 'url-exist'
// import express from 'express'
import axios from 'axios';
import csvtojson from 'csvtojson'
import path from 'path'
import { unzip } from '../helpers/index.mjs'
// const app = express()

(async() => {

    // unzip('Nova pasta.zip')
    // console.log(`${path.resolve()}/uploads`)
    // const productsCsv = await csvtojson().fromFile(`${path.resolve()}/uploads/"padrão planillha.csv"`)
    // console.log('test')

})()