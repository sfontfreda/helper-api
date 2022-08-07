FROM node:14

RUN mkdir /helper-api
 
WORKDIR /helper-api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]