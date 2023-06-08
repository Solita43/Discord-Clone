FROM node:11.0.0-alpine

COPY . .

ENV REACT_APP_BASE_URL=http://localhost:5000
ENV SECRET_KEY=sdfgsdfgsdfg4356345dfg


RUN ["npm", "install"]
RUN ["npm", "run", "build"]

EXPOSE 5000

CMD ["npm", "start"]