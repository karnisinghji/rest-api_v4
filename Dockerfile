# Use the latest Node.js LTS version
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (optional)
RUN npm run build

# Expose the app port (default NestJS port)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
