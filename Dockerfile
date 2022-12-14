# Test it 
FROM node:current

COPY . /node/app
WORKDIR /node/app

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]