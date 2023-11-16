## Compose down - Comment out if needed
cd nginx
docker compose --env-file ../dockerenv down

cd ../venture
docker compose --env-file ../dockerenv down

cd ../jenkins
docker compose --env-file ../dockerenv down