import minimist from "minimist";
import { exec } from "child_process"
import { AutoController } from "../controllers/AutoController.mjs";
// import { stderr, stdout } from "process";

(() => {
    const args = minimist(process.argv.slice())


    const { c: command, m: message } = args

    let commandRun = ''
    //traducao do comando
    switch(command){
        case 'version':
            commandRun = 'versionGitPullRunTest'
            break;
            
        default:
            commandRun = command
    }

    console.log(commandRun)
    try {
        const commands = AutoController[commandRun](message)

        console.log(commands)
            // return

        exec(commands, (error, stdout, stderr) => {

            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            console.log('http://dev.appmarketplace.com.br:8000')
        })

        /** */
    } catch (err) {
        console.log(commandRun)
        console.log(err)
    }
})()