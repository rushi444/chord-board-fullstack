# base image
FROM node:13.10.1-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
# RUN yarn add react-scripts@3.0.1 -g --silent

# start app
CMD yarn start