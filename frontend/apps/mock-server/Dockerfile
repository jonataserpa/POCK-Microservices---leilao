FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY db.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
