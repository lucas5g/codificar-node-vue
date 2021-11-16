import { apiRedmine } from '../services/api.mjs'


class IssueController {

    static async index(req, res) {

        // res.json({
        //     msg: 'test'
        // })
        // return
        const { data } = await apiRedmine.get(`/issues.json?sort=status`)

        const issues = data.issues.map(issue => {
            const obj = {
                    url: `https://redmine.codificar.com.br/issues/${issue.id}`,
                    subject: issue.subject,
                    status: issue.status.name,
                    id: issue.id,
                    assigned_to: issue.assigned_to.name
                        // created_on: issue.created_on,
                        // updated_on: issue.updated_on
                }
                // console.log(obj)
            return obj

        })

        // return console.log(issues)

        return res
            .json(issues)

    }

    async timeEntries(req, res) {

        const { from, to } = req.query

        const { data } = await apiRedmine.get(`/time_entries.json?from=${from}&to=${to}`)

        return res.json(data)

    }
}

export { IssueController }