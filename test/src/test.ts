import * as interfaces from '../../dist/interfaces';

declare const describe: any;
declare const it: any;
declare const navigator: any;

function isIE(): boolean | number {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const myNav = navigator.userAgent.toLowerCase();
  return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1], 10) : false;
}

export const tests = (mixiner: interfaces.IMixiner, assert: any) => {
  describe('Mixiner functionality', () => {
    describe('mixiner.resolveConflict', () => {
      const mixiner0 = { ...mixiner };
      mixiner0.VERSION = '0.0.0';
      const root0: any = {};
      root0.mixiner = mixiner0;

      const mixinerNext = { ...mixiner };
      mixinerNext.VERSION = '9999.9999.9999';
      const rootNext: any = {};
      rootNext.mixiner = mixinerNext;

      const root: any = {};
      root.mixiner = mixiner;

      it('return correct object', () => {
        assert.notStrictEqual(mixiner0, mixiner.resolveConflict(root0));
        assert.strictEqual(mixiner, mixiner.resolveConflict(root0));
        assert.strictEqual(mixinerNext, mixiner.resolveConflict(rootNext));
        assert.strictEqual(mixiner, mixiner.resolveConflict(root));
      });
    });

    interface IMixin1 {
      method(): boolean;
      method1(): number;
    }

    // interface IMixin2 {
    //   method(): boolean;
    //   method2(): number;
    // }

    class Mixin1 implements IMixin1 {
      public static prop = false;
      public static prop1 = 1;
      public mixin1Prop = 'mixin1';
      public method() {
        return false;
      }
      public method1() {
        return 1;
      }
    }

    class Mixin2 {
      public static prop: boolean = true;
      public static prop2: number = 2;
      public mixin2Prop = 'mixin2';
      public method(): boolean {
        return true;
      }
      public method2(): number {
        return 2;
      }
    }

    class Mixin3 {
      public static prop3: number = 3;
      public mixin3Prop = 'mixin3';
      public method3(): number {
        return 3;
      }
    }

    class Parent {
      public static parProp = true;
      public parentProp = 'parent';
      public parMethod(): boolean {
        return true;
      }
    }

    interface INameable {
      name?: string;
    }

    const bill: INameable = { name: 'Bill' };

    class Bill implements INameable {
      public name?: string;
      public constructor() {
        return bill;
      }
    }

    class Empty {}
    const emptyObj = new Empty();

    describe('mixiner.extend', () => {
      class MyClass extends mixiner.extend(Parent, Mixin1, Mixin2) {
        public childProp = 'child';
      }

      const obj = new MyClass();
      it('main test', () => {
        if (isIE() && isIE() <= 10) {
          assert.strictEqual(undefined, MyClass.parProp);
          assert.strictEqual(undefined, MyClass.prop);
          assert.strictEqual(undefined, MyClass.prop1);
          assert.strictEqual(undefined, MyClass.prop2);
          assert.strictEqual('undefined', typeof MyClass._mixins_);
        } else {
          assert.strictEqual(true, MyClass.parProp);
          assert.strictEqual(true, MyClass.prop);
          assert.strictEqual(1, MyClass.prop1);
          assert.strictEqual(2, MyClass.prop2);
          assert.strictEqual('object', typeof MyClass._mixins_);
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

      it('instanceof', () => {
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

      it('mixedBy', () => {
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
      class Bob extends mixiner.extend(Bill, Mixin1, Mixin2) {
        public constructor() {
          return super();
        }
      }

      const bobObj = new Bob();

      it('custom superClass return', () => {
        assert.strictEqual(bill, bobObj);
        assert.strictEqual(false, bobObj instanceof Bill);
        assert.strictEqual(false, bobObj instanceof Bob);
      });

      class MyNull extends mixiner.extend(null, Mixin3) {}

      it('extends null', () => {
        if (isIE() && isIE() <= 10) {
          assert.strictEqual(undefined, MyNull.prop3);
          assert.strictEqual(undefined, MyNull._mixins_);
        } else {
          assert.strictEqual(3, MyNull.prop3);
          assert.strictEqual(Mixin3, MyNull._mixins_.collection[0]);
        }

        if (!MyNull.apply) {
          assert.throws(() => {
            new MyNull();
          });
        }
      });

      class MyArray extends mixiner.extend(Array, Mixin1, Mixin2) {}

      const myArrayObj = new MyArray(3);

      it('extends Array', () => {
        assert.strictEqual(3, myArrayObj.length);
        assert.strictEqual('function', typeof myArrayObj.forEach);
        assert.strictEqual(true, Array.isArray(myArrayObj));
        // native classes does not implements correct after post-processing
        // it is common problem with buble and babel processors
        // may be fixed with https://github.com/WebReflection/babel-plugin-transform-builtin-classes
        // but dont support IE <= 10
        // assert.strictEqual(true, myArrayObj instanceof MyArray);
        assert.strictEqual(true, myArrayObj instanceof Array);
      });

      class SubClass extends mixiner.extend(MyClass, Mixin3) {
        constructor() {
          super();
        }
      }

      const subClassObj = new SubClass();

      it('deep inharitance middle class props', () => {
        if (isIE() && isIE() <= 10) {
          assert.strictEqual(undefined, SubClass.parProp);
          assert.strictEqual(undefined, SubClass.prop);
          assert.strictEqual(undefined, SubClass.prop1);
          assert.strictEqual(undefined, SubClass.prop2);
          assert.strictEqual('undefined', typeof SubClass._mixins_);
        } else {
          assert.strictEqual(true, SubClass.parProp);
          assert.strictEqual(true, SubClass.prop);
          assert.strictEqual(1, SubClass.prop1);
          assert.strictEqual(2, SubClass.prop2);
          assert.strictEqual('object', typeof SubClass._mixins_);
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

      it('deep inharitance sub class props', () => {
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

    describe('mixiner.mix', () => {
      class Mixin4 {}

      class Mixin3_1 extends mixiner.mix(Mixin3, Mixin4) {}

      class SubMixined extends mixiner.extend(Parent, Mixin3_1) {}

      const subMixined = new SubMixined();

      it('sub mixined mixin', () => {
        if (isIE() && isIE() <= 10) {
          assert.strictEqual(undefined, SubMixined.parProp);
          assert.strictEqual(undefined, SubMixined.prop3);
          assert.strictEqual('undefined', typeof SubMixined._mixins_);
          assert.strictEqual(undefined, subMixined.method3);
        } else {
          assert.strictEqual(true, SubMixined.parProp);
          assert.strictEqual(3, SubMixined.prop3);
          assert.strictEqual('object', typeof SubMixined._mixins_);
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

    describe('mixiner.config.conflict', () => {
      it('mixin prop conflicts', () => {
        const oldConflict = mixiner.config.conflict;

        mixiner.config.conflict = ({
          target,
          mixin,
          options,
          type,
          propertyName,
        }: interfaces.IConflictProps) => {
          if ('static' === type && 'prop' === propertyName) {
            assert.strictEqual('object', typeof options);
            assert.strictEqual('function', typeof target);
            assert.strictEqual('function', typeof mixin);
          }
        };

        class MClass extends mixiner.mix(Mixin1, Mixin2) {}

        mixiner.config.conflict = oldConflict;
      });
    });

    describe('mixiner.options', () => {
      class OMClass extends mixiner.options({ conflict: null }).mix(Mixin1, Mixin2) {}
      const omObj = new OMClass();

      it('options mix', () => {
        if (isIE() && isIE() <= 10) {
          assert.strictEqual(undefined, OMClass.prop);
          assert.strictEqual(undefined, OMClass.prop1);
          assert.strictEqual(undefined, OMClass.prop2);
        } else {
          assert.strictEqual(true, OMClass.prop);
          assert.strictEqual(1, OMClass.prop1);
          assert.strictEqual(2, OMClass.prop2);
        }

        assert.strictEqual('object', typeof omObj);
        assert.strictEqual('mixin1', omObj.mixin1Prop);
        assert.strictEqual('mixin2', omObj.mixin2Prop);
        assert.strictEqual(true, omObj.method());
        assert.strictEqual(1, omObj.method1());
        assert.strictEqual(2, omObj.method2());
      });

      class OEClass extends mixiner.options({ conflict: null }).extend(Parent, Mixin1, Mixin2) {}
      const oeObj = new OEClass();

      it('options extend', () => {
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

        assert.strictEqual('object', typeof oeObj);
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
