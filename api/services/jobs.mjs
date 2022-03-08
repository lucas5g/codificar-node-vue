// import axios from 'axios';
import axios from 'axios';
import cron from 'node-cron'
import { AutoController } from '../controllers/AutoController.mjs';
import { BotController } from "../controllers/BotController.mjs";
import { IssueController } from '../controllers/IssueController.mjs';
import { commandFunction } from '../helpers/index.mjs';

cron.schedule('0 55 23 * * 1-5', () => {

    BotController.reportDaily()
})


cron.schedule('0 26 16 * * 1-5', () => {

    BotController.testBot()
});

// import { existsSync } from 'fs'
// import path from 'path';



(async() => {
    // const url = `https://${process.env.REDMINE_KEY}@redmine.codificar.com.br/issues.json?project_id=clickfood&status_id=closed&limit=60`
    // const { data } = await axios.get(url)

    // commandFunction('rm  redmine_pdf/*.pdf')

    // data.issues.forEach( issue => {
    //     const urlPdf = `curl https://${process.env.REDMINE_KEY}@redmine.codificar.com.br/issues/${issue.id}.pdf --output redmine_pdf/${issue.id}.pdf`
    //     console.log(urlPdf)
    //     commandFunction(urlPdf)
    // })
    //esse comando nao funciona
    // commandFunction('zip -r redmine.zip redmine_pdf')


})()