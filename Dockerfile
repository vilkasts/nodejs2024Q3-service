FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm run audit
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
RUN npm prune --production && npm cache clean --force
CMD ["npm", "run", "start:prod"]
EXPOSE 4000