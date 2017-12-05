# <span class="logo">[MIXINER](https://shvabuk.github.io/mixiner) </span>

Mixiner is [fast](https://github.com/shvabuk/mixiner/blob/gh-pages/_docs/performance.md) and small javascript library.
It makes possible to copy static and non static properties (and methods) from one class to other.

[![Join the chat at https://gitter.im/soft-support/mixiner](https://img.shields.io/gitter/room/soft-support/mixiner.svg?style=flat-square)](https://gitter.im/soft-support/mixiner)
[![npm version](https://img.shields.io/npm/v/mixiner.svg?style=flat-square)](https://www.npmjs.com/package/mixiner)
[![codecov](https://codecov.io/gh/shvabuk/mixiner/branch/master/graph/badge.svg)](https://codecov.io/gh/shvabuk/mixiner)
[![Build Status](https://travis-ci.org/shvabuk/mixiner.svg?branch=master)](https://travis-ci.org/shvabuk/mixiner)

## Basic TypeScript usage
``` javascript
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

## Basic JS usage
``` javascript
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

## Download
* <i class="fa fa-download" aria-hidden="true"></i> [Main build](https://raw.githubusercontent.com/shvabuk/mixiner/master/dist/mixiner.js) ([~1.3kB gzipped](https://raw.githubusercontent.com/shvabuk/mixiner/master/dist/mixiner.min.js))
* <i class="fa fa-download" aria-hidden="true"></i> [ES2015 modules build](https://raw.githubusercontent.com/shvabuk/mixiner/master/es/mixiner.js) ([~1.2kB gzipped](https://raw.githubusercontent.com/shvabuk/mixiner/master/es/mixiner.min.js))
* <i class="fa fa-cloud-download" aria-hidden="true"></i> [CDN jsdelivr](https://cdn.jsdelivr.net/npm/mixiner)
* <i class="fa fa-cloud-download" aria-hidden="true"></i> [CDN unpkg](https://unpkg.com/mixiner/dist/mixiner.js)

## Installation

Using npm:
``` shell
$ npm install --save mixiner
```

TypeScript:
``` javascript
import mixiner from 'mixiner';
```

Node.js / CommonJS:
``` javascript
const mixiner = require('mixiner');
```

ES2015 / TypeScript:
``` javascript
import mixiner from 'mixiner/es/mixiner';
```

## Comparison

| Method | Copy instance properties | Copy prototype properties | Copy static properties |
| :--- | :--- | :--- | :--- |
| Mixiner.mix | + | + | + |
| Vue.extend with mixin | + | + | - |
| Lodash.mixin | -* | + | - |

\* Without creating instance of mixins

## Configuration
``` javascript
// default configuration
interf.
  config: {
    define: (target, mixin, propertyName) => {
      Object.defineProperty(
        target,
        propertyName,
        Object.getOwnPropertyDescriptor(mixin, propertyName)
      );
    },
    resolve: ({ target, mixin, options, type, propertyName }) => {
      mixiner.config.define(target, mixin, propertyName);
    }
    ignoreProtoProps: [
      'constructor',
      'apply',
      'bind',
      'call',
      'isGenerator',
      'toSource',
      'toString',
      '__proto__',
    ],
    ignoreStaticProps: [
      'arguments',
      'arity',
      'caller',
      'length',
      'name',
      'displayName',
      'prototype',
      '__proto__',
      '_mixinInstance_',
    ],
    ignoreThisProps: ['__proto__'],
  };
```

## Support
Tested in:
* <i class="fa fa-chrome" aria-hidden="true"></i> Chrome 62 - 63
* <i class="fa fa-firefox" aria-hidden="true"></i> Firefox 56
* <i class="fa fa-internet-explorer" aria-hidden="true"></i> IE 11 (with babel transform)
* <i class="fa fa-safari" aria-hidden="true"></i> Safari 5.1.7 (with babel transform)
* <i class="fa fa-server" aria-hidden="true"></i> Node.js 8
* <i class="fa fa-server" aria-hidden="true"></i> PhantomJS 2.1.14 (with babel transform)

## License

Mixiner is released under the [MIT license](https://raw.githubusercontent.com/shvabuk/mixiner/master/LICENSE.txt)
