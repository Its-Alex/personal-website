#!/usr/bin/env sh
# shellcheck disable=SC2066
set -e

FILES_TO_REPLACE="$(find /usr/share/nginx/html -type f -iname '*.js')"

for i in \
    "curriculum_posthog_token;${CURRICULUM_POSTHOG_TOKEN}" \
    "http://posthog.local;${CURRICULUM_POSTHOG_URL}" \
    "sentry-dsn;${CURRICULUM_SENTRY_DSN}"
do
    for filename in ${FILES_TO_REPLACE}; do
        echo "Replacing $(echo "${i}" | cut -d';' -f1) by $(echo "${i}" | cut -d';' -f2) in ${filename}"
        sed -i "s^$(echo "${i}" | cut -d';' -f1)^$(echo "${i}" | cut -d';' -f2)^g" "${filename}"
    done
done

nginx -g "daemon off;"
