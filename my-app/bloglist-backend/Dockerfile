FROM node:16.17.0-bullseye-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test-stage
ENV NODE_ENV test
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
RUN CI=true npm run test
USER node

FROM base as build-stage
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
CMD ["dumb-init", "node", "./index.js"]