FROM node:12.2.0-alpine AS builder

ENV PATH /app/node_modules/.bin:$PATH
COPY . /app

WORKDIR /app
RUN npm install --silent
RUN npm run build

FROM node:12.2.0-alpine
COPY --from=builder /app/build /app
RUN npm install -g serve
EXPOSE 5000
ENTRYPOINT [ "serve" ]
CMD ["--single", "/app"]