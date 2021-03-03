FROM node:15

# Change working directory
WORKDIR "/app"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm production packages 
RUN npm install --production

COPY . /app

EXPOSE 3100

USER node

ENTRYPOINT ["bash", "-c"]
CMD ["sleep 10 && npm start"]
