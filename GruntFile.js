const sass = require('node-sass');
const grunt=require('grunt');
require('load-grunt-tasks')(grunt);

module.exports = function(grunt) {
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
    
        // all of our configuration will go here
        
        uglify: {
            options: {
              banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
              files: {
                'dist/js/file.min.js': 'src/js/file.js'
              }
            }
          },
          sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'src/css/file.css': 'src/scss/file.scss'
                }
            }
        },
        cssmin: {
            options: {
              banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
              files: {
                'dist/css/file.min.css': 'src/css/file.css'
              }
            }
        },

        watch: {

            // for stylesheets, watch css and less files 
            // only run less and cssmin
         stylesheets: { 
            files: ['src/**/*.scss', 'src/**/*.css'], 
            tasks: ['sass', 'cssmin'] },
          
            // for scripts, run jshint and uglify 
            scripts: { 
              files: 'src/**/*.js', tasks: ['uglify'] 
            } 
          },
          connect: {
          
            server: {
              options: {
                port: 8000,
                keepalive: true,
                base: [{
                  path: 'public',
                  options: {
                    index: 'index.html',
                    maxAge: 300000
                   }},
                  {
                    path:'dist'
                  }
                ]
              }
            }
          },

          babel: {
            options: {
              sourceMap: true,
              presets: ['@babel/preset-env']
            },
            dist: {
              files: {
                'dist/js/app.js': 'src/js/app.js'
              }
            }
          }

      });

      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('sass');
      grunt.loadNpmTasks('babel');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-connect');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.registerTask('default', [ 'uglify', 'sass','cssmin']);
};