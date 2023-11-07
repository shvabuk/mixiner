# <span class="logo">[MIXINER](https://shvabuk.github.io/mixiner) </span>

Mixiner is [fast](https://github.com/shvabuk/mixiner/blob/gh-pages/_docs/performance.md) and small javascript library, that implement mixins in TypeScript or JavaScript classes.

[![Join the chat at https://gitter.im/soft-support/mixiner](https://img.shields.io/gitter/room/soft-support/mixiner.svg?style=flat-square)](https://gitter.im/soft-support/mixiner)
[![npm version](https://img.shields.io/npm/v/mixiner.svg?style=flat-square)](https://www.npmjs.com/package/mixiner)
[![codecov](https://codecov.io/gh/shvabuk/mixiner/branch/master/graph/badge.svg)](https://codecov.io/gh/shvabuk/mixiner)
[![Build Status](https://travis-ci.org/shvabuk/mixiner.svg?branch=master)](https://travis-ci.org/shvabuk/mixiner)

## Deprecated

This package has been deprecated.

## Basic TypeScript usage
``` javascript
// create mixin
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

## Basic JS usage
``` javascript
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

## Download
* <i class="fa fa-download" aria-hidden="true"></i> [Main build](https://raw.githubusercontent.com/shvabuk/mixiner/master/dist/mixiner.js) ([~1kB gzipped](https://raw.githubusercontent.com/shvabuk/mixiner/master/dist/mixiner.min.js))
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

## Support
* <i class="fa fa-chrome" aria-hidden="true"></i> Chrome
* <i class="fa fa-firefox" aria-hidden="true"></i> Firefox
* <i class="fa fa-safari" aria-hidden="true"></i> Safari
* <i class="fa fa-edge" aria-hidden="true"></i> Edge
* <i class="fa fa-internet-explorer" aria-hidden="true"></i> IE 9-11

Tested in:
* <i class="fa fa-server" aria-hidden="true"></i> Node.js 8

## License

Mixiner is released under the [MIT license](https://raw.githubusercontent.com/shvabuk/mixiner/master/LICENSE.txt)
