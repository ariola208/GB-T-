#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[setup]${NC} $1"; }
warn() { echo -e "${YELLOW}[setup]${NC} $1"; }
err() { echo -e "${RED}[setup]${NC} $1"; }

# 1. Vérifie MySQL
log "Vérification de MySQL..."
if ! systemctl is-active --quiet mysql; then
  warn "MySQL non lancé. Démarrage..."
  sudo systemctl start mysql
  sleep 3
fi
log "MySQL est actif ✅"

# 2. Charge les variables depuis server/.env
if [ ! -f server/.env ]; then
  err "server/.env introuvable. Crée-le d'abord."
  exit 1
fi
set -a; . server/.env; set +a

# 3. Vérifie que la base existe
DB_EXISTS=$(mysql -u "$DB_USER" -p"$DB_PASSWORD" -sN -e "SHOW DATABASES LIKE '$DB_NAME';" 2>/dev/null || true)

if [ -z "$DB_EXISTS" ]; then
  warn "Base '$DB_NAME' absente. Création..."
  mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  log "Base créée ✅"
fi

# 4. Vérifie que les tables existent
TABLES=$(mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -sN -e "SHOW TABLES;" 2>/dev/null | wc -l)

if [ "$TABLES" -lt 3 ]; then
  warn "Base vide. Import de database.sql..."
  mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < server/database.sql
  log "Schéma importé ✅"
fi

log "MySQL prêt. Lancement du backend et du frontend..."
