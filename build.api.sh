echo "STEP 1 : Delete image old verison"
docker rmi -f alonecheer/miniproject:dev

echo "STEP 2 : Build new image"
docker build -t alonecheer/miniproject:dev .

echo "STEP 3 : Push to dockerhub"
docker push alonecheer/miniproject:dev

echo "STEP 4 : Finish"
start chrome https://hub.docker.com/?ref=login
