FROM node:16-alpine3.16

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]


# FROM node:16.19-slim AS appbuild

# ENV PORT=3000
# ENV NODE_ENV=production

# RUN apt-get update 
# RUN apt-get install -y gcc
# RUN apt-get install -y curl

# COPY . /frontend-react-js
# WORKDIR /frontend-react-js
# EXPOSE ${PORT}
# RUN npm ci --production && npm run build

# FROM nginx:1.23.3-alpine as production

# COPY --from=appbuild /frontend-react-js/build /usr/share/nginx/html

# RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/confbackup.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE ${PORT}

# CMD ["nginx", "-g", "daemon off;"] 1-0