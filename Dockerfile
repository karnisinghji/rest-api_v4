FROM node:20

WORKDIR /CODE

#COPY package*.json ./

RUN npm install

COPY . /CODE/

RUN npm run build


EXPOSE 3000

CMD [ "npm" ,"run" ,"start"]
