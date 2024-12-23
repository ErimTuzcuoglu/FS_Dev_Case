FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn start; else yarn dev; fi"]
