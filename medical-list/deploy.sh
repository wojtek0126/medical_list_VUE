#!/usr/bin/env sh

set -e

yarn run build

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:wojtek0126/medical_list_VUE.git main:gh-pages

cd -