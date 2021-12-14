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

// import { existsSync } from 'fs'
// import path from 'path';



(async() => {
    // BotController.reportDaily()




})()