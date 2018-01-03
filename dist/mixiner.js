/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    const VERSION = '2.0.0';
    function define(target, mixin, propertyName) {
        Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName));
    }
    // get props names, used in mixin
    function getOwnPropsKeys(target) {
        const keys = Object.getOwnPropertyNames(target);
        if (typeof Object.getOwnPropertySymbols !== 'undefined') {
            return [].concat(keys, Object.getOwnPropertySymbols(target));
        }
        return keys;
    }
    const mixiner = function mixiner(mixin) {
        return (baseCtor) => {
            getOwnPropsKeys(mixin.prototype)
                .filter((name) => name !== 'constructor')
                .forEach((name) => {
                define(baseCtor.prototype, mixin.prototype, name);
            });
            return baseCtor;
        };
    };
    mixiner.VERSION = VERSION;
    mixiner.default = mixiner;
    return mixiner;
});
