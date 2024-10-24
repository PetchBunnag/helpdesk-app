# Use the official Node.js image from DockerHub
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3000

# Run the backend service
CMD ["node", "app.js"]