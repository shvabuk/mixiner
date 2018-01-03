"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = (mixiner, assert, version) => {
    describe('Mixiner functionality', () => {
        // interface IMixin2 {
        //   method(): boolean;
        //   method2(): number;
        // }
        class Mixin1 {
            method() {
                return false;
            }
            method1() {
                return 1;
            }
        }
        class Mixin2 {
            method() {
                return true;
            }
            method2() {
                return 2;
            }
        }
        class Parent {
            method() {
                return false;
            }
            parentMethod() {
                return true;
            }
        }
        describe('mixiner options', () => {
            it('has correct version', () => {
                assert.strictEqual('string', typeof mixiner.VERSION);
                assert.strictEqual(version, mixiner.VERSION);
            });
        });
        describe('class without parent', () => {
            it('has one mixin', () => {
                let Test = class Test {
                    test() {
                        return 'test';
                    }
                };
                Test = __decorate([
                    mixiner(Mixin1)
                ], Test);
                const t = new Test;
                assert.strictEqual('test', t.test());
                assert.strictEqual(false, t.method());
                assert.strictEqual(1, t.method1());
            });
            it('has two mixins', () => {
                let Test = class Test {
                    test() {
                        return 'test';
                    }
                };
                Test = __decorate([
                    mixiner(Mixin2),
                    mixiner(Mixin1)
                ], Test);
                const t = new Test;
                assert.strictEqual('test', t.test());
                assert.strictEqual(true, t.method());
                assert.strictEqual(1, t.method1());
                assert.strictEqual(2, t.method2());
            });
        });
        describe('class with parent', () => {
            it('has one mixin', () => {
                let Test = class Test extends Parent {
                    test() {
                        return 'test';
                    }
                };
                Test = __decorate([
                    mixiner(Mixin1)
                ], Test);
                const t = new Test;
                assert.strictEqual('test', t.test());
                assert.strictEqual(false, t.method());
                assert.strictEqual(1, t.method1());
            });
            it('has two mixins', () => {
                let Test = class Test extends Parent {
                    test() {
                        return 'test';
                    }
                };
                Test = __decorate([
                    mixiner(Mixin2),
                    mixiner(Mixin1)
                ], Test);
                const t = new Test;
                assert.strictEqual('test', t.test());
                assert.strictEqual(true, t.method());
                assert.strictEqual(1, t.method1());
                assert.strictEqual(2, t.method2());
            });
        });
    });
};
