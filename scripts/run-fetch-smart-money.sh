#!/bin/sh
# 币安聪明钱抓取脚本包装器
# ego-browser 的 nodejs 运行时会清空环境变量且 cwd 为 /，
# 因此把项目根目录作为一行 JS 注入到脚本前，再经 stdin 传入。
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/scripts/fetch-smart-money.mjs"
[ -r "$SCRIPT" ] || { echo "[scrape:smart-money] 找不到 $SCRIPT" >&2; exit 1; }

EGO="$(command -v ego-browser || true)"
[ -x "$EGO" ] || EGO="$HOME/.local/bin/ego-browser"
[ -x "$EGO" ] || {
  echo "[scrape:smart-money] 找不到 ego-browser 命令。" >&2
  echo "  请确认 ego 浏览器已安装并在运行，且 PATH 包含 \$HOME/.local/bin。" >&2
  exit 1
}

# 路径中的单引号转义，防止拼接出非法 JS
ROOT_ESC="$(printf '%s' "$ROOT" | sed "s/'/'\\\\''/g")"
{ echo "globalThis.__PROJECT_ROOT__='$ROOT_ESC'"; cat "$SCRIPT"; } | "$EGO" nodejs
