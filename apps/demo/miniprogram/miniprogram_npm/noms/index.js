module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1728461448461, function(require, module, exports) {


var Readable = require('readable-stream').Readable;
var inherits = require('inherits');
inherits(Noms, Readable);
function Noms (options) {
  Readable.call(this,options);
  this.inProgress = false;
  this.lastPush = void 0;
  this.started = false;
  this.errored = false;
}
Noms.prototype.push = function(chunk, encoding) {
      this.lastPush = Readable.prototype.push.call(this, chunk, encoding);
      return this.lastPush;
  };
Noms.prototype.nom = function (callback) {
  callback(null, null);
};
Noms.prototype._read = function (size) {
  if (this.inProgress || this.errored) {
    return;
  }
  if (this.started === false) {
    this.inProgress = true;
    this.callStart(size);
    return;
  }
  this.inProgress = true;
  this.callRead(size);
};
Noms.prototype._before = function (next) {
  next();
};
Noms.prototype.callRead = function (size) {
  var useSize = this.nom.length > 1;
  // so if nothing is pushed, we'll go agian
  this.lastPush = true;
  var self = this;
  function cb(err, chunk) {
    if (err) {
      self.errored = true;
      self.inProgress = false;
      self.emit('error', err);
      return;
    }
    if (chunk !== undefined) {
      self.push(chunk);
    }
    if (self.lastPush) {
      return self.callRead(size);
    } else {
      self.inProgress = false;
    }
  }
  if (useSize) {
    this.nom(size, cb);
  } else {
     this.nom(cb);
  }
};
Noms.prototype.callStart = function (size) {
  var self = this;
  function cb(err, chunk) {
    self.started = true;
    if (err) {
      self.errored = true;
      self.inProgress = false;
      self.emit('error', err);
      return;
    }
    if (chunk !== undefined) {
      self.push(chunk);
    }
    self.callRead(size);
  }
  this._before(cb);
};
function ctor(read, before) {
  inherits(YourStream, Noms);
  function YourStream (opts) {
    Noms.call(this, opts);
  }
  YourStream.prototype.nom = read;
  if (typeof before === 'function') {
    YourStream.prototype._before = before;
  }
  return YourStream;
}
module.exports = exports = function(options, read, before) {
  if (typeof options === 'function') {
    before = read;
    read = options;
    options = {};
  }
  return new (ctor(read, before))(options);
};
exports.ctor = ctor;
exports.obj = function(options, read, before) {
  var out = {};
  if (typeof options === 'function') {
    before = read;
    read = options;
    options = undefined;
  }
  options = options || {};
  Object.keys(options).forEach(function (key) {
    out[key] = options[key];
  });
  out.objectMode = true;
  return new (ctor(read, before))(out);
};
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1728461448461);
})()
//miniprogram-npm-outsideDeps=["readable-stream","inherits"]
//# sourceMappingURL=index.js.map