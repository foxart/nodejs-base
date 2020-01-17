#!/usr/bin/env bash

## PUBLISH TO NPM
PREV=$(git describe --abbrev=0 --tags)
TAG=(${PREV//./ })
TAG1=${TAG[0]}
TAG2=${TAG[1]}
TAG3=${TAG[2]}
TAG3=$((TAG3 + 1))
NEXT="$TAG1.$TAG2.$TAG3"
BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
COMMIT=$(git rev-parse HEAD)
MESSAGE=$(git log -1 --oneline)
PUBLISHED=$(git describe --contains ${COMMIT})
if [[ "$BRANCH" != "master" ]]; then
  echo "branch <$BRANCH> cannot be published"tslint.json
elif [[ -z "$PUBLISHED" ]]; then
  echo "updating to tag <$NEXT>"
  npm version ${NEXT} #npm version patch
  git commit -a -m "update to tag <$NEXT> $COMMIT: $MESSAGE"
  git push
  git push --tags
  npm publish
else
  echo "already have tag <$PREV> on commit $COMMIT: $MESSAGE"
fi