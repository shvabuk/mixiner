"use strict";
exports.__esModule = true;
var classes_1 = require("./classes");
var extend = new classes_1.ClassExtend();
var mix = new classes_1.ClassMix();
var l = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return false;
};
l(classes_1.ClassExtend.prop);
l(classes_1.ClassExtend._mixins_);
l(classes_1.ClassExtend.prop1);
l(classes_1.ClassExtend.prop2);
l(extend.mixin1Prop);
l(extend.mixin2Prop);
l(classes_1.ClassExtend.none);
l(extend.none());
l(extend.none);
l(classes_1.ClassMix.prop);
l(classes_1.ClassMix._mixins_);
l(classes_1.ClassMix.prop1);
l(classes_1.ClassMix.prop2);
l(mix.mixin1Prop);
l(mix.mixin2Prop);
l(classes_1.ClassMix.none);
l(mix.none());
l(mix.none);
