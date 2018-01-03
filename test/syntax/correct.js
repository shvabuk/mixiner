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
l(classes_1.ClassExtend.parProp);
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
