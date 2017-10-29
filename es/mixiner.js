/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */

;"use strict";
const VERSION = '1.0.4';
// storage of mixins, defined in constructor._mixins_
export class Mixins {
    constructor() {
        this.collection = [];
        this.VERSION = VERSION;
    }
    add(mixin) {
        this.collection.push(mixin);
    }
    setParent(mixins) {
        this.parent = mixins;
    }
    has(mixin) {
        return (this.collection.indexOf(mixin) > -1 ||
            (typeof this.parent !== 'undefined' && this.parent.has(mixin)));
    }
}
// get object prototype
const getProto = Object.getPrototypeOf || (obj => obj.__proto__);
// get props names, used in mixin
function getOwnPropsKeys(target) {
    const keys = Object.getOwnPropertyNames(target);
    if (typeof Object.getOwnPropertySymbols !== 'undefined') {
        return [].concat(keys, Object.getOwnPropertySymbols(target));
    }
    return keys;
}
// define mixin (static, prototype or instance) properties
function defineProps(target, mixin, options, type) {
    const mixinNames = getOwnPropsKeys(mixin);
    const targetNames = getOwnPropsKeys(target);
    const ignore = type === 'proto'
        ? options.ignoreProtoProps
        : type === 'static' ? options.ignoreStaticProps : options.ignoreInstanceProps;
    let i = mixinNames.length;
    while (i--) {
        // ignore props from ignorelist
        if (ignore.indexOf(mixinNames[i]) > -1) {
            continue;
        }
        // check conflicts
        // custom resolve
        if (targetNames.indexOf(mixinNames[i]) > -1) {
            options.resolve({
                target,
                mixin,
                options,
                type,
                propertyName: mixinNames[i],
            });
        }
        else {
            // default define
            options.define(target, mixin, mixinNames[i]);
        }
    }
}
// wrapper according to https://github.com/airbnb/javascript#objects--prototype-builtins
const has = Object.prototype.hasOwnProperty;
// define static and prototype properties
function assignClasses(target, mixin, options) {
    // add mixins links
    if (!has.call(target, '_mixins_')) {
        const parentMixins = target._mixins_;
        Object.defineProperty(target, '_mixins_', {
            value: new Mixins(),
            configurable: true,
            writable: true,
        });
        if (typeof parentMixins !== 'undefined') {
            target._mixins_.setParent(parentMixins);
        }
    }
    // add mixined in mixin mixins
    if (typeof mixin._mixins_ === 'object' && Array.isArray(mixin._mixins_.collection)) {
        mixin._mixins_.collection.forEach((parentMixin) => assignClasses(target, parentMixin, options));
    }
    // copy prototype properties
    defineProps(target.prototype, mixin.prototype, options, 'proto');
    // copy constructor properties
    defineProps(target, mixin, options, 'static');
    target._mixins_.add(mixin);
}
// copy options properties, just primitive Object.assign polyfill for IE9
function assign(target, source) {
    const keys = Object.keys(source);
    let i = keys.length;
    while (i--) {
        target[keys[i]] = source[keys[i]];
    }
    return target;
}
// mixin function
// at this moment loop inside of constructor increse object creation speed
// during V8 engine optimization
function mixIn(options, mixins, parent) {
    const len = mixins.length;
    let i = -1;
    let target;
    if (typeof parent === 'undefined') {
        target = class MixinsWrapper {
            constructor() {
                mixins.forEach((mixin) => {
                    // copy instance properties
                    // mixins[i].apply(this) does not work in ES2015+ classes
                    if (typeof mixin._mixinInstance_ === 'undefined') {
                        mixin._mixinInstance_ = new mixin();
                    }
                    defineProps(this, mixin._mixinInstance_, options, 'instance');
                });
            }
        };
    }
    else {
        // ignore first mixin, it is parent class
        target = class MixinsWrapper extends parent {
            constructor(...args) {
                const out = super(...args);
                // copy instance properties
                // mixins[i].apply(this) does not work in ES2015+ classes
                mixins.forEach((mixin) => {
                    if (typeof mixin._mixinInstance_ === 'undefined') {
                        mixin._mixinInstance_ = new mixin();
                    }
                    defineProps(this, mixin._mixinInstance_, options, 'instance');
                });
                return out;
            }
        };
    }
    while (++i < len) {
        assignClasses(target, mixins[i], options);
    }
    return target;
}
// check mixin usage
export function mixedBy(instance, mixin) {
    const ctor = getProto(instance).constructor;
    if (typeof ctor._mixins_ === 'object' && typeof ctor._mixins_.has === 'function') {
        return ctor._mixins_.has(mixin);
    }
    return false;
}
// check mixin usage and instanceof
export function instanceOf(instance, mixin) {
    return mixedBy(instance, mixin) || instance instanceof mixin;
}
const define = (target, mixin, propertyName) => {
    Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName));
};
// main object
const mixiner = {
    VERSION,
    Mixins,
    options,
    mix,
    extend,
    mixedBy,
    instanceOf,
    config: {
        define,
        resolve: ({ target, mixin, /* options, type, */ propertyName }) => {
            define(target, mixin, propertyName);
        },
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
        ignoreInstanceProps: ['__proto__'],
    },
};
mixiner.default = mixiner; // set options for current mixining
export default mixiner;
export function options(options) {
    const opts = assign(assign({}, mixiner.config), options);
    return {
        mix: function mix(...args) {
            return mixIn(opts, args);
        },
        extend: function extend(parent, ...args) {
            return mixIn(opts, args, parent);
        },
    };
}
// extends parent with mixins implementation
export function extend(parent, ...args) {
    return mixIn(mixiner.config, args, parent);
}
// mixins implementation
export function mix(...args) {
    return mixIn(mixiner.config, args);
}
// internal method, used for resolving conflicts in global scope (browser window etc.)
mixiner.resolveConflict = (root) => {
    const oldParts = root.mixiner.VERSION.split('.').map(parseInt);
    const newParts = mixiner.VERSION.split('.').map(parseInt);
    let i = -1;
    while (++i < 3) {
        if (newParts[i] > oldParts[i]) {
            return mixiner;
        }
        else if (newParts[i] < oldParts[i]) {
            return root.mixiner;
        }
    }
    return root.mixiner;
};


