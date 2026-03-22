# Wallet API (NestJS)

Minimal, in-memory Wallet API with a single static bearer token.

## Setup

1. Set the token in your environment (see `.env.example`).
2. Install deps and run:

```bash
npm install
npm run start:dev
```

The API listens on `http://localhost:3000`.

## Endpoints

- `POST /wallets` create a wallet
- `GET /wallets` list wallets
- `GET /wallets/:id` get a wallet
- `PUT /wallets/:id` update owner
- `DELETE /wallets/:id` delete a wallet
- `POST /wallets/:id/balance` update balance by delta

## cURL Examples

```bash
# Set the token for this shell
export API_TOKEN=change-me

# Create a wallet
curl -s -X POST http://localhost:3000/wallets \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"owner":"Alice","balance":100}'

# List wallets
curl -s http://localhost:3000/wallets \
  -H "Authorization: Bearer $API_TOKEN"

# Update owner
curl -s -X PUT http://localhost:3000/wallets/1 \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"owner":"Alice Cooper"}'

# Update balance by delta (+25)
curl -s -X POST http://localhost:3000/wallets/1/balance \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"delta":25}'

# Get one
curl -s http://localhost:3000/wallets/1 \
  -H "Authorization: Bearer $API_TOKEN"

# Delete
curl -s -X DELETE http://localhost:3000/wallets/1 \
  -H "Authorization: Bearer $API_TOKEN"
```
