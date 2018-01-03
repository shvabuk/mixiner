# mixiner.mix\(\)

**Description:** Mixiner base method.

---
> ```javascript
> const MyClass = mixiner(mixin1)(class MyClass {})
> ```
> 
> **mixin1**  
> Type: Class
> A mixin source class
> 
> ---
> 
> Return value  
> Type: **Class**  
> Mixiner target class
> 

#### Examples TypeScript

```javascript
class SpeackableMixin {
    protected phrase: string;
    public speak(): string {
        return this.phrase;
    }
}
// implement SpeackableMixin
@mixiner(SpeackableMixin)
class Duck {
    protected phrase = 'quack';
    public speak: () => string;
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack'
```

#### Examples JavaScript

```javascript
// create mixin
class SpeackableMixin {
    speak() {
        return this.phrase;
    }
}
// implement SpeackableMixin
const Duck = mixiner(SpeackableMixin)(class Duck {
    constructor() {
        super();
        this.phrase = 'quack';
    }
});

// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack'
```
