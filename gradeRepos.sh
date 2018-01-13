#!/bin/bash
#git clone https://github.com/JEngdahl/tweetcli ./RepoContainer/name
rm data.js
touch data.js
TEST="curl http://34.207.251.58:3000/api/class?c=all"
echo $TEST

RESPONSE=`$TEST`

echo module.exports = $RESPONSE > data.js
rm -rf ./server/client/ClassContainer

CLASSLISTGET="curl http://34.207.251.58:3000/api/classlist"
echo $CLASSLISTGET
CLASSLIST=`$CLASSLISTGET`
for i in $CLASSLIST; do
  STUDENTLISTGET="curl http://34.207.251.58:3000/api/bashclassnames?c=$i"
  echo $STUDENTLISTGET
  STUDENTLIST=`$STUDENTLISTGET`
  for j in $STUDENTLIST; do
    echo $j
    if test $i = "SSP8"
    then
      git clone --quiet https://github.com/$j/SSP7-recursion ./server/client/ClassContainer/SSP7/$j/recursion
      git clone --quiet https://github.com/$j/SSP7-testbuilder ./server/client/ClassContainer/SSP7/$j/testbuilder
      git clone --quiet https://github.com/$j/SSP7-javascript-koans ./server/client/ClassContainer/SSP7/$j/javascript-koans
      git clone --quiet https://github.com/$j/SSP7-underbar ./server/client/ClassContainer/SSP7/$j/underbar
      node addCounter.js SSP7 $j
      babel ./server/client/ClassContainer/SSP7/$j/underbar/src/underbar.js --out-file ./server/client/ClassContainer/SSP7/$j/underbar/src/underbar.js
    else
      git clone --quiet https://github.com/$j/$i-recursion ./server/client/ClassContainer/$i/$j/recursion
      git clone --quiet https://github.com/$j/$i-twittler ./server/client/ClassContainer/$i/$j/twittler
      git clone --quiet https://github.com/$j/$i-testbuilder ./server/client/ClassContainer/$i/$j/testbuilder
      git clone --quiet  https://github.com/$j/$i-javascript-koans ./server/client/ClassContainer/$i/$j/javascript-koans
      git clone --quiet https://github.com/$j/$i-underbar ./server/client/ClassContainer/$i/$j/underbar
      node addCounter.js $i $j
      node addCalls.js $i $j
      if [[ -e ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js ]]; then
         echo 'Babel underbar.js ES6 -> ES5'
         babel ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js --out-file ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js
      fi
    fi
  done
done

casperjs grading.js

value=$(<gradedata.js)
curl --data "data=$value" http://34.207.251.58:3000/api/updatebyhandle
echo $SEND

echo $(date) >> runtimes.txt
#curl -X POST http://localhost:1337/api/updatebyhandle -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' -d '$value'
