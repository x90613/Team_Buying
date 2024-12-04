# Stage 1: Build stage
FROM node:18-alpine as builder

# Switch to a different Alpine mirror and add dependencies
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    libc6-compat \
    curl \
    bash

# Configure better DNS resolution
RUN printf "nameserver 8.8.8.8\nnameserver 8.8.4.4\nnameserver 1.1.1.1\nsearch .\noptions ndots:1 timeout:3 attempts:5 rotate\n" > /etc/resolv.conf

# Configure yarn with alternative registries
ENV YARN_CACHE_FOLDER=/root/.yarn-cache
RUN yarn config set registry https://registry.yarnpkg.com \
    && yarn config set network-timeout 600000 \
    && yarn config set child-concurrency 1

# Install dependencies first
WORKDIR /app
COPY package*.json yarn.lock ./

# Remove package-lock.json to avoid conflicts
RUN rm -f package-lock.json

# Install dependencies with lockfile generation allowed
RUN yarn install --network-timeout 600000 --network-concurrency 1 \
    || yarn install --network-timeout 600000 --network-concurrency 1 --registry https://registry.npmjs.org \
    || yarn install --network-timeout 600000 --network-concurrency 1 --registry https://registry.npmmirror.com

# Copy and build application
COPY . .
RUN yarn build

# Stage 2: Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]