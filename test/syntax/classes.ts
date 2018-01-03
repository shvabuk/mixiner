import mixiner = require('../../dist/mixiner');

interface IMixin1 {
  method(): boolean;
  method1(): number;
}

interface IMixin2 {
  method(): boolean;
  method2(): number;
}

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

class Parent {
  public static parProp = true;
  public parentProp = 'parent';
  public parMethod(): boolean {
    return true;
  }
}

@mixiner(Mixin2)
@mixiner(Mixin1)
export class ClassExtend extends Parent {
  public method: () => boolean;
  public method1: () => number;
  public method2: () => number;
  public childProp = 'child';
}

@mixiner(Mixin2)
@mixiner(Mixin1)
export class ClassMix {
  public method: () => boolean;
  public method1: () => number;
  public method2: () => number;
  public childProp = 'child';
}
