#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  GKOS — Launch Script
#  Starts both the Next.js dashboard AND the Python automation brain
# ══════════════════════════════════════════════════════════════════

set -e
GKOS_DIR="$(cd "$(dirname "$0")" && pwd)"
BRAIN_DIR="$GKOS_DIR/gkos_brain"
AI_VENV="$GKOS_DIR/../ai-system/.venv/bin/python"

echo ""
echo "  ██████╗ ██╗  ██╗ ██████╗ ███████╗"
echo "  ██╔════╝ ██║ ██╔╝██╔═══██╗██╔════╝"
echo "  ██║  ███╗█████╔╝ ██║   ██║███████╗"
echo "  ██║   ██║██╔═██╗ ██║   ██║╚════██║"
echo "  ╚██████╔╝██║  ██╗╚██████╔╝███████║"
echo "   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝"
echo ""
echo "  Graphikardia Master OS — v1.0.0"
echo "  $(date '+%A, %d %B %Y — %H:%M IST')"
echo ""

# Install brain deps if needed
if [ -f "$AI_VENV" ]; then
  echo "  [Brain] Installing Python dependencies..."
  "$AI_VENV" -m pip install -q -r "$BRAIN_DIR/requirements.txt"
  PYTHON="$AI_VENV"
else
  echo "  [Brain] Using system Python..."
  pip install -q -r "$BRAIN_DIR/requirements.txt"
  PYTHON="python3"
fi

# Start Python Brain in background
echo "  [Brain] Starting GKOS Brain (12 agents)..."
OPENROUTER_API_KEY=aa43b2aca27846cb41ce381f73398ccf \
  "$PYTHON" "$BRAIN_DIR/main.py" > "$BRAIN_DIR/gkos_brain.log" 2>&1 &
BRAIN_PID=$!
echo "  [Brain] PID: $BRAIN_PID (logs: gkos_brain/gkos_brain.log)"

# Start Next.js in foreground
echo "  [UI]    Starting 3D Dashboard on http://localhost:3001..."
echo ""
cd "$GKOS_DIR"
PORT=3001 npm run dev

# Cleanup on exit
trap "echo '  [Stop] Killing brain PID $BRAIN_PID'; kill $BRAIN_PID 2>/dev/null" EXIT
