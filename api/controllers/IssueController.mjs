import { apiRedmine } from '../services/api.mjs'


class IssueController {

    static async index(req, res) {

        const { data } = await apiRedmine.get(`/issues.json?sort=status`)

        const issues = data.issues.map(issue => {
                return {
                    url: `https://redmine.codificar.com.br/issues/${issue.id}`,
                    subject: issue.subject,
                    status: issue.status.name,
                    id: issue.id,
                    assigned_to: issue.assigned_to && issue.assigned_to.name,
                    tracker: issue.tracker.name,
                    priority: issue.priority.name
                }
            })
            // return res.json(issues)

        const assigneds = issues.map(issue => issue.assigned_to)
            .filter((value, index, self) => self.indexOf(value) === index && value != undefined)
            .sort()

        const trackers = issues.map(issue => issue.tracker)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort()

        // return console.log({ trackers })


        return res
            .json({ issues, assigneds, trackers })

    }

    async timeEntries(req, res) {

        const { from, to } = req.query

        const { data } = await apiRedmine.get(`/time_entries.json?from=${from}&to=${to}`)

        return res.json(data)

    }
}

export { IssueController }