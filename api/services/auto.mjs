// import minimist from "minimist";
import { exec } from "child_process"
import { AutoController } from "../controllers/AutoController.mjs";
// import { stderr, stdout } from "process";

(() => {
    const args = process.argv.slice(2)

    const command = args[0]
    const message = args[1]


    // let commandRun = ''
    // //traducao do comando
    // switch(command){
    //     case 'version':
    //         commandRun = 'versionGitPullRunTest'
    //         break;

    //     default:
    //         commandRun = command
    // }

    // console.log(commandRun)
    try {
        const commands = AutoController[command](message)

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
        console.log(command)
        console.log(err)
    }
})()