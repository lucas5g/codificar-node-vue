ssh -t versionmarketplace "cd /var/www/codificar/codificar-node-vue && sudo npm install && sudo npx tsc && pm2 restart 0 --update-env"

echo 'http://dev.appmarketplace.com.br:8000/'