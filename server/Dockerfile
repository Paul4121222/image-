FROM 18.19.0
WORKDIR /app
COPY package*.json .
RUN npm run install & npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "run", "build-server"]
