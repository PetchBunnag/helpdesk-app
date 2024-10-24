# Build stage: Use Node to build the frontend
FROM node:14-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend codebase and build it
COPY . .
RUN npm run build

# Production stage: Use nginx to serve the static files
FROM nginx:alpine

# Copy the built files from the builder stage to the nginx directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]