FROM node:10

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

ADD . .

RUN npm install

EXPOSE 4200

CMD ["ng","serve","--host", "0.0.0.0"]
