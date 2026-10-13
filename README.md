# coffee-api

Backend REST API untuk aplikasi coffee shop. Dibangun dengan Express 5 (Node.js 20.6+).

## Menjalankan

```bash
npm install
cp .env.example .env   # sudah disediakan, sesuaikan jika perlu
npm run dev
```

| Script                 | Fungsi                                  |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Server dengan auto-reload               |
| `npm start`            | Server production (env dari sistem)     |
| `npm test`             | Unit + integration test (`node --test`) |
| `npm run lint`         | ESLint                                  |
| `npm run format`       | Prettier (tulis)                        |
| `npm run format:check` | Prettier (cek saja, dipakai CI)         |

## Struktur Folder

```
coffee-api/
├── src/
│   ├── config/            # env tervalidasi (zod) & logger (pino)
│   ├── middlewares/       # request-id, http-logger, rate-limit, validate, 404, error handler
│   ├── modules/           # satu folder per fitur/domain
│   │   ├── health/
│   │   └── stats/
│   │       ├── stats.routes.js       # definisi URL
│   │       ├── stats.controller.js   # lapisan HTTP (req/res)
│   │       ├── stats.service.js      # logika bisnis
│   │       ├── stats.repository.js   # akses data (mock sekarang, DB nanti)
│   │       ├── stats.schema.js       # validasi input (zod)
│   │       └── stats.data.js         # data mock
│   ├── routes/            # v1.js mendaftarkan semua modul, index.js memasang /v1
│   ├── utils/             # AppError, format response
│   ├── app.js             # rakit Express (tanpa listen, mudah dites)
│   └── server.js          # listen + graceful shutdown
├── tests/
│   ├── helpers/
│   ├── unit/
│   └── integration/
├── Dockerfile             # stage: prod-deps, dev-deps, test, production
├── docker-compose.yml
├── Jenkinsfile
└── eslint.config.js, .prettierrc, .editorconfig, .nvmrc
```

Alur satu request: `route → validate → controller → service → repository`.
Controller tidak berisi logika bisnis, service tidak tahu soal HTTP, repository satu-satunya
yang menyentuh data.

## Endpoint

| Method | URL                           | Keterangan       |
| ------ | ----------------------------- | ---------------- |
| GET    | `/health`                     | Cek server hidup |
| GET    | `/api/v1/stats/summaries`     | Daftar statistik |
| GET    | `/api/v1/stats/summaries/:id` | Satu statistik   |

## Format Respons

Sukses:

```json
{ "data": [], "meta": { "total": 4 } }
```

Error (selalu seragam):

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validasi gagal",
    "details": [{ "location": "params", "path": "id", "message": "Format id tidak valid" }],
    "requestId": "b1f0c2e4-..."
  }
}
```

Setiap respons membawa header `x-request-id` untuk menelusuri log.

## Menambah Modul Baru

1. Buat folder `src/modules/<nama>/` berisi `routes`, `controller`, `service`, `repository`, `schema`.
2. Daftarkan di `src/routes/v1.js`: `router.use('/<nama>', namaRoutes)`.
3. Tambah test di `tests/`.
4. Lempar `AppError` dari service untuk error yang diharapkan.

## Environment

| Variabel         | Default                 | Keterangan                            |
| ---------------- | ----------------------- | ------------------------------------- |
| `NODE_ENV`       | `development`           | `development`, `test`, `production`   |
| `PORT`           | `4000`                  | Port server                           |
| `CORS_ORIGINS`   | `http://localhost:3000` | Origin frontend, pisahkan dengan koma |
| `LOG_LEVEL`      | `info`                  | `fatal` sampai `trace`, atau `silent` |
| `RATE_LIMIT_MAX` | `100`                   | Maks request per IP per 15 menit      |
| `TRUST_PROXY`    | `0`                     | Jumlah proxy di depan API (nginx/LB)  |

Aplikasi berhenti dengan pesan jelas saat environment tidak valid. Jangan commit `.env`.

## Docker

```bash
docker compose up -d --build
docker build --target test -t coffee-api-test .   # lint + format + test
```

Image production berjalan sebagai user non-root dan punya healthcheck ke `/health`.
