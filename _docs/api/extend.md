# mixiner.extend\(\)

**Description:** Mixin method with extending parent class.

---
> ```javascript
> class MyClass extends mixiner.extend(ParentClass, mixin1[, mixin2[, ...[, mixinN]]]) {}
> ```
> 
> **ParentClass**  
> Type: Class
> A parent class
> 
> ---
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
// parent class
class Animal {
    public live: boolean = true;
}
// implement SpeackableMixin
class Duck extends mixiner.extend(Animal, SpeackableMixin) {
    protected sound = 'quack';
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack' without syntax error
donald.live; // true
```

#### Examples JavaScript

```javascript
// create mixin
class SpeackableMixin {
    speak() {
        return this.sound;
    }
}
// parent class
class Animal {
    constructor() {
        this.live = true;
    }
}
// implement SpeackableMixin
class Duck extends mixiner.extend(Animal, SpeackableMixin) {
    constructor() {
        super();
        this.sound = 'quack';
    }
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack'
donald.live; // true
```
