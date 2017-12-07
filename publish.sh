#!/bin/bash

# chmod +x ./publish.sh
rm -rf ./_book
gitbook build
git pull origin gh-pages
cp -r ./_book/* ./
git add .
git commit -m 'update document'
git push origin gh-pages
