FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

COPY . .

RUN npm install

CMD ["npm", "start"]