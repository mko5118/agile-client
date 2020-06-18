# build environment
FROM node:14.4.0-alpine as build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine as final
COPY --from=build /client/build /usr/share/nginx/html
# new
COPY boot.sh /
RUN chmod +x /boot.sh && dos2unix /boot.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
CMD ["/boot.sh"]