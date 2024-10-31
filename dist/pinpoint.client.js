(function (Pinner, i18n) {
  'use strict';

  var Pinner__default = 'default' in Pinner ? Pinner['default'] : Pinner;

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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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

  var classSignal = function classSignal(node, target_class) {
    if (node.classList && node.classList.contains(target_class)) {
      return node;
    } else if (node.parentNode) {
      return classSignal(node.parentNode, target_class);
    } else {
      return false;
    }
  };

  var ECOMMERCE_PIN_DEFAULT = {
    color: '#222222',
    label: i18n.__('(no content)', 'pinpoint'),
    price: null,
    link: '#',
    shape: 'circle',
    stamp: null,
    stamp_color: '#FFFFFF',
    size: '24px',
    theme: 'dark',
    x: '50%',
    y: '50%',
    trigger: 'hover',
    target: '_self',
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

    state.label = el.innerHTML || ECOMMERCE_PIN_DEFAULT.label;
    state.custom_class = el.getAttribute('class') || '';

    if (el.hasAttribute('href')) {
      state.link = el.getAttribute('href') || ECOMMERCE_PIN_DEFAULT.href;
    }

    if (el.hasAttribute('data-shape')) {
      state.shape = el.getAttribute('data-shape') || ECOMMERCE_PIN_DEFAULT.shape;
    }

    if (el.hasAttribute('data-stamp')) {
      state.stamp = el.getAttribute('data-stamp') || ECOMMERCE_PIN_DEFAULT.stamp;
    }

    if (el.hasAttribute('data-stamp-color')) {
      state.stamp_color = el.getAttribute('data-stamp-color') || ECOMMERCE_PIN_DEFAULT.stamp_color;
    }

    if (el.hasAttribute('data-size')) {
      state.size = el.getAttribute('data-size') || ECOMMERCE_PIN_DEFAULT.size;
    }

    if (el.hasAttribute('data-price')) {
      state.price = el.getAttribute('data-price') || ECOMMERCE_PIN_DEFAULT.price;
    }

    if (el.hasAttribute('data-x')) {
      state.x = el.getAttribute('data-x') || ECOMMERCE_PIN_DEFAULT.x;
    }

    if (el.hasAttribute('data-y')) {
      state.y = el.getAttribute('data-y') || ECOMMERCE_PIN_DEFAULT.y;
    }

    if (el.hasAttribute('data-theme')) {
      state.theme = el.getAttribute('data-theme') || ECOMMERCE_PIN_DEFAULT.theme;
    }

    if (el.hasAttribute('target')) {
      state.target = el.getAttribute('target') || ECOMMERCE_PIN_DEFAULT.target;
    }

    if (el.hasAttribute('data-trigger')) {
      state.trigger = el.getAttribute('data-trigger') || ECOMMERCE_PIN_DEFAULT.trigger;
    }

    return state;
  };

  var EcommercePin = /*#__PURE__*/function (_Pin) {
    _inherits(EcommercePin, _Pin);

    var _super = _createSuper(EcommercePin);

    function EcommercePin() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, EcommercePin);

      _this = _super.call(this, options);
      _this.state = Object.assign({}, ECOMMERCE_PIN_DEFAULT, options);
      _this.cache = {};
      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }

    _createClass(EcommercePin, [{
      key: "setLink",
      value: function setLink() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.link;

        if (this.cache.pin) {
          this.cache.pin.setAttribute('href', url);
        }

        this.state.link = url;
      }
    }, {
      key: "setLabel",
      value: function setLabel() {
        var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.label;

        if (this.cache.label) {
          this.cache.label.innerHTML = label;
        } else if (this.cache.pin) {
          var label_el = document.createElement('span');
          label_el.className = 'ecommerce-pin__label';
          label_el.innerHTML = label;
          this.cache.pin.appendChild(label_el);
          this.cache.label = label_el;
        }

        this.state.label;
      }
    }, {
      key: "setPrice",
      value: function setPrice(price) {
        if (this.cache.price) {
          this.cache.price.textContent = price;
        } else if (this.cache.pin) {
          var price_el = document.createElement('span');
          price_el.className = 'ecommerce-pin__price';
          price_el.textContent = price;
          this.cache.pin.prepend(price_el);
          this.cache.price = price_el;
        }

        this.cache.pin.setAttribute('data-price', price);
        this.state.price = price;
      }
    }, {
      key: "removePrice",
      value: function removePrice() {
        if (this.cache.price) {
          this.cache.price.remove();
          this.cache.price = null;
        }

        this.cache.pin.removeAttribute('data-price');
        this.state.price = null;
      }
    }, {
      key: "setSize",
      value: function setSize() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.href;

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
        var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.shape;

        if (this.cache.bullet) {
          this.cache.bullet.classList.remove("ecommerce-pin__bullet_".concat(this.state.shape));
          this.cache.bullet.classList.add("ecommerce-pin__bullet_".concat(shape));
        }

        if (this.cache.pin) {
          this.cache.pin.setAttribute('data-shape', shape);
        }

        this.state.shape = shape;
      }
    }, {
      key: "setColor",
      value: function setColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.color;

        if (this.cache.pin) {
          this.cache.pin.style.color = color;
          this.cache.pin.setAttribute('data-color', color);
        }

        this.state.color = color;
      }
    }, {
      key: "setTheme",
      value: function setTheme() {
        var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.theme;

        if (this.cache.pin) {
          this.cache.pin.classList.remove("ecommerce-pin_".concat(this.state.theme));
          this.cache.pin.classList.add("ecommerce-pin_".concat(theme));
          this.cache.pin.setAttribute('data-theme', theme);
        }

        this.state.theme = theme;
      }
    }, {
      key: "setStamp",
      value: function setStamp() {
        var stamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.stamp;

        if (this.cache.stamp) {
          this.cache.stamp.innerHTML = stamp;
        } else if (this.cache.pin) {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = stamp;
          stamp_el.className = 'ecommerce-pin__stamp';
          stamp_el.style.lineHeight = this.state.size;
          this.cache.pin.appendChild(stamp_el);
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

        this.state.stamp = '';
      }
    }, {
      key: "setX",
      value: function setX() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.x;

        if (this.cache.pin) {
          this.cache.pin.style.left = x;
          this.cache.pin.setAttribute('data-x', x);
        }

        this.state.x = x;
      }
    }, {
      key: "setY",
      value: function setY() {
        var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.y;

        if (this.cache.pin) {
          this.cache.pin.style.top = y;
          this.cache.pin.setAttribute('data-y', y);
        }

        this.state.y = y;
      }
    }, {
      key: "setTarget",
      value: function setTarget() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.target;

        if (this.cache.pin) {
          this.pin.setAttcribute('target', target);
        }

        this.state.target = target;
      }
    }, {
      key: "setStampColor",
      value: function setStampColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.stamp_color;

        if (this.cache.stamp) {
          this.cache.stamp.style.color = color;
        }

        if (this.cache.pin) {
          this.cache.pin.setAttribute('data-stamp-color', color);
        }

        this.state.stamp_color = color;
      }
    }, {
      key: "setTrigger",
      value: function setTrigger() {
        var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ECOMMERCE_PIN_DEFAULT.trigger;

        if (this.cache.pin) {
          this.cache.pin.setAttribute('data-trigger', trigger);
        }

        this.state.trigger = trigger;
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
          link = ECOMMERCE_PIN_DEFAULT.link;
        }

        pin_el.setAttribute('href', link);
        var custom_class;

        if (state.custom_class) {
          custom_class = state.custom_class;
        } else {
          custom_class = ECOMMERCE_PIN_DEFAULT.custom_class;
        }

        var theme;

        if (state.theme) {
          theme = state.theme;
        } else {
          theme = ECOMMERCE_PIN_DEFAULT.theme;
        }

        if (state.target) {
          pin_el.setAttribute('target', state.target);
        } else {
          pin_el.setAttribute('target', ECOMMERCE_PIN_DEFAULT.target);
        }

        pin_el.setAttribute('data-target', state.target);

        if (custom_class) {
          pin_el.className = "ecommerce-pin ecommerce-pin_".concat(theme, " ").concat(custom_class);
        } else {
          pin_el.className = "ecommerce-pin ecommerce-pin_".concat(theme);
        }

        pin_el.setAttribute('data-theme', theme);
        var color;

        if (state.color) {
          color = state.color;
        } else {
          color = ECOMMERCE_PIN_DEFAULT.color;
        }

        pin_el.style.color = color;
        pin_el.setAttribute('data-color', color);
        var x;

        if (state.x) {
          x = state.x;
        } else {
          x = ECOMMERCE_PIN_DEFAULT.x;
        }

        pin_el.style.left = x;
        pin_el.setAttribute('data-x', x);
        var y;

        if (state.y) {
          y = state.y;
        } else {
          y = ECOMMERCE_PIN_DEFAULT.y;
        }

        pin_el.style.top = y;
        pin_el.setAttribute('data-y', y);
        var label;

        if (state.label) {
          label = state.label;
        } else {
          label = ECOMMERCE_PIN_DEFAULT.label;
        }

        if (label) {
          var label_el = document.createElement('span');
          label_el.className = 'ecommerce-pin__label';
          label_el.innerHTML = label;
          pin_el.appendChild(label_el);
          this.cache.label = label_el;
        }

        var price;

        if (state.price) {
          price = state.price;
        } else {
          price = ECOMMERCE_PIN_DEFAULT.price;
        }

        if (price) {
          var price_el = document.createElement('span');
          price_el.className = 'ecommerce-pin__price';
          price_el.textContent = price;
          pin_el.prepend(price_el);
          this.cache.price = price_el;
          pin_el.setAttribute('data-price', price);
        }

        var bullet_el = document.createElement('span');
        bullet_el.className = "ecommerce-pin__bullet";
        var shape;

        if (state.shape) {
          shape = state.shape;
        } else {
          shape = ECOMMERCE_PIN_DEFAULT.shape;
        }

        bullet_el.classList.add("ecommerce-pin__bullet_".concat(shape));
        pin_el.setAttribute('data-shape', shape);
        var size;

        if (state.size) {
          size = state.size;
        } else {
          size = ECOMMERCE_PIN_DEFAULT.size;
        }

        bullet_el.style.width = size;
        bullet_el.style.height = size;
        bullet_el.style.fontSize = size;
        pin_el.setAttribute('data-size', size);
        var stamp;

        if (state.stamp) {
          stamp = state.stamp;
        } else {
          stamp = ECOMMERCE_PIN_DEFAULT.stamp;
        }

        if (stamp) {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = stamp;
          stamp_el.className = 'ecommerce-pin__stamp';
          stamp_el.style.lineHeight = size;
          bullet_el.appendChild(stamp_el);
          var stamp_color;

          if (state.stamp_color) {
            stamp_color = state.stamp_color;
          } else {
            stamp_color = ECOMMERCE_PIN_DEFAULT.stamp_color;
          }

          stamp_el.style.color = stamp_color;
          pin_el.setAttribute('data-stamp-color', stamp_color);
          this.cache.stamp = stamp_el;
          pin_el.setAttribute('data-stamp', stamp);
        }

        pin_el.prepend(bullet_el);
        this.cache.bullet = bullet_el;
        var trigger;

        if (state.trigger) {
          trigger = state.trigger;
        } else {
          trigger = ECOMMERCE_PIN_DEFAULT.trigger;
        }

        var pass = false;
        /* Add events */

        if (trigger == 'click' || 'ontouchstart' in window) {
          pin_el.addEventListener('click', function (ev) {
            if (!pass) {
              ev.preventDefault();
              ev.currentTarget.classList.add('ecommerce-pin_active');
              pass = true;
              return;
            }

            ev.currentTarget.classList.remove('ecommerce-pin_active');
            pass = false;
          });
        } else if (trigger == 'hover') {
          var close_timer = false;
          bullet_el.addEventListener('mouseover', function (ev) {
            pin_el.classList.add('ecommerce-pin_active');
            close_timer = true;
            setTimeout(function () {
              close_timer = false;
            }, 35);
          });
          pin_el.addEventListener('mouseleave', function (ev) {
            if (!close_timer) {
              ev.currentTarget.classList.remove('ecommerce-pin_active');
            }
          });
        }

        document.addEventListener('click', function (ev) {
          var ecommerce_pin = classSignal(ev.target, 'ecommerce-pin');

          if (!ecommerce_pin || ecommerce_pin != pin_el) {
            pin_el.classList.remove('ecommerce-pin_active');
            pass = false;
          }
        });
        pin_el.setAttribute('data-trigger', trigger);
        this.cache.pin = pin_el;
        return pin_el;
      }
    }]);

    return EcommercePin;
  }(Pinner.Pin);

  /** @preserve PINPOINT v1.1.1 */
  Pinner__default.addParser({
    name: 'ecommerce',
    "class": EcommercePin,
    parser: parser
  });

}(Pinner, wp.i18n));
