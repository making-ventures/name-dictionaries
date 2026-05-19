#!/bin/bash
set -e

echo "========================================"
echo "Running all checks"
echo "========================================"

echo ""
echo "=== Formatting ==="
pnpm format

echo ""
echo "=== Linting ==="
pnpm lint

echo ""
echo "=== Type checking ==="
pnpm typecheck

echo ""
echo "=== Type checking (tests) ==="
pnpm typecheck:tests

echo ""
echo "=== Building ==="
pnpm build

echo ""
echo "=== Tests ==="
pnpm test

echo ""
echo "========================================"
echo "All checks passed successfully"
echo "========================================"
