#!/bin/bash
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"

bash "$DIR/check.sh"
bash "$DIR/health.sh"

echo ""
echo "========================================"
echo "All checks (check + health) passed"
echo "========================================"
