// import axios from 'axios';
import axios from 'axios';
import cron from 'node-cron'
import { AutoController } from '../controllers/AutoController.mjs';
import { BotController } from "../controllers/BotController.mjs";
import { IssueController } from '../controllers/IssueController.mjs';
import { api } from './api.mjs';

cron.schedule('0 55 23 * * 1-5', () => {

    BotController.reportDaily()
})


cron.schedule('0 26 16 * * 1-5', () => {

    BotController.testBot()
});

// import { existsSync } from 'fs'
// import path from 'path';



(async() => {
    // BotController.reportDaily()
    // BotController.reportCompleted()
    // BotController.testBot()
    const { data } = await api.get('/api/issues/report')


    const issuesFilterNewOrClosed = data.issues.filter(issue => {
        return issue && (issue.status === 'Concluída' || issue.status === 'Nova' || issue.status === 'Rejeitada')
    })
    console.log(issuesFilterNewOrClosed)
        // console.log({
        //     issues: data.issues,
        //     issuesFilterNewOrClosed: issuesFilterNewOrClosed.length
        // })


})()