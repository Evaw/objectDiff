/*jslint node:true*/
module.exports = function(grunt) {
  "use strict";
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
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
    }
  });
  grunt.registerTask('dev-js', ['jshint','browserify', 'qunit']);
  //grunt.registerTask('dist-js', ['uglify']);
  grunt.registerTask('dist-js', ['jshint','clean','browserify','uglify','qunit']);
  grunt.registerTask('default', ['dist-js']);
};