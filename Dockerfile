FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGODB_URI = "mongodb+srv://rophenp:Pwmd2KDWfGGPxbYD@my-rotten-tomatoes.70afw.mongodb.net/?retryWrites=true&w=majority&appName=my-rotten-tomatoes"
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET="Lp+6M6rft/wB1xaouLJ0qQ0lr+19OKPiisinn0i1BiI="

ENV MAILTRAP_HOST=sandbox.smtp.mailtrap.io
ENV MAILTRAP_PORT=2525
ENV MAILTRAP_USER=e5abad3e2a8179
ENV MAILTRAP_PASS=f9a5077c8d7798
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]