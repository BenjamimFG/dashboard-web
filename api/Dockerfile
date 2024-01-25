FROM python:3.11-alpine

WORKDIR /api
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./src ./src

ENV FLASK_APP src/server.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 8000

CMD ["flask", "run"]