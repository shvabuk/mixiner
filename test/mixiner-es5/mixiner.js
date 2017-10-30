var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Mixiner <https://shvabuk.github.io/mixiner>
 * Released under MIT license <https://shvabuk.github.io/mixiner/LICENSE.txt>
 * Copyright Shvab Ostap
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        // Node. CommonJS-like
        var mixiner = factory();
        module.exports = mixiner;
        // CommonJS exports
        module.exports.mixiner = mixiner;
    } else {
        var _mixiner = factory();

        if (typeof root.mixiner === 'undefined') {
            root.mixiner = _mixiner;
        } else if (
        // duck type checking
        _typeof(root.mixiner) === 'object' && typeof root.mixiner.VERSION === 'string' && typeof root.mixiner.Mixins === 'function') {
            root.mixiner = _mixiner.resolveConflict(root);
        } else {
            throw Error('Global scope property "mixiner" alredy in use');
        }
    }
})(typeof window !== 'undefined' ? window : this, function () {

    "use strict";

    var VERSION = '1.0.5';
    // storage of mixins, defined in constructor._mixins_

    var Mixins = function () {
        function Mixins() {
            _classCallCheck(this, Mixins);

            this.collection = [];
            this.VERSION = VERSION;
        }

        _createClass(Mixins, [{
            key: 'add',
            value: function add(mixin) {
                this.collection.push(mixin);
            }
        }, {
            key: 'setParent',
            value: function setParent(mixins) {
                this.parent = mixins;
            }
        }, {
            key: 'has',
            value: function has(mixin) {
                return this.collection.indexOf(mixin) > -1 || typeof this.parent !== 'undefined' && this.parent.has(mixin);
            }
        }]);

        return Mixins;
    }();
    // get object prototype


    var getProto = Object.getPrototypeOf || function (obj) {
        return obj.__proto__;
    };
    // get props names, used in mixin
    function getOwnPropsKeys(target) {
        var keys = Object.getOwnPropertyNames(target);
        if (typeof Object.getOwnPropertySymbols !== 'undefined') {
            return [].concat(keys, Object.getOwnPropertySymbols(target));
        }
        return keys;
    }
    // define mixin (static, prototype or instance) properties
    function defineProps(target, mixin, options, type) {
        var mixinNames = getOwnPropsKeys(mixin);
        var targetNames = getOwnPropsKeys(target);
        var ignore = type === 'proto' ? options.ignoreProtoProps : type === 'static' ? options.ignoreStaticProps : options.ignoreInstanceProps;
        var i = mixinNames.length;
        while (i--) {
            // ignore props from ignorelist
            if (ignore.indexOf(mixinNames[i]) > -1) {
                continue;
            }
            // check conflicts
            // custom resolve
            if (targetNames.indexOf(mixinNames[i]) > -1) {
                options.resolve({
                    target: target,
                    mixin: mixin,
                    options: options,
                    type: type,
                    propertyName: mixinNames[i]
                });
            } else {
                // default define
                options.define(target, mixin, mixinNames[i]);
            }
        }
    }
    // wrapper according to https://github.com/airbnb/javascript#objects--prototype-builtins
    var has = Object.prototype.hasOwnProperty;
    // define static and prototype properties
    function assignClasses(target, mixin, options) {
        // add mixins links
        if (!has.call(target, '_mixins_')) {
            var parentMixins = target._mixins_;
            Object.defineProperty(target, '_mixins_', {
                value: new Mixins(),
                configurable: true,
                writable: true
            });
            if (typeof parentMixins !== 'undefined') {
                target._mixins_.setParent(parentMixins);
            }
        }
        // add mixined in mixin mixins
        if (_typeof(mixin._mixins_) === 'object' && Array.isArray(mixin._mixins_.collection)) {
            mixin._mixins_.collection.forEach(function (parentMixin) {
                return assignClasses(target, parentMixin, options);
            });
        }
        // copy prototype properties
        defineProps(target.prototype, mixin.prototype, options, 'proto');
        // copy constructor properties
        defineProps(target, mixin, options, 'static');
        target._mixins_.add(mixin);
    }
    // copy options properties, just primitive Object.assign polyfill for IE9
    function assign(target, source) {
        var keys = Object.keys(source);
        var i = keys.length;
        while (i--) {
            target[keys[i]] = source[keys[i]];
        }
        return target;
    }
    // mixin function
    // at this moment loop inside of constructor increse object creation speed
    // during V8 engine optimization
    function mixIn(options, mixins, parent) {
        var len = mixins.length;
        var target = void 0;
        var i = -1;
        if (typeof parent === 'undefined') {
            target = function MixinsWrapper() {
                _classCallCheck(this, MixinsWrapper);

                var j = -1;
                // copy instance properties
                // mixins[i].apply(this) does not work in ES2015+ classes
                while (++j < len) {
                    if (typeof mixins[j]._mixinInstance_ === 'undefined') {
                        mixins[j]._mixinInstance_ = new mixins[j]();
                    }
                    defineProps(this, mixins[j]._mixinInstance_, options, 'instance');
                }
            };
        } else {
            // ignore first mixin, it is parent class
            target = function (_parent) {
                _inherits(MixinsWrapper, _parent);

                function MixinsWrapper() {
                    var _ref;

                    var _this, _ret;

                    _classCallCheck(this, MixinsWrapper);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var out = (_this = _possibleConstructorReturn(this, (_ref = MixinsWrapper.__proto__ || Object.getPrototypeOf(MixinsWrapper)).call.apply(_ref, [this].concat(args))), _this);
                    var j = -1;
                    // copy instance properties
                    // mixins[i].apply(this) does not work in ES2015+ classes
                    while (++j < len) {
                        if (typeof mixins[j]._mixinInstance_ === 'undefined') {
                            mixins[j]._mixinInstance_ = new mixins[j]();
                        }
                        defineProps(_this, mixins[j]._mixinInstance_, options, 'instance');
                    }
                    return _ret = out, _possibleConstructorReturn(_this, _ret);
                }

                return MixinsWrapper;
            }(parent);
        }
        while (++i < len) {
            assignClasses(target, mixins[i], options);
        }
        return target;
    }
    // check mixin usage
    function mixedBy(instance, mixin) {
        var ctor = getProto(instance).constructor;
        if (_typeof(ctor._mixins_) === 'object' && typeof ctor._mixins_.has === 'function') {
            return ctor._mixins_.has(mixin);
        }
        return false;
    }
    // check mixin usage and instanceof
    function instanceOf(instance, mixin) {
        return mixedBy(instance, mixin) || instance instanceof mixin;
    }
    var define = function define(target, mixin, propertyName) {
        Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(mixin, propertyName));
    };
    // main object
    var mixiner = {
        VERSION: VERSION,
        Mixins: Mixins,
        options: options,
        mix: mix,
        extend: extend,
        mixedBy: mixedBy,
        instanceOf: instanceOf,
        config: {
            define: define,
            resolve: function resolve(_ref2) {
                var target = _ref2.target,
                    mixin = _ref2.mixin,
                    propertyName = _ref2.propertyName;

                define(target, mixin, propertyName);
            },
            ignoreProtoProps: ['constructor', 'apply', 'bind', 'call', 'isGenerator', 'toSource', 'toString', '__proto__'],
            ignoreStaticProps: ['arguments', 'arity', 'caller', 'length', 'name', 'displayName', 'prototype', '__proto__', '_mixinInstance_'],
            ignoreInstanceProps: ['__proto__']
        }
    };
    mixiner.default = mixiner; // set options for current mixining
    function options(options) {
        var opts = assign(assign({}, mixiner.config), options);
        return {
            mix: function mix() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return mixIn(opts, args);
            },
            extend: function extend(parent) {
                for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                    args[_key3 - 1] = arguments[_key3];
                }

                return mixIn(opts, args, parent);
            }
        };
    }
    // extends parent with mixins implementation
    function extend(parent) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
        }

        return mixIn(mixiner.config, args, parent);
    }
    // mixins implementation
    function mix() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return mixIn(mixiner.config, args);
    }
    // internal method, used for resolving conflicts in global scope (browser window etc.)
    mixiner.resolveConflict = function (root) {
        var oldParts = root.mixiner.VERSION.split('.').map(parseInt);
        var newParts = mixiner.VERSION.split('.').map(parseInt);
        var i = -1;
        while (++i < 3) {
            if (newParts[i] > oldParts[i]) {
                return mixiner;
            } else if (newParts[i] < oldParts[i]) {
                return root.mixiner;
            }
        }
        return root.mixiner;
    };

    return mixiner;
});
//# sourceMappingURL=mixiner.js.map
