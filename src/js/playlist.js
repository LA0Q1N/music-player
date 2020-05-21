(function ($, root) {
    var $scope = $(document.body);
    var controlanager;
    var $playlist = $("<div class='play-list'>" +
        "<div class='list-header'>播放列表</div>" +
        "<ul class='list-wrapper'></ul>" +
        "<div class='list-close'>关闭</div>" +
        "</div>");

    function renderList(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += "<li><h3>" + data[i].song + "-<span>" + data[i].singer + "</span></h3></li>"
        }
        $scope.append($playlist);
        $playlist.find(".list-wrapper").html(html);
        bindEvent();
    }

function singIndex(index){
    $playlist.find("li").removeClass("playing");
    $playlist.find("li").eq(index).addClass("playing");
}
function bindEvent(){
    $playlist.find(".list-close").on("click",function(){
        $playlist.removeClass("show");
    })
    $playlist.find("li").on("click",function(){
        var index = $(this).index();
        controlmanager.index = index;
        singIndex(index);
        $scope.trigger("play_change",index);
        if(audiomanager.status == "pause"){
            audiomanager.play();
        }
        setInterval(function(){
            $playlist.removeClass("show");
        },2000)
    })
}

    function show(control) {
        $playlist.addClass("show");
        controlanager = control;
        var index = controlanager.index;
        singIndex(index);
    }
    root.playList = {
        renderList: renderList,
        show: show
    }


}(window.Zepto, window.player))