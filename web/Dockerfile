FROM node:12.2.0-alpine

ENV PATH /app/node_modules/.bin:$PATH
COPY web /app

WORKDIR /app
RUN npm install --silent
ENTRYPOINT [ "npm" ]
CMD ["start"]