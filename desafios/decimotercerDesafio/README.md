# Desafio Trece

## 1. Clustering

### Fork (by default)

```
npm start
```

```
npm start FORK
```

### Cluster

```
npm start CLUSTER
```

### The next parameter is the port

```
npm start <FORK||CLUSTER> <PORT>
```

### Running with Nodemon

```
npm run nodemon <FORK||CLUSTER> <PORT>
```

### Verifying on powershell

```
tasklist /fi "imagename eq node.exe"
```

### Verifying on bash

```
ps
```

### Running with forever

```
npm run forever <FORK||CLUSTER> <PORT>
```

### Running with forever (watch mode)

```
npm run foreverWatching <FORK||CLUSTER> <PORT>
```

### Listing process with forever

```
forever list
```

### Running with pm2 (FORK mode)

```
npm run pm2
```

### Running with pm2 (CLUSTER mode)

```
npm run pm2 -- --name="clusterName" -i max
```

### Running with pm2 (watch mode: fork and cluster)

```
npm run pm2Watching
```

```
npm run pm2Watching -- --name="clusterName" -i max
```

### Listing process with pm2

```
pm2 list
```

## 2. NGINX

### Api randoms on 8081 PORT

```
npm start // or all above
```

### Others: 8080 PORT

```
npm run nginxOthers
```

### Running on different ports

```
npm start FORK 8082
```

```
npm start FORK 8083
```

```
npm start FORK 8084
```

```
npm start FORK 8085
```
