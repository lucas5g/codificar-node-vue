ssh -t versionmarketplace "cd /var/www/codificar/codificar-node-vue && sudo npm install && sudo npm run build && pm2 restart 1 --update-env"

echo 'http://dev.appmarketplace.com.br:8000/'