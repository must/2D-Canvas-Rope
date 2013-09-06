/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! 2D Rope Experiment - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Mustapha Ben Chaaben; Licensed MIT */'
    },
    watch: {
      scripts: {
        files: [
            'grunt.js',
            'js/*.js',
            'js/src/data_types/*.js',
            'js/src/*.js'
        ],
        tasks: 'concat min'
      }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>',
            '<file_strip_banner:js/libs/jquery.js>',
            
            '<file_strip_banner:js/src/data_types/vect2.js>',
            '<file_strip_banner:js/src/data_types/point.js>',
            '<file_strip_banner:js/src/data_types/spring.js>',
            
            '<file_strip_banner:js/src/engine.js>',
            '<file_strip_banner:js/src/interaction.js>',
            '<file_strip_banner:js/src/rendrer.js>',
            '<file_strip_banner:js/src/main.js>',
        ],
        dest: 'js/script.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'js/script.min.js'
      }
    }
  });
};
