import moment from "moment"
import dotenv from 'dotenv'
import { apiRocket, apiRedmine } from "../services/api.mjs"
// import Commit from "../Model/Commit.js"
import { devUserRocket } from "../helpers/index.mjs"
dotenv.config()


class BotController {

    static async reportDaily() {
        const dateFilter = moment().format('YYYY-MM-DD')
            // const dateFilter = '2021-12-15'

        const filter = `updated_on=${dateFilter}&status_id=*&sort=status`
        const { data } = await apiRedmine.get(`/issues.json?${filter}`)

        // console.log(data)
        const response = await apiRedmine.get(`/time_entries.json?from=${dateFilter}&to=${dateFilter}`)

        let textReport = `\n:robot: Report geral do Projeto de Marketplace *${moment(dateFilter).format('DD/MM/YYYY')} ${moment().format('HH:mm')}*\n`

        // return console.log(data.issues)
        data.issues.map((issue, index) => (

            textReport += `
                ${index + 1} - https://redmine.codificar.com.br/issues/${issue.id} - ${issue.subject} 
                ${devUserRocket(issue)} - *${issue.project.name.toUpperCase().trim()}* - ${issue.status.name}\n`
        ))

        // return console.log(textReport)

        let cont = 0
            // console.log(response.data.time_entries)
        let test = ''
        response.data.time_entries.map((entry, index) => (!textReport.includes(entry.issue.id) && cont++,
            // textReport+=`${cont + data.issues.length} - https://redmine.codificar.com.br/issues/${entry.issue.id}\n`
            // console.log(entry.issue);
            // console.log(entry),
            textReport += !textReport.includes(entry.issue.id) ? `${cont + data.issues.length} - https://redmine.codificar.com.br/issues/${entry.issue.id} - ${devUserRocket(entry.user)} ${entry.comments}\n` : ''
        ))

        console.log(textReport)
        if (process.env.BASE_URL === 'http://localhost:8000') {
            console.log('envia job localhost ')
                // this.sendMessageRocket('@lucas.sousa', textReport)
            return
        }
        console.log('Envia job em produção')
        this.sendMessageRocket('#marketplace', textReport)
            // this.sendMessageRocket('@codificar.projetos', textReport)

        return

    }

    static async reportCompleted() {

        // const dateFilterTest = moment().format()

        const dateFilter = moment().format('2022-01-13T20:37')
        console.log(dateFilter)

        const filter = `updated_on=${dateFilter}&status_id=5&sort=id`
        const { data } = await apiRedmine.get(`/issues.json?${filter}`)

        let text = ''

        const issues = data.issues.filter(issue => {
                const dateTime = new Date(dateFilter)
                console.log({ dateTime })

                return dateTime >= new Date(issue.updated_on)
            })
            // console.log({ issue })
        issues.map((issue, index) => (

            text += `${index + 1} - https://redmine.codificar.com.br/issues/${issue.id} - ${issue.subject} - ${issue.project.name} - ${issue.updated_on}\n\n`
        ))


        console.log(text)

        // console.log(data.issues.map(issue => console.log(issue.status)))

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

        // const { data } = await apiGit.get('/')

        // const { short_id, title, author_name } = data[0]

        // const lastCommit = { short_id, title, author_name }

        // console.log(lastCommit)
        //2 Verificar se no banco qual foi o último commit
        // const findCommit = await Commit.findOne({ lastCommit, raw: true })

        //Se o commit for mesmo, não rodar o test
        // if (findCommit) {
        //     console.log('Não tem commit mais recente')
        //     return
        // }
        // await Commit.truncate()
        // await Commit.create(lastCommit)

        //3 Atualizar a version
        // const commandUpdateVersion = `
        //     ssh versionaplicativoderestaurante "
        //     cd /var/www/versionaplicativoderestaurante/current &&
        //     sudo git pull"
        // `
        // console.log('Atualizando a version ')
        // const resultUpdateVersion = await commandFunction({ command })
        // if (!resultUpdateVersion) {
        //     console.log('Não foi possível atualizar a version')
        //     return
        // }


        //4 Rodar o test
        // const commandRunTest = `
        //     ssh devmarketplace "
        //     cd /var/www/codificar/test/ &&
        //     npm run test"
        // `

        // const resultRunTest = await commandFunction(commandRunTest)
        // console.log('Fim do test')
        // if (!resultRunTest) {
        //     console.log('Não foi possível atualizar a version')
        //     return
        // }

        //5 caso tenha erros, retornar url dos prints dos erros
    }




}


export { BotController }