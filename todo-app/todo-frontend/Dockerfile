FROM node:16.17.0-bullseye-slim AS base

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json


FROM base AS build-stage
ENV NODE_ENV=production REACT_APP_BACKEND_URL=http://localhost:8080/api/

COPY . .

RUN npm ci

RUN CI=true npm test
RUN npm run build


FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html