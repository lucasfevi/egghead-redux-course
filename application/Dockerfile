FROM node:8.1-alpine

MAINTAINER Lucas Vieira <newlucasfevi@gmail.com>

ARG UID=1000

ENV APP=/home/node/application

# Create the application folder if needed
RUN mkdir -p $APP

WORKDIR $APP

# Copy package.json and yarn.lock to the application folder
COPY ./package.json ./yarn.lock $APP/

# Install dependencies
RUN apk --update upgrade \
  && apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \

  && apk add --no-cache \
    shadow \

  # Install application dependencies
  && yarn \

  && apk del .gyp

# Copy application
COPY ./ $APP

# Set up the user UID and application folder permissions
RUN usermod -u ${UID:-1000} node && \
  chown -R node:node $APP

USER node

EXPOSE 8080

CMD ["tail", "-f", "/dev/null"]