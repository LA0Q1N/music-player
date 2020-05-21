var gulp = require("gulp");
var less = require("gulp-less");
var watch = require("gulp-watch");
var connect = require("gulp-connect");
// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }

//   exports.default = defaultTask

gulp.task("html", function () {
    gulp.src("./src/index.html")
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'));

})
gulp.task("less",function(){
    gulp.src("./src/less/*.less")
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("watch", function () {
    watch("./src/index.html", gulp.parallel("html"))
    watch("./src/less/*.less", gulp.parallel("less"))
    watch("./src/js/*.js", gulp.parallel("js"))
})
gulp.task("server", function () {
    connect.server({
        root: "./dist",  //服务器根目录
        port :"8080",   //服务器端口
        livereload: true
    });
})
gulp.task("default", gulp.parallel("html", "less","js","watch", "server"));








// gulp.task("task3", function(){
//     console.log(111);
// })

// gulp.task("task2",function(){
//     console.log(222);
// })
// gulp.task("task1",gulp.parallel("task3","task2",function(){
//     console.log(333);
// }))

// gulp.task("default",gulp.parallel("task1"))