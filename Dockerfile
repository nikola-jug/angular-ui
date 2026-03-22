FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=docker

FROM nginx:alpine
COPY --from=build /app/dist/angular-ui-bff/browser /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf