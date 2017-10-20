#!/bin/bash
echo 'Releasing dev branch to master...'

echo 'Checking out master'
git checkout master

echo 'Pulling branches'
git pull

echo 'Merging origin/dev with master'
git merge origin/dev

echo 'Pushing to origin/master'
git push origin master

echo 'Checking out dev'
git checkout dev

echo 'Done!'
