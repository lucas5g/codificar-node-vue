import { devUserRocket, distinctArrayObj } from '../helpers/index.mjs'
import { apiRedmine } from '../services/api.mjs'
import moment from 'moment'


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

        // return issues
        return res
            .json({ issues, assigneds, trackers, projects, issuesLength: issues.length })

    }

    async timeEntries(req, res) {

        const { from, to } = req.query

        const { data } = await apiRedmine.get(`/time_entries.json?from=${from}&to=${to}`)

        return res.json(data)

    }

    static async report(req, res) {
        const date = req.query.date || moment().format('YYYY-MM-DD')

        console.log(date)
        const filter = `updated_on=${date}&status_id=*&sort=status`
        const { data } = await apiRedmine.get(`/issues.json?${filter}`)

        const { data: time_entries } = await apiRedmine.get(`/time_entries.json?from=${date}&to=${date}`)


        const issues = data.issues.map(issue => ({
            id: `https://redmine.codificar.com.br/issues/${issue.id}`,
            subject: issue.subject,
            assigned_to: devUserRocket(issue),
            project: issue.project.name,
            status: issue.status.name
        }))

        const times = time_entries.time_entries
            .filter(time => time.comments)
            .map(time => {
                // return issues[]
                return time.comments && {
                    id: `https://redmine.codificar.com.br/issues/${time.issue.id}`,
                    comments: time.comments || 'SEM COMENTÁRIOS',
                    project: time.project.name,
                    user: devUserRocket(time.user)
                }
            })

        // console.log(time_entries.time_entries)
        // res.json({ issues, times })


        res.json({
            issues,
            times
        })

    }

}

export { IssueController }



//     static async filter(req, res) {

//         const filter = req.query
//         console.log(filter)
//         const { data } = await apiRedmine.get(`/issues.json`, {
//             params: {
//                 updated_on: moment().format('YYYY-MM-DD'),

//             }
//         })
//         const issues = data.issues.map(issue => {
//             return {
//                 url: `https://redmine.codificar.com.br/issues/${issue.id}`,
//                 subject: issue.subject,
//                 status: issue.status.name,
//                 id: issue.id,
//                 assigned_to: issue.assigned_to && issue.assigned_to,
//                 tracker: issue.tracker,
//                 priority: issue.priority.name,
//                 project: issue.project,
//                 updated_on: issue.updated_on
//             }
//         })

//         return res
//             .json({
//                 issues: issues.length
//             })
//     }