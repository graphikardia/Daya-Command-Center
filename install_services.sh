#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  GKOS — Install as System Services (Run Once)
#  Registers GKOS Brain + Dashboard to launch on every system boot
#  and restart automatically if they crash.
#
#  Usage: sudo bash /home/gokul/gkos/install_services.sh
# ══════════════════════════════════════════════════════════════════

set -e

GKOS_DIR="/home/gokul/gkos"
SYSTEMD_DIR="/etc/systemd/system"

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║  GKOS — Service Installer            ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

# Copy service files
echo "  → Installing gkos-brain.service..."
cp "$GKOS_DIR/gkos-brain.service" "$SYSTEMD_DIR/gkos-brain.service"

echo "  → Installing gkos-dashboard.service..."
cp "$GKOS_DIR/gkos-dashboard.service" "$SYSTEMD_DIR/gkos-dashboard.service"

# Reload systemd
echo "  → Reloading systemd daemon..."
systemctl daemon-reload

# Enable both services (auto-start at boot)
echo "  → Enabling services at boot..."
systemctl enable gkos-brain.service
systemctl enable gkos-dashboard.service

# Start them now
echo "  → Starting GKOS Brain..."
systemctl start gkos-brain.service

echo "  → Starting GKOS Dashboard..."
systemctl start gkos-dashboard.service

echo ""
echo "  ✅ Done! GKOS is now a system service."
echo ""
echo "  Useful commands:"
echo "    Status:   systemctl status gkos-brain"
echo "    Logs:     journalctl -u gkos-brain -f"
echo "    Stop:     systemctl stop gkos-brain"
echo "    Restart:  systemctl restart gkos-brain"
echo "    Disable:  systemctl disable gkos-brain"
echo ""
echo "  Dashboard: http://localhost:3001"
echo ""
