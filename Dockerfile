# Base image: Node.js 18 on Alpine Linux (tiny, ~50MB)
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files FIRST (Docker layer caching — faster rebuilds)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run when container starts
CMD ["node", "app.js"]