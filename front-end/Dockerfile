# Stage 1: Build stage
FROM node:18-alpine AS builder

# Switch to a different Alpine mirror and add dependencies
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
        libc6-compat \
        curl \
        bash

# DNS configuration is now handled through Docker runtime flags
# Use: docker run --dns 8.8.8.8 --dns 8.8.4.4 --dns 1.1.1.1 ...

# Configure yarn with alternative registries
# Using a dedicated cache folder improves build performance
ENV YARN_CACHE_FOLDER=/root/.yarn-cache

# Configure Yarn with better timeout and concurrency settings
RUN yarn config set registry https://registry.yarnpkg.com && \
    yarn config set network-timeout 600000 && \
    yarn config set child-concurrency 1

# Set working directory for the application
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json yarn.lock ./

# Remove package-lock.json to prevent npm/yarn conflicts
RUN rm -f package-lock.json

# Install dependencies with fallback registries
# The multiple attempts help handle network issues
RUN yarn install --network-timeout 600000 --network-concurrency 1 || \
    yarn install --network-timeout 600000 --network-concurrency 1 --registry https://registry.npmjs.org || \
    yarn install --network-timeout 600000 --network-concurrency 1 --registry https://registry.npmmirror.com

# Copy application code and build
COPY . .
RUN yarn build

# Stage 2: Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]