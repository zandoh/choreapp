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
yarn test --watchAll=false

echo '[CLIENT] Building...'
yarn build

echo '[CLIENT] Deploying...'
serverless client deploy
