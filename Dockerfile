FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
