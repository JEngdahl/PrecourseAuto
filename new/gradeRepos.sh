#!/usr/bin/env bash

testUnderBar() {
  echo "in testUnderbar"
  echo $1
  echo 'var window = global;' >> "$1/src/underbarTestOne.js" 
  cat "$1/src/underbar.js" >> "$1/src/underbarTestOne.js"
  cat "./graders/underbarTestOne.js" >> "$1/src/underbarTestOne.js" 
  mocha "$1/src/underbarTestOne.js" -R postingMochaReporter.js $2 UnderbarOne

  echo 'var window = global;' >> "$1/src/underbarTestTwo.js" 
  cat "$1/src/underbar.js" >> "$1/src/underbarTestTwo.js"
  cat "./graders/underbarTestTwo.js" >> "$1/src/underbarTestTwo.js" 
  mocha "$1/src/underbarTestTwo.js" -R postingMochaReporter.js $2 UnderbarTwo
}

testRecursion() {
  echo "in testRecursion"
  echo $1
  cat "$1/src/getElementsByClassName.js" >> "$1/src/tester.js"
  cat "$1/src/parseJSON.js" >> "$1/src/tester.js"
  cat "$1/src/stringifyJSON.js" >> "$1/src/tester.js"
  cat "./graders/recursionTest.js" >> "$1/src/tester.js"
  mocha "$1/src/tester.js" -R postingMochaReporter.js $2 Recursion

}

CLASSLISTGET="curl http://35.173.188.239:3000/api/classlist"
echo $CLASSLISTGET
CLASSLIST=`$CLASSLISTGET`
for i in $CLASSLIST; do
  STUDENTLISTGET="curl http://35.173.188.239:3000/api/bashclassnames?c=$i"
       echo $STUDENTLISTGET
       STUDENTLIST=`$STUDENTLISTGET`
  for j in $STUDENTLIST; do
    echo $j
    rm -rf ./server/client/ClassContainer/$i/$j
    git clone --quiet https://github.com/$j/$i-recursion ./server/client/ClassContainer/$i/$j/recursion
    # git clone --quiet https://github.com/$j/$i-twittler ./server/client/ClassContainer/$i/$j/twittler
    # git clone --quiet https://github.com/$j/$i-testbuilder ./server/client/ClassContainer/$i/$j/testbuilder
    # git clone --quiet https://github.com/$j/$i-javascript-koans ./server/client/ClassContainer/$i/$j/javascript-koans
    git clone --quiet https://github.com/$j/$i-underbar ./server/client/ClassContainer/$i/$j/underbar

    if [ -e ./server/client/ClassContainer/$i/$j/underbar/src/underbar.js ]; then
        testUnderBar "./server/client/ClassContainer/$i/$j/underbar" $j 
    fi
    if [ -e ./server/client/ClassContainer/$i/$j/recursion/src/getElementsByClassName.js ]; then
        testRecursion "./server/client/ClassContainer/$i/$j/recursion" $j 
    fi

  done
done


echo $(date) >> runtimes.txt