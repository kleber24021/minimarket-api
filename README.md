# minimarket-api

Simple Dockerized mock API for development and testing.

## What you get

- `json-server` API with seeded data from:
  - `data/products.json`
  - `data/promotions.json`
- Swagger UI + OpenAPI 3.0 docs
- Runtime writes (`POST/PUT/PATCH/DELETE`) that reset when container restarts

## Requirements

- Docker Desktop (or Docker Engine + Compose)

## Start

```bash
docker compose up
```

API base URL: `http://localhost:3000`  
Swagger UI: `http://localhost:8080`

## Stop

```bash
docker compose down
```

## Endpoints

Core documented endpoints:

- `GET /products`
- `GET /products/:id`
- `GET /promotions`
- `GET /promotions/:id`

`json-server` also supports query params such as `_page`, `_limit`, `_sort`, `_order`, and runtime write routes.

## Quick checks

```bash
curl http://localhost:3000/products
curl http://localhost:3000/promotions
curl http://localhost:3000/products/p1
```

Example runtime write (ephemeral):

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"p999\",\"name\":\"Test\",\"category\":\"Test\",\"priceCents\":100,\"stock\":1,\"imageUrl\":\"https://example.com/test.jpg\"}"
```

Restart containers and `p999` will be gone.

## Optional port overrides

```bash
API_PORT=3001 SWAGGER_PORT=8081 docker compose up
```
