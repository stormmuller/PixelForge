# Use the official Dev Container image for Node.js 22
FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Set working directory inside container
WORKDIR /workspace

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies (without copying all files first)
RUN npm install

# Copy the entire project
COPY . .

# Set default command
CMD ["npm", "run", "dev"]
