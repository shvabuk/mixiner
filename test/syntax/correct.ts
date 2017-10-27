import { ClassExtend, ClassMix, ClassOptionsExtend, ClassOptionsMix } from './classes';

const extend = new ClassExtend();
const mix = new ClassMix();
const optionsMix = new ClassOptionsMix();
const optionsExtend = new ClassOptionsExtend();

const l = (...args: any[]) => false;

l(ClassExtend.parProp);
l(ClassExtend.prop);
l(ClassExtend._mixins_);
l(ClassExtend.prop1);
l(ClassExtend.prop2);
l(extend.parMethod());
l(extend.method());
l(extend.method1());
l(extend.method2());
l(extend.mixin1Prop);
l(extend.mixin2Prop);
l(extend.childProp);
l(extend.parentProp);

l(ClassMix.prop);
l(ClassMix._mixins_);
l(ClassMix.prop1);
l(ClassMix.prop2);
l(mix.method());
l(mix.method1());
l(mix.method2());
l(mix.mixin1Prop);
l(mix.mixin2Prop);
l(mix.childProp);

l(ClassOptionsExtend.parProp);
l(ClassOptionsExtend.prop);
l(ClassOptionsExtend._mixins_);
l(ClassOptionsExtend.prop1);
l(ClassOptionsExtend.prop2);
l(optionsExtend.parMethod());
l(optionsExtend.method());
l(optionsExtend.method1());
l(optionsExtend.method2());
l(optionsExtend.mixin1Prop);
l(optionsExtend.mixin2Prop);
l(optionsExtend.childProp);
l(optionsExtend.parentProp);

l(ClassOptionsMix.prop);
l(ClassOptionsMix._mixins_);
l(ClassOptionsMix.prop1);
l(ClassOptionsMix.prop2);
l(optionsMix.method());
l(optionsMix.method1());
l(optionsMix.method2());
l(optionsMix.mixin1Prop);
l(optionsMix.mixin2Prop);
l(optionsMix.childProp);
