"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = function (mixiner, assert, version) {
    describe('Mixiner functionality', function () {
        // interface IMixin2 {
        //   method(): boolean;
        //   method2(): number;
        // }
        var Mixin1 = function () {
            function Mixin1() {
                _classCallCheck(this, Mixin1);
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

        var Mixin2 = function () {
            function Mixin2() {
                _classCallCheck(this, Mixin2);
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

        var Parent = function () {
            function Parent() {
                _classCallCheck(this, Parent);
            }

            _createClass(Parent, [{
                key: "method",
                value: function method() {
                    return false;
                }
            }, {
                key: "parentMethod",
                value: function parentMethod() {
                    return true;
                }
            }]);

            return Parent;
        }();

        describe('mixiner options', function () {
            it('has correct version', function () {
                assert.strictEqual('string', typeof mixiner.VERSION);
                assert.strictEqual(version, mixiner.VERSION);
            });
        });
        describe('class without parent', function () {
            it('has one mixin', function () {
                var Test = function () {
                    function Test() {
                        _classCallCheck(this, Test);
                    }

                    _createClass(Test, [{
                        key: "test",
                        value: function test() {
                            return 'test';
                        }
                    }]);

                    return Test;
                }();
                Test = __decorate([mixiner(Mixin1)], Test);
                var t = new Test();
                assert.strictEqual('test', t.test());
                assert.strictEqual(false, t.method());
                assert.strictEqual(1, t.method1());
            });
            it('has two mixins', function () {
                var Test = function () {
                    function Test() {
                        _classCallCheck(this, Test);
                    }

                    _createClass(Test, [{
                        key: "test",
                        value: function test() {
                            return 'test';
                        }
                    }]);

                    return Test;
                }();
                Test = __decorate([mixiner(Mixin2), mixiner(Mixin1)], Test);
                var t = new Test();
                assert.strictEqual('test', t.test());
                assert.strictEqual(true, t.method());
                assert.strictEqual(1, t.method1());
                assert.strictEqual(2, t.method2());
            });
        });
        describe('class with parent', function () {
            it('has one mixin', function () {
                var Test = function (_Parent) {
                    _inherits(Test, _Parent);

                    function Test() {
                        _classCallCheck(this, Test);

                        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
                    }

                    _createClass(Test, [{
                        key: "test",
                        value: function test() {
                            return 'test';
                        }
                    }]);

                    return Test;
                }(Parent);
                Test = __decorate([mixiner(Mixin1)], Test);
                var t = new Test();
                assert.strictEqual('test', t.test());
                assert.strictEqual(false, t.method());
                assert.strictEqual(1, t.method1());
            });
            it('has two mixins', function () {
                var Test = function (_Parent2) {
                    _inherits(Test, _Parent2);

                    function Test() {
                        _classCallCheck(this, Test);

                        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
                    }

                    _createClass(Test, [{
                        key: "test",
                        value: function test() {
                            return 'test';
                        }
                    }]);

                    return Test;
                }(Parent);
                Test = __decorate([mixiner(Mixin2), mixiner(Mixin1)], Test);
                var t = new Test();
                assert.strictEqual('test', t.test());
                assert.strictEqual(true, t.method());
                assert.strictEqual(1, t.method1());
                assert.strictEqual(2, t.method2());
            });
        });
    });
};
//# sourceMappingURL=test.js.map
