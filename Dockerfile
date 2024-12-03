# Use an official Node.js runtime as the base image
FROM node:22-alpine3.19

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variable for GitHub token (if required)
# If you pass the GITHUB_TOKEN from your GitHub Actions as an environment variable
# this can be done as part of the build process.
ARG GITHUB_TOKEN

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Configure npm to use GitHub token temporarily
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > ~/.npmrc && \
    npm install && \
    rm -f ~/.npmrc

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