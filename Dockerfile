# Use an official Node.js runtime as the base image
FROM node:22-alpine3.19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copiar o arquivo .env.example para o diretório de trabalho
COPY .env.example .env.example

# Run the command to set environment variables
RUN npm run set-env

# Copy the rest of the application code
COPY . .

# Build app
RUN npm run build

# Expose the port the app runs on
EXPOSE 8081

# Command to run the applications
ENTRYPOINT ["npm", "start"]