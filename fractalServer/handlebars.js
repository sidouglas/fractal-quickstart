module.exports = require("@frctl/handlebars")({
  helpers: {
    concat: (...args) => args.slice(0, -1).join(""),
    compare(lvalue, operator, rvalue, options) {
      if (arguments.length < 3) {
        throw new Error("Handlebars Helper compare needs 2 parameters");
      }

      const operators = {
        "===": (l, r) => l === r,
        "!==": (l, r) => l !== r,
        "<": (l, r) => l < r,
        ">": (l, r) => l > r,
        "<=": (l, r) => l <= r,
        ">=": (l, r) => l >= r,
        typeof: (l, r) => typeof l === r,
        "||": (l, r) => l || r,
        "&&": (l, r) => l && r,
        "%": (l, r) => parseInt(l, 10) % parseInt(r, 10) === 0,
      };

      let opts = options;
      let rval = rvalue;

      if (opts === undefined) {
        opts = rvalue;
        rval = operator;
      }

      if (!operators[operator]) {
        throw new Error(
          `Handlebars Helper compare doesn't know the operator ${operator}`
        );
      }

      const result = operators[operator](lvalue, rval);

      if (result) {
        return opts.fn(this);
      }

      return opts.inverse(this);
    },
    contains(needle, haystack, options) {
      return haystack && haystack.indexOf(needle) > -1
        ? options.fn(this)
        : options.inverse(this);
    },
    floor: (arg1, arg2, arg3) => Math.floor(eval(`${arg1} ${arg2} ${arg3}`)),
    get: (options) => {
      try {
        return _.get(JSON.parse(options.hash.obj), options.hash.path);
      } catch (e) {
        return _.get(options.hash.obj, options.hash.path);
      }
    },
    getCookie: (root, options) => {
      if (root._env.request.headers.cookie) {
        const cookies = root._env.request.headers.cookie.split("; ");

        if (cookies.length) {
          const cookie = cookies.find((c) =>
            c.split("=")[0] === options.hash.name ? c : false
          );
          const value = cookie
            ? cookie.substr(options.hash.name.length + 1)
            : "";

          try {
            return JSON.parse(value);
          } catch (e) {
            // do nothing.
          }
        }
      }

      return {
        key: "nrl",
        logoVariants: ["badge.svg", "text.svg", "silhouette.svg"],
      };
    },
    // eslint-disable-next-line no-confusing-arrow
    join: (val) => (Array.isArray(val) ? val.join("") : val),
    ifAny: (...args) => {
      const opts = args.pop();
      return args.some(Boolean) ? opts.fn(this) : opts.inverse(this);
    },
    isDev: (root, options) => {
      // eslint-disable-next-line no-underscore-dangle
      if (
        root._env.request.headers.host &&
        root._env.request.headers.host.indexOf("localhost") > -1
      ) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    math(lvalue, operator, rvalue) {
      if (arguments.length < 3) {
        throw new Error("Handlebars Helper math needs 2 parameters");
      }

      const operators = {
        "+": (l, r) => l + r,
        "-": (l, r) => l - r,
        "*": (l, r) => l * r,
        "/": (l, r) => l / r,
        "%": (l, r) => l % r,
      };

      if (!operators[operator]) {
        throw new Error(
          `Handlebars Helper math doesn't know the operator ${operator}`
        );
      }

      return operators[operator](Number(lvalue), Number(rvalue));
    },
    percent: (arg1, arg2) => eval(`(${arg1} / ${arg2} * 100 + '%')`),
    stringify: (json) => JSON.stringify(json, null, 2),
    times: (n, block) => {
      let accum = "";

      for (let i = 0; i < n; i += 1) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === n - 1;
        accum += block.fn(this);
      }

      return accum;
    },
    ternary: (test, yes, no) => (test ? yes : no),
    // eslint-disable-next-line no-confusing-arrow
    typeof: (val) => (Array.isArray(val) ? "array" : typeof val),
    // eslint-disable-next-line no-underscore-dangle
    var: (name, value, context) => {
      context.data.root[name] = value;
    },
  },
});
