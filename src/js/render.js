(function ($, root) { //立即执行函数   封闭作用域
    var $scope = $(document.body); //获取body 并变成jQuery对象
    function renderInfo(data) {
        var html = "";
        html += "<h1 class = 'song-name' >" + data.song + "</h1>" + "<h3 class = 'singer-name'>" + data.singer + "</h3>" + "<h3 class = 'ablum-name'>" + data.album + "</h3>";
        $scope.find(".song-info").html((html)); //找到song-info  并通过html方法放到页面
    }

    function renderImg(url) {
        var image = new Image();
        image.onload = function () {
            $scope.find(".song-img img").attr("src", url)
            root.blurImg(image, $scope)
        }
        image.src = url;
    }

    function renderIsLike(isLike) {
        if (isLike) {
            $scope.find(".like-btn").addClass("liked")
        } else {
            $scope.find(".like-btn").removeClass("liked")
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }

}(window.Zepto, window.player || (window.player = {})))