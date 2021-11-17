#!/usr/bin/env sh

set -e

npm run build

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:wojtek0126/medical_list_VUE.git master:gh-pages

cd -