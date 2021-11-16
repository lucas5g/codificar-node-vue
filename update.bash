ssh -t versionmarketplace "cd /var/www/codificar/codificar-node-vue && sudo git pull && sudo npm install && sudo npm run build && nvm use 16 &&  pm2 restart 0 --update-env"

echo 'http://dev.appmarketplace.com.br:8000/'