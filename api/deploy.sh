# https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path
# Need to match the expected path when including a layer containing dependencies

mkdir -p src/layer/nodejs

cp package.json src/layer/nodejs/

cd src/layer/nodejs

yarn install --prod

cd ../../../

serverless --stage=dev deploy