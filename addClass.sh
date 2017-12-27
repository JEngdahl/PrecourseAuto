#!/bin/bash
#git clone https://github.com/JEngdahl/tweetcli ./RepoContainer/name
TEST="curl https://all-server.herokuapp.com/absent?class=hr-ssp14&date=12/11/2017"
echo $TEST

RESPONSE=`$TEST`
echo $RESPONSE