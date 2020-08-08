(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject(obj) {
    return _typeof(obj) === "object" && obj !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }
  function proxy(data, source, key) {
    Object.defineProperty(data, key, {
      get: function get() {
        return data[source][key];
      },
      set: function set(newValue) {
        data[source][key] = newValue;
      }
    });
  }

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methods = ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var results = arrayProto[method].apply(this, args);
      var ob = this.__ob__;
      var inserted;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
          break;
      }

      if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测

      return results;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 给每个属性添加一个__ob__属性，这个属性不可枚举，不可删除
      // 如果有这个属性，表示该属性已经被观测过了
      def(value, "__ob__", this);

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        for (var key in data) {
          defineReactive(data, key, data[key]);
        }
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(observe);
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (value === newValue) return;
        observe(newValue);
        value = newValue;
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) {
      return data;
    }

    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    vm._data = data = typeof data === "function" ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, "_data", key);
    }

    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态

      initState(vm); // TODO: 初始化事件，初始化生命周期，初始化watch等等
    };
  }

  function Vue(options) {
    // 初始化
    this._init(options);
  } // 原型扩展 -> 初始化


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
