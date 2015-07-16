require('coffee-script/register')
gulp = require('gulp')
$ = require('gulp-load-plugins')()
browserSync = require('browser-sync')

gulp.task 'jade', ->
    gulp.src('./*.jade')
        .pipe($.jade({
              pretty: true,
              basedir: '.'
            }))
        .on('error', console.log)
        .pipe(gulp.dest('.'))
        .pipe(browserSync.reload({stream: true}))

gulp.task 'stylus', ->
    gulp.src('./css/*.styl')
        .pipe($.stylus())
        .pipe($.autoprefixer('last 4 version'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}))

gulp.task 'server', ->
    browserSync({
        server: {
            baseDir: './'
        }
    })

gulp.task 'watch', ->
    gulp.watch(['./css/*.styl'], ['stylus'])
    gulp.watch(['./*.jade'], ['jade'])

gulp.task 'default', ['server', 'jade', 'stylus', 'watch']