module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  function repl(code, filename) {
    var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;
    var reg = /(\}\)\(window,\s*document\);)/
    code = code.replace(reg, ';define("' + id + '",[],function(){return angular;});$1')
    return code;
  }

  function replModule(code, filename, moduleName) {
    var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;
    var regHead = /(\(function\([a-zA-Z]+,\s*[a-zA-Z]+,\s*[a-zA-Z]+\)\s*\{)/
    var regFoot = /\}\)\(window,\s*window\.angular\);/
    code = code.replace(regHead, 'define("' + id + '",["angularjs"],function(require){ var angular = require("angularjs");$1')
    code = code.replace(regFoot, '})(window,angular);return angular.module("'+moduleName+'");})')
    return code;
  }

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist'
      },
      'ng-src': {
        options: {
          transform: function(code) {
            return repl(code, 'angular-debug');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular.js',
        name: 'angular-debug.js'
      },
      'ng-min': {
        options: {
          transform: function(code) {
            return repl(code, 'angular');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular.min.js',
        name: 'angular.js'
      },
      'ng-resource-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-resource-debug', 'ngResource');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-resource.js',
        name: 'angular-resource-debug.js'

      },
      'ng-resource-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-resource', 'ngResource');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-resource.min.js',
        name: 'angular-resource.js'
      },
      'ng-cookies-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-cookies-debug', 'ngCookies');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-cookies.js',
        name: 'angular-cookies-debug.js'
      },
      'ng-cookies-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-cookies', 'ngCookies');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-cookies.min.js',
        name: 'angular-cookies.js'
      },
      'ng-route-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-route-debug', 'ngRoute');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-route.js',
        name: 'angular-route-debug.js'
      },
      'ng-route-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-route', 'ngRoute');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-route.min.js',
        name: 'angular-route.js'
      },
      'ng-animate-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-animate-debug', 'ngAnimate');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-animate.js',
        name: 'angular-animate-debug.js'
      },
      'ng-animate-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-animate', 'ngAnimate');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-animate.min.js',
        name: 'angular-animate.js'
      },
      'ng-touch-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-touch-debug', 'ngTouch');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-touch.js',
        name: 'angular-touch-debug.js'
      },
      'ng-touch-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-touch', 'ngTouch');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-touch.min.js',
        name: 'angular-touch.js'
      },
      'ng-sanitize-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-sanitize-debug', 'ngSanitize');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-sanitize.js',
        name: 'angular-sanitize-debug.js'
      },
      'ng-sanitize-min': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-sanitize', 'ngSanitize');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-sanitize.min.js',
        name: 'angular-sanitize.js'
      },
      'ng-mock-src': {
        options: {
          transform: function(code) {
            return replModule(code, 'angular-mock', 'ngMock');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular-mocks.js',
        name: 'angular-mock.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};
