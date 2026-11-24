# Multi-Container App (Node.js + MySQL + Nginx)

## Run
    cp -n .env.example .env
    docker compose up -d --build
    curl http://localhost        # Nginx -> Node.js
    curl http://localhost/db     # Node.js -> MySQL (JSON)
    docker compose ps
    docker compose logs backend
    docker compose down -v       # cleanup

Or just run `./test.sh` to do everything and print all outputs.
