FROM node:18.19.0
WORKDIR /work
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["node", "./jobs/worker.js"]
