# mixiner.config

**Description:** Configure properties of library.

---
> ```javascript
> Object.assign(mixiner.config, {
>     // changes
> });
> ```
> 
> **properties**  
> Type: PlainObject  
> ##### A map of mixiner.config
> 
> | Property name | Description |
> | :--- | :--- |
> | define | Function. ( default: `( target, mixin, propertyName ) => { Object.defineProperty( target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName) ); }` ) Default property defining function |
> | resolve |  Function. (default: `({ target, mixin, options, type, propertyName }) => { mixiner.config.define(target, mixin, propertyName); } )` Function that will be called when target alredy have property with name as in mixin |
> | ignoreProtoProps | Array. (default: `['constructor', 'apply', 'bind', 'call', 'isGenerator', 'toSource', 'toString', '__proto__']`) Class proptotype properties names that will be ignored. |
> | ignoreStaticProps | Array. (default: `['arguments', 'arity', 'caller', 'length', 'name', 'displayName', 'prototype', '__proto__', '_mixinInstance_']`) Class static properties names that will be ignored. |
> | ignoreInstanceProps | Array. (default: `['__proto__']`) Class instance properties names that will be ignored. |
> 

#### Example

```javascript
Object.assign(mixiner.config, {
    resolve: () => throw new Error('Mixin properties name conflict')
});
```
