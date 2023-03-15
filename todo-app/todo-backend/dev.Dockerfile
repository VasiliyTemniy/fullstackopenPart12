FROM node:16.17.0-bullseye-slim
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
ENV DEBUG=playground:*
USER node
CMD ["npm", "run", "dev"]