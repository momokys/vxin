#!/usr/bin/env bash

PROJ_DIR=$(pwd)
# shellcheck disable=SC2034
SH_DIR="$PROJ_DIR/scripts"
# shellcheck disable=SC2034
PKG_DIR="$PROJ_DIR/packages"
# shellcheck disable=SC2034
INTERNAL_DIR="$PROJ_DIR/internal"

function primary() {
  echo -e "\033[34m$1\033[0m"
}
function success() {
  echo -e "\033[32m$1\033[0m"
}
function warning() {
  echo -e "\033[33m$1\033[0m"
}
function error() {
  echo -e "\033[31m$1\033[0m"
}
