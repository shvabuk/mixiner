/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */
export interface IMixClass extends Function {
    readonly prototype: object;
    _mixins_?: IMixins;
    _mixinInstance_?: any;
    new (...args: any[]): any;
}
export declare type IMixObject = object | IMixClass;
export interface IConflictProps {
    target: IMixObject;
    mixin: IMixObject;
    propertyName: IPropertyKey;
    options: IConfig;
    type: string;
}
export declare type IPropertyKey = string | symbol | number;
export interface IConfig {
    ignoreProtoProps: IPropertyKey[];
    ignoreStaticProps: IPropertyKey[];
    ignoreInstanceProps: IPropertyKey[];
    define(target: IMixObject, mixin: IMixObject, propertyName: IPropertyKey): void;
    resolve(properties: IConflictProps): void;
}
export interface IOptions {
    ignoreProtoProps?: IPropertyKey[];
    ignoreStaticProps?: IPropertyKey[];
    ignoreInstanceProps?: IPropertyKey[];
    define?: (target: IMixObject, mixin: IMixObject, propertyName: IPropertyKey) => void;
    resolve?: (properties: IConflictProps) => void;
}
export interface IOperations {
    mix: IMixResult;
    extend: IMixResult;
}
export interface IMixinsable {
    _mixins_: IMixins;
}
export interface IMixiner {
    Mixins: IMixClass;
    VERSION: string;
    config: IConfig;
    mix: IMixResult;
    extend: IMixResult;
    default?: IMixiner;
    mixiner?: IMixiner;
    resolveConflict?: any;
    options(options: IOptions): IOperations;
    instanceOf(instance: any, mixin: IMixClass): boolean;
    mixedBy(instance: any, mixin: IMixClass): boolean;
}
export interface IMixins {
    collection: IMixClass[];
    parent?: IMixins;
    VERSION: string;
    add(mixin: IMixClass): void;
    has(mixin: IMixClass): boolean;
    setParent(mixins: IMixins): void;
}
export interface ICallable {
    new (...arg: any[]): any;
}
export interface IPrototypeable {
    readonly prototype: any;
}
export interface IMixType1<M1> {
    new (...args: any[]): M1;
}
export interface IMixType2<M1, M2> {
    new (...args: any[]): M1 & M2;
}
export interface IMixType3<M1, M2, M3> {
    new (...args: any[]): M1 & M2 & M3;
}
export interface IMixType4<M1, M2, M3, M4> {
    new (...args: any[]): M1 & M2 & M3 & M4;
}
export interface IMixType5<M1, M2, M3, M4, M5> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5;
}
export interface IMixType6<M1, M2, M3, M4, M5, M6> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6;
}
export interface IMixType7<M1, M2, M3, M4, M5, M6, M7> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7;
}
export interface IMixType8<M1, M2, M3, M4, M5, M6, M7, M8> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8;
}
export interface IMixType9<M1, M2, M3, M4, M5, M6, M7, M8, M9> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9;
}
export interface IMixType10<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10;
}
export interface IMixType11<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11;
}
export interface IMixType12<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12;
}
export interface IMixType13<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13;
}
export interface IMixType14<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14;
}
export interface IMixType15<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15;
}
export interface IMixType16<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16;
}
export interface IMixType17<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17;
}
export interface IMixType18<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18;
}
export interface IMixType19<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18, M19> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18 & M19;
}
export interface IMixType20<M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18, M19, M20> {
    new (...args: any[]): M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18 & M19 & M20;
}
export interface IMixResult {
    <M1 extends IPrototypeable>(mix1: M1): IMixType1<M1['prototype']> & IMixinsable & M1;
    <M1 extends IPrototypeable, M2 extends IPrototypeable>(mix1: M1, mix2: M2): IMixType2<M1['prototype'], M2['prototype']> & IMixinsable & M1 & M2;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3): IMixType3<M1['prototype'], M2['prototype'], M3['prototype']> & IMixinsable & M1 & M2 & M3;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4): IMixType4<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype']> & IMixinsable & M1 & M2 & M3 & M4;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5): IMixType5<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6): IMixType6<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7): IMixType7<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8): IMixType8<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9): IMixType9<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10): IMixType10<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11): IMixType11<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12): IMixType12<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13): IMixType13<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14): IMixType14<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15): IMixType15<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable, M16 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15, mix16: M16): IMixType16<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype'], M16['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable, M16 extends IPrototypeable, M17 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15, mix16: M16, mix17: M17): IMixType17<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype'], M16['prototype'], M17['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable, M16 extends IPrototypeable, M17 extends IPrototypeable, M18 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15, mix16: M16, mix17: M17, mix18: M18): IMixType18<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype'], M16['prototype'], M17['prototype'], M18['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable, M16 extends IPrototypeable, M17 extends IPrototypeable, M18 extends IPrototypeable, M19 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15, mix16: M16, mix17: M17, mix18: M18, mix19: M19): IMixType19<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype'], M16['prototype'], M17['prototype'], M18['prototype'], M19['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18 & M19;
    <M1 extends IPrototypeable, M2 extends IPrototypeable, M3 extends IPrototypeable, M4 extends IPrototypeable, M5 extends IPrototypeable, M6 extends IPrototypeable, M7 extends IPrototypeable, M8 extends IPrototypeable, M9 extends IPrototypeable, M10 extends IPrototypeable, M11 extends IPrototypeable, M12 extends IPrototypeable, M13 extends IPrototypeable, M14 extends IPrototypeable, M15 extends IPrototypeable, M16 extends IPrototypeable, M17 extends IPrototypeable, M18 extends IPrototypeable, M19 extends IPrototypeable, M20 extends IPrototypeable>(mix1: M1, mix2: M2, mix3: M3, mix4: M4, mix5: M5, mix6: M6, mix7: M7, mix8: M8, mix9: M9, mix10: M10, mix11: M11, mix12: M12, mix13: M13, mix14: M14, mix15: M15, mix16: M16, mix17: M17, mix18: M18, mix19: M19, mix20: M20): IMixType20<M1['prototype'], M2['prototype'], M3['prototype'], M4['prototype'], M5['prototype'], M6['prototype'], M7['prototype'], M8['prototype'], M9['prototype'], M10['prototype'], M11['prototype'], M12['prototype'], M13['prototype'], M14['prototype'], M15['prototype'], M16['prototype'], M17['prototype'], M18['prototype'], M19['prototype'], M20['prototype']> & IMixinsable & M1 & M2 & M3 & M4 & M5 & M6 & M7 & M8 & M9 & M10 & M11 & M12 & M13 & M14 & M15 & M16 & M17 & M18 & M19 & M20;
}
