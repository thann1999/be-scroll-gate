FROM node:18-alpine

WORKDIR /app/be-scroll-gate
COPY package*.json ./
RUN npm install
COPY . .
ENV TZ=Asia/Ho_Chi_Minh

RUN npm run build
CMD ["npm", "run", "start:prod"]
