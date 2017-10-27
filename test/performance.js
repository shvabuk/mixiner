const Benchmark = require('benchmark');
const _ = require('lodash');
const Vue = require('vue');
const mixiner = require('../dist/mixiner');

function mix() {
  var arg,
    prop,
    child = arguments[0];
  for (arg = 1; arg < arguments.length; arg += 1) {
    Object.getOwnPropertyNames(arguments[arg]).forEach(prop => {
      child[prop] = arguments[arg][prop];
    });
  }
  return child;
}

function cloneProperties(target, ctor) {
  const obj = new ctor();
  Object.getOwnPropertyNames(obj).forEach(prop => {
    target[prop] = obj[prop];
  });
}

function define(target, source, prop) {
  Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
}

const ignore = [
  'constructor',
  'apply',
  'bind',
  'call',
  'isGenerator',
  'toSource',
  'toString',
  '__proto__',
];
const copyProps = (target, source) => {
  Object.getOwnPropertyNames(source).forEach(prop => {
    if (ignore.indexOf(prop) > -1) return;
    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
  });
};

const suite = new Benchmark.Suite();

suite
  .add('Class', () => {
    class MyHelloWorld {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }

      world() {
        return 'World';
      }

      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
  })
  .add('Inharitance', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World extends Hello {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld extends World {
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
  })
  .add('Stefanov mix', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld {
      constructor() {
        cloneProperties(this, Hello);
      }
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }

    mix(MyHelloWorld.prototype, Hello.prototype, World.prototype);
  })
  .add('Assign', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld {
      constructor() {
        cloneProperties(this, Hello);
      }
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
    MyHelloWorld.prototype.hello = Hello.prototype.hello;
    MyHelloWorld.prototype.world = World.prototype.world;
  })
  .add('Define', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld {
      constructor() {
        cloneProperties(this, Hello);
      }
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }

    define(MyHelloWorld.prototype, Hello.prototype, 'hello');
    define(MyHelloWorld.prototype, World.prototype, 'world');
  })
  .add('Wrapper', () => {
    const Hello = () =>
      class Hello {
        constructor() {
          this.helloProperty = true;
        }
        hello() {
          return 'Hello';
        }
      };

    const World = superclass =>
      class World extends superclass {
        world() {
          return 'World';
        }
      };

    class MyHelloWorld extends World(Hello()) {
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
  })
  .add('Aggregation', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld {
      constructor() {
        cloneProperties(this, Hello);
      }
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }

    copyProps(MyHelloWorld.prototype, Hello.prototype);
    copyProps(MyHelloWorld.prototype, World.prototype);
  })
  .add('Wrapped aggregation', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class Wrapper {
      constructor() {
        cloneProperties(this, Hello);
      }
    }

    copyProps(Wrapper.prototype, Hello.prototype);
    copyProps(Wrapper.prototype, World.prototype);

    class MyHelloWorld extends Wrapper {
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
  })
  .add('Lodash.mixin', () => {
    const HelloLodash = {
      hello: () => {
        return 'Hello';
      },
    };

    const WorldLodash = {
      world: () => {
        return 'World';
      },
    };

    class MyHelloWorld {
      constructor() {
        cloneProperties(this, Hello);
      }
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }

    _.mixin(MyHelloWorld.prototype, HelloLodash);
    _.mixin(MyHelloWorld.prototype, WorldLodash);
  })
  .add('Vue.extend with mixin', () => {
    const Hello = {
      created: function() {
        this.helloProperty = true;
      },
      methods: {
        hello: function() {
          return 'Hello';
        },
      },
    };
    const World = {
      methods: {
        world: function() {
          return 'World';
        },
      },
    };

    const MyHelloWorld = Vue.extend({
      mixins: [Hello, World],
      methods: {
        say: function() {
          if (this.helloProperty) {
            return `${this.hello()} ${this.world()}`;
          }
        },
      },
    });
  })
  .add('Mixiner.mix', () => {
    class Hello {
      constructor() {
        this.helloProperty = true;
      }

      hello() {
        return 'Hello';
      }
    }

    class World {
      world() {
        return 'World';
      }
    }

    class MyHelloWorld extends mixiner.mix(Hello, World) {
      say() {
        if (this.helloProperty) {
          return `${this.hello()} ${this.world()}`;
        }
      }
    }
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Fastest is ${suite.filter('fastest').map('name')}`);
  });

class Class {
  constructor() {
    this.helloProperty = true;
  }

  hello() {
    return 'Hello';
  }

  world() {
    return 'World';
  }

  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

class Hello {
  constructor() {
    this.helloProperty = true;
  }

  hello() {
    return 'Hello';
  }
}

class World {
  world() {
    return 'World';
  }
}

class WorldChild extends Hello {
  world() {
    return 'World';
  }
}

class Inharitance extends WorldChild {
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

class Stefanov {
  constructor() {
    cloneProperties(this, Hello);
  }
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

mix(Stefanov.prototype, Hello.prototype, World.prototype);

class Assign {
  constructor() {
    cloneProperties(this, Hello);
  }
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}
Assign.prototype.hello = Hello.prototype.hello;
Assign.prototype.world = World.prototype.world;

class Define {
  constructor() {
    cloneProperties(this, Hello);
  }
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

define(Define.prototype, Hello.prototype, 'hello');
define(Define.prototype, World.prototype, 'world');

const HelloLodash = {
  hello: () => {
    return 'Hello';
  },
};

const WorldLodash = {
  world: () => {
    return 'World';
  },
};

class Lodash {
  constructor() {
    cloneProperties(this, Hello);
  }
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

_.mixin(Lodash.prototype, HelloLodash);
_.mixin(Lodash.prototype, WorldLodash);

const HelloVue = {
  created: function() {
    this.helloProperty = true;
  },
  methods: {
    hello: function() {
      return 'Hello';
    },
  },
};
const WorldVue = {
  methods: {
    world: function() {
      return 'World';
    },
  },
};

const VueExtend = Vue.extend({
  mixins: [HelloVue, WorldVue],
  methods: {
    say: function() {
      if (this.helloProperty) {
        return `${this.hello()} ${this.world()}`;
      }
    },
  },
});

const HelloWrap = () =>
  class Hello {
    constructor() {
      this.helloProperty = true;
    }
    hello() {
      return 'Hello';
    }
  };

const WorldWrap = superclass =>
  class World extends superclass {
    world() {
      return 'World';
    }
  };

class Wrapper extends WorldWrap(HelloWrap()) {
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

class Aggregation {
  constructor() {
    cloneProperties(this, Hello);
  }
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

copyProps(Aggregation.prototype, Hello.prototype);
copyProps(Aggregation.prototype, World.prototype);

class WrapperAgr {
  constructor() {
    cloneProperties(this, Hello);
  }
}

copyProps(WrapperAgr.prototype, Hello.prototype);
copyProps(WrapperAgr.prototype, World.prototype);

class WrapperAgregation extends WrapperAgr {
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

class Mixiner extends mixiner.mix(Hello, World) {
  say() {
    if (this.helloProperty) {
      return `${this.hello()} ${this.world()}`;
    }
  }
}

const suiteObj = new Benchmark.Suite();

suiteObj
  .add('Class', () => {
    new Class();
  })
  .add('Inharitance', () => {
    new Inharitance();
  })
  .add('Stefanov mix', () => {
    new Stefanov();
  })
  .add('Assign', () => {
    new Assign();
  })
  .add('Define', () => {
    new Define();
  })
  .add('Wrapper', () => {
    new Wrapper();
  })
  .add('Aggregation', () => {
    new Aggregation();
  })
  .add('Wrapped aggregation', () => {
    new WrapperAgregation();
  })
  .add('Lodash.mixin', () => {
    new Lodash();
  })
  .add('Vue.extend with mixin', () => {
    new VueExtend();
  })
  .add('Mixiner.mix', () => {
    new Mixiner();
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Fastest is ${suite.filter('fastest').map('name')}`);
  });

