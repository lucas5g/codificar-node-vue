import moment from "moment"
import dotenv from 'dotenv'
import { apiRedmine, api } from "../services/api.mjs"
import { sendMessageRocket } from "../helpers/sendMessageRocket.mjs"
dotenv.config()


class BotController {

    static async reportPipeline(req, res) {

        const pipeline = req.body

        if (pipeline.object_attributes.status !== "failed") {

            console.log(`test ${pipeline.object_attributes.status}`)
            return res.json({
                status: pipeline.object_attributes.status
            })
        }

        const textReport = `
        Erro no test ${moment().format('HH:mm DD/MM/YYYY')}: ${pipeline.object_attributes.status} -  https://git.codificar.com.br/marketplace/web/-/pipelines/${pipeline.object_attributes.id}\n
        @${pipeline.user.username} - Verificar o commit ${pipeline.commit.url}\n
        @lucas.sousa - Verificar os testes  
        `
        console.log(textReport)

        sendMessageRocket(`${process.env.ROCKET_CHANNEL}-errors`, textReport)

        return res.json({
            msg: 'pipeline',
            pipeline: req.body
        })

    }

    static async reportDaily() {

        const dateFilter = moment()
        const { data } = await api.get(`/api/issues/report`)
        let textReport = `\n:robot: Report geral do Projeto de Marketplace *${moment(dateFilter).format('DD/MM/YYYY')} ${moment().format('HH:mm')}*\n`

        data.issues.map((issue, index) => (

            textReport += `
            ${index + 1} - ${issue.id} - ${issue.subject} 
            ${issue.assigned_to} - *${issue.project.toUpperCase().trim()}* - ${issue.status}\n`
        ))

        let cont = 0

        data.times.map((time, index) => (cont++,
            textReport += `
            ${cont + data.issues.length} - ${time.id} - ${time.comments}
            ${time.user} - ${time.project}\n`

        ))

        sendMessageRocket(process.env.ROCKET_CHANNEL, textReport)

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
        sendMessageRocket('@lucas.sousa', 'O Bot tá ok :smile:')
    }

}


export { BotController }