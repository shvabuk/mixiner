# mixiner.mix\(\)

**Description:** Mixin method.

---
> ```javascript
> class MyClass extends mixiner.mix(mixin1[, mixin2[, ...[, mixinN]]]) {}
> ```
> 
> **mixinN**  
> Type: Class
> A mixin source class
> 
> ---
> 
> Return value  
> Type: **Class**  
> Class MixinsWrapper, wrapper that contain mixins properties
> 

#### Examples TypeScript

```javascript
// create mixin
class SpeackableMixin {
    protected sound: string;
    public speak(): string {
        return this.sound;
    }
}
// implement SpeackableMixin
class Duck extends mixiner.mix(SpeackableMixin) {
    protected sound = 'quack';
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack' without syntax error
```

#### Examples JavaScript

```javascript
// create mixin
class SpeackableMixin {
    speak() {
        return this.sound;
    }
}
// implement SpeackableMixin
class Duck extends mixiner.mix(SpeackableMixin) {
    constructor() {
        super();
        this.sound = 'quack';
    }
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack'
```
