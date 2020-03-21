FROM python:3.7-alpine
LABEL maintainer="rushi444"

WORKDIR /app/backend

COPY requirements.txt /app/backend

RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev

RUN pip3 install --upgrade pip -r requirements.txt

RUN apk del .tmp-build-deps

COPY . /app/backend

EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000
