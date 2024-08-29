FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install 

FROM base as dev
COPY . .
EXPOSE 3000
CMD [ "npm run dev" ]

FROM base as prod
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm start" ]



