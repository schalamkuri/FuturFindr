# starter code came from a tutorial at https://blog.logrocket.com/build-deploy-flask-app-using-docker/
# also based on geojobs's file
FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

# start by pulling/updating python
RUN apt-get clean && apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get -y install nginx

# copy the requirements file into the image
COPY . usr/src/back-end
COPY requirements.txt usr/src/back-end/requirements.txt

# switch working directory
WORKDIR /usr/src/back-end

# install the dependencies and packages in the requirements file
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py" ]