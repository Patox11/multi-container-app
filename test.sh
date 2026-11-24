#!/usr/bin/env bash
# Runs the whole lab and prints the outputs to screenshot.
set -e
cp -n .env.example .env || true
docker compose up -d --build
echo "Waiting for services..."; sleep 25
echo "=== docker compose ps ==="; docker compose ps
echo "=== curl http://localhost ==="; curl -s http://localhost; echo
echo "=== curl http://localhost/db ==="; curl -s http://localhost/db; echo
echo "=== backend logs ==="; docker compose logs backend | tail -n 10
echo "=== SHOW DATABASES ==="
source .env
docker exec mysql mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e "SHOW DATABASES;" 2>/dev/null
