module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // browserify
        browserify: {
            dist: {
                files: {
                    // destination for transpiled js : source js
                    'dist/index.js': 'src/index.js'
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        // Clean
        clean: ["dist"],

        // minification
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <% grunt.template.today(dd-mm-yyyy) %> */\n'
            },
            dist: {
                files: {
                    'dist/<% pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        // linting
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                'esversion': 6,
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // automated task running
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    // tests
    grunt.registerTask('test', ['clean','jshint','browserify:dist']);

    // tasks
    grunt.registerTask('default', ['clean','jshint','browserify:dist','uglify']);
};