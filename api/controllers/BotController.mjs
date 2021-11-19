import moment from "moment"
import { apiRedmine } from "../services/api.mjs"
import dotenv from 'dotenv'
import { apiRocket, apiGit } from "../services/api.mjs"
dotenv.config()


class BotController {

    static async reportDaily() {
        const dateFilter = moment().format('YYYY-MM-DD')

        const filter = `updated_on=${dateFilter}&status_id=*&sort=status`
        const { data } = await apiRedmine.get(`/issues.json?${filter}`)

        // console.log(data)
        const response = await apiRedmine.get(`/time_entries.json?from=${dateFilter}&to=${dateFilter}`)

        let textReport = `.\n:robot: Report geral do Projeto de Marketplace *${moment(dateFilter).format('DD/MM/YYYY')} ${moment().format('HH:mm')}*\n.\n`

        data.issues.map((issue, index) => (

            textReport += `${index + 1} - https://redmine.codificar.com.br/issues/${issue.id} - ${issue.subject} - *${issue.status.name}*\n`
        ))
        let cont = 0
        response.data.time_entries.map((entry, index) => (!textReport.includes(entry.issue.id) && cont++,
            // textReport+=`${cont + data.issues.length} - https://redmine.codificar.com.br/issues/${entry.issue.id}\n`
            textReport += !textReport.includes(entry.issue.id) ? `${cont + data.issues.length} - https://redmine.codificar.com.br/issues/${entry.issue.id} - ${entry.comments}\n` : ''
        ))

        console.log(textReport)

        if (process.env.BASE_URL === 'http://localhost:8000') {
            console.log('envia job localhost ')
            return
        }
        console.log('Envia job em produção')
        this.sendMessageRocket('#marketplace', textReport)
            // this.sendMessageRocket('@codificar.projetos', textReport)

        return

    }

    static async testBot() {
        console.log('job test')
        this.sendMessageRocket('@lucas.sousa', 'O Bot tá ok :smile:')
    }


    static async sendMessageRocket(channel, text) {
        // console.log({ channel, text })
        // return

        try {

            const { data } = await apiRocket.post('/login', {
                user: process.env.ROCKET_USERNAME,
                password: process.env.ROCKET_PASSWORD
            })
            const { userId, authToken } = data.data

            await apiRocket.post('/chat.postMessage', {
                channel,
                text
            }, {
                headers: {
                    'X-Auth-Token': authToken,
                    'X-User-Id': userId
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async autoTest() {

        //TODO
        /**
         * 1 Last commit
         */

        const { data } = await apiGit.get('/')

        console.log(data)


        //2 Verificar se no banco qual foi o último commit

        //3 Atualizar a version

        //4 Rodar o test

        //5 caso tenha erros, retornar url dos prints dos erros
    }




}


export { BotController }