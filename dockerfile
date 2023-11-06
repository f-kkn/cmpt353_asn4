FROM node:latest
WORKDIR /asn4
COPY . /asn4/
CMD [ "node", "server.js" ]
EXPOSE 8080

