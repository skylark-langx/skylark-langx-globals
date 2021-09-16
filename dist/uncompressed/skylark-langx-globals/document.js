define([
	"./globals"
], function(globals) {
	var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {};

	var doccy;

	if (typeof document !== 'undefined') {
	    doccy = document;
	} else {
        try {
            doccy  = require('min-document');
        } catch(e) {
            console.warn("min-document is not finded!",e);
        }
   	}


	return globals.document = doccy;
});



