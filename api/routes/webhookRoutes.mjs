import { Router } from "express";
import moment from "moment";
import { BotController } from "../controllers/BotController.mjs";


const router = Router()

router.post('/', BotController.reportPipeline)
router.get('/', (req, res) => {

    const pipeline = {
        "object_kind": "pipeline",
        "object_attributes": {
            "id": 4693,
            "ref": "version",
            "tag": false,
            "sha": "96ee5107471294578d272543583857498eef76f8",
            "before_sha": "7c7d1e3178c8ba7e6435036cab73f80e66a71827",
            "source": "push",
            "status": "failed",
            "detailed_status": "failed",
            "stages": [
                "build",
                "deploy",
                "migrate",
                "test"
            ],
            "created_at": "2022-02-23 13:18:50 UTC",
            "finished_at": "2022-02-23 13:59:44 UTC",
            "duration": 2447,
            "queued_duration": 2,
            "variables": [

            ]
        },
        "merge_request": null,
        "user": {
            "id": 151,
            "name": "Randler Ferraz Almeida",
            "username": "randler.ferraz",
            "avatar_url": "https://git.codificar.com.br/uploads/-/system/user/avatar/151/avatar.png",
            "email": "randler.ferraz@codificar.com.br"
        },
        "project": {
            "id": 111,
            "name": "web",
            "description": "",
            "web_url": "https://git.codificar.com.br/marketplace/web",
            "avatar_url": null,
            "git_ssh_url": "git@git.codificar.com.br:marketplace/web.git",
            "git_http_url": "https://git.codificar.com.br/marketplace/web.git",
            "namespace": "marketplace",
            "visibility_level": 0,
            "path_with_namespace": "marketplace/web",
            "default_branch": "master",
            "ci_config_path": ""
        },
        "commit": {
            "id": "96ee5107471294578d272543583857498eef76f8",
            "message": "correção modal ingredient\n",
            "title": "correção modal ingredient",
            "timestamp": "2022-02-23T10:18:39-03:00",
            "url": "https://git.codificar.com.br/marketplace/web/-/commit/96ee5107471294578d272543583857498eef76f8",
            "author": {
                "name": "Randler Ferraz Almeida",
                "email": "randler.ferraz@codificar.com.br"
            }
        },
        "builds": [{
                "id": 6623,
                "stage": "test",
                "name": "test:e2e",
                "status": "failed",
                "created_at": "2022-02-23 13:18:51 UTC",
                "started_at": "2022-02-23 13:23:31 UTC",
                "finished_at": "2022-02-23 13:59:44 UTC",
                "duration": 2172.208638,
                "queued_duration": 0.597012,
                "when": "on_success",
                "manual": false,
                "allow_failure": false,
                "user": {
                    "id": 151,
                    "name": "Randler Ferraz Almeida",
                    "username": "randler.ferraz",
                    "avatar_url": "https://git.codificar.com.br/uploads/-/system/user/avatar/151/avatar.png",
                    "email": "randler.ferraz@codificar.com.br"
                },
                "runner": {
                    "id": 8,
                    "description": "codificar-runner",
                    "active": true,
                    "tags": [
                        "master"
                    ]
                },
                "artifacts_file": {
                    "filename": null,
                    "size": null
                },
                "environment": {
                    "name": "version",
                    "action": "start"
                }
            },
            {
                "id": 6622,
                "stage": "migrate",
                "name": "migrate:version",
                "status": "success",
                "created_at": "2022-02-23 13:18:50 UTC",
                "started_at": "2022-02-23 13:23:16 UTC",
                "finished_at": "2022-02-23 13:23:31 UTC",
                "duration": 14.147997,
                "queued_duration": 0.393899,
                "when": "on_success",
                "manual": false,
                "allow_failure": false,
                "user": {
                    "id": 151,
                    "name": "Randler Ferraz Almeida",
                    "username": "randler.ferraz",
                    "avatar_url": "https://git.codificar.com.br/uploads/-/system/user/avatar/151/avatar.png",
                    "email": "randler.ferraz@codificar.com.br"
                },
                "runner": {
                    "id": 8,
                    "description": "codificar-runner",
                    "active": true,
                    "tags": [
                        "master"
                    ]
                },
                "artifacts_file": {
                    "filename": null,
                    "size": null
                },
                "environment": {
                    "name": "version",
                    "action": "start"
                }
            },
            {
                "id": 6621,
                "stage": "deploy",
                "name": "deploy:version",
                "status": "success",
                "created_at": "2022-02-23 13:18:50 UTC",
                "started_at": "2022-02-23 13:22:19 UTC",
                "finished_at": "2022-02-23 13:23:16 UTC",
                "duration": 56.269594,
                "queued_duration": 1.962368,
                "when": "on_success",
                "manual": false,
                "allow_failure": false,
                "user": {
                    "id": 151,
                    "name": "Randler Ferraz Almeida",
                    "username": "randler.ferraz",
                    "avatar_url": "https://git.codificar.com.br/uploads/-/system/user/avatar/151/avatar.png",
                    "email": "randler.ferraz@codificar.com.br"
                },
                "runner": {
                    "id": 8,
                    "description": "codificar-runner",
                    "active": true,
                    "tags": [
                        "master"
                    ]
                },
                "artifacts_file": {
                    "filename": null,
                    "size": null
                },
                "environment": {
                    "name": "version",
                    "action": "start"
                }
            },
            {
                "id": 6620,
                "stage": "build",
                "name": "build:composer",
                "status": "success",
                "created_at": "2022-02-23 13:18:50 UTC",
                "started_at": "2022-02-23 13:18:53 UTC",
                "finished_at": "2022-02-23 13:22:17 UTC",
                "duration": 204.743815,
                "queued_duration": 1.671035,
                "when": "on_success",
                "manual": false,
                "allow_failure": false,
                "user": {
                    "id": 151,
                    "name": "Randler Ferraz Almeida",
                    "username": "randler.ferraz",
                    "avatar_url": "https://git.codificar.com.br/uploads/-/system/user/avatar/151/avatar.png",
                    "email": "randler.ferraz@codificar.com.br"
                },
                "runner": {
                    "id": 8,
                    "description": "codificar-runner",
                    "active": true,
                    "tags": [
                        "master"
                    ]
                },
                "artifacts_file": {
                    "filename": "version.zip",
                    "size": 94141770
                },
                "environment": null
            }
        ]
    }

    const textReport = `
        Erro no test ${moment().format('HH:mm DD/MM/YYYY')}: ${pipeline.object_attributes.status} -  https://git.codificar.com.br/marketplace/web/-/pipelines/${pipeline.object_attributes.id}\n
        @${pipeline.user.username} - Verificar o commit ${pipeline.commit.url}\n
        @lucas.sousa - Verificar os testes  
    `
    console.log(textReport)
    return res.json({
        pipeline,
        msg: 'webhook do gitlab',

    })
})

export { router }