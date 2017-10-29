// copyInstanceProperties
function mix(parent, mixins, method) {
  if (method === 'while') {
    const len = mixins.length;
    let i = -1;
    return class Wrapper extends parent {
      constructor() {
        super();

        while (++i < len) {
          const mixin = mixins[i];
          const obj = new mixin();

          for (let prop in obj) {
            this[prop] = obj[prop];
          }
        }
      }
    };
  } else if (method === 'forEach') {
    return class Wrapper extends parent {
      constructor() {
        super();

        mixins.forEach(mixin => {
          const obj = new mixin();

          for (let prop in obj) {
            this[prop] = obj[prop];
          }
        }, this);
      }
    };
  }
}

class ParentClass {
  constructor() {
    this.parentProp = true;
  }
}

class MixinA {
  constructor() {
    this.a = 'a';
  }
}

class MixinB {
  constructor() {
    this.b = 'b';
  }
}

class Class1 extends mix(ParentClass, [MixinA, MixinB], 'while') {
  constructor() {
    super();
    this.class1Prop = 1;
  }
}

class Class2 extends mix(ParentClass, [MixinA, MixinB], 'forEach') {
  constructor() {
    super();
    this.class2Prop = 2;
  }
}

// Tested on:
// Chromium Version 62.0.3202.62 (Official Build) Built on Ubuntu, running on Ubuntu 17.10 (64-bit)
// Same Node.js v8.7.0
// Firefox 56.0 (64-bit)
// Edge virtual machine Win10 (x64) Edge 41.16299.15.0 EdgeHTML 16.16299

const object1_1 = new Class1();
const object1_2 = new Class1();

const object2_1 = new Class2();
const object2_2 = new Class2();

console.log(Object.keys(object1_1).length === Object.keys(object1_2).length); // false
console.log(Object.keys(object2_1).length === Object.keys(object2_2).length); // true
