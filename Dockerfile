# This is a multi stage build for production, 
# The first stage is to build everything that we need for the Node.js application to run,
# installing npm packages and compiling native npm modules if necessary

# --------------> The build image
FROM node:latest AS build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

#This will install only production dependencies and ignore DevDepencies
RUN npm ci --only=production
 

# This is the production image that can be optimized and published to a registry

# --------------> The production image
FROM node:lts-alpine@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

RUN apk add dumb-init

# For optimal performance and security, ENV is set to production
ENV NODE_ENV production

# This is to avoid running container as root
USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules

COPY --chown=node:node . /usr/src/app

CMD ["dumb-init", "node", "./dist/app.js"]
