#!/usr/bin/env bash
cd dist;
echo "californiabeers.us" > CNAME;
cd ..;
git commit -am "Save local changes";
git checkout -B gh-pages;
git add -f dist;
git commit -am "Rebuild website";
git filter-branch -f --prune-empty --subdirectory-filter dist;
git push -f origin gh-pages
git checkout -;
