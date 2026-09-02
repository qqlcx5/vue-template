#!/bin/sh
# 币安聪明钱抓取脚本包装器
# ego-browser 的 nodejs 运行时会清空环境变量且 cwd 为 /，
# 因此把项目根目录作为一行 JS 注入到脚本前，再经 stdin 传入。
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
{ echo "globalThis.__PROJECT_ROOT__='$ROOT'"; cat "$ROOT/scripts/fetch-smart-money.mjs"; } | ego-browser nodejs
