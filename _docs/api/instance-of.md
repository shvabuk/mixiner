# mixiner.instanceOf\(\)

**Description:** Tests whether an object instance of class or mixined by mixin class.

---
> ```javascript
> mixiner.instanceOf(object, Class);
> ```
> **object**  
> Type: Object  
> The object (instance) to test.  
> 
> ---
> 
> **Class**  
> Type: Class  
> Class or mixin class.  
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
donald instanceof SpeackableMixin; // false
mixiner.instanceOf(donald, SpeackableMixin); // true
mixiner.instanceOf(donald, Duck); // true
```
