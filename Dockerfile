FROM node:18-alpine

WORKDIR /usr/ekshop/api/user/

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/ekshop/api/user/
RUN npm install

COPY . /usr/ekshop/api/user/

ENV PORT 6600
EXPOSE $PORT
CMD [ "npm", "start" ]
