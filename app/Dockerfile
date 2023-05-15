# This build created a staging docker image
#
FROM node:16 AS appbuild
WORKDIR /usr/src/app
RUN echo "Building Docker image stage 1"
COPY /package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
# RUN npm run build
