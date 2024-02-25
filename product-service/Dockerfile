# Base image
FROM node:21-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./product-service/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./product-service .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "build/src/main.js" ]
