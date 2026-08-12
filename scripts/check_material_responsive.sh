#!/usr/bin/env bash

set -uo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root" || exit 1

failed=0

fail() {
  echo "ERROR: $1" >&2
  failed=1
}

if rg -n 'word-break:[[:space:]]*keep-all' -g '*.html' .; then
  fail 'word-break: keep-all は使用できません'
fi

while IFS= read -r file; do
  rg -q 'pageVersion = "[0-9-]+"' "$file" || fail "$file: pageVersion がありません"
  rg -q 'p, li[[:space:]]*\{' "$file" || fail "$file: 日本語折り返し規則がありません"
  rg -q '\.progress-dots[[:space:]]*\{' "$file" || fail "$file: progress-dots のCSSがありません"
  rg -q 'className="progress-dots space-x-2"' "$file" || fail "$file: 下部ドットにprogress-dotsがありません"
  rg -q 'p-4 sm:p-6 md:p-8' "$file" || fail "$file: メインカードのレスポンシブ余白がありません"
  rg -q 'px-3 sm:px-' "$file" || fail "$file: 前後ボタンのレスポンシブ余白がありません"

  if rg -q 'speech-bubble' "$file"; then
    rg -q '\.speech-bubble[[:space:]]*\{' "$file" || fail "$file: speech-bubble CSSがありません"
    rg -q 'min-width:[[:space:]]*0' "$file" || fail "$file: Flex縮小用min-width: 0がありません"
    rg -q 'speech-bubble flex-1 min-w-0' "$file" || fail "$file: 吹き出しにmin-w-0がありません"
  fi

  if rg -q 'print-sheet' "$file"; then
    rg -q '@media print' "$file" || fail "$file: 印刷用CSSがありません"
  fi

  python3 - "$file" <<'PY' || failed=1
import sys

path = sys.argv[1]
with open(path, encoding="utf-8") as source:
    text = source.read()

checks = (("{", "}"), ("(", ")"))
errors = [f"{left}={text.count(left)} {right}={text.count(right)}" for left, right in checks if text.count(left) != text.count(right)]
if errors:
    print(f"ERROR: {path}: JSX括弧不一致: {', '.join(errors)}", file=sys.stderr)
    raise SystemExit(1)
PY
done < <(rg -l 'print-sheet|className="progress-dots space-x-2"' -g '*.html' . | sort)

if (( failed != 0 )); then
  exit 1
fi

echo 'Responsive material checks passed.'
