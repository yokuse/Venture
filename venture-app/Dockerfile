FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine AS runner
ARG NEXTAUTH_URL

ARG JWT_SECRET
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG SECRET_COOKIE_PASSWORD
ARG NODE_ENV
ARG EMAIL_NAME
ARG EMAIL_SECRET
ARG FIREBASE_APIKEY
ARG DATABASE_URL

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV DATABASE_URL $DATABASE_URL
ENV NEXTAUTH_URL $NEXTAUTH_URL
ENV JWT_SECRET $JWT_SECRET
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV STRIPE_SECRET_KEY $STRIPE_SECRET_KEY
ENV STRIPE_WEBHOOK_SECRET $STRIPE_WEBHOOK_SECRET
ENV SECRET_COOKIE_PASSWORD $SECRET_COOKIE_PASSWORD
ENV NODE_ENV $NODE_ENV
ENV EMAIL_NAME $EMAIL_NAME
ENV EMAIL_SECRET $EMAIL_SECRET
ENV FIREBASE_APIKEY $FIREBASE_APIKEY

RUN npx prisma generate

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8000

ENV PORT 8000

CMD ["node", "server.js"]