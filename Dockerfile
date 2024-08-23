FROM node

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli json-server

RUN npm install

# Expondo as portas necessárias para o Angular (4200) e json-server (3000)
EXPOSE 4200
EXPOSE 3000

CMD ["sh", "-c", "json-server --watch db.json --port 3000 & ng serve --host 0.0.0.0"]
