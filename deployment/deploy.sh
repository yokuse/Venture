# need this for sonarqube - https://hub.docker.com/_/sonarqube
sysctl -w vm.max_map_count=524288
sysctl -w fs.file-max=131072
ulimit -n 131072
ulimit -u 8192

## Compose up - Comment out if needed
cd venture
docker compose --env-file dockerenv config
docker compose --env-file dockerenv up --build -d

cd ..
cd jenkins
docker compose --env-file ../dockerenv config
docker compose --env-file ../dockerenv up --build -d

cd ..
cd nginx
docker compose --env-file ../dockerenv config
docker compose --env-file ../dockerenv up --build -d

cd ..
cd sonar
docker compose --env-file dockerenv config
docker compose --env-file dockerenv up --build -d