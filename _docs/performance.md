# Performance

It was created [performance test](https://raw.githubusercontent.com/shvabuk/mixiner/master/test/performance.js) for mixiner 1.0.0.

---
> OS: Ubuntu 17.10  
> Node.js: 8.7.0  
> Mixiner: 1.0.0  
> Vue.js: 2.4.4  
> Lodash: 4.17.4  
> Processor: AMD Phenom 9750 Quad-Core  
> Memory: 4 GiB RAM  


| Method | Class declaration | Object creation | Object method 'say' usage |
| :--- | :--- | :--- | :--- |
| Lodash.mixin | 66 779 ops/sec | 1 423 996 ops/sec | ~ 57 812 626 ops/sec |
| Mixiner.mix | 14 767 ops/sec | 198 069 ops/sec | ~ 46 653 675 ops/sec |
| Vue.extend with mixin | 23 771 ops/sec | 21 435 ops/sec | 3 812 761 ops/sec |
