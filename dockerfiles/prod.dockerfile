# Use the official Node.js image
FROM node

# Set working directory
WORKDIR /user/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build


# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "--expose-gc", "dist/main"]
