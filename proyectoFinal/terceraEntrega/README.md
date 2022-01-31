# Tercera Entrega

## 1. Perfomance Analysis - Artillery

### FORK mode

```
Summary report @ 16:02:06(-0500) 2022-01-31
  Scenarios launched:  50
  Scenarios completed: 50
  Requests completed:  1000
  Mean response/sec: 32.86
  Response time (msec):
    min: 116
    max: 5684
    median: 1238
    p95: 3693
    p99: 5010
  Scenario counts:
    0: 50 (100%)
  Codes:
    200: 1000
```

### Cluster mode

```
All virtual users finished
Summary report @ 16:04:45(-0500) 2022-01-31
  Scenarios launched:  50
  Scenarios completed: 50
  Requests completed:  1000
  Mean response/sec: 32.37
  Response time (msec):
    min: 117
    max: 5156
    median: 1266
    p95: 3616.5
    p99: 4723
  Scenario counts:
    0: 50 (100%)
  Codes:
    200: 1000
```

## 2. Env

### Development

```
PORT=
DEV=yes
STORAGE=
DB_CLIENT=
DB_DATABASE=
SESSION_SECRET=
ADMIN_MAIL=
ADMIN_PASS=
ADMIN_PHONE=
```

### Production

```
PORT=
STORAGE=
DB_CLIENT=
DB_HOST=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
SESSION_SECRET=
ADMIN_MAIL=
ADMIN_PASS=
ADMIN_PHONE=
```
