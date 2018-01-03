import { ClassExtend, ClassMix } from './classes';

const extend = new ClassExtend();
const mix = new ClassMix();

const l = (...args: any[]) => false;

l(ClassExtend.prop);
l(ClassExtend._mixins_);
l(ClassExtend.prop1);
l(ClassExtend.prop2);
l(extend.mixin1Prop);
l(extend.mixin2Prop);
l(ClassExtend.none);
l(extend.none());
l(extend.none);

l(ClassMix.prop);
l(ClassMix._mixins_);
l(ClassMix.prop1);
l(ClassMix.prop2);
l(mix.mixin1Prop);
l(mix.mixin2Prop);
l(ClassMix.none);
l(mix.none());
l(mix.none);

