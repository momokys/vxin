#!/usr/bin/env bash

cd `dirname $0` && cd ../

PROJ_DIR=`pwd`

for pkg in `ls "$PROJ_DIR/packages/*"` ; do
    echo $pkg
done
