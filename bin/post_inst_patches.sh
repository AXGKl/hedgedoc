#!/usr/bin/env bash
set -eu

here="$(builtin cd "$(dirname ${BASH_SOURCE[0]})" && pwd)"

function main {
  for k in "bootstrap" "bootstrap.min"; do
    set -x
    cp "$here/patches/bootstrap.css" "$here/../node_modules/bootstrap/dist/css/$k.css"
    set +x
  done
}

main "$@"
