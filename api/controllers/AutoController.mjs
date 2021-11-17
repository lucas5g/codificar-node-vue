class AutoController {

    static gitpull() {
        const command = 'sudo git pull && sudo npm run build'
        return this.path({ command })
    }

    static restart() {
        console.log('http://dev.appmarketplace.com.br:8000')

        const command = 'sudo git pull && sudo npm install && sudo npm run build &&  pm2 restart 0 --update-env'
        return this.path({ command })
    }

    static push(message) {

        const command = `git add . && git commit -m "${message}" && ${this.gitpull()}`
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