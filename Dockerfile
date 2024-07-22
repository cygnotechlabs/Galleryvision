# Use the official Node.js image as base
FROM node:20.12.2 as build
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application
COPY . .
 
# Build the application
RUN npm run build
 
# Stage 2: Serve frontend with a lightweight HTTP server
FROM nginx:alpine
 
# Copy the build output to serve from Nginx
COPY --from=build /app/dist /usr/share/nginx/html
 
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
 
# Expose port 4173
EXPOSE 4173
 
# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]