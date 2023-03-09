# launches react local testing environment
start:
	cd frontend && npm install && npm start

# mac/linux 
# makes the node based docker image then runs the docker container on port 3000
docker-front:
	docker build -t front ./frontend && docker run -d -p 3000:3000 --name front-container front

# windows 
# makes the node based docker image then runs the docker container on port 3000
docker-front-w:
	docker build -t front .\frontend && docker run -d -p 3000:3000 --name front-container front

# mac/linux
# makes the flask based docker image and runs the docker container on port 5000
docker-back:
	docker build -t futurfindr-backend ./backend && docker run --rm -it -p 5000:5000 futurfindr-backend

# windows
# makes the flask based docker image and runs the docker container on port 5000
docker-back-w:
	docker build -t futurfindr-backend .\backend && docker run --rm -it -p 5000:5000 futurfindr-backend
