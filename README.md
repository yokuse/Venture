# Venture
- [Google Drive](https://drive.google.com/drive/folders/1jvLzqq7nZzGjTZfcaYNArem543N0otRT?usp=sharing)
- [Lucid Chart](https://lucid.app/lucidchart/e68547cc-d7ee-4838-831e-dd8ad933335c/edit?viewport_loc=-10%2C-10%2C1484%2C979%2C0_0&invitationId=inv_c6b3948c-ee76-4472-bd48-9b39e41f8a5e#)
- [Discord](https://discord.gg/eRxvjbDX)

# Important before production
- remember to change URI in google api for nextauth
- remember to change Authorizes redirect URI before production
- remember to change in the .env file as well 

# Set up Stripe webhook
1. Install stripe CLI (https://stripe.com/docs/stripe-cli)
2. login with api key
3. `stripe listen --forward-to http://localhost:3000/api/webhooks`


# Docker deployment
Note that not secrets must be inside .env-docker
```bash
cd deployment
docker build . # build Dockerfile
docker-compose --env-file dockerenv up -d # -d optional for detached mode
curl -H "Host: letsventure.ml" letsventure.ml # To test app
```

# Stripe Listener
cd deployment
cd stripe
docker compose --env-file dockerenv up

# Vennture-app seployment
cd deployment
cd venture
docker compose --env-file dockerenv up --build -d
