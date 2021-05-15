
FROM node:latest
# FROM node:15.14.0-alpine3.10
RUN mkdir -p /usr/src/app/
RUN chown -R node:node /usr/src/app/
# # install java
# # Install OpenJDK-8
# # RUN apk update && apk add openjdk8-jre
# # ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk
# # ENV PATH="$JAVA_HOME/bin:${PATH}"  
# # RUN echo $PATH
# RUN ALPINE_GLIBC_BASE_URL="https://github.com/sgerrand/alpine-pkg-glibc/releases/download" && \
#     ALPINE_GLIBC_PACKAGE_VERSION="2.33-r0" && \
#     ALPINE_GLIBC_BASE_PACKAGE_FILENAME="glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
#     ALPINE_GLIBC_BIN_PACKAGE_FILENAME="glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
#     ALPINE_GLIBC_I18N_PACKAGE_FILENAME="glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
#     apk add --no-cache --virtual=.build-dependencies wget ca-certificates && \
#     echo \
#     "-----BEGIN PUBLIC KEY-----\
#     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApZ2u1KJKUu/fW4A25y9m\
#     y70AGEa/J3Wi5ibNVGNn1gT1r0VfgeWd0pUybS4UmcHdiNzxJPgoWQhV2SSW1JYu\
#     tOqKZF5QSN6X937PTUpNBjUvLtTQ1ve1fp39uf/lEXPpFpOPL88LKnDBgbh7wkCp\
#     m2KzLVGChf83MS0ShL6G9EQIAUxLm99VpgRjwqTQ/KfzGtpke1wqws4au0Ab4qPY\
#     KXvMLSPLUp7cfulWvhmZSegr5AdhNw5KNizPqCJT8ZrGvgHypXyiFvvAH5YRtSsc\
#     Zvo9GI2e2MaZyo9/lvb+LbLEJZKEQckqRj4P26gmASrZEPStwc+yqy1ShHLA0j6m\
#     1QIDAQAB\
#     -----END PUBLIC KEY-----" | sed 's/   */\n/g' > "/etc/apk/keys/sgerrand.rsa.pub" && \
#     wget \
#     "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
#     apk add --no-cache \
#     "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
#     \
#     rm "/etc/apk/keys/sgerrand.rsa.pub" && \
#     /usr/glibc-compat/bin/localedef --force --inputfile POSIX --charmap UTF-8 "$LANG" || true && \
#     echo "export LANG=$LANG" > /etc/profile.d/locale.sh && \
#     \
#     apk del glibc-i18n && \
#     \
#     rm "/root/.wget-hsts" && \
#     apk del .build-dependencies && \
#     rm \
#     "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
#     "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME"

# ###################################
WORKDIR /usr/src/app
USER node



# FROM ubuntu:16.04
# USER root
# RUN mkdir -p /usr/src/app/
# # USER node
# # RUN chown -R node:node /usr/src/app/
# WORKDIR /user/src/app
# COPY ./package.json /user/src/app/package.json
# RUN apt-get update
# RUN apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
# RUN apt-get -y install nodejs
# RUN npm install
