'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        project: {
            svn: 'https://google-code-prettify.googlecode.com/svn/trunk',
            styles: 'src/styles',
            scripts: 'src/scripts'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: 'Gruntfile.js'
        },

        shell: {
            setup: {
                command: 'mkdir src <%= project.scripts %>  <%= project.styles %>'
            },
            latest: {
                command: (function buildCommand(){
                    var command = [],
                        styles = ['desert.css', 'doxy.css', 'sons-of-obsidian.css', 'sunburst.css'],
                        scripts = ['lang-apollo.js', 'lang-basic.js', 'lang-clj.js', 'lang-css.js', 'lang-dart.js', 'lang-erlang.js', 'lang-go.js', 'lang-hs.js', 'lang-lisp.js', 'lang-llvm.js', 'lang-lua.js', 'lang-matlab.js', 'lang-ml.js', 'lang-mumps.js', 'lang-n.js', 'lang-pascal.js', 'lang-proto.js', 'lang-r.js', 'lang-rd.js', 'lang-scala.js', 'lang-sql.js', 'lang-tcl.js', 'lang-tex.js', 'lang-vb.js', 'lang-vhdl.js', 'lang-wiki.js', 'lang-xq.js', 'lang-yaml.js', 'prettify.js', 'run_prettify.js'];

                    command.push('curl "<%= project.svn %>/src/prettify.css" >> <%= project.styles %>/prettify.css');

                    styles.forEach(function (stylesheet) {
                        command.push('curl "<%= project.svn %>/styles/' + stylesheet + '" >> <%= project.styles %>/' + stylesheet);
                    });

                    scripts.forEach(function (script) {
                        command.push('curl "<%= project.svn %>/src/' + script + '" >> <%= project.scripts %>/' + script);
                    });

                    return command.join(' && ');
                }())
            }
        },

        clean: {
            setup: 'src/'
        }

    });

    grunt.registerTask('fetch', ['clean:setup', 'shell:setup', 'shell:latest']);

};
