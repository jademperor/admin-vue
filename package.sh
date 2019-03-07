#!bin/sh

# build proj
npm run build

# pack the dist folder
tar czvf gateway-manger-ui.dist.tar.gz ./dist
mv gateway-manger-ui.dist.tar.gz ./dist