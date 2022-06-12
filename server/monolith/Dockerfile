# TODO: multistage build https://blog.ploetzli.ch/2020/efficient-multi-stage-build-django-docker/
# pull official base image
FROM python:3.8-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
# Pillow can't build without zlib, for some reason
RUN apk update \
    && apk add postgresql-dev gcc libffi-dev python3-dev libevent-dev zlib-dev jpeg-dev musl-dev g++

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
