FROM node:12.2.0-alpine AS builder

WORKDIR /app

EXPOSE 3000
VOLUME [ "/app" ]

CMD ["npm", "start"]
