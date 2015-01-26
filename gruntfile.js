module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              
			dist: {                            
				options: {                      
					style: 'expanded'
				},                         
				files: {'dest/css/all.css': 'src/css/*.sass'}

			}
		},
		slim: {                              
			dist: {                            
				files:  [{
					expand: true,
					cwd: 'src',
					src: ['**/*.slim'],
					dest: './dest',
					ext: '.html'
				}]          
			}
		},
		coffee: {
			compile: {
				files: {
					'dest/script.js': ['src/js/*.coffee'] 
				}
			}
		},
		copy: {
			main: {
				files: [{
					expand: true, 
					cwd: 'src', 
					src: ['assets/*'], 
					dest: 'dest/', filter: 'isFile'
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dest'
				}
			}
		},
		imagemin: {  
			dynamic: {                        
				files: [{   
					expand: true,             
					cwd: 'src/',                   
					src: ['**/*.{png,jpg,gif}'],   
					dest: 'dest/'                 
				}]
			}
		},
		watch: {
			options: {
				livereload: 3000,
				nospawn: true
			},
			css: {
				files: '**/*.sass',
				tasks: ['sass']
			},
			html: {
				files: '**/*.slim',
				tasks: ['slim']
			},
			coffeescript:{
				files: '**/*.coffee',
				tasks: ['coffee']
			},
			imagemin:{
				files: '**/*.{png,jpg,gif}',
				tasks: ['imagemin']
			},
			copy:{
				files: 'src/assets/*.*',
				tasks: ['copy']
			}
		}
	});

require('load-grunt-tasks')(grunt);
grunt.registerTask('default', ['slim','coffee','sass','imagemin', 'copy']);
grunt.registerTask('dev', ['connect','watch']);
} 
