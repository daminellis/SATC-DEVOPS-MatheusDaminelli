from node:20-alpine
WORKDIR /app
COPY . .
WORKDIR /app/react-devops-lab
RUN npm install
run npm run build
Expose 4173
CMD ["npm", "run", "preview"]