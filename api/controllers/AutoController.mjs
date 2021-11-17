class AutoController {

    static gitpull() {
        const command = 'sudo git pull && sudo npm run build'
        return this.path({ command })
    }

    static restart() {
        const command = 'sudo git pull && sudo npm install && sudo npm run build &&  pm2 restart 0 --update-env'
        return this.path({ command })
    }

    static path({ command }) {
        return `ssh devmarketplace "cd /var/www/codificar/codificar-node-vue && ${command}"`
    }



}

export { AutoController }