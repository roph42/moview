"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(instrument)/./src/_lib/db.js":
/*!************************!*\
  !*** ./src/_lib/db.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\n// Caching the database connection\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    // If a connection exists, return it\n    if (cached.conn) {\n        return cached.conn;\n    }\n    // Otherwise, create a new connection\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            console.log(\"New database connection established\");\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        console.error(\"Error connecting to the database:\", e.message);\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL19saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJLENBQUNBLGFBQWE7SUFDZCxNQUFNLElBQUlHLE1BQ047QUFFUjtBQUVBLGtDQUFrQztBQUNsQyxJQUFJQyxTQUFTQyxPQUFPTixRQUFRO0FBRTVCLElBQUksQ0FBQ0ssUUFBUTtJQUNUQSxTQUFTQyxPQUFPTixRQUFRLEdBQUc7UUFBRU8sTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDM0Q7QUFFQSxlQUFlQztJQUNYLG9DQUFvQztJQUNwQyxJQUFJSixPQUFPRSxJQUFJLEVBQUU7UUFDYixPQUFPRixPQUFPRSxJQUFJO0lBQ3RCO0lBRUEscUNBQXFDO0lBQ3JDLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ2pCLE1BQU1FLE9BQU87WUFDVEMsZ0JBQWdCO1FBQ3BCO1FBRUFOLE9BQU9HLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWFTLE1BQU1HLElBQUksQ0FBQyxDQUFDYjtZQUN2RGMsUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBT2Y7UUFDWDtJQUNKO0lBRUEsSUFBSTtRQUNBSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUN0QyxFQUFFLE9BQU9RLEdBQUc7UUFDUkYsUUFBUUcsS0FBSyxDQUFDLHFDQUFxQ0QsRUFBRUUsT0FBTztRQUM1RGIsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1RO0lBQ1Y7SUFFQSxPQUFPWCxPQUFPRSxJQUFJO0FBQ3RCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3ZpZXdzLy4vc3JjL19saWIvZGIuanM/MmQyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWwnLFxuICAgICk7XG59XG5cbi8vIENhY2hpbmcgdGhlIGRhdGFiYXNlIGNvbm5lY3Rpb25cbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2U7XG5cbmlmICghY2FjaGVkKSB7XG4gICAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcbiAgICAvLyBJZiBhIGNvbm5lY3Rpb24gZXhpc3RzLCByZXR1cm4gaXRcbiAgICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgY3JlYXRlIGEgbmV3IGNvbm5lY3Rpb25cbiAgICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCBvcHRzKS50aGVuKChtb25nb29zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBkYXRhYmFzZSBjb25uZWN0aW9uIGVzdGFibGlzaGVkJyk7XG4gICAgICAgICAgICByZXR1cm4gbW9uZ29vc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb25uZWN0aW5nIHRvIHRoZSBkYXRhYmFzZTonLCBlLm1lc3NhZ2UpO1xuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZSIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./src/_lib/db.js\n");

/***/ }),

/***/ "(instrument)/./src/instrumentation.js":
/*!********************************!*\
  !*** ./src/instrumentation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_lib/db */ \"(instrument)/./src/_lib/db.js\");\n\nasync function register() {\n    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUErQjtBQUV4QixlQUFlQztJQUNsQixNQUFNRCxtREFBT0E7QUFDakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3ZpZXdzLy4vc3JjL2luc3RydW1lbnRhdGlvbi5qcz80ZDMxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25uZWN0IGZyb20gJ0AvX2xpYi9kYidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICAgIGF3YWl0IGNvbm5lY3QoKTtcbn0iXSwibmFtZXMiOlsiY29ubmVjdCIsInJlZ2lzdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(instrument)/./src/instrumentation.js"));
module.exports = __webpack_exports__;

})();