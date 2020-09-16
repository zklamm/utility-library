(function() {
var _ = function(element) {
  function findObjs(param, multiple) {
    var match = multiple ? [] : undefined;
    var paramProps = Object.getOwnPropertyNames(param);

    for (var i = 0; i < element.length; i++) {
      var object = element[i];
      var allMatch = true;

      for (var j = 0; j < paramProps.length; j++) {
        var prop = paramProps[j];
        if (object[prop] !== param[prop]) allMatch = false;
      }

      if (allMatch && multiple) {
        match.push(object);
      } else if (allMatch) {
        match = object;
        return match;
      }
    }

    return match;
  }

  var u = {
    first: function() {
      return element[0];
    },

    last: function() {
      return element[element.length - 1];
    },

    without: function(...args) {
      var newAry = [];

      element.forEach(function(item) {
        if (args.indexOf(item) === -1) newAry.push(item);
      });

      return newAry;
    },

    lastIndexOf: function(value) {
      var idx = -1;

      for (var i = element.length - 1; i >= 0; i--) {
        if (element[i] === value) {
          idx = i;
          break;
        }
      }

      return idx;
    },

    sample: function(qty) {
      var sampled = [];
      var copy = element.slice();

      var get = function() {
        var idx = Math.floor(Math.random() * copy.length);
        var el = copy[idx];
        copy.splice(idx, 1);
        return el;
      };

      if (!qty) return get();

      while (qty) {
        sampled.push(get());
        qty--;
      }

      return sampled;
    },

    findWhere: function(param) {
      return findObjs(param, false);
    },

    where: function(param) {
      return findObjs(param, true);
    },

    pluck: function(key) {
      var values = [];

      element.forEach(function(object) {
        if (object[key]) values.push(object[key]);
      });

      return values;
    },

    keys: function() {
      var keys = [];

      for (var key in element) {
        keys.push(key);
      };

      return keys;
    },

    values: function() {
      var values = [];

      for (var key in element) {
        values.push(element[key]);
      }

      return values;
    },

    pick: function(...props) {
      var newObj = {};

      props.forEach(function(prop) {
        if (prop in element) newObj[prop] = element[prop];
      });

      return newObj;
    },

    omit: function(...props) {
      var newObj = {};

      props.forEach(function(prop) {
        if (!(prop in element)) newObj[prop] = element[prop];
      });

      return newObj;
    },

    has: function(prop) {
      return prop in element;
    },
  };

  (["isElement",
    "isArray",
    "isObject",
    "isFunction",
    "isBoolean",
    "isString",
    "isNumber"]).forEach(function(method) {
    u[method] = function() { _[method].call(u, element); };
  });

  return u;
};

_.range = function(start, stop) {
  var range = [];

  if (stop === undefined) {
    stop = start
    start = 0;
  }

  for (var i = start; i < stop; i++) {
    range.push(i);
  }

  return range;
};

_.extend = function(...objects) {
  var oldObj = objects.pop();
  var newObj = objects[objects.length - 1];

  for (var prop in oldObj) {
    newObj[prop] = oldObj[prop];
  }

  return objects.length === 1 ? newObj : _.extend.apply(_, objects);
};

_.isElement = function(obj) {
  return obj && obj.nodeType === 1;
};

_.isArray = Array.isArray || function(obj) {
  return toString.call(obj) === "[object Array]";
};

_.isObject = function(obj) {
  var type = typeof obj;

  return type === "function" || type === "object" && !!obj;
};

_.isFunction = function(obj) {
  var type = typeof obj;

  return type === "function";
};

(["Boolean", "String", "Number"]).forEach(function(method) {
  _["is" + method] = function(obj) {
    return toString.call(obj) === "[object " + method + "]";
  };
});

window._ = _;
})();
