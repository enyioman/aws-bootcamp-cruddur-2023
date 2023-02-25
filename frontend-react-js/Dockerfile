FROM node:16.19-slim AS appbuild

ENV PORT=3000
ENV NODE_ENV=production

COPY . /frontend-react-js
WORKDIR /frontend-react-js
EXPOSE ${PORT}
RUN npm ci --production

FROM node:16.19-slim
RUN apk --update --no-cache add curl
COPY  --from=appbuild /frontend-react-js /frontend-react-js
WORKDIR /frontend-react-js
EXPOSE ${PORT}
CMD ["npm", "start"]

