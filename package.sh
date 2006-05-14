#!/bin/sh
PROJ=`sed '2,$d' chrome.manifest|awk '{print $2}'`
rm -f ${PROJ}*.xpi
VER=`grep 'em:version' install.rdf | sed 's/[^0-9.]//g'`

echo CREATING: ${PROJ}-${VER}.xpi

zip -9 ${PROJ}-${VER}.xpi \
	`find . -type d -name .svn -prune -false -o -type f -a -not -name package.sh`
