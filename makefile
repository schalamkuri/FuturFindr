# run frontend docker container
# -v ${pwd}\frontend\src:/app/src
docker-front:
	docker run -d -p 3000:3000 --name front-container front

#build frontend docker image
build-front :
	docker build -t front .\frontend
