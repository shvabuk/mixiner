# Performance

It was created [performance test](https://raw.githubusercontent.com/shvabuk/mixiner/master/test/performance.js) for mixiner 2.0.0.

---
> OS: Ubuntu 16.04  
> Node.js: 8.9.4  
> Mixiner: 2.0.0  
> Vue.js: 2.4.4  
> Lodash: 4.17.4  
> Processor: AMD Phenom 9750 Quad-Core  
> Memory: 4 GiB RAM  


| Method | Class declaration | Object creation | Object method 'say' usage |
| :--- | :--- | :--- | :--- |
| Lodash.mixin | 68 779 ops/sec | 675 996 ops/sec | 374 812 626 ops/sec |
| Mixiner.mix | 21 767 ops/sec | 23 921 ops/sec | 4 653 675 ops/sec |
| Vue.extend with mixin | 27 771 ops/sec | 23 294 ops/sec | 377 812 761 ops/sec |
