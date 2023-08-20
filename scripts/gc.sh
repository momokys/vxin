#!/usr/bin/env bash


gc_list=() # gc 列表

# 收集 gc 项目
for pkg in "$PKG_DIR"/* ; do
  if [ -d "$pkg/node_modules" ]; then
    gc_list[${#gc_list[*]}]="$pkg/node_modules"
  fi
  if [ -d "$pkg/dist" ]; then
    gc_list[${#gc_list[*]}]="$pkg/dist"
  fi
done
if [ -d "$PROJ_DIR/node_modules" ]; then
  gc_list[${#gc_list[*]}]="$PROJ_DIR/node_modules"
fi
if [ -f "$PROJ_DIR/pnpm-lock.yaml" ]; then
  gc_list[${#gc_list[*]}]="$PROJ_DIR/pnpm-lock.yaml"
fi

# 删除项目
for item in "${gc_list[@]}" ; do
  rm -rf "$item"
  echo "$(error "-") ${item#"$PROJ_DIR"}"
done

if [ ${#gc_list[*]} -ne 0 ]; then
  echo
fi
echo " remove: $(error "${#gc_list[*]}")"
