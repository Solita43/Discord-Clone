FROM python:3.9.17-alpine3.18

COPY . .

ENV SECRET_KEY=discordia
ENV DATABASE_URL=sqlite:///localhost:5432
ENV S3_BUCKET=discordia-aa
ENV S3_KEY=AKIA6PH4JC7NKXPBCBV6
ENV S3_SECRET=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
ENV FLASK_ENV=Production
ENV REACT_APP_BASE_URL=http://localhost:3000
ENV SECRET_KEY=sdfgsdfgsdfg4356345dfg

RUN ["python", "-m", "pip", "install", "--upgrade", "pip"]
RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["python", "-m", "pip", "install", "--upgrade", "setuptools"]
RUN ["pip", "install", "psycopg2-binary"]
RUN ["flask", "db", "upgrade"]
RUN ["flask", "seed", "all"]
EXPOSE 3000

CMD gunicorn -b :$PORT main:app
