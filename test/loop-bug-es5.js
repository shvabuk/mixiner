'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

// copyInstanceProperties
function mix(parent, mixins, method) {
  if (method === 'while') {
    var len = mixins.length;
    var i = -1;
    return (function(_parent) {
      _inherits(Wrapper, _parent);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        var _this = _possibleConstructorReturn(
          this,
          (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this)
        );

        while (++i < len) {
          var mixin = mixins[i];
          var obj = new mixin();

          for (var prop in obj) {
            _this[prop] = obj[prop];
          }
        }
        return _this;
      }

      return Wrapper;
    })(parent);
  } else if (method === 'forEach') {
    return (function(_parent2) {
      _inherits(Wrapper, _parent2);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        var _this2 = _possibleConstructorReturn(
          this,
          (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this)
        );

        mixins.forEach(function(mixin) {
          var obj = new mixin();

          for (var prop in obj) {
            _this2[prop] = obj[prop];
          }
        }, _this2);
        return _this2;
      }

      return Wrapper;
    })(parent);
  }
}

var ParentClass = function ParentClass() {
  _classCallCheck(this, ParentClass);

  this.parentProp = true;
};

var MixinA = function MixinA() {
  _classCallCheck(this, MixinA);

  this.a = 'a';
};

var MixinB = function MixinB() {
  _classCallCheck(this, MixinB);

  this.b = 'b';
};

var Class1 = (function(_mix) {
  _inherits(Class1, _mix);

  function Class1() {
    _classCallCheck(this, Class1);

    var _this3 = _possibleConstructorReturn(
      this,
      (Class1.__proto__ || Object.getPrototypeOf(Class1)).call(this)
    );

    _this3.class1Prop = 1;
    return _this3;
  }

  return Class1;
})(mix(ParentClass, [MixinA, MixinB], 'while'));

var Class2 = (function(_mix2) {
  _inherits(Class2, _mix2);

  function Class2() {
    _classCallCheck(this, Class2);

    var _this4 = _possibleConstructorReturn(
      this,
      (Class2.__proto__ || Object.getPrototypeOf(Class2)).call(this)
    );

    _this4.class2Prop = 2;
    return _this4;
  }

  return Class2;
})(mix(ParentClass, [MixinA, MixinB], 'forEach'));

// Tested on:
// Chromium Version 62.0.3202.62 (Official Build) Built on Ubuntu, running on Ubuntu 17.10 (64-bit)
// Edge virtual machine Win10 (x64) IE 11

var object1_1 = new Class1();
var object1_2 = new Class1();

var object2_1 = new Class2();
var object2_2 = new Class2();

console.log(Object.keys(object1_1).length === Object.keys(object1_2).length); // false
console.log(Object.keys(object2_1).length === Object.keys(object2_2).length); // true
