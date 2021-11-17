import minimist from "minimist";
import { exec } from "child_process"
// import { stderr, stdout } from "process";

const args = minimist(process.argv.slice())
    /**
     * ACTION
     * git pull
     * 
     */
const { a: action } = args


/**
 * GIT_PULL
 */
const git_pull = 'sudo git pull && sudo npm run build'

/**
 * RESTART
 */
const restart = 'sudo git pull && sudo npm install && sudo npm run build &&  pm2 restart 0 --update-env'

/**
 * COMMANDS
 */

let commands = ''
if (action === 'git_pull') {
    commands = `ssh devmarketplace "cd /var/www/codificar/codificar-node-vue && ${git_pull}"`

} else if (action === 'restart') {
    commands = `ssh devmarketplace  "cd /var/www/codificar/codificar-node-vue && ${restart}"`

}


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