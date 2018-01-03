/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */
export interface IPrototypeableClass extends Function {
    readonly prototype: any;
    new (...args: any[]): any;
}
export declare type IPropertyKey = string | symbol | number;
export interface IMixiner {
    readonly prototype: any;
    (mixin: IPrototypeableClass): any;
    VERSION?: string;
    default?: IMixiner;
}
