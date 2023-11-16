# Docker deployment
Order to compose:
1. Jenkins
2. Grafana/Prometheus
3. Venture
4. Nginx

**Note that ***NO secrets*** must be inside .env-docker**

```bash
cd deployment

chmod +x deploy.sh
chmod +x teardown.sh

## Deployment/Teardown - edit script to comment out which service we want to deploy/teardown
./deploy.sh # Deploy all containers by default
./teardown.sh # Teardown all containers by default

## Base compose commands
### Testing docker env variables
cd { nginx | venture | jenkins | grafana_prometheus }
docker compose --env-file ../dockerenv config # Run this to make sure the env vars are loaded properly

docker compose --env-file ../dockerenv up --build -d # -d optional for detached mode
curl -H "Host: letsventure.ml" https://letsventure.ml # To test app

docker compose --env-file ../dockerenv down # Compose down

# Utility Commands
## Get containers and their IPs
docker ps -q | xargs -n 1 docker inspect --format '{{ .Name }} {{range .NetworkSettings.Networks}} {{.IPAddress}}{{end}}' | sed 's#^/##';

# Get Jenkins initial password
docker exec -it jenkins_blueocean cat /var/jenkins_home/secrets/initialAdminPassword
```