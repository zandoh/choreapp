apiEnv=""
clientEnv=""

for ARGUMENT in "$@"
do
  KEY=$(echo $ARGUMENT | cut -f1 -d=)
  VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

  case "$KEY" in
    api) apiEnv=${VALUE} ;;
    client) clientEnv=${VALUE} ;;
  *)   
  esac
done

if [ -z "$apiEnv" ]
then
  echo '[WARN] No Environment set for API. Skipping deployment'
else
  echo '[API] Starting deploy '$apiEnv' environment'
  cd ./api
  sh ./deploy.sh env=$apiEnv
  apiReturnVal=$?
  if [ $apiReturnVal -ne 0 ]; then
      echo "[ERROR] Failed deploying API"
      exit $apiReturnVal
  else
    cd ../
    echo '[API] Deployed'
  fi
fi

if [ -z "$clientEnv" ]
then
  echo '[WARN] No Environment set for client. Skipping deployment'
else
  echo '[CLIENT] Starting deploy to '$clientEnv' environment'
  cd ./client
  sh ./deploy.sh env=$clientEnv
  clientReturnVal=$?
  if [ $clientReturnVal -ne 0 ]; then
      echo "[ERROR] Failed deploying Client"
      exit $clientReturnVal
  else
    cd ../
    echo '[CLIENT] Deployed'
  fi
fi
