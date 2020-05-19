FROM python:3.8-alpine
MAINTAINER DevMinko

ENV PYTHONUNBUFFERED 1

# DEPENDENCIES
COPY ./requirements.txt /requirements.txt
# PostgreSQL Client (--no-cache === registry index not stored on Docker file)
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

# API FOLDERS
RUN mkdir /api
WORKDIR /api
COPY ./api /api

RUN adduser -D user
USER user