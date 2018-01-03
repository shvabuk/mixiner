/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */
import * as interfaces from './interfaces';

const VERSION = '2.0.0';

function define(
  target: interfaces.IPrototypeableClass,
  mixin: interfaces.IPrototypeableClass,
  propertyName: interfaces.IPropertyKey
): void {
  Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName));
}

// get props names, used in mixin
function getOwnPropsKeys(target: interfaces.IPrototypeableClass): interfaces.IPropertyKey[] {
  const keys = Object.getOwnPropertyNames(target);
  if (typeof Object.getOwnPropertySymbols !== 'undefined') {
    return [].concat(keys, Object.getOwnPropertySymbols(target));
  }
  return keys;
}

const mixiner: interfaces.IMixiner = function mixiner(mixin: interfaces.IPrototypeableClass) {
  return <T>(baseCtor: any): T => {
    getOwnPropsKeys(mixin.prototype)
      .filter((name: interfaces.IPropertyKey) => name !== 'constructor')
      .forEach((name: interfaces.IPropertyKey) => {
        define(baseCtor.prototype, mixin.prototype, name);
      });
    return baseCtor;
  };
};

mixiner.VERSION = VERSION;
mixiner.default = mixiner;

export = mixiner;
