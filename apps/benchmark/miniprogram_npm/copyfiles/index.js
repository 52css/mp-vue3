module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1728382081390, function(require, module, exports) {

var path = require('path');
var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var untildify = require('untildify');
var through = require('through2').obj;
var noms = require('noms').obj;
function toStream(array) {
  var length = array.length;
  var i = 0;
  return noms(function (done) {
    if (i >= length) {
      this.push(null);
    }
    this.push(array[i++]);
    done();
  });
}
function depth(string) {
  return path.normalize(string).split(path.sep).length - 1;
}
function dealWith(inPath, up) {
  if (!up) {
    return inPath;
  }
  if (up === true) {
    return path.basename(inPath);
  }
  if (depth(inPath) < up) {
    throw new Error('cant go up that far');
  }
  return path.join.apply(path, path.normalize(inPath).split(path.sep).slice(up));
}
var copyFile = _copyFile;
function _copyFile (src, dst, opts, callback) {
  fs.createReadStream(src)
    .pipe(fs.createWriteStream(dst, {
      mode: opts.mode
    }))
    .once('error', callback)
    .once('finish', function () {
      fs.chmod(dst, opts.mode, function (err) {
        callback(err);
      })
    })
}
if (fs.copyFile) {
  copyFile = function (src, dst, opts, callback) {
    fs.copyFile(src, dst, callback);
  }
}
function makeDebug(config) {
  if (config.verbose) {
    return function (thing) {
      console.log(thing);
    }
  }
  return function () {}
}
module.exports = copyFiles;
function copyFiles(args, config, callback) {
  if (typeof config === 'function') {
    callback = config;
    config = {
      up:0
    };
  }
  if (typeof config !== 'object' && config) {
    config = {
      up: config
    };
  }
  var debug = makeDebug(config);
  var copied = false;
  var opts = config.up || 0;
  var soft = config.soft;
  if (typeof callback !== 'function') {
    throw new Error('callback is not optional');
  }
  var input = args.slice();
  var outDir = input.pop();
  var globOpts = {};
  if (config.exclude) {
    globOpts.ignore = config.exclude;
  }
  if (config.all) {
    globOpts.dot = true;
  }
  if (config.follow) {
    globOpts.follow = true;
  }
  outDir = outDir.startsWith('~') ? untildify(outDir) : outDir;
  toStream(input.map(function(srcP) {return srcP.startsWith('~') ? untildify(srcP) : srcP;}))
  .pipe(through(function (pathName, _, next) {
    var self = this;
    glob(pathName, globOpts, function (err, paths) {
      if (err) {
        return next(err);
      }
      paths.forEach(function (unglobbedPath) {
        debug(`unglobed path: ${unglobbedPath}`);
        self.push(unglobbedPath);
      });
      next();
    });
  }))
  .on('error', callback)
  .pipe(through(function (pathName, _, next) {
    fs.stat(pathName, function (err, pathStat) {
      if (err) {
        return next(err);
      }
      var outName = path.join(outDir, dealWith(pathName, opts));
      function done(){
        mkdirp(path.dirname(outName)).then(()=>{
          next(null, {
            pathName: pathName,
            pathStat: pathStat
          });
        }, next);
      }
      if (pathStat.isDirectory()) {
        debug(`skipping, is directory: ${pathName}`)
        return next();
      }
      if (!pathStat.isFile()) {
        return next(new Error('how can it be neither file nor folder?'))
      }
      if (!soft) {
        return done();
      }
      fs.stat(outName, function(err){
        if(!err){
          //file exists
          return next()
        }
        if (err.code === 'ENOENT') {
          //file does not exist
          return done();
        }
        // other error
        return next(err)
      })
    });
  }))
  .on('error', callback)
  .pipe(through(function (obj, _, next) {

    if (!copied) {
      copied = true;
    }
    var pathName = obj.pathName;
    var pathStat = obj.pathStat;
    var outName = path.join(outDir, dealWith(pathName, opts));
    debug(`copy from: ${pathName}`)
    debug(`copy to: ${outName}`)
    copyFile(pathName, outName, pathStat, next)
  }))
  .on('error', callback)
  .on('finish', function () {
    if (config.error && !copied) {
      return callback(new Error('nothing coppied'));
    }
    callback();
  });
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1728382081390);
})()
//miniprogram-npm-outsideDeps=["path","fs","glob","mkdirp","untildify","through2","noms"]
//# sourceMappingURL=index.js.map