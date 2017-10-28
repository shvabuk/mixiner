# mixiner.options\(\)

**Description:** Mixin method that may change config options for current class.

---
> ```javascript
> const myOptions = { ignoreThisProps: ['blablabla'] };
> 
> class MyClassMix extends mixiner.options(myOptions)
>     .mix(mixin1[, mixin2[, ...[, mixinN]]]) {}
> 
> class MyClassExtend extends mixiner.options(myOptions)
>     .extend(ParentClass, mixin1[, mixin2[, ...[, mixinN]]]) {}
> ```
> 
> **myOptions**  
> Type: Object  
> configuration options for current class.  
> ##### A map of options to pass to the mixiner.options\(\) method.
> 
> | Property name | Description |
> | :--- | :--- |
> | define | Function. Optional. ( default: `( target, mixin, propertyName ) => { Object.defineProperty( target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName) ); }` ) Default property defining function |
> | resolve |  Function. Optional. (default: `({ target, mixin, options, type, propertyName }) => { mixiner.config.define(target, mixin, propertyName); } )` Function that will be called when target alredy have property with name as in mixin |
> | ignoreProtoProps | Array. Optional. (default: `['constructor', 'apply', 'bind', 'call', 'isGenerator', 'toSource', 'toString', '__proto__']`) Class proptotype properties names that will be ignored. |
> | ignoreStaticProps | Array. Optional. (default: `['arguments', 'arity', 'caller', 'length', 'name', 'displayName', 'prototype', '__proto__', '_mixinInstance_']`) Class static properties names that will be ignored. |
> | ignoreInstanceProps | Array. Optional. (default: `['__proto__']`) Class instance properties names that will be ignored. |
> 
> Return value  
> Type: **Object**  
> object with 2 methods 'mix' and 'extend'.  
> 

#### Examples TypeScript

```javascript
// create mixin
class SpeackableMixin {
    protected sound: string;
    public blablabla: boolean = true;
    public speak(): string {
        return this.sound;
    }
}
// implement SpeackableMixin
class Duck extends mixiner.options({
    ignoreInstanceProps: ['blablabla']
}).mix(SpeackableMixin) {
    protected sound = 'quack';
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack' without syntax error
donald.blablabla; // undefined
```

#### Examples JavaScript

```javascript
// create mixin
class SpeackableMixin {
    constructor() {
        this.blablabla = true;
    }
    speak() {
        return this.sound;
    }
}
// implement SpeackableMixin
class Duck extends mixiner.options({
    ignoreInstanceProps: ['blablabla']
}).mix(SpeackableMixin) {
    constructor() {
        super();
        this.sound = 'quack';
    }
}
// create instance
const donald = new Duck();
// test instance
donald.speak(); // 'quack'
donald.blablabla; // undefined
```
