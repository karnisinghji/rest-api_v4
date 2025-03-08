FROM node:20

WORKDIR  /shouryaveersingh/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

#CMD [ "npm" ,"run" ,"start"]
#CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:prod"]


