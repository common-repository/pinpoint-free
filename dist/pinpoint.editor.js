(function (editor, components, compose, React$1, i18n, Pinner) {
  'use strict';

  React$1 = React$1 && Object.prototype.hasOwnProperty.call(React$1, 'default') ? React$1['default'] : React$1;
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function SmartAutocomplete(props) {
    var autocompleteList;

    if (props.options.length) {
      autocompleteList = /*#__PURE__*/React.createElement("ul", {
        className: "smart-autocomplete__list"
      }, props.options.map(function (option, index) {
        return /*#__PURE__*/React.createElement("li", {
          key: index,
          onClick: function onClick() {
            return props.onChoice(option);
          },
          "class": "smart-autocomplete__list-item"
        }, option.label);
      }));
    } else {
      autocompleteList = '';
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "smart-autocomplete"
    }, /*#__PURE__*/React.createElement(components.TextControl, {
      label: props.label,
      value: props.value,
      onChange: props.onChange,
      className: "smart-autocomplete__input"
    }), autocompleteList);
  }

  var getOptions = function getOptions(source, search) {
    return new Promise(function (resolve, reject) {
      wp.api.loadPromise.done(function () {
        if (source == 'product' && wp.api.collections.Product) {
          var product_collection = new wp.api.collections.Product();
          product_collection.fetch({
            data: {
              search: search
            }
          }).done(function (products) {
            resolve(products.map(function (product) {
              return {
                id: product.id,
                label: product.title.rendered,
                link: product.link,
                type: 'product'
              };
            }));
          }).fail(reject);
        } else if (source == 'post') {
          var posts_collection = new wp.api.collections.Posts();
          posts_collection.fetch({
            data: {
              search: search
            }
          }).done(function (posts) {
            resolve(posts.map(function (post) {
              return {
                id: post.id,
                label: post.title.rendered,
                link: post.link,
                type: 'post'
              };
            }));
          }).fail(reject);
        } else if (source == 'page') {
          var page_collection = new wp.api.collections.Pages();
          page_collection.fetch({
            data: {
              search: search
            }
          }).done(function (pages) {
            resolve(pages.map(function (page) {
              return {
                id: page.id,
                label: page.title.rendered,
                link: page.link,
                type: 'page'
              };
            }));
          }).fail(reject);
        } else if (source == 'category') {
          var category_collection = new wp.api.collections.Categories();
          category_collection.fetch({
            data: {
              search: search
            }
          }).done(function (categories) {
            resolve(categories.map(function (category) {
              return {
                id: category.id,
                label: category.name,
                link: category.link,
                type: 'category'
              };
            }));
          }).fail(reject);
        } else {
          resolve([]);
        }
      });
    });
  };

  var handleError = function handleError(error) {
    alert(error);
  };

  var PinConfig = /*#__PURE__*/function (_React$Component) {
    _inherits(PinConfig, _React$Component);

    var _super = _createSuper(PinConfig);

    function PinConfig() {
      _classCallCheck(this, PinConfig);

      return _super.apply(this, arguments);
    }

    _createClass(PinConfig, [{
      key: "render",
      value: function render() {
        var _this = this;

        var pin = this.props.pin;
        var editZone = this.props.editZone;

        if (pin) {
          var PinColor = compose.withState({
            color: pin.getState('color')
          })(function (_ref) {
            var color = _ref.color,
                setState = _ref.setState;
            return /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement("label", null, i18n.__('Pin color', 'pinpoint'), /*#__PURE__*/React$1.createElement(components.ColorPicker, {
              color: color,
              onChange: function onChange() {
                return _this.props.save('style');
              },
              onChangeComplete: function onChangeComplete(color) {
                pin.setColor(color.hex);
                setState({
                  color: color
                });
              },
              disableAlpha: true,
              onBlur: function onBlur() {
                return _this.props.save('style');
              }
            })));
          });
          var PinStampColor = compose.withState({
            stamp_color: pin.getState('stamp_color')
          })(function (_ref2) {
            var stamp_color = _ref2.stamp_color,
                setState = _ref2.setState;
            return /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement("label", null, i18n.__('Stamp color', 'pinpoint'), /*#__PURE__*/React$1.createElement(components.ColorPicker, {
              color: stamp_color,
              onChange: function onChange() {
                return _this.props.save('style');
              },
              onChangeComplete: function onChangeComplete(stamp_color) {
                pin.setStampColor(stamp_color.hex);
                setState({
                  stamp_color: stamp_color
                });
              },
              disableAlpha: true,
              onBlur: function onBlur() {
                return _this.props.save('style');
              }
            })));
          });
          var PinStamp = compose.withState({
            stamp: pin.getState('stamp') || ''
          })(function (_ref3) {
            var stamp = _ref3.stamp,
                setState = _ref3.setState;
            return /*#__PURE__*/React$1.createElement(components.TextControl, {
              label: i18n.__('Stamp', 'pinpoint'),
              value: stamp,
              onChange: function onChange(stamp) {
                pin.setStamp(stamp);
                setState({
                  stamp: stamp
                });
              },
              onBlur: function onBlur() {
                return _this.props.save('style');
              },
              placeholder: i18n.__('Stamp', 'pinpoint')
            });
          });
          var PinLink = compose.withState({
            link: pin.getData('link')
          })(function (_ref4) {
            var link = _ref4.link,
                setState = _ref4.setState;
            return /*#__PURE__*/React$1.createElement(components.TextControl, {
              label: i18n.__('Link', 'pinpoint'),
              value: link,
              onChange: function onChange(link) {
                pin.setData({
                  link: link
                });
                setState({
                  link: link
                });
              },
              onBlur: function onBlur() {
                return _this.props.save('info');
              },
              placeholder: i18n.__('Link', 'pinpoint')
            });
          });
          var PinLinkTarget = compose.withState({
            target: pin.getData('target')
          })(function (_ref5) {
            var target = _ref5.target,
                setState = _ref5.setState;
            return /*#__PURE__*/React$1.createElement(components.SelectControl, {
              label: i18n.__('Link target', 'pinpoint'),
              value: target,
              onChange: function onChange(target) {
                pin.setData({
                  target: target
                });

                _this.props.save('info');
              },
              options: [{
                value: '_self',
                label: i18n.__('Default', 'pinpoint')
              }, {
                value: '_blank',
                label: i18n.__('New window', 'pinpoint')
              }]
            });
          });
          var PinTrigger = compose.withState({
            trigger: pin.getData('trigger')
          })(function (_ref6) {
            var trigger = _ref6.trigger,
                setState = _ref6.setState;
            return /*#__PURE__*/React$1.createElement(components.SelectControl, {
              label: i18n.__('Trigger', 'pinpoint'),
              value: trigger,
              onChange: function onChange(trigger) {
                pin.setData({
                  trigger: trigger
                });

                _this.props.save('info');
              },
              options: [{
                value: 'hover',
                label: i18n.__('Hover', 'pinpoint')
              }, {
                value: 'click',
                label: i18n.__('Click', 'pinpoint')
              }]
            });
          });
          var PinPrice = compose.withState({
            price: pin.getData('price') || ''
          })(function (_ref7) {
            var price = _ref7.price,
                setState = _ref7.setState;
            return /*#__PURE__*/React$1.createElement(components.TextControl, {
              label: i18n.__('Price', 'pinpoint'),
              value: price,
              onChange: function onChange(price) {
                pin.setData({
                  price: price
                });
                setState({
                  price: price
                });
              },
              onBlur: function onBlur() {
                return _this.props.save('info');
              },
              placeholder: i18n.__('Price', 'pinpoint')
            });
          });
          var PinLabel = compose.withState({
            label: pin.getData('label')
          })(function (_ref8) {
            var label = _ref8.label,
                setState = _ref8.setState;
            return /*#__PURE__*/React$1.createElement(components.TextareaControl, {
              label: i18n.__('Label', 'pinpoint'),
              value: label,
              onChange: function onChange(label) {
                pin.setData({
                  label: label
                });
                setState({
                  label: label
                });
              },
              onBlur: function onBlur() {
                return _this.props.save('info');
              },
              placeholder: i18n.__('Label', 'pinpoint')
            });
          });
          var PinSize = compose.withState({
            size: Number.parseInt(pin.getState('size'))
          })(function (_ref9) {
            var size = _ref9.size,
                setState = _ref9.setState;
            return /*#__PURE__*/React$1.createElement(components.RangeControl, {
              label: i18n.__('Size', 'pinpoint'),
              value: size,
              onChange: function onChange(size) {
                pin.setSize(size + 'px');
                setState({
                  size: size
                });
              },
              min: 18,
              max: 52,
              onBlur: function onBlur() {
                return _this.props.save('style');
              }
            });
          });
          var PinSource = compose.withState({
            source: 'custom',
            search: '',
            options: []
          })(function (_ref10) {
            var source = _ref10.source,
                search = _ref10.search,
                options = _ref10.options,
                setState = _ref10.setState;
            var autocomplete;

            if (source != 'custom') {
              autocomplete = /*#__PURE__*/React$1.createElement(SmartAutocomplete, {
                label: i18n.__('Find', 'pinpoint'),
                id: source,
                value: search,
                onChange: function onChange(search_text) {
                  setState({
                    search: search_text
                  });

                  if (search_text.length % 2 == 0) {
                    getOptions(source, search_text).then(function (options) {
                      setState({
                        options: options
                      });
                    })["catch"](handleError);
                  } else {
                    setState({
                      search: search_text
                    });
                  }
                },
                onChoice: function onChoice(option) {
                  if (option.type == 'product') {
                    fetch("".concat(wpApiSettings.root, "pinpoint/v1/product/").concat(option.id)).then(function (result) {
                      return result.json();
                    }).then(function (product_option) {
                      if (product_option.price) {
                        pin.setData(product_option);
                      } else {
                        pin.setData(option);
                      }

                      _this.props.save('info');
                    })["catch"](handleError);
                  } else {
                    if (!option.price) {
                      option.price = '';
                    }

                    pin.setData(option);

                    _this.props.save('info');
                  }
                },
                options: options
              });
            }

            return /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement(components.SelectControl, {
              label: i18n.__('Source', 'pinpoint'),
              value: source,
              onChange: function onChange(source) {
                return setState({
                  source: source
                });
              },
              options: [{
                value: 'custom',
                label: i18n.__('Custom', 'pinpoint')
              }, {
                value: 'product',
                label: i18n.__('Product', 'pinpoint')
              }, {
                value: 'post',
                label: i18n.__('Post', 'pinpoint')
              }, {
                value: 'page',
                label: i18n.__('Page', 'pinpoint')
              }, {
                value: 'category',
                label: i18n.__('Category', 'pinpoint')
              }]
            }), autocomplete, /*#__PURE__*/React$1.createElement("br", null));
          });
          var PinShape = compose.withState({
            shape: pin.getState('shape')
          })(function (_ref11) {
            var shape = _ref11.shape,
                setState = _ref11.setState;
            return /*#__PURE__*/React$1.createElement(components.SelectControl, {
              label: i18n.__('Shape', 'pinpoint'),
              value: shape,
              onChange: function onChange(shape) {
                pin.setShape(shape);

                _this.props.save('style');
              },
              options: [{
                value: 'circle',
                label: i18n.__('Circle', 'pinpoint')
              }, {
                value: 'square',
                label: i18n.__('Square', 'pinpoint')
              }]
            });
          });
          var PinTheme = compose.withState({
            theme: pin.getData('theme')
          })(function (_ref12) {
            var theme = _ref12.theme,
                setState = _ref12.setState;
            return /*#__PURE__*/React$1.createElement(components.SelectControl, {
              label: i18n.__('Theme', 'pinpoint'),
              value: theme,
              onChange: function onChange(theme) {
                pin.setData({
                  theme: theme
                });

                _this.props.save('style');
              },
              options: [{
                value: 'light',
                label: i18n.__('Light', 'pinpoint')
              }, {
                value: 'dark',
                label: i18n.__('Dark', 'pinpoint')
              }]
            });
          });

          var PinInfo = function PinInfo() {
            return /*#__PURE__*/React$1.createElement(components.PanelBody, {
              title: i18n.__('Pin settings', 'pinpoint'),
              initialOpen: true
            }, /*#__PURE__*/React$1.createElement(PinLink, null), /*#__PURE__*/React$1.createElement(PinLabel, null));
          };

          var PinStyle = function PinStyle() {
            return /*#__PURE__*/React$1.createElement(components.PanelBody, {
              title: i18n.__('Pin style', 'pinpoint'),
              initialOpen: editZone == 'style'
            }, /*#__PURE__*/React$1.createElement(PinStamp, null), /*#__PURE__*/React$1.createElement(PinShape, null));
          };

          var PinDelete = function PinDelete() {
            return /*#__PURE__*/React$1.createElement(components.PanelBody, {
              title: i18n.__('Pin delete', 'pinpoint'),
              initialOpen: true
            }, /*#__PURE__*/React$1.createElement(components.Button, {
              onClick: _this.props["delete"],
              isPrimary: true
            }, i18n.__('Delete', 'pinpoint')));
          };

          return /*#__PURE__*/React$1.createElement(editor.InspectorControls, null, /*#__PURE__*/React$1.createElement(components.Panel, null, /*#__PURE__*/React$1.createElement(PinInfo, null), /*#__PURE__*/React$1.createElement(PinStyle, null), /*#__PURE__*/React$1.createElement(PinDelete, null)));
        } else {
          return /*#__PURE__*/React$1.createElement(editor.InspectorControls, null, /*#__PURE__*/React$1.createElement(components.PanelBody, null, /*#__PURE__*/React$1.createElement(components.Notice, {
            status: "warning",
            isDismissible: false
          }, i18n.__('Choose a pin to edit.', 'pinpoint'))));
        }
      }
    }]);

    return PinConfig;
  }(React$1.Component);

  var randomColor = function randomColor() {
    return ['red', 'blue', 'green', 'orange'][Math.floor(Math.random() * 10 % 4)];
  };
  var classSignal = function classSignal(node, target_class) {
    if (node.classList && node.classList.contains(target_class)) {
      return node;
    } else if (node.parentNode) {
      return classSignal(node.parentNode, target_class);
    } else {
      return false;
    }
  };

  var CONTROL_PIN_DEFAULT = {
    color: '#222222',
    title: '',
    shape: 'circle',
    stamp: null,
    stamp_color: '#FFFFFF',
    size: '24px',
    x: '50%',
    y: '50%',
    onmove: function onmove(coords, _final) {},
    onselect: function onselect() {},
    data: {},
    highlight: false,
    custom_class: ''
  };

  var ControlPin = /*#__PURE__*/function (_Pin) {
    _inherits(ControlPin, _Pin);

    var _super = _createSuper(ControlPin);

    function ControlPin() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ControlPin);

      _this = _super.call(this, options);
      _this.state = {
        color: options.color || CONTROL_PIN_DEFAULT.color,
        title: options.title || CONTROL_PIN_DEFAULT.title,
        shape: options.shape || CONTROL_PIN_DEFAULT.shape,
        stamp: options.stamp || CONTROL_PIN_DEFAULT.stamp,
        stamp_color: options.stamp_color || CONTROL_PIN_DEFAULT.stamp_color,
        size: options.size || CONTROL_PIN_DEFAULT.size,
        x: options.x || CONTROL_PIN_DEFAULT.x,
        y: options.y || CONTROL_PIN_DEFAULT.y,
        onmove: options.onmove || CONTROL_PIN_DEFAULT.onmove,
        onselect: options.onselect || CONTROL_PIN_DEFAULT.onselect,
        data: options.data || CONTROL_PIN_DEFAULT.data,
        highlight: options.highlight || CONTROL_PIN_DEFAULT.highlight
      };
      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }

    _createClass(ControlPin, [{
      key: "setTitle",
      value: function setTitle() {
        var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.title;
        this.cache.pin.setAttribute('title', title);
        this.state.title = title;
      }
    }, {
      key: "setSize",
      value: function setSize() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.size;

        if (!size) {
          return;
        }

        this.cache.bullet.style.width = size;
        this.cache.bullet.style.height = size;

        if (this.cache.stamp) {
          this.cache.stamp.style.lineHeight = size;
        }

        this.cache.bullet.style.fontSize = size;
        this.state.size = size;
        this.cache.pin.setAttribute('data-size', size);
      }
    }, {
      key: "setShape",
      value: function setShape() {
        var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.shape;
        this.cache.pin.classList.remove("control-pin_".concat(this.state.shape));
        this.cache.pin.classList.add("control-pin_".concat(shape));
        this.state.shape = shape;
        this.cache.pin.setAttribute('data-shape', shape);
      }
    }, {
      key: "setColor",
      value: function setColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.color;
        this.cache.pin.style.color = color;
        this.state.color = color;
        this.cache.pin.setAttribute('data-color', color);
      }
    }, {
      key: "setStamp",
      value: function setStamp() {
        var stamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.stamp;

        if (this.cache.stamp) {
          this.cache.stamp.innerHTML = stamp;
        } else {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = stamp;
          stamp_el.className = 'control-pin__stamp';
          stamp_el.style.lineHeight = this.state.size;

          if (this.cache.bullet) {
            this.cache.bullet.append(stamp_el);
          }

          this.cache.stamp = stamp_el;
        }

        if (this.cache.pin) {
          this.cache.pin.setAttribute('data-stamp', stamp);
        }

        this.state.stamp = stamp;
      }
    }, {
      key: "getState",
      value: function getState(key) {
        return this.state[key];
      }
    }, {
      key: "setState",
      value: function setState(data) {
        Object.assign(this.state, data);
      }
    }, {
      key: "removeStamp",
      value: function removeStamp() {
        if (this.cache.stamp) {
          this.cache.stamp.remove();
        }

        this.state.stamp = '';
        this.cache.stamp = null;
        this.cache.pin.removeAttribute('data-stamp', stamp);
      }
    }, {
      key: "highlight",
      value: function highlight() {
        if (this.cache.pin) {
          this.cache.pin.classList.add('control-pin__highlight');
        }

        this.state.highlight = true;
      }
    }, {
      key: "setX",
      value: function setX() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.x;
        this.cache.pin.style.left = x;
        this.state.x = x;
        this.cache.pin.setAttribute('data-x', x);
      }
    }, {
      key: "setY",
      value: function setY() {
        var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.y;
        this.cache.pin.style.top = y;
        this.state.y = y;
        this.cache.pin.setAttribute('data-y', y);
      }
    }, {
      key: "setData",
      value: function setData(data) {
        this.state.data = Object.assign({}, this.state.data, data);
      }
    }, {
      key: "getData",
      value: function getData(key) {
        if (this.state.data[key]) {
          return this.state.data[key];
        } else {
          return null;
        }
      }
    }, {
      key: "export",
      value: function _export() {
        return Object.assign({}, this.state);
      }
    }, {
      key: "unhighlight",
      value: function unhighlight() {
        if (this.cache.pin) {
          this.cache.pin.classList.remove('control-pin_highlight');
        }

        this.state.highlight = false;
      }
    }, {
      key: "setStampColor",
      value: function setStampColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTROL_PIN_DEFAULT.stamp_color;

        if (this.cache.stamp) {
          this.cache.stamp.style.color = color;
        }

        if (this.cache.pin) {
          this.cache.pin.setAttribute('data-stamp-color', color);
        }

        this.state.stamp_color = color;
      }
    }, {
      key: "render",
      value: function render(state) {
        var _this2 = this;

        if (!state) {
          state = this.state;
        }

        var pin_el = document.createElement('span');

        if (state.custom_class) {
          pin_el.className = "control-pin ".concat(state.custom_class);
        } else {
          pin_el.className = 'control-pin';
        }

        pin_el.setAttribute('title', state.title);
        pin_el.style.left = state.x;
        pin_el.style.top = state.y;
        pin_el.setAttribute('data-x', state.x);
        pin_el.setAttribute('data-y', state.y);
        pin_el.classList.add("control-pin_".concat(state.shape));
        pin_el.setAttribute('data-shape', state.shape);

        if (state.highlight) {
          pin_el.classList.add('control-pin_highlight');
        }

        pin_el.setAttribute('data-highlight', Number(state.highlight));
        var bullet_el = document.createElement('span');
        bullet_el.className = "control-pin__bullet";
        bullet_el.style.width = state.size;
        bullet_el.style.height = state.size;
        bullet_el.style.fontSize = state.size;
        pin_el.setAttribute('data-size', state.size); //Draging

        var start_event = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
        var end_event = 'ontouchend' in window ? 'touchend' : 'mouseup';
        var drag = null;
        bullet_el.addEventListener(start_event, function (ev) {
          ev.stopPropagation();
          var pinner = classSignal(ev.currentTarget, 'pinner');
          drag = {
            pin: pin_el,
            start_coords: {
              x: _this2.state.x,
              y: _this2.state.y
            },
            parent_box: pinner.getBoundingClientRect()
          };
        });
        document.addEventListener(end_event, function (ev) {
          if (drag) {
            var delta_x = Math.abs(Number.parseInt(drag.start_coords.x) - Number.parseInt(_this2.state.x));
            var delta_y = Math.abs(Number.parseInt(drag.start_coords.y) - Number.parseInt(_this2.state.y)); //A change of 1% or larger

            if (state.onmove && (delta_x > 1 || delta_y > 1)) {
              state.onmove({
                x: drag.pin.style.left,
                y: drag.pin.style.top,
                is_final: true
              });
            }

            drag = null;
          }
        });
        document.addEventListener('mousemove', function (ev) {
          if (drag) {
            if (ev.pageX > drag.parent_box.left + drag.pin.clientWidth / 2 && ev.pageX < drag.parent_box.right - drag.pin.clientWidth / 2) {
              _this2.setX((ev.pageX - drag.parent_box.left) * 100 / drag.parent_box.width + '%');
            }

            if (ev.pageY > drag.parent_box.top + drag.pin.clientHeight / 2 && ev.pageY < drag.parent_box.bottom - drag.pin.clientHeight / 2) {
              _this2.setY((ev.pageY - drag.parent_box.top) * 100 / drag.parent_box.height + '%');
            }
          }
        });
        var that = this;
        pin_el.addEventListener('click', function (ev) {
          ev.stopPropagation();

          if (state.onselect) {
            state.onselect(that);
          }
        });

        if (state.stamp) {
          var stamp_el = document.createElement('span');
          stamp_el.innerHTML = state.stamp;
          stamp_el.className = 'control-pin__stamp';
          stamp_el.style.lineHeight = state.size;
          bullet_el.append(stamp_el);
          var stamp_color;

          if (state.stamp_color) {
            stamp_color = state.stamp_color;
          } else {
            stamp_color = CONTROL_PIN_DEFAULT.stamp_color;
          }

          stamp_el.style.color = stamp_color;
          pin_el.setAttribute('data-stamp-color', stamp_color);
          pin_el.setAttribute('data-stamp', state.stamp);
          this.cache.stamp = stamp_el;
        }

        this.cache.bullet = bullet_el;
        pin_el.prepend(bullet_el);
        pin_el.style.color = state.color;
        pin_el.setAttribute('data-color', state.color);
        this.cache.pin = pin_el;
        return pin_el;
      }
    }]);

    return ControlPin;
  }(Pinner.Pin);

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  } //Pinner

  var EditPinpoint = /*#__PURE__*/function (_React$Component) {
    _inherits(EditPinpoint, _React$Component);

    var _super = _createSuper(EditPinpoint);

    function EditPinpoint() {
      var _this;

      _classCallCheck(this, EditPinpoint);

      _this = _super.apply(this, arguments);
      _this.pinnerRef = /*#__PURE__*/React$1.createRef();
      _this.setAttributes = _this.props.setAttributes;
      var state = {};
      _this.makePinnerPin = _this.makePinnerPin.bind(_assertThisInitialized(_this));

      if (_this.props.attributes.pins) {
        var pins = _this.props.attributes.pins.map(_this.makePinnerPin);

        if (_this.props.attributes.active) {
          var activePin = pins.find(function (pin) {
            return pin.uuid == _this.props.attributes.active;
          });
          activePin.highlight();
          _this.state.activePin = activePin;
        }

        state.pins = pins;
      } else {
        state.pins = [];
      }

      if (_this.props.attributes.mediaURL) {
        state.media = {
          url: _this.props.attributes.mediaURL,
          title: _this.props.attributes.mediaTitle,
          id: _this.props.attributes.mediaID
        };
      }

      state.editZone = _this.props.attributes.editZone;
      _this.state = state;
      _this.addPin = _this.addPin.bind(_assertThisInitialized(_this));
      _this.save = _this.save.bind(_assertThisInitialized(_this));
      _this.deleteActivePin = _this.deleteActivePin.bind(_assertThisInitialized(_this));
      _this.clearAll = _this.clearAll.bind(_assertThisInitialized(_this));

      var that = _assertThisInitialized(_this);

      document.addEventListener('click', function (ev) {
        if (classSignal(ev.target, 'editor-post-preview') || classSignal(ev.target, 'ditor-post-publish-button')) {
          that.save();
        }
      }, true);
      return _this;
    }

    _createClass(EditPinpoint, [{
      key: "makePinnerPin",
      value: function makePinnerPin(pin_options) {
        var _this2 = this;

        pin_options.onselect = function (target) {
          _this2.state.pins.map(function (pin) {
            return pin.unhighlight();
          });

          target.highlight();

          _this2.setState({
            activePin: target
          });
        };

        pin_options.onmove = function (coords) {
          _this2.save();
        };

        var data = {
          label: pin_options.label,
          price: pin_options.price,
          link: pin_options.link,
          trigger: pin_options.trigger,
          target: pin_options.target,
          theme: pin_options.theme,
          uuid: pin_options.uuid
        };
        var pin = new ControlPin(Object.assign({}, pin_options));
        pin.setData(data);
        return pin;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var pinner_el = this.pinnerRef.current.querySelector('.pinner');

        if (pinner_el) {
          pinner_el.remove();
        }
      }
    }, {
      key: "renderPinner",
      value: function renderPinner() {
        var _this3 = this;

        if (this.pinnerRef.current) {
          var pinner_el = this.pinnerRef.current.querySelector('.pinner');

          if (pinner_el) {
            pinner_el.remove();
          }

          var pinner_candidate = document.createElement('div');
          var pinner = new Pinner__default.Space(pinner_candidate, {
            onclick: function onclick() {
              _this3.setState({
                activePin: null
              });
            }
          });
          pinner.setImage({
            url: this.state.media.url,
            title: this.state.media.title
          });

          for (var i = 0; i < this.state.pins.length; i++) {
            pinner.addPin(this.state.pins[i]);
          }

          this.pinnerRef.current.prepend(pinner_candidate);
        }
      }
    }, {
      key: "save",
      value: function save() {
        var editZone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var attributes = {
          pins: this.state.pins.map(function (pin) {
            var pin_state = pin["export"]();
            return Object.assign({}, pin_state, pin_state.data);
          }),
          editZone: editZone,
          active: this.state.activePin ? this.state.activePin.getData('uuid') : null
        };

        if (this.state.media) {
          attributes.mediaURL = this.state.media.url;
          attributes.mediaTitle = this.state.media.title;
          attributes.mediaID = this.state.media.id;
        }

        this.setAttributes(attributes);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.renderPinner();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.renderPinner();
      }
    }, {
      key: "deleteActivePin",
      value: function deleteActivePin() {
        var _this4 = this;

        if (this.state.activePin) {
          var pins = this.state.pins.filter(function (pin) {
            return pin != _this4.state.activePin;
          });
          this.state.activePin.remove();
          this.setState({
            pins: pins,
            activePin: null
          }, function () {
            _this4.save();
          });
        }
      }
    }, {
      key: "addPin",
      value: function addPin() {
        var _pin_options;

        if (this.state.pins.length + 1 > 3) {
          alert(i18n.__('FREE version limit reached. Buy pro for unlimited pins.', 'pinpoint'));
          return;
        }

        var state = this.state;
        var pin_options = (_pin_options = {
          color: randomColor(),
          stamp: String.fromCharCode(65 + state.pins.length % 26),
          stamp_color: 'rgb(255,255,255)',
          x: '50%',
          y: '50%',
          shape: 'circle',
          target: '_self',
          size: '24px',
          label: i18n.__('(no content)', 'pinpoint'),
          price: '',
          theme: 'dark',
          trigger: 'hover',
          link: '#'
        }, _defineProperty(_pin_options, "theme", 'dark'), _defineProperty(_pin_options, "uuid", uuidv4()), _pin_options);
        var pin = this.makePinnerPin(pin_options);
        this.setState({
          pins: [].concat(_toConsumableArray(state.pins), [pin]),
          activePin: pin
        });
      }
    }, {
      key: "clearAll",
      value: function clearAll() {
        if (confirm(i18n.__('Are you sure?', 'pinpoint'))) {
          this.state.pins.map(function (pin) {
            return pin.remove();
          });
          this.setState({
            pins: []
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        var boardControl;

        if (this.state.pins) {
          boardControl = /*#__PURE__*/React$1.createElement(components.IconButton, {
            label: i18n.__('Clear', 'pinpoint'),
            icon: "editor-removeformatting",
            onClick: this.clearAll
          });
        }

        if (this.state.media) {
          return /*#__PURE__*/React$1.createElement("div", {
            ref: this.pinnerRef
          }, /*#__PURE__*/React$1.createElement(editor.BlockControls, null, /*#__PURE__*/React$1.createElement(components.Toolbar, null, /*#__PURE__*/React$1.createElement(components.IconButton, {
            label: i18n.__('Add pin', 'pinpoint'),
            icon: "plus",
            onClick: this.addPin
          }), boardControl, /*#__PURE__*/React$1.createElement(editor.MediaUpload, {
            onSelect: function onSelect(media) {
              _this5.setState({
                media: media
              });
            },
            allowedTypes: ['image'],
            multiple: false,
            value: Number.parseInt(this.state.media.id),
            render: function render(_ref) {
              var open = _ref.open;
              return /*#__PURE__*/React$1.createElement(components.IconButton, {
                label: i18n.__('Settings', 'pinpoint'),
                icon: "admin-generic",
                onClick: open
              });
            }
          }))), /*#__PURE__*/React$1.createElement(PinConfig, {
            pin: this.state.activePin,
            save: this.save,
            "delete": this.deleteActivePin,
            editZone: this.props.attributes.editZone
          }));
        } else {
          return /*#__PURE__*/React$1.createElement(editor.MediaPlaceholder, {
            allowedTypes: ['image'],
            multiple: false,
            onSelect: function onSelect(media) {
              return _this5.setState({
                media: media
              });
            }
          });
        }
      }
    }]);

    return EditPinpoint;
  }(React$1.Component);

  var SavePinpoint = /*#__PURE__*/function (_React$Component) {
    _inherits(SavePinpoint, _React$Component);

    var _super = _createSuper(SavePinpoint);

    function SavePinpoint(props) {
      _classCallCheck(this, SavePinpoint);

      return _super.call(this, props);
    }

    _createClass(SavePinpoint, [{
      key: "render",
      value: function render() {
        var _this$props$attribute = this.props.attributes,
            mediaURL = _this$props$attribute.mediaURL,
            mediaTitle = _this$props$attribute.mediaTitle,
            mediaID = _this$props$attribute.mediaID,
            pins = _this$props$attribute.pins;
        var pinnerPins = [];

        if (pins) {
          for (var i = 0; i < pins.length; i++) {
            if (pins[i].target == '_blank' || pins[i].target == '_self') {
              pinnerPins.push( /*#__PURE__*/React$1.createElement("a", {
                key: i,
                href: pins[i].link,
                className: "pinner-pin",
                "data-trigger": pins[i].trigger,
                "data-price": pins[i].price,
                "data-color": pins[i].color,
                "data-x": pins[i].x,
                "data-y": pins[i].y,
                "data-shape": pins[i].shape,
                "data-size": pins[i].size,
                "data-stamp": pins[i].stamp,
                "data-stamp-color": pins[i].stamp_color,
                target: pins[i].target,
                "data-theme": pins[i].theme,
                "data-parser": "ecommerce",
                rel: "noreferrer noopener"
              }, pins[i].label));
            } else {
              pinnerPins.push( /*#__PURE__*/React$1.createElement("a", {
                key: i,
                href: pins[i].link,
                className: "pinner-pin",
                "data-trigger": pins[i].trigger,
                "data-price": pins[i].price,
                "data-color": pins[i].color,
                "data-x": pins[i].x,
                "data-y": pins[i].y,
                "data-shape": pins[i].shape,
                "data-size": pins[i].size,
                "data-stamp": pins[i].stamp,
                "data-stamp-color": pins[i].stamp_color,
                target: pins[i].target,
                "data-theme": pins[i].theme,
                "data-parser": "ecommerce"
              }, pins[i].label));
            }
          }
        }

        if (mediaURL) {
          return /*#__PURE__*/React$1.createElement("div", {
            className: this.props.className
          }, /*#__PURE__*/React$1.createElement("div", {
            className: "pinner",
            "data-image": mediaURL,
            "data-title": mediaTitle,
            "data-media-id": mediaID
          }, pinnerPins));
        }

        return;
      }
    }]);

    return SavePinpoint;
  }(React$1.Component);

  var registerBlockType = wp.blocks.registerBlockType;
  var PinpointAttributes = {
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'div.pinner',
      attribute: 'data-image'
    },
    mediaTitle: {
      type: 'string',
      source: 'attribute',
      selector: 'div.pinner',
      attribute: 'data-title'
    },
    mediaID: {
      type: 'string',
      source: 'attribute',
      selector: 'div.pinner',
      attribute: 'data-media-id'
    },
    pins: {
      type: 'array',
      source: 'query',
      selector: 'a.pinner-pin',
      query: {
        color: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-color'
        },
        size: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-size'
        },
        x: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-x'
        },
        y: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-y'
        },
        stamp: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-stamp'
        },
        stamp_color: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-stamp-color'
        },
        shape: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-shape'
        },
        theme: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-theme'
        },
        label: {
          type: 'string',
          source: 'text'
        },
        price: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-price'
        },
        link: {
          type: 'string',
          source: 'attribute',
          attribute: 'href'
        },
        trigger: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-trigger'
        },
        target: {
          type: 'string',
          source: 'attribute',
          attribute: 'target'
        },
        parser: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-parser'
        },
        uuid: {
          type: 'string',
          source: 'attribute',
          attribute: 'data-uuid'
        }
      }
    }
  };
  var tier_inject_block_name = 'pinpoint/image' + '-free';
  var tier_inject_block_title = i18n.__('Pinpoint image', 'pinpoint') + ' (limited)';
  registerBlockType(tier_inject_block_name, {
    title: tier_inject_block_title,
    icon: 'format-image',
    category: 'widgets',
    keywords: [i18n.__('marker', 'pinpoint'), i18n.__('pin', 'pinpoint'), i18n.__('photo', 'pinpoint')],
    attributes: PinpointAttributes,
    edit: EditPinpoint,
    save: SavePinpoint
  });

}(wp.editor, wp.components, wp.compose, React, wp.i18n, Pinner));
