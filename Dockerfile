FROM mcr.microsoft.com/playwright:v1.58.1-jammy

WORKDIR /work

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "test"]