const objClass = new Class();
const objInharitance = new Inharitance();
const objStefanov = new Stefanov();
const objAssign = new Assign();
const objDefine = new Define();
const objLodash = new Lodash();
const objVueExtend = new VueExtend();
const objWrapper = new Wrapper();
const objAggregation = new Aggregation();
const objWrapperAgregation = new WrapperAgregation();
const objMixiner = new Mixiner();

const suiteSay = new Benchmark.Suite();

suiteSay
  .add('Class', () => {
    objClass.say();
  })
  .add('Inharitance', () => {
    objInharitance.say();
  })
  .add('Stefanov mix', () => {
    objStefanov.say();
  })
  .add('Assign', () => {
    objAssign.say();
  })
  .add('Define', () => {
    objDefine.say();
  })
  .add('Wrapper', () => {
    objWrapper.say();
  })
  .add('Aggregation', () => {
    objAggregation.say();
  })
  .add('Wrapped aggregation', () => {
    objWrapperAgregation.say();
  })
  .add('Lodash.mixin', () => {
    objLodash.say();
  })
  .add('Vue.extend with mixin', () => {
    objVueExtend.say();
  })
  .add('Mixiner.mix', () => {
    objMixiner.say();
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Fastest is ${suite.filter('fastest').map('name')}`);
  });

// console.log(objClass.say());
// console.log(objInharitance.say());
// console.log(objStefanov.say());
// console.log(objAssign.say());
// console.log(objDefine.say());
// console.log(objLodash.say());
// console.log(objVueExtend.say());
// console.log(objWrapper.say());
// console.log(objAggregation.say());
// console.log(objWrapperAgregation.say());
// console.log(objMixiner.say());

console.log(`Class declaration`);
suite.run({ async: false });
console.log(`Object creation`);
suiteObj.run({ async: false });
console.log(`Object method 'say' usage`);
suiteSay.run({ async: false });
