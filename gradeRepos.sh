#!/bin/bash
rm data.js
touch data.js
TEST="curl http://34.207.251.58:3000/api/class?c=all"
echo $TEST

RESPONSE=`$TEST`

echo module.exports = $RESPONSE > data.js
rm -rf ./server/client/ClassContainer/*

CLASSLISTGET="curl http://34.207.251.58:3000/api/classlist"
echo $CLASSLISTGET
CLASSLIST=`$CLASSLISTGET`
for i in $CLASSLIST; do
  STUDENTLISTGET="curl http://34.207.251.58:3000/api/bashclassnames?c=$i"
  echo $STUDENTLISTGET
  STUDENTLIST=`$STUDENTLISTGET`
  for j in $STUDENTLIST; do
    echo $j
    git clone --quiet https://github.com/$j/$i-recursion ./server/client/ClassContainer/$i/$j/recursion
    git clone --quiet https://github.com/$j/$i-twittler ./server/client/ClassContainer/$i/$j/twittler
    git clone --quiet https://github.com/$j/$i-testbuilder ./server/client/ClassContainer/$i/$j/testbuilder
    git clone --quiet https://github.com/$j/$i-javascript-koans ./server/client/ClassContainer/$i/$j/javascript-koans
    git clone --quiet https://github.com/$j/$i-underbar ./server/client/ClassContainer/$i/$j/underbar
    node addCounter.js $i $j
    node addLocalStorage.js $i $j
    if [[ -e ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js ]]; then
       echo 'Babel underbar.js ES6 => ES5'
       babel ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js --out-file ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js
    fi
  done
done
# casperjs grading.js
casperjs grading/koans.js && casperjs grading/recursion.js && casperjs grading/testbuilder.js && casperjs grading/underbar.js

value=$(<data.js)
curl --data "data=$value" http://34.207.251.58:3000/api/updatebyhandle
echo $(date) >> runtimes.txt
#curl -X POST http://34.207.251.58:1337/api/updatebyhandle -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' -d '$value'
