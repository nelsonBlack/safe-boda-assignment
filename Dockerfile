# Image source
FROM node:10-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

#copy migration files
COPY ./src/migrations /app/src/migrations/


# Then install the NPM module
RUN npm install -f

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["npm", "run", "start:dev"]