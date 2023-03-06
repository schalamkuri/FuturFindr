# launches react local testing environment
start:
	cd frontend && npm install && npm start

# makes the node based docker image then runs the docker container on port 3000
docker-front:
	docker build -t front .\frontend && docker run -d -p 3000:3000 --name front-container front

# makes the flask based docker image and runs the docker container on port 5000
docker-back:
	docker build -t futurfindr-backend .\backend && docker run --rm -it -p 5000:5000 futurfindr-backend

