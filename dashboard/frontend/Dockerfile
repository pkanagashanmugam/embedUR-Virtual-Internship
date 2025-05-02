
#NGINX

# Step 1: Build the React app
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the static files using Nginx
FROM nginx:alpine AS production

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]







# # Development React Dockerfile

# FROM node:22

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "start"]
