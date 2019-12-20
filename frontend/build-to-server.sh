npm run build
rm -r -f ../backend/src/main/resources/frontend-build
mkdir ../backend/src/main/resources/frontend-build
mv ./build/* ../backend/src/main/resources/frontend-build/