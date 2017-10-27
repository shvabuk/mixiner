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

export class ClassExtend extends mixiner.extend(Parent, Mixin1, Mixin2) {
  public childProp = 'child';
}

export class ClassMix extends mixiner.mix(Mixin1, Mixin2) {
  public childProp = 'child';
}
export class ClassOptionsExtend extends mixiner.options({}).extend(Parent, Mixin1, Mixin2) {
  public childProp = 'child';
}

export class ClassOptionsMix extends mixiner.options({}).mix(Mixin1, Mixin2) {
  public childProp = 'child';
}
