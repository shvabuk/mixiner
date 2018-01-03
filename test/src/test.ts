import * as interfaces from '../../dist/interfaces';

declare const describe: any;
declare const it: any;

export const tests = (mixiner: interfaces.IMixiner, assert: any, version: string) => {
  describe('Mixiner functionality', () => {
    interface IMixin1 {
      method(): boolean;
      method1(): number;
    }

    // interface IMixin2 {
    //   method(): boolean;
    //   method2(): number;
    // }

    class Mixin1 implements IMixin1 {
      public method() {
        return false;
      }
      public method1() {
        return 1;
      }
    }

    class Mixin2 {
      public method(): boolean {
        return true;
      }
      public method2(): number {
        return 2;
      }
    }

    class Parent {
      public method(): boolean {
        return false;
      }
      public parentMethod(): boolean {
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
        @mixiner(Mixin1)
        class Test {
          public method: () => boolean;
          public method1: () => number;
          public test(): string {
            return 'test';
          }
        }

        const t = new Test;

        assert.strictEqual('test', t.test());
        assert.strictEqual(false, t.method());
        assert.strictEqual(1, t.method1());
      });

      it('has two mixins', () => {
        @mixiner(Mixin2)
        @mixiner(Mixin1)
        class Test {
          public method: () => boolean;
          public method1: () => number;
          public method2: () => number;
          public test(): string {
            return 'test';
          }
        }

        const t = new Test;

        assert.strictEqual('test', t.test());
        assert.strictEqual(true, t.method());
        assert.strictEqual(1, t.method1());
        assert.strictEqual(2, t.method2());
      });
    });

    describe('class with parent', () => {
      it('has one mixin', () => {
        @mixiner(Mixin1)
        class Test extends Parent {
          public method1: () => number;
          public test(): string {
            return 'test';
          }
        }

        const t = new Test;

        assert.strictEqual('test', t.test());
        assert.strictEqual(false, t.method());
        assert.strictEqual(1, t.method1());
      });

      it('has two mixins', () => {
        @mixiner(Mixin2)
        @mixiner(Mixin1)
        class Test extends Parent {
          public method1: () => number;
          public method2: () => number;
          public test(): string {
            return 'test';
          }
        }

        const t = new Test;

        assert.strictEqual('test', t.test());
        assert.strictEqual(true, t.method());
        assert.strictEqual(1, t.method1());
        assert.strictEqual(2, t.method2());
      });
    });
  });
};
