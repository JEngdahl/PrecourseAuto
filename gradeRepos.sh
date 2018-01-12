#!/bin/bash
#git clone https://github.com/JEngdahl/tweetcli ./RepoContainer/name
rm data.js
touch data.js
TEST="curl http://34.207.251.58:3000/api/class?c=all"
echo $TEST

RESPONSE=`$TEST`

echo module.exports = $RESPONSE > data.js
rm -rf ClassContainer

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
      git clone --quiet https://github.com/$j/SSP7-recursion ./ClassContainer/SSP7/$j/recursion
      git clone --quiet https://github.com/$j/SSP7-testbuilder ./ClassContainer/SSP7/$j/testbuilder
      git clone --quiet https://github.com/$j/SSP7-javascript-koans ./ClassContainer/SSP7/$j/javascript-koans
      git clone --quiet https://github.com/$j/SSP7-underbar ./ClassContainer/SSP7/$j/underbar
      node addCounter.js SSP7 $j
      babel ./ClassContainer/SSP7/$j/underbar/src/underbar.js --out-file ./ClassContainer/SSP7/$j/underbar/src/underbar.js
    else
      git clone --quiet https://github.com/$j/$i-recursion ./ClassContainer/$i/$j/recursion
      git clone --quiet https://github.com/$j/$i-twittler ./ClassContainer/$i/$j/twittler
      git clone --quiet https://github.com/$j/$i-testbuilder ./ClassContainer/$i/$j/testbuilder
      git clone --quiet  https://github.com/$j/$i-javascript-koans ./ClassContainer/$i/$j/javascript-koans
      git clone --quiet https://github.com/$j/$i-underbar ./ClassContainer/$i/$j/underbar
      node addCounter.js $i $j
      if [[ -e ./ClassContainer/$i/$j/underbar/src/underbar.js ]]; then
         echo 'Babel underbar.js ES6 -> ES5'
         babel ./ClassContainer/$i/$j/underbar/src/underbar.js --out-file ./ClassContainer/$i/$j/underbar/src/underbar.js
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
