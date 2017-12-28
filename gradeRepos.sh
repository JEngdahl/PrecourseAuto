#!/bin/bash
#git clone https://github.com/JEngdahl/tweetcli ./RepoContainer/name
rm data.js
touch data.js
TEST="curl http://localhost:1337/api/class?c=ssp8"
echo $TEST

RESPONSE=`$TEST`

echo module.exports = $RESPONSE > data.js
rm -rf ClassContainer

CLASSLISTGET="curl http://localhost:1337/api/classlist"
echo $CLASSLISTGET
CLASSLIST=`$CLASSLISTGET`
for i in $CLASSLIST; do
  STUDENTLISTGET="curl http://localhost:1337/api/bashclassnames?c=$i"
  echo $STUDENTLISTGET
  STUDENTLIST=`$STUDENTLISTGET`
  for j in $STUDENTLIST; do
    echo $j
    if test $i = "SSP8"
    then
      git clone https://github.com/$j/SSP7-recursion ./ClassContainer/SSP7/$j/recursion
      git clone https://github.com/$j/SSP7-testbuilder ./ClassContainer/SSP7/$j/testbuilder
      git clone https://github.com/$j/SSP7-javascript-koans ./ClassContainer/SSP7/$j/javascript-koans
      git clone https://github.com/$j/SSP7-underbar ./ClassContainer/SSP7/$j/underbar
    else
      git clone https://github.com/$j/$i-recursion ./ClassContainer/$i/$j/recursion
      git clone https://github.com/$j/$i-testbuilder ./ClassContainer/$i/$j/testbuilder
      git clone https://github.com/$j/$i-javascript-koans ./ClassContainer/$i/$j/javascript-koans
      git clone https://github.com/$j/$i-underbar ./ClassContainer/$i/$j/underbar
    fi
  done
done

casperjs grading.js

value=$(<gradedata.js)
curl --data "data=$value" http://localhost:1337/api/updatebyhandle
echo $SEND

#curl -X POST http://localhost:1337/api/updatebyhandle -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' -d '$value'
