/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    sass: {
      dev: {
        src: ['src/scss/styles.scss'],
        dest: 'src/css/styles.css',
      },
    },
    
    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['src/scss/*.scss'],
        tasks: ['sass'],
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['src/css/*', 'src/js/*', 'src/*.html'],
      },
    },

    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['src'], // Replace with the directory you want the files served from
                             // Make sure you don't use `.` or `..` in the path as Express
                             // is likely to return 403 Forbidden responses if you do
                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');


  // Default task.
  // grunt.registerTask('default', ['sass', 'express', 'watch'/* 'uncss', 'cssmin', 'uglify', 'processhtml', 'htmlmin' */]);
  // grunt.registerTask('default', ['uncss', 'cssmin', 'uglify', 'concat', 'processhtml', 'htmlmin']);
  // Start a server
  grunt.registerTask('server', ['sass', 'express', 'watch']);

};