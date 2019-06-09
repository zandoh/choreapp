# make directory for layer(s)
mkdir -p src/layer/nodejs

cp package.json src/layer/nodejs/

cd src/layer/nodejs

yarn install --prod

cd ../../../

serverless --stage=dev deploy