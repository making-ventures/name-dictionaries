#!/bin/bash
set -e

echo "========================================"
echo "Health checks"
echo "========================================"

echo ""
echo "=== Gitleaks (git history) ==="
gitleaks git . --verbose --no-banner

echo ""
echo "=== Gitleaks (working tree) ==="
gitleaks dir . --verbose --no-banner

echo ""
echo "=== Outdated dependencies ==="
if pnpm outdated; then
  echo "All dependencies up to date"
else
  echo "Outdated dependencies found"
  exit 1
fi

echo ""
echo "=== Vulnerability audit ==="
pnpm audit --audit-level=low

echo ""
echo "========================================"
echo "Health checks passed"
echo "========================================"
