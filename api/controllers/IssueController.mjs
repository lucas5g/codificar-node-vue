import { distinctArrayObj } from '../helpers/index.mjs'
import { apiRedmine } from '../services/api.mjs'


class IssueController {

    static async index(req, res) {

        const { data } = await apiRedmine.get(`/issues.json?sort=status&limit=50`)
            // return res.json(data)
        const issues = data.issues.map(issue => {
            return {
                url: `https://redmine.codificar.com.br/issues/${issue.id}`,
                subject: issue.subject,
                status: issue.status.name,
                id: issue.id,
                assigned_to: issue.assigned_to && issue.assigned_to,
                tracker: issue.tracker,
                priority: issue.priority.name,
                project: issue.project
            }
        })

        // return console.log({ issues, length: issues.length })
        // return res.json({ length: issues.length, issues })

        const trackers = distinctArrayObj({ arrayObj: issues, filter: 'tracker' })
        const assigneds = distinctArrayObj({ arrayObj: issues, filter: 'assigned_to' })
        const projects = distinctArrayObj({ arrayObj: issues, filter: 'project' })
            // console.log(issues.length)

        return res
            .json({ issues, assigneds, trackers, projects })

    }

    async timeEntries(req, res) {

        const { from, to } = req.query

        const { data } = await apiRedmine.get(`/time_entries.json?from=${from}&to=${to}`)

        return res.json(data)

    }
}

export { IssueController }