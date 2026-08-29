# API Endpoints

## Auth (`/api/auth`)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /api/auth/me`

## Chats (`/api/chats`)
- `GET /api/chats`
- `POST /api/chats`
- `GET /api/chats/:id/messages`
- `POST /api/chats/:id/messages`

## Folders (`/api/folders`)
- `GET /api/folders`
- `POST /api/folders`
- `GET /api/folders/:id/chats`
- `DELETE /api/folders/:id`

## Payment (`/api/payment`)
- `POST /api/payment/create-order`
- `POST /api/payment/verify`
