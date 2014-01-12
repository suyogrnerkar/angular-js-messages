module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'browserify', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', { loose: 'all' }]
          ],
          browserifyOptions: { debug: true }
        },
        files: {
          './client/dist/messages.js': ['./client/**/*.js']
        }
      }
    },

    clean: ['./client/dist/messages.js'],

    watch: {
      files: './client/**/*.js',
      tasks: ['default']
    }
  });
};