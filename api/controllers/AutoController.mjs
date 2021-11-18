class AutoController {

    static versionGitPullRunTest() {
        const command = 'ssh versionaplicativoderestaurante  "cd /var/www/versionaplicativoderestaurante/current && sudo git pull"'
        return command
    }

    static gitPull() {
        const command = 'sudo git pull && sudo npm run  build'
        return this.path({ command })
    }

    static restart() {
        console.log('http://dev.appmarketplace.com.br:8000')

        const command = 'sudo git pull && sudo npm install && sudo npm run build &&  pm2 restart 0 --update-env'
        return this.path({ command })
    }

    static push(message) {

        const command = `
            cd ~/projects/marketplace/codificar-node-vue && 
            git add . && 
            git commit -m "${message}" && 
            git push &&
            ssh devmarketplace "cd /var/www/codificar/codificar-node-vue &&
            sudo git pull &&
            sudo npm yarn build"        
        `
        return command

    }

    static path({ command }) {
        console.log('http://dev.appmarketplace.com.br:8000')

        return `ssh devmarketplace "cd /var/www/codificar/codificar-node-vue && ${command}"`
    }

    static version_update() {
        return `cd ~/automation/marketplace-web && ./auto version versionmarketplace pull_update`
    }



}

export { AutoController }