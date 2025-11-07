FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Use mirror for npm to avoid timeout
RUN npm config set registry https://registry.npmjs.org && \
    npm install --legacy-peer-deps --fetch-retries=5 --fetch-retry-factor=2 --fetch-timeout=60000

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
