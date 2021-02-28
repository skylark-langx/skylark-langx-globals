define([
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
