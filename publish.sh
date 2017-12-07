rm -rf ./_book
gitbook build
git pull origin gh-pages
cp -r ./_book/* ./
git add .
git commit -m 'regenerated book automatically'
git push origin gh-pages
