# mixiner.mixedBy\(\)

**Description:** Tests whether an object mixined by mixin class.

---
> ```javascript
> mixiner.mixedBy(object, Class);
> ```
> **object**  
> Type: Object  
> The object (instance) to test.  
> 
> ---
> 
> **Class**  
> Type: Class  
> Mixin class.  
> 
> ---
> 
> Return value  
> Type: **Boolean**  
> Test result  

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
mixiner.mixedBy(donald, SpeackableMixin); // true
mixiner.mixedBy(donald, Duck); // false
```
