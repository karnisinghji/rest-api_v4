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

ENV PORT =8080

# Expose the app port (default NestJS port)
EXPOSE 8080

# Start the app
ENTRYPOINT ["npm", "run", "start:prod"]
