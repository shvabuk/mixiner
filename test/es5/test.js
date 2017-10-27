"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
function isIE() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1], 10) : false;
}
exports.tests = function (mixiner, assert) {
    describe('Mixiner functionality', function () {
        describe('mixiner.resolveConflict', function () {
            var mixiner0 = _extends({}, mixiner);
            mixiner0.VERSION = '0.0.0';
            var root0 = {};
            root0.mixiner = mixiner0;
            var mixinerNext = _extends({}, mixiner);
            mixinerNext.VERSION = '9999.9999.9999';
            var rootNext = {};
            rootNext.mixiner = mixinerNext;
            var root = {};
            root.mixiner = mixiner;
            it('return correct object', function () {
                assert.notStrictEqual(mixiner0, mixiner.resolveConflict(root0));
                assert.strictEqual(mixiner, mixiner.resolveConflict(root0));
                assert.strictEqual(mixinerNext, mixiner.resolveConflict(rootNext));
                assert.strictEqual(mixiner, mixiner.resolveConflict(root));
            });
        });
        // interface IMixin2 {
        //   method(): boolean;
        //   method2(): number;
        // }

        var Mixin1 = function () {
            function Mixin1() {
                _classCallCheck(this, Mixin1);

                this.mixin1Prop = 'mixin1';
            }

            _createClass(Mixin1, [{
                key: "method",
                value: function method() {
                    return false;
                }
            }, {
                key: "method1",
                value: function method1() {
                    return 1;
                }
            }]);

            return Mixin1;
        }();

        Mixin1.prop = false;
        Mixin1.prop1 = 1;

        var Mixin2 = function () {
            function Mixin2() {
                _classCallCheck(this, Mixin2);

                this.mixin2Prop = 'mixin2';
            }

            _createClass(Mixin2, [{
                key: "method",
                value: function method() {
                    return true;
                }
            }, {
                key: "method2",
                value: function method2() {
                    return 2;
                }
            }]);

            return Mixin2;
        }();

        Mixin2.prop = true;
        Mixin2.prop2 = 2;

        var Mixin3 = function () {
            function Mixin3() {
                _classCallCheck(this, Mixin3);

                this.mixin3Prop = 'mixin3';
            }

            _createClass(Mixin3, [{
                key: "method3",
                value: function method3() {
                    return 3;
                }
            }]);

            return Mixin3;
        }();

        Mixin3.prop3 = 3;

        var Parent = function () {
            function Parent() {
                _classCallCheck(this, Parent);

                this.parentProp = 'parent';
            }

            _createClass(Parent, [{
                key: "parMethod",
                value: function parMethod() {
                    return true;
                }
            }]);

            return Parent;
        }();

        Parent.parProp = true;
        var bill = { name: 'Bill' };

        var Bill = function Bill() {
            _classCallCheck(this, Bill);

            return bill;
        };

        var Empty = function Empty() {
            _classCallCheck(this, Empty);
        };

        var emptyObj = new Empty();
        describe('mixiner.extend', function () {
            var MyClass = function (_mixiner$extend) {
                _inherits(MyClass, _mixiner$extend);

                function MyClass() {
                    _classCallCheck(this, MyClass);

                    var _this = _possibleConstructorReturn(this, (MyClass.__proto__ || Object.getPrototypeOf(MyClass)).apply(this, arguments));

                    _this.childProp = 'child';
                    return _this;
                }

                return MyClass;
            }(mixiner.extend(Parent, Mixin1, Mixin2));

            var obj = new MyClass();
            it('main test', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, MyClass.parProp);
                    assert.strictEqual(undefined, MyClass.prop);
                    assert.strictEqual(undefined, MyClass.prop1);
                    assert.strictEqual(undefined, MyClass.prop2);
                    assert.strictEqual('undefined', _typeof(MyClass._mixins_));
                } else {
                    assert.strictEqual(true, MyClass.parProp);
                    assert.strictEqual(true, MyClass.prop);
                    assert.strictEqual(1, MyClass.prop1);
                    assert.strictEqual(2, MyClass.prop2);
                    assert.strictEqual('object', _typeof(MyClass._mixins_));
                    assert.strictEqual(2, MyClass._mixins_.collection.length);
                    assert.strictEqual(Mixin1, MyClass._mixins_.collection[0]);
                    assert.strictEqual(Mixin2, MyClass._mixins_.collection[1]);
                }
                assert.strictEqual(true, obj.parMethod());
                assert.strictEqual(true, obj.method());
                assert.strictEqual(1, obj.method1());
                assert.strictEqual(2, obj.method2());
                assert.strictEqual('mixin1', obj.mixin1Prop);
                assert.strictEqual('mixin2', obj.mixin2Prop);
                assert.strictEqual('child', obj.childProp);
                assert.strictEqual('parent', obj.parentProp);
            });
            it('instanceof', function () {
                assert.strictEqual(true, obj instanceof MyClass);
                assert.strictEqual(true, obj instanceof Parent);
                assert.strictEqual(true, obj instanceof Object);
                assert.strictEqual(false, obj instanceof Mixin1);
                assert.strictEqual(false, obj instanceof Mixin2);
                if (!isIE() || isIE() > 10) {
                    assert.strictEqual(true, mixiner.instanceOf(obj, MyClass));
                    assert.strictEqual(true, mixiner.instanceOf(obj, Parent));
                    assert.strictEqual(true, mixiner.instanceOf(obj, Object));
                    assert.strictEqual(true, mixiner.instanceOf(obj, Mixin1));
                    assert.strictEqual(true, mixiner.instanceOf(obj, Mixin2));
                }
            });
            it('mixedBy', function () {
                assert.strictEqual(false, mixiner.mixedBy(emptyObj, Empty));
                assert.strictEqual(false, mixiner.mixedBy(obj, MyClass));
                assert.strictEqual(false, mixiner.mixedBy(obj, Parent));
                assert.strictEqual(false, mixiner.mixedBy(obj, Object));
                if (!isIE() || isIE() > 10) {
                    assert.strictEqual(true, mixiner.mixedBy(obj, Mixin1));
                    assert.strictEqual(true, mixiner.mixedBy(obj, Mixin2));
                }
            });
            // type error just becouse wrong return value of Bill
            // uncomment to check
            // class Jack extends Bill {
            //   public constructor() {
            //     return super();
            //   }
            // }

            var Bob = function (_mixiner$extend2) {
                _inherits(Bob, _mixiner$extend2);

                function Bob() {
                    var _this2, _ret;

                    _classCallCheck(this, Bob);

                    return _ret = (_this2 = _possibleConstructorReturn(this, (Bob.__proto__ || Object.getPrototypeOf(Bob)).call(this)), _this2), _possibleConstructorReturn(_this2, _ret);
                }

                return Bob;
            }(mixiner.extend(Bill, Mixin1, Mixin2));

            var bobObj = new Bob();
            it('custom superClass return', function () {
                assert.strictEqual(bill, bobObj);
                assert.strictEqual(false, bobObj instanceof Bill);
                assert.strictEqual(false, bobObj instanceof Bob);
            });

            var MyNull = function (_mixiner$extend3) {
                _inherits(MyNull, _mixiner$extend3);

                function MyNull() {
                    _classCallCheck(this, MyNull);

                    return _possibleConstructorReturn(this, (MyNull.__proto__ || Object.getPrototypeOf(MyNull)).apply(this, arguments));
                }

                return MyNull;
            }(mixiner.extend(null, Mixin3));

            it('extends null', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, MyNull.prop3);
                    assert.strictEqual(undefined, MyNull._mixins_);
                } else {
                    assert.strictEqual(3, MyNull.prop3);
                    assert.strictEqual(Mixin3, MyNull._mixins_.collection[0]);
                }
                if (!MyNull.apply) {
                    assert.throws(function () {
                        new MyNull();
                    });
                }
            });

            var MyArray = function (_mixiner$extend4) {
                _inherits(MyArray, _mixiner$extend4);

                function MyArray() {
                    _classCallCheck(this, MyArray);

                    return _possibleConstructorReturn(this, (MyArray.__proto__ || Object.getPrototypeOf(MyArray)).apply(this, arguments));
                }

                return MyArray;
            }(mixiner.extend(Array, Mixin1, Mixin2));

            var myArrayObj = new MyArray(3);
            it('extends Array', function () {
                assert.strictEqual(3, myArrayObj.length);
                assert.strictEqual('function', _typeof(myArrayObj.forEach));
                assert.strictEqual(true, Array.isArray(myArrayObj));
                // native classes does not implements correct after post-processing
                // it is common problem with buble and babel processors
                // may be fixed with https://github.com/WebReflection/babel-plugin-transform-builtin-classes
                // but dont support IE <= 10
                // assert.strictEqual(true, myArrayObj instanceof MyArray);
                assert.strictEqual(true, myArrayObj instanceof Array);
            });

            var SubClass = function (_mixiner$extend5) {
                _inherits(SubClass, _mixiner$extend5);

                function SubClass() {
                    _classCallCheck(this, SubClass);

                    return _possibleConstructorReturn(this, (SubClass.__proto__ || Object.getPrototypeOf(SubClass)).call(this));
                }

                return SubClass;
            }(mixiner.extend(MyClass, Mixin3));

            var subClassObj = new SubClass();
            it('deep inharitance middle class props', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, SubClass.parProp);
                    assert.strictEqual(undefined, SubClass.prop);
                    assert.strictEqual(undefined, SubClass.prop1);
                    assert.strictEqual(undefined, SubClass.prop2);
                    assert.strictEqual('undefined', _typeof(SubClass._mixins_));
                } else {
                    assert.strictEqual(true, SubClass.parProp);
                    assert.strictEqual(true, SubClass.prop);
                    assert.strictEqual(1, SubClass.prop1);
                    assert.strictEqual(2, SubClass.prop2);
                    assert.strictEqual('object', _typeof(SubClass._mixins_));
                    assert.strictEqual(2, SubClass._mixins_.parent.collection.length);
                    assert.strictEqual(Mixin1, SubClass._mixins_.parent.collection[0]);
                    assert.strictEqual(Mixin2, SubClass._mixins_.parent.collection[1]);
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, MyClass));
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, Parent));
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, Object));
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, Mixin1));
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, Mixin2));
                    assert.strictEqual(true, mixiner.mixedBy(subClassObj, Mixin1));
                    assert.strictEqual(true, mixiner.mixedBy(subClassObj, Mixin2));
                }
                assert.strictEqual(true, subClassObj.parMethod());
                assert.strictEqual(true, subClassObj.method());
                assert.strictEqual(1, subClassObj.method1());
                assert.strictEqual(2, subClassObj.method2());
                assert.strictEqual('mixin1', subClassObj.mixin1Prop);
                assert.strictEqual('mixin2', subClassObj.mixin2Prop);
                assert.strictEqual('child', subClassObj.childProp);
                assert.strictEqual('parent', subClassObj.parentProp);
                assert.strictEqual(true, subClassObj instanceof MyClass);
                assert.strictEqual(true, subClassObj instanceof Parent);
                assert.strictEqual(true, subClassObj instanceof Object);
                assert.strictEqual(false, subClassObj instanceof Mixin1);
                assert.strictEqual(false, subClassObj instanceof Mixin2);
            });
            it('deep inharitance sub class props', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, SubClass.prop3);
                    assert.strictEqual(undefined, SubClass._mixins_);
                } else {
                    assert.strictEqual(3, SubClass.prop3);
                    assert.strictEqual(Mixin3, SubClass._mixins_.collection[0]);
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, SubClass));
                    assert.strictEqual(true, mixiner.instanceOf(subClassObj, Mixin3));
                    assert.strictEqual(true, mixiner.mixedBy(subClassObj, Mixin3));
                }
                assert.strictEqual(3, subClassObj.method3());
                assert.strictEqual('mixin3', subClassObj.mixin3Prop);
                assert.strictEqual(true, subClassObj instanceof SubClass);
                assert.strictEqual(false, subClassObj instanceof Mixin3);
            });
        });
        describe('mixiner.mix', function () {
            var Mixin4 = function Mixin4() {
                _classCallCheck(this, Mixin4);
            };

            var Mixin3_1 = function (_mixiner$mix) {
                _inherits(Mixin3_1, _mixiner$mix);

                function Mixin3_1() {
                    _classCallCheck(this, Mixin3_1);

                    return _possibleConstructorReturn(this, (Mixin3_1.__proto__ || Object.getPrototypeOf(Mixin3_1)).apply(this, arguments));
                }

                return Mixin3_1;
            }(mixiner.mix(Mixin3, Mixin4));

            var SubMixined = function (_mixiner$extend6) {
                _inherits(SubMixined, _mixiner$extend6);

                function SubMixined() {
                    _classCallCheck(this, SubMixined);

                    return _possibleConstructorReturn(this, (SubMixined.__proto__ || Object.getPrototypeOf(SubMixined)).apply(this, arguments));
                }

                return SubMixined;
            }(mixiner.extend(Parent, Mixin3_1));

            var subMixined = new SubMixined();
            it('sub mixined mixin', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, SubMixined.parProp);
                    assert.strictEqual(undefined, SubMixined.prop3);
                    assert.strictEqual('undefined', _typeof(SubMixined._mixins_));
                    assert.strictEqual(undefined, subMixined.method3);
                } else {
                    assert.strictEqual(true, SubMixined.parProp);
                    assert.strictEqual(3, SubMixined.prop3);
                    assert.strictEqual('object', _typeof(SubMixined._mixins_));
                    assert.strictEqual(3, SubMixined._mixins_.collection.length);
                    assert.strictEqual(Mixin3, SubMixined._mixins_.collection[0]);
                    assert.strictEqual(Mixin4, SubMixined._mixins_.collection[1]);
                    assert.strictEqual(Mixin3_1, SubMixined._mixins_.collection[2]);
                    assert.strictEqual(3, subMixined.method3());
                    assert.strictEqual(true, mixiner.instanceOf(subMixined, SubMixined));
                    assert.strictEqual(true, mixiner.instanceOf(subMixined, Parent));
                    assert.strictEqual(true, mixiner.instanceOf(subMixined, Object));
                    assert.strictEqual(true, mixiner.instanceOf(subMixined, Mixin3));
                    assert.strictEqual(true, mixiner.instanceOf(subMixined, Mixin3_1));
                    assert.strictEqual(true, mixiner.mixedBy(subMixined, Mixin3));
                    assert.strictEqual(true, mixiner.mixedBy(subMixined, Mixin3_1));
                }
                assert.strictEqual(true, subMixined.parMethod());
                assert.strictEqual('mixin3', subMixined.mixin3Prop);
                assert.strictEqual('parent', subMixined.parentProp);
                assert.strictEqual(true, subMixined instanceof SubMixined);
                assert.strictEqual(true, subMixined instanceof Parent);
                assert.strictEqual(true, subMixined instanceof Object);
                assert.strictEqual(false, subMixined instanceof Mixin3);
                assert.strictEqual(false, subMixined instanceof Mixin3_1);
            });
        });
        describe('mixiner.config.conflict', function () {
            it('mixin prop conflicts', function () {
                var oldConflict = mixiner.config.conflict;
                mixiner.config.conflict = function (_ref) {
                    var target = _ref.target,
                        mixin = _ref.mixin,
                        options = _ref.options,
                        type = _ref.type,
                        propertyName = _ref.propertyName;

                    if ('static' === type && 'prop' === propertyName) {
                        assert.strictEqual('object', typeof options === "undefined" ? "undefined" : _typeof(options));
                        assert.strictEqual('function', typeof target === "undefined" ? "undefined" : _typeof(target));
                        assert.strictEqual('function', typeof mixin === "undefined" ? "undefined" : _typeof(mixin));
                    }
                };

                var MClass = function (_mixiner$mix2) {
                    _inherits(MClass, _mixiner$mix2);

                    function MClass() {
                        _classCallCheck(this, MClass);

                        return _possibleConstructorReturn(this, (MClass.__proto__ || Object.getPrototypeOf(MClass)).apply(this, arguments));
                    }

                    return MClass;
                }(mixiner.mix(Mixin1, Mixin2));

                mixiner.config.conflict = oldConflict;
            });
        });
        describe('mixiner.options', function () {
            var OMClass = function (_mixiner$options$mix) {
                _inherits(OMClass, _mixiner$options$mix);

                function OMClass() {
                    _classCallCheck(this, OMClass);

                    return _possibleConstructorReturn(this, (OMClass.__proto__ || Object.getPrototypeOf(OMClass)).apply(this, arguments));
                }

                return OMClass;
            }(mixiner.options({ conflict: null }).mix(Mixin1, Mixin2));

            var omObj = new OMClass();
            it('options mix', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, OMClass.prop);
                    assert.strictEqual(undefined, OMClass.prop1);
                    assert.strictEqual(undefined, OMClass.prop2);
                } else {
                    assert.strictEqual(true, OMClass.prop);
                    assert.strictEqual(1, OMClass.prop1);
                    assert.strictEqual(2, OMClass.prop2);
                }
                assert.strictEqual('object', typeof omObj === "undefined" ? "undefined" : _typeof(omObj));
                assert.strictEqual('mixin1', omObj.mixin1Prop);
                assert.strictEqual('mixin2', omObj.mixin2Prop);
                assert.strictEqual(true, omObj.method());
                assert.strictEqual(1, omObj.method1());
                assert.strictEqual(2, omObj.method2());
            });

            var OEClass = function (_mixiner$options$exte) {
                _inherits(OEClass, _mixiner$options$exte);

                function OEClass() {
                    _classCallCheck(this, OEClass);

                    return _possibleConstructorReturn(this, (OEClass.__proto__ || Object.getPrototypeOf(OEClass)).apply(this, arguments));
                }

                return OEClass;
            }(mixiner.options({ conflict: null }).extend(Parent, Mixin1, Mixin2));

            var oeObj = new OEClass();
            it('options extend', function () {
                if (isIE() && isIE() <= 10) {
                    assert.strictEqual(undefined, OEClass.prop);
                    assert.strictEqual(undefined, OEClass.prop1);
                    assert.strictEqual(undefined, OEClass.prop2);
                    assert.strictEqual(undefined, OEClass.parProp);
                } else {
                    assert.strictEqual(true, OEClass.prop);
                    assert.strictEqual(1, OEClass.prop1);
                    assert.strictEqual(2, OEClass.prop2);
                    assert.strictEqual(true, OEClass.parProp);
                }
                assert.strictEqual('object', typeof oeObj === "undefined" ? "undefined" : _typeof(oeObj));
                assert.strictEqual('mixin1', oeObj.mixin1Prop);
                assert.strictEqual('mixin2', oeObj.mixin2Prop);
                assert.strictEqual(true, oeObj.method());
                assert.strictEqual(1, oeObj.method1());
                assert.strictEqual(2, oeObj.method2());
                assert.strictEqual('parent', oeObj.parentProp);
                assert.strictEqual(true, oeObj.parMethod());
            });
        });
    });
};
//# sourceMappingURL=test.js.map
