FROM node:20-alpine

WORKDIR /app

# Install dependencies only once
COPY package.json package-lock.json ./
RUN npm install

# Do NOT copy source code here
CMD ["npm", "run", "dev"]
