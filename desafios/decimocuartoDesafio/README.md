# Desafio Catorce

## 1. Compression Bytes Returned:

### Gzip compression

```
npm run nodemon FORK 8080
```

#### Without compression

```
765 B
```

#### With compression

```
788 B
```

## 2. Logs

`Check logs folder`

## 3. Perfomance Analysis - Artillery

### Prof nodejs

```
node --prof src/server.js FORK 8080
```

#### Without `console.log`

```
artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_without_consoleLog.txt

```

#### With `console.log`

```
artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_with_consoleLog.txt

```

### Prof-process nodejs

#### Without `console.log`

```
node --prof-process without-consoleLog-v8.log > result_prof_without_consoleLog.txt
```

```
 [Summary]:
   ticks  total  nonlib   name
      7    0.7%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      4    0.4%   57.1%  GC
   1067   99.3%          Shared libraries
```

#### With `console.log`

```
node --prof-process with-consoleLog-v8.log > result_prof_with_consoleLog.txt
```

```
 [Summary]:
   ticks  total  nonlib   name
      3    0.3%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      7    0.6%  233.3%  GC
   1076   99.7%          Shared libraries
```

## 3. Perfomance Analysis - Autocannon and 0x

```
npm start FORK 8080
```

### Without `console.log`

```
npm test
```

```
Running all benchmarks in parallel...
Running 20s test @ http://localhost:8080/info
100 connections

┌─────────┬───────┬───────┬───────┬───────┬─────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max    │
├─────────┼───────┼───────┼───────┼───────┼─────────┼─────────┼────────┤
│ Latency │ 13 ms │ 20 ms │ 39 ms │ 45 ms │ 21.7 ms │ 6.79 ms │ 115 ms │
└─────────┴───────┴───────┴───────┴───────┴─────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 2417    │ 2417    │ 4647    │ 4747    │ 4504.11 │ 513.22 │ 2416    │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 1.91 MB │ 1.91 MB │ 3.68 MB │ 3.76 MB │ 3.57 MB │ 407 kB │ 1.91 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

90k requests in 20.04s, 71.3 MB read
```

#### Flamegraph

![](/desafios/decimocuartoDesafio/graphs/graphs/without_consoleLog.png)

### With `console.log`

```
npm test
```

```
Running all benchmarks in parallel...
Running 20s test @ http://localhost:8080/info
100 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev  │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼────────┼────────┤
│ Latency │ 15 ms │ 23 ms │ 44 ms │ 50 ms │ 24.25 ms │ 7.5 ms │ 134 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg    │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼────────┼─────────┤
│ Req/Sec   │ 2159    │ 2159    │ 4139    │ 4319    │ 4039   │ 475.29 │ 2159    │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼────────┼─────────┤
│ Bytes/Sec │ 1.71 MB │ 1.71 MB │ 3.28 MB │ 3.42 MB │ 3.2 MB │ 376 kB │ 1.71 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

81k requests in 20.04s, 64 MB read
```

#### Flamegraph

![](/desafios/decimocuartoDesafio/graphs/graphs/with_consoleLog.png)

## 4. Conclusion

`Similar results`
