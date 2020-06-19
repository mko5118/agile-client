FROM python:3.8-alpine
MAINTAINER DevMinko

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# DEPENDENCIES
COPY requirements.txt /
# PostgreSQL Client (--no-cache === registry index not stored on Docker file)
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

# API FOLDERS
# RUN mkdir /api
# WORKDIR /api
# COPY ./api /api

COPY . .

# RUN adduser -D user
# USER user

RUN apk add --no-cache libpq && \
    chmod +x /boot.sh && \
    dos2unix /boot.sh

CMD ["/boot.sh"]