define([
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



