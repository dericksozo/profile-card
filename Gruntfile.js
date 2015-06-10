// This shows a full config file!
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: 'src/scss/**/*.scss',
            tasks: ['sass']
        },
        sass: {
            dev: {
                files: {
                    'src/css/styles.css': 'src/scss/styles.scss'
                },
                options: {
                    includePaths: require('node-bourbon').includePaths,
                    sourceMap: true
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'src/css/*.css',
                        'src/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './src'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('default', ['browserSync', 'watch']);
};