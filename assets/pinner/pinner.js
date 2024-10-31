(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Pinner", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.Pinner = mod.exports;
  }
})(this, function (module) {
  "use strict";

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

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

  var Pin = function () {
    function Pin() {
      _classCallCheck(this, Pin);

      this.cache = {};
    }

    _createClass(Pin, [{
      key: "remove",
      value: function remove() {
        if (this.cache.pin) {
          this.cache.pin.remove();
          return true;
        }

        return false;
      }
    }]);

    return Pin;
  }();

  var Space = function () {
    function Space(block) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Space);

      var element = null;

      if (_typeof(block) === "object") {
        element = block;
      } else if (typeof block === "string") {
        element = document.querySelector(block);
      }

      if (!element || !(element instanceof Element)) {
        console.error("Error: invalid block.");
        return;
      }

      this.image = element.hasAttribute('data-image') ? element.getAttribute('data-image') : '';
      this.title = element.hasAttribute('data-title') ? element.getAttribute('data-title') : '';
      this.parsers = options.parsers || {};
      this.element = element;

      if (options.onclick) {
        element.addEventListener('click', options.onclick);
      }

      this.pins = this.parsePins();
      element.classList.add('pinner');
      element.classList.add('pinner_loaded');
      this.render();
      return this;
    }

    _createClass(Space, [{
      key: "setImage",
      value: function setImage(image) {
        this.image = image.url;
        this.title = image.title;
        this.render(true);
      }
    }, {
      key: "addPin",
      value: function addPin(pin) {
        if (pin instanceof Pin) {
          var pin_el = pin.render();
          pin_el.classList.add('pinner__pin');
          this.element.append(pin_el);
          this.pins.push(pin);
          return pin;
        } else {
          console.error('Error: pin must be of type Pin!');
        }

        return false;
      }
    }, {
      key: "deletePin",
      value: function deletePin(index) {
        if (this.pins[index]) {
          this.pins[index].remove();
          this.pins = [].concat(_toConsumableArray(this.pins.slice(0, index)), _toConsumableArray(this.pins.slice(index + 1)));
          return true;
        }

        return false;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.pins.map(function (pin) {
          pin.remove();
        });
        this.pins = [];
      }
    }, {
      key: "addParser",
      value: function addParser(parser) {
        this.parsers[parser.type] = parser;
      }
    }, {
      key: "parsePins",
      value: function parsePins(parsers) {
        if (!parsers) {
          parsers = this.parsers;
        }

        var pins = [];
        var pin_elems = this.element.children;

        for (var index = 0; index < pin_elems.length; index++) {
          var pin_el = pin_elems[index];
          var pin_parser = '';

          if (pin_el.hasAttribute('data-parser')) {
            pin_parser = pin_el.getAttribute('data-parser');
          } else {
            pin_parser = 'default';
          }

          if (!parsers[pin_parser]) {
            console.error("Error: pin parser of type \"".concat(pin_parser, "\" does not exist."));
          } else {
            var pin_state = parsers[pin_parser].parser(pin_el);
            pins.push(new parsers[pin_parser]["class"](pin_state));
          }
        }

        return pins;
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        this.element.innerHTML = '';
        var pinner_image = document.createElement('img');
        pinner_image.className = 'pinner__image';
        pinner_image.setAttribute('src', this.image);
        this.element.setAttribute('data-image', this.image);
        pinner_image.setAttribute('alt', this.title);
        this.element.setAttribute('data-title', this.title);
        this.element.append(pinner_image);
        this.pins.map(function (pin) {
          var pin_el = pin.render();
          pin_el.classList.add('pinner__pin');

          _this.element.append(pin_el);
        });
      }
    }]);

    return Space;
  }();

  var supported_pin_types = {};

  var PinnerSpace = function (_Space) {
    _inherits(PinnerSpace, _Space);

    var _super = _createSuper(PinnerSpace);

    function PinnerSpace(el) {
      var _this2;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, PinnerSpace);

      if (options.parsers) {
        options.parsers = Object.assign({}, options.parsers, supported_pin_types);
      } else {
        options.parsers = supported_pin_types;
      }

      _this2 = _super.call(this, el, options);
      return _possibleConstructorReturn(_this2, _assertThisInitialized(_this2));
    }

    return PinnerSpace;
  }(Space);

  var Pinner = {
    Space: PinnerSpace,
    addParser: function addParser(pin_factory_def) {
      supported_pin_types[pin_factory_def.name] = pin_factory_def;
    },
    Pin: Pin
  };

  if (typeof Element.remove != 'function') {
    Element.prototype.remove = function () {
      this.parentElement.removeChild(this);
    };
  }

  if (typeof NodeList.remove != 'function') {
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
      for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
        }
      }
    };
  }

  if (typeof Element.append != 'function') {
    Element.prototype.append = Element.prototype.appendChild;
  }

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('prepend')) {
        return;
      }

      Object.defineProperty(item, 'prepend', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function prepend() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          this.insertBefore(docFrag, this.firstChild);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }

  var classSignal = function classSignal(node, target_class) {
    if (node.classList && node.classList.contains(target_class)) {
      return node;
    } else if (node.parentNode) {
      return classSignal(node.parentNode, target_class);
    } else {
      return false;
    }
  };

  var LINK_PIN_DEFAULT = {
    color: '#222222',
    label: '(no content)',
    link: '#',
    shape: 'circle',
    stamp: null,
    size: '24px',
    theme: 'dark',
    x: '50%',
    y: '50%',
    trigger: 'hover',
    custom_class: ''
  };

  var parser = function parser(el) {
    if (!el) {
      return {};
    }

    var state = {};

    if (el.hasAttribute('data-color')) {
      state.color = el.getAttribute('data-color');
    }

    state.label = el.innerHTML || LINK_PIN_DEFAULT.label;
    state.custom_class = el.className || '';

    if (el.hasAttribute('href')) {
      state.link = el.getAttribute('href') || LINK_PIN_DEFAULT.href;
    }

    if (el.hasAttribute('data-shape')) {
      state.shape = el.getAttribute('data-shape') || LINK_PIN_DEFAULT.shape;
    }

    if (el.hasAttribute('data-stamp')) {
      state.stamp = el.getAttribute('data-stamp') || LINK_PIN_DEFAULT.stamp;
    }

    if (el.hasAttribute('data-size')) {
      state.size = el.getAttribute('data-size') || LINK_PIN_DEFAULT.size;
    }

    if (el.hasAttribute('data-trigger')) {
      state.x = el.getAttribute('data-trigger') || LINK_PIN_DEFAULT.trigger;
    }

    if (el.hasAttribute('data-x')) {
      state.x = el.getAttribute('data-x') || LINK_PIN_DEFAULT.x;
    }

    if (el.hasAttribute('data-y')) {
      state.y = el.getAttribute('data-y') || LINK_PIN_DEFAULT.y;
    }

    return state;
  };

  var LinkPin = function (_Pin) {
    _inherits(LinkPin, _Pin);

    var _super2 = _createSuper(LinkPin);

    function LinkPin() {
      var _this3;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, LinkPin);

      _this3 = _super2.call(this, options);
      _this3.state = Object.assign({}, LINK_PIN_DEFAULT, options);
      return _possibleConstructorReturn(_this3, _assertThisInitialized(_this3));
    }

    _createClass(LinkPin, [{
      key: "setLink",
      value: function setLink() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.link;

        if (this.cache.pin) {
          this.cache.pin.setAttribute('href', url);
        }

        this.state.link = url;
      }
    }, {
      key: "setLabel",
      value: function setLabel() {
        var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.label;

        if (this.cache.label) {
          this.cache.label.innerHTML = label;
        } else if (this.cache.pin) {
          var label_el = document.createElement('span');
          label_el.className = 'link-pin__label';
          label_el.innerHTML = label;
          this.cache.pin.append(label_el);
          this.cache.label = label_el;
        }

        this.state.label;
      }
    }, {
      key: "setSize",
      value: function setSize() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.href;

        if (this.cache.bullet) {
          this.cache.bullet.style.width = size;
          this.cache.bullet.style.height = size;
        }

        if (this.cache.stamp) {
          this.cache.stamp.style.lineHeight = size;
        }

        if (this.cache.pin) {
          this.cache.pin.style.fontSize = size;
          this.cache.pin.setAttribute('data-size', size);
        }

        this.state.size = size;
      }
    }, {
      key: "setShape",
      value: function setShape() {
        var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.shape;

        if (this.cache.bullet) {
          this.cache.bullet.classList.remove("link-pin__bullet_".concat(this.state.shape));
          this.cache.bullet.classList.add("link-pin__bullet_".concat(shape));
          this.cache.pin.setAttribute('data-shape', shape);
        }

        this.state.shape = shape;
      }
    }, {
      key: "setColor",
      value: function setColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.color;

        if (this.cache.pin) {
          this.cache.pin.style.color = color;
          this.cache.pin.setAttribute('data-color', color);
        }

        this.state.color = color;
      }
    }, {
      key: "setTheme",
      value: function setTheme() {
        var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.theme;

        if (this.cache.pin) {
          this.cache.pin.classList.remove("link-pin_".concat(this.state.theme));
          this.cache.pin.classList.add("link-pin_".concat(theme));
          this.cache.pin.setAttribute('data-theme', theme);
        }

        this.state.theme = theme;
      }
    }, {
      key: "setStamp",
      value: function setStamp() {
        var stamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.stamp;

        if (this.cache.stamp) {
          this.cache.stamp.innerHTML = stamp;
        } else if (this.cache.pin) {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = stamp;
          stamp_el.className = 'link-pin__stamp';
          stamp_el.style.lineHeight = this.state.size;
          this.cache.pin.append(stamp_el);
          this.cache.stamp = stamp_el;
          this.cache.pin.setAttribute('data-stamp', stamp);
        }

        this.state.stamp = stamp;
      }
    }, {
      key: "removeStamp",
      value: function removeStamp() {
        if (this.cache.stamp) {
          this.cache.stamp.remove();
          this.cache.stamp = null;
        }

        if (this.cache.pin) {
          this.cache.pin.removeAttribute('data-stamp', stamp);
        }

        this.state.stamp = null;
      }
    }, {
      key: "setX",
      value: function setX() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.x;

        if (this.cache.pin) {
          this.cache.pin.style.left = x;
          this.cache.pin.setAttribute('data-x', x);
        }

        this.state.x = x;
      }
    }, {
      key: "setY",
      value: function setY() {
        var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LINK_PIN_DEFAULT.y;

        if (this.cache.pin) {
          this.cache.pin.style.top = y;
          this.cache.pin.setAttribute('data-y', y);
        }

        this.state.y = y;
      }
    }, {
      key: "setTrigger",
      value: function setTrigger(trigger) {
        this.trigger = trigger; //TODO
      }
    }, {
      key: "render",
      value: function render(state) {
        if (!state) {
          state = this.state;
        }

        var pin_el = document.createElement('a');
        var link;

        if (state.link) {
          link = state.link;
        } else {
          link = LINK_PIN_DEFAULT.link;
        }

        pin_el.setAttribute('href', link);
        var custom_class;

        if (state.custom_class) {
          custom_class = state.custom_class;
        } else {
          custom_class = LINK_PIN_DEFAULT.custom_class;
        }

        pin_el.className = "link-pin ".concat(custom_class);
        var theme;

        if (state.theme) {
          theme = state.theme;
        } else {
          theme = LINK_PIN_DEFAULT.theme;
        }

        pin_el.classList.add("link-pin_".concat(theme));
        pin_el.setAttribute('data-theme', theme);
        var color;

        if (state.color) {
          color = state.color;
        } else {
          color = LINK_PIN_DEFAULT.color;
        }

        pin_el.style.color = color;
        pin_el.setAttribute('data-color', theme);
        var x;

        if (state.x) {
          x = state.x;
        } else {
          x = LINK_PIN_DEFAULT.x;
        }

        pin_el.style.left = x;
        pin_el.setAttribute('data-x', x);
        var y;

        if (state.y) {
          y = state.y;
        } else {
          y = LINK_PIN_DEFAULT.y;
        }

        pin_el.style.top = y;
        pin_el.setAttribute('data-y', y);
        var label;

        if (state.label) {
          label = state.label;
        } else {
          label = LINK_PIN_DEFAULT.label;
        }

        if (label) {
          var label_el = document.createElement('span');
          label_el.className = 'link-pin__label';
          label_el.innerHTML = label;
          pin_el.append(label_el);
          this.cache.label = label_el;
        }

        var bullet_el = document.createElement('span');
        bullet_el.className = "link-pin__bullet";
        var shape;

        if (state.shape) {
          shape = state.shape;
        } else {
          shape = LINK_PIN_DEFAULT.shape;
        }

        bullet_el.classList.add("link-pin__bullet_".concat(shape));
        pin_el.setAttribute('data-shape', shape);
        var size;

        if (state.size) {
          size = state.size;
        } else {
          size = LINK_PIN_DEFAULT.size;
        }

        bullet_el.style.width = size;
        bullet_el.style.height = size;
        bullet_el.style.fontSize = size;
        pin_el.setAttribute('data-size', size);
        var stamp;

        if (state.stamp) {
          stamp = state.stamp;
        } else {
          stamp = LINK_PIN_DEFAULT.stamp;
        }

        if (stamp) {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = stamp;
          stamp_el.className = 'link-pin__stamp';
          stamp_el.style.lineHeight = size;
          bullet_el.append(stamp_el);
          pin_el.setAttribute('data-stamp', stamp);
          this.cache.stamp = stamp_el;
        }

        pin_el.prepend(bullet_el);
        this.cache.bullet = bullet_el;
        var trigger;

        if (state.trigger) {
          trigger = state.trigger;
        } else {
          trigger = LINK_PIN_DEFAULT.trigger;
        }
        /* Add events */


        if (trigger == 'click' || 'ontouchstart' in window) {
          var pass = false;
          pin_el.addEventListener('click', function (ev) {
            if (!pass) {
              ev.preventDefault();
              ev.currentTarget.classList.add('link-pin_active');
              pass = true;
              return;
            }

            ev.currentTarget.classList.remove('link-pin_active');
            pass = false;
          });
        } else if (trigger == 'hover') {
          pin_el.addEventListener('mouseover', function (ev) {
            ev.currentTarget.classList.add('link-pin_active');
          });
          pin_el.addEventListener('mouseleave', function (ev) {
            ev.currentTarget.classList.remove('link-pin_active');
          });
        }

        document.addEventListener('click', function (ev) {
          var link_pin = classSignal(ev.target, 'link-pin');

          if (!link_pin || link_pin != pin_el) {
            pin_el.classList.remove('link-pin_active');
          }
        });
        pin_el.setAttribute('data-trigger', trigger);
        this.cache.pin = pin_el;
        return pin_el;
      }
    }]);

    return LinkPin;
  }(Pin);

  /* PINNER v0.1.0 */
  window.addEventListener('load', function (ev) {
    Pinner.addParser({
      name: 'default',
      "class": LinkPin,
      parser: parser
    });
    var pinner_elems = document.querySelectorAll('.pinner');

    for (var i = 0; i < pinner_elems.length; i++) {
      if (!pinner_elems[i].classList.contains('pinner_loaded')) {
        new Pinner.Space(pinner_elems[i]);
      }
    }
  });
  module.exports = Object.assign({}, Pinner, {
    LinkPin: LinkPin
  });
});
