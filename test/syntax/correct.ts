import { ClassExtend, ClassMix } from './classes';

const extend = new ClassExtend();
const mix = new ClassMix();

const l = (...args: any[]) => false;

l(ClassExtend.parProp);

l(extend.parMethod());
l(extend.method());
l(extend.method1());
l(extend.method2());
l(extend.childProp);
l(extend.parentProp);

l(mix.method());
l(mix.method1());
l(mix.method2());
l(mix.childProp);
