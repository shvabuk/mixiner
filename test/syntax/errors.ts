import { ClassExtend, ClassMix, ClassOptionsExtend, ClassOptionsMix } from './classes';

const extend = new ClassExtend();
const mix = new ClassMix();
const optionsMix = new ClassOptionsMix();
const optionsExtend = new ClassOptionsExtend();

const l = (...args: any[]) => false;

l(ClassExtend.none);
l(extend.none());
l(extend.none);

l(ClassMix.none);
l(mix.none());
l(mix.none);

l(ClassOptionsExtend.none);
l(optionsExtend.none());
l(optionsExtend.none);

l(ClassOptionsMix.none);
l(optionsMix.none());
l(optionsMix.none);
