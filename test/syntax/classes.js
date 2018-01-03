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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    ClassExtend = __decorate([
        mixiner(Mixin2),
        mixiner(Mixin1)
    ], ClassExtend);
    return ClassExtend;
}(Parent));
exports.ClassExtend = ClassExtend;
var ClassMix = /** @class */ (function () {
    function ClassMix() {
        this.childProp = 'child';
    }
    ClassMix = __decorate([
        mixiner(Mixin2),
        mixiner(Mixin1)
    ], ClassMix);
    return ClassMix;
}());
exports.ClassMix = ClassMix;
