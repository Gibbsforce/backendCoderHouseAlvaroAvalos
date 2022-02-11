# Desafio Diecisiete

## 1. Persistence by arguments

### Persistence Memory by default

```
npm start
```

### Persistence Memory

```
npm start memory
```

### Persistence FileSystem

```
npm start file
```

### Persistence Mongo

```
npm start mongodb
```

## 2. DTOs

`Get price converted to local currency`

```
http://localhost:8080/api/products/localprice/products
```

## 3. Env

### Development

```
PORT=
DEV=yes
DB_CLIENT=
DB_DATABASE=
SESSION_SECRET=
ADMIN_MAIL=
ADMIN_PASS=
ADMIN_PHONE=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

### Production

```
PORT=
DB_CLIENT=
DB_HOST=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
SESSION_SECRET=
ADMIN_MAIL=
ADMIN_PASS=
ADMIN_PHONE=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```
