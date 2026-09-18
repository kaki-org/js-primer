#!/usr/bin/env bash
# Idempotent bootstrap for the js-primer Cloud Agent environment.
# Installs the pinned Node.js (.tool-versions) and bun, then installs
# dependencies for the packages exercised by CI and the sample apps.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Read pinned versions from .tool-versions (fallback to known-good values).
NODE_VERSION="$(awk '/^nodejs /{print $2}' .tool-versions 2>/dev/null || true)"
BUN_VERSION="$(awk '/^bun /{print $2}' .tool-versions 2>/dev/null || true)"
NODE_VERSION="${NODE_VERSION:-24.19.0}"
BUN_VERSION="${BUN_VERSION:-1.3.14}"

# --- Node.js via nvm ---------------------------------------------------------
export NVM_DIR="$HOME/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
fi
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

if ! nvm ls "$NODE_VERSION" >/dev/null 2>&1; then
  nvm install "$NODE_VERSION"
fi
nvm alias default "$NODE_VERSION" >/dev/null
nvm use "$NODE_VERSION" >/dev/null

NODE_BIN="$NVM_DIR/versions/node/v${NODE_VERSION}/bin"
export PATH="$NODE_BIN:$PATH"

# Ensure interactive agent shells resolve the pinned Node ahead of any
# system-provided node (the exec-daemon ships an older node on PATH).
BASHRC="$HOME/.bashrc"
MARKER="# js-primer: pin Node.js from .tool-versions"
if ! grep -qF "$MARKER" "$BASHRC" 2>/dev/null; then
  {
    echo ""
    echo "$MARKER"
    echo "export PATH=\"$NODE_BIN:\$PATH\""
  } >> "$BASHRC"
fi

# --- bun ---------------------------------------------------------------------
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
if ! command -v bun >/dev/null 2>&1 || [ "$(bun -v 2>/dev/null)" != "$BUN_VERSION" ]; then
  curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"
fi

# --- Project dependencies ----------------------------------------------------
echo "==> Installing nodecli dependencies"
( cd nodecli && npm install --no-audit --no-fund )

echo "==> Installing todoapp dependencies"
( cd todoapp && npm install --no-audit --no-fund )

echo "==> Installing chapter29 dependencies (bun)"
( cd chapter29 && bun install --frozen-lockfile )

echo ""
echo "Environment ready."
echo "  node: $(node -v)   npm: $(npm -v)   bun: $(bun -v)"
