/*jslint node:true*/
var http = require('http');
module.exports = function(grunt) {
  "use strict";
  grunt.registerTask('crispyfresh', 'reload the browser', function (){
    var isDone = false;
    var done = this.async();
    var req = http.request({
      host: 'localhost',
      port: 7821,
      path: '/',
      method: 'GET'
    }, function(res){
      res.on('end', function (){
        done();
        isDone = true;
      });
    });
    req.end('a');
    setTimeout(function () {
      //if no server is listening, just say done and let other tasks run
      if(!isDone){
       done();
      }
    }, 200);
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dis: {
        files: {
          'dist/unmin/js/objectDiff.js': ['src/js/objectDiff.js']
        },
        options: {
          standalone: 'objectDiff'
        }
      }
    },
    qunit: {
      all: ['tests/*.html']
    },

    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['dev-js']
      },
      less: {
        files: ['src/less/*.less'],
        tasks: ['less', 'crispyfresh']
      },
      tests: {
        files: ['tests/unit/*.js'],
        tasks: ['qunit']
      }
    },
    jshint: {
      options: {

      },
      grunt: {
        src:['Gruntfile.js']
      },
      src: {
        src: ['src/**/*.js']
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    clean: {
      dist: 'dist'
    },
    uglify: {
      options: {
        sourceMap: true
      },
      dynamic_mappings: {
        files: [{
          expand: true,
          cwd: 'dist/unmin',
          src: ['js/**/*.js'],
          dest: 'dist/min/',
          ext: '.js'
        }]
      }
      // dist: {
      //   files: {
      //     'dist/js/left-nav.js': ['src/js/left-nav.js']
      //   }
      // },
    },
    less: {
      options: {
        sourceMap: false,
        compress: true,
        sourceMapFileName: "a.map",
        sourceMapRootpath: '.'
      },
      dynamic_mappings: {
        files: [{
          expand: true,
          cwd: 'src/less/',
          src: ['**/*.less'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    }
  });

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dev-js', ['jshint','browserify', 'qunit']);
  //grunt.registerTask('dist-js', ['uglify']);
  grunt.registerTask('dist-js', ['jshint','clean','browserify','qunit', 'uglify']);
  grunt.registerTask('default', ['clean','jshint', 'qunit','dist-css', 'dist-js']);
};