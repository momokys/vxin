#!/usr/bin/env bash

cd "$(dirname "$0")" && cd ../
chmod +x ./scripts/*.sh
source ./scripts/utils.sh

if [ -f "$SH_DIR/$1.sh" ]; then
  primary "========================< cmd $1 start >========================"
  # shellcheck disable=SC1090
  source "$SH_DIR/$1.sh"
  primary "========================< cmd $1 end   >========================"
else
  error "$(error error:) not found $1.sh"
fi
