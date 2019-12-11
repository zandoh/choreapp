echo "[API] Starting services..."

# https://stackoverflow.com/a/2173421
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

sls offline -l src/services/gateway &
sls offline -l src/services/chores
