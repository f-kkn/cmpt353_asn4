FROM node:latest

EXPOSE 3000

WORKDIR react-app

COPY . .

CMD ["node", "server.js"]
