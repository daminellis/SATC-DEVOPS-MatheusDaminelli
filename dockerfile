from node:20-alpine
RUN apk upgrade --no-cache \
 && npm install -g npm@latest
WORKDIR /app
COPY . .
WORKDIR /app/react-devops-lab
RUN npm install
run npm run build
Expose 4173
CMD ["npm", "run", "preview"]

