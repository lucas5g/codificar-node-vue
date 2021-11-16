
import minimist  from "minimist";
import {exec} from "child_process"
// import { stderr, stdout } from "process";

const args = minimist(process.argv.slice())
/**
 * ACTION
 * git pull
 * 
 */
const { a: action } = args

const dir = 'ssh devmarketplace "cd /var/www/codificar/codificar-node-vue && sudo git pull"'

exec(dir, (err, sdout, stderr) => {

    if(err){
        return console.log(err)
    }

    if(stderr){
        return console.log(stderr)
    }

    return console.log(sdout)
})


