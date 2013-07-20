module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  function repl(code, filename) {
    var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;
    var reg = /(\}\)\(window,\s*document\);)/
    code = code.replace(reg, ';if(typeof define === "function"){define("' + id + '",[],function(){return angular;})};$1')
    return code;
  }

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist',
      },
      src: {
        options: {
          transform: function(code) {
            return repl(code, 'angular-debug');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular.js',
        name: 'angular-debug.js'
      },
      min: {
        options: {
          transform: function(code) {
            return repl(code, 'angular');
          }
        },
        url: 'http://code.angularjs.org/<%= pkg.version %>/angular.min.js',
        name: 'angular.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};
