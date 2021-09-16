/**
 * skylark-langx-globals - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./globals"],function(e){var n;"undefined"!=typeof global?global:"undefined"!=typeof window&&window;if("undefined"!=typeof document)n=document;else try{n=require("min-document")}catch(e){console.warn("min-document is not finded!",e)}return e.document=n});
//# sourceMappingURL=sourcemaps/document.js.map
