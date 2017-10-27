class C1 {
  constructor() {
    this.C1 = 1;
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

function mix(parent, mixins) {
  const len = mixins.length;
  console.log(len);
  let i = -1;
  return class Wrapper extends parent {
    constructor() {
      super();

      mixins.forEach((mixin) => {
        const obj = new mixin();

        for (let prop in obj) {
          // console.log(prop);
          this[prop] = obj[prop];
        }
      }, this);

/*      while (++i < len) {
        const mixin = mixins[i];
        const obj = new mixin();

        for (let prop in obj) {
          // console.log(prop);
          this[prop] = obj[prop];
        }
      }*/
    }
  };
}

class C2 extends mix(C1, [MixinA]) {
  constructor() {
    super();
    this.C2 = 2;
  }
}

class C3 extends mix(C2, [MixinB]) {
  constructor() {
    super();
    this.C3 = 3;
  }
}

new C3();

const o = new C3();

console.log(o);
