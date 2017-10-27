"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var mixiner = require("../../dist/mixiner");
var Mixin1 = /** @class */ (function () {
    function Mixin1() {
        this.mixin1Prop = 'mixin1';
    }
    Mixin1.prototype.method = function () {
        return false;
    };
    Mixin1.prototype.method1 = function () {
        return 1;
    };
    Mixin1.prop = false;
    Mixin1.prop1 = 1;
    return Mixin1;
}());
var Mixin2 = /** @class */ (function () {
    function Mixin2() {
        this.mixin2Prop = 'mixin2';
    }
    Mixin2.prototype.method = function () {
        return true;
    };
    Mixin2.prototype.method2 = function () {
        return 2;
    };
    Mixin2.prop = true;
    Mixin2.prop2 = 2;
    return Mixin2;
}());
var Parent = /** @class */ (function () {
    function Parent() {
        this.parentProp = 'parent';
    }
    Parent.prototype.parMethod = function () {
        return true;
    };
    Parent.parProp = true;
    return Parent;
}());
var ClassExtend = /** @class */ (function (_super) {
    __extends(ClassExtend, _super);
    function ClassExtend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childProp = 'child';
        return _this;
    }
    return ClassExtend;
}(mixiner.extend(Parent, Mixin1, Mixin2)));
exports.ClassExtend = ClassExtend;
var ClassMix = /** @class */ (function (_super) {
    __extends(ClassMix, _super);
    function ClassMix() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childProp = 'child';
        return _this;
    }
    return ClassMix;
}(mixiner.mix(Mixin1, Mixin2)));
exports.ClassMix = ClassMix;
var ClassOptionsExtend = /** @class */ (function (_super) {
    __extends(ClassOptionsExtend, _super);
    function ClassOptionsExtend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childProp = 'child';
        return _this;
    }
    return ClassOptionsExtend;
}(mixiner.options({}).extend(Parent, Mixin1, Mixin2)));
exports.ClassOptionsExtend = ClassOptionsExtend;
var ClassOptionsMix = /** @class */ (function (_super) {
    __extends(ClassOptionsMix, _super);
    function ClassOptionsMix() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childProp = 'child';
        return _this;
    }
    return ClassOptionsMix;
}(mixiner.options({}).mix(Mixin1, Mixin2)));
exports.ClassOptionsMix = ClassOptionsMix;
