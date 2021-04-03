/**
 * skylark-langx-globals - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx-globals/globals',[
	"skylark-langx-ns"
],function(ns) {
	var globals = (function(){
		if (typeof global !== 'undefined' && typeof global !== 'function') {
			// global spec defines a reference to the global object called 'global'
			// https://github.com/tc39/proposal-global
			// `global` is also defined in NodeJS
			return global;
		} else if (typeof window !== 'undefined') {
			// window is defined in browsers
			return window;
		}
		else if (typeof self !== 'undefined') {
			// self is defined in WebWorkers
			return self;
		}
		return this;
	})();

	return ns.attach("langx.globals",globals);

});
define('skylark-langx-globals/console',[
	"./globals"
], function(globals) {
	return globals.console = console;
});
define('skylark-langx-globals/document',[
	"./globals"
], function(globals) {
	var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {};

	var doccy;

	if (typeof document !== 'undefined') {
	    doccy = document;
	} else {
        doccy  = require('min-document');
	}


	return globals.document = doccy;
});




define('skylark-langx-globals/window',[
	"./globals"
], function(globals) {

	var win = (function() {
		if (typeof window !== "undefined") {
		    return window;
		} else {
		    return {};
		}
	})();

	return globals.window = win;
});

define('skylark-langx-globals/main',[
	"./globals",
	"./console",
	"./document",
	"./window"
],function(globals){

	return globals;
});
define('skylark-langx-globals', ['skylark-langx-globals/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-langx-globals.js.map
