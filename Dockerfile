FROM node:12.22.1-alpine

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]