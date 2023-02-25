FROM node:16.19-slim AS appbuild

ENV PORT=3000
ENV NODE_ENV=production

COPY . /frontend-react-js
WORKDIR /frontend-react-js
EXPOSE ${PORT}
RUN npm ci --production

FROM node:16.19-slim
RUN apt-get update 
RUN apt-get install -y gcc
RUN apt-get install -y curl
COPY  --from=appbuild /frontend-react-js /frontend-react-js
WORKDIR /frontend-react-js
EXPOSE ${PORT}
CMD ["npm", "start"]

