#!/usr/bin/env sh
# shellcheck disable=SC2066
set -e

# FILES_TO_REPLACE="$(find /usr/share/nginx/html -type f -iname '*.js')"

# for i in \
#     "test;${TEST}"
# do
#     for filename in ${FILES_TO_REPLACE}; do
#         echo "Replacing $(echo "${i}" | cut -d';' -f1) by $(echo "${i}" | cut -d';' -f2) in ${filename}"
#         sed -i "s^$(echo "${i}" | cut -d';' -f1)^$(echo "${i}" | cut -d';' -f2)^g" "${filename}"
#     done
# done

node /cv/build/index.js
