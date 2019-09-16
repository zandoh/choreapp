env=""

for ARGUMENT in "$@"
do
  KEY=$(echo $ARGUMENT | cut -f1 -d=)
  VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

  case "$KEY" in
    env) env=${VALUE} ;;
  *)   
  esac
done

if [ -z "$env" ]
then
  echo "[CLIENT] No environment specified. Exiting..."
  exit 1
else
  echo "[CLIENT] Environment is $env"
fi

echo '[CLIENT] Testing...'
yarn test
testReturnVal=$? 
if [ $testReturnVal -ne 0 ]; then
    echo "[ERROR] Client tests failed"
    exit $testReturnVal
fi

echo '[CLIENT] Building...'
yarn build
buildReturnVal=$?
if [ $buildReturnVal -ne 0 ]; then
    echo "[ERROR] Client build failed"
    exit $buildReturnVal
fi

echo '[CLIENT] Deploying...'
serverless client deploy
deployReturnVal=$?
if [ $deployReturnVal -ne 0 ]; then
    echo "[ERROR] Client deploy failed"
    exit $deployReturnVal
fi
