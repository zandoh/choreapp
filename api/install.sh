cd src/lib

for f in `ls`; do
  echo "[API] Installing dependencies for $f library"
  cd $f
  yarn
  cd ..
done

cd ../..

echo "[API] Installing main dependencies"

yarn

exit 1
