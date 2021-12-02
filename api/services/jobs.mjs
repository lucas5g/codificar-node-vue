// import axios from 'axios';
import cron from 'node-cron'
import { AutoController } from '../controllers/AutoController.mjs';
import { BotController } from "../controllers/BotController.mjs";
import { IssueController } from '../controllers/IssueController.mjs';

cron.schedule('0 58 23 * * 1-5', () => {

    BotController.reportDaily()
})


cron.schedule('0 26 16 * * 1-5', () => {

    BotController.testBot()
});

import { existsSync } from 'fs'
import path from 'path';

(async() => {

    // IssueController.index()
    const file = 'Promoção de Domingo (Gigante 35cm) - Point'

    const pathJpeg = `${path.resolve()}/uploads/${file}.jpeg`


    // if (existsSync(`${path.resolve()}/uploads/Promoção de Domingo (Gigante 35cm) - Point.jpeg`)) {
    if (existsSync(pathJpeg)) {
        //Promoção de Domingo (Gigante 35cm) - Point
        console.log('exist')
    } else {
        console.log('not exists')
    }



})()