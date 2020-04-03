#!/usr/bin/env bash

## PUBLISH TO NPM
#PREV=$(git describe --abbrev=0 --tags)
#TAG=(${PREV//./ })
#TAG1=${TAG[0]}
#TAG2=${TAG[1]}
#TAG3=${TAG[2]}
#TAG3=$((TAG3 + 1))
#NEXT="$TAG1.$TAG2.$TAG3"
#BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
#COMMIT=$(git rev-parse HEAD)
#MESSAGE=$(git log -1 --oneline)
#PUBLISHED=$(git describe --contains ${COMMIT})
#if [[ "$BRANCH" != "master" ]]; then
#  echo "branch <$BRANCH> cannot be published"tslint.json
#elif [[ -z "$PUBLISHED" ]]; then
#  echo "updating to tag <$NEXT>"
#  npm version ${NEXT} #npm version patch
#  git commit -a -m "update to tag <$NEXT> $COMMIT: $MESSAGE"
#  git push
#  git push --tags
#  npm publish
#else
#  echo "already have tag <$PREV> on commit $COMMIT: $MESSAGE"
#fi

## PUBLISH TO NPM
BRANCH=$(git branch | grep "\*" | cut -d " " -f2)
MESSAGE=$(git log -1 --oneline)
CURRENT=$(node -p "require('./package.json').version")
PUBLISHED=$(git describe | grep -o "${CURRENT}")

echo "---"
echo "${CURRENT} - ${PUBLISHED} - ${BRANCH}"
echo "---"

if [[ "${BRANCH}" != "master" ]]; then
  echo "<<< $BRANCH >>> cannot be published"
elif [[ "${CURRENT}" == "${PUBLISHED}" ]]; then
  #  ~/disconnect_cisco.sh
  #  npm version ${NEXT}
#    npm version patch
  #  git commit -a -m "update to tag <$NEXT> [$MESSAGE]"
#    git push
  #  git push --tags
  #  ~/connect_cisco.sh
  echo "<<< $PUBLISHED >>> have commit [$MESSAGE]"
else
  echo "<<< publis [$MESSAGE]"
fi
