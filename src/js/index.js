var $ = window.Zepto; //zepto精简版jQuery
var $scope = $(document.body);
var root = window.player;
var render = root.render;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playList = root.playList;
var controlmanager;
var songList;

function bindClick() {
    $scope.on("play_change", function (e, index) {
        render(songList[index]);
        audiomanager.setAudioSource(songList[index].audio);
        if (audiomanager.status == "play") {
            audiomanager.play();
            processor.start();
        }
        processor.renderAllTime(songList[index].duration)
        processor.update(0);
    })
    $scope.find(".prev-btn").on("click", function () {
        var index = controlmanager.prve();
        $scope.trigger("play_change", index);

    })
    $scope.find(".next-btn").on("click", function () {
        var index = controlmanager.next();
        $scope.trigger("play_change", index);

    })
    $scope.find(".play-btn").on("click", function () {
        if (audiomanager.status == "pause") {
            audiomanager.play();
            $(this).addClass("playing");
            processor.start();
        } else {
            audiomanager.pause();
            $(this).removeClass("playing");
            processor.stop();
        }
    })
    $scope.find(".list-btn").on("click", function () {
        playList.show(controlmanager);
    })
}

function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point")
    var offset = $scope.find(".proessor").offset();
    var left = offset.left;
    var width = offset.width;
    console.log(offset);
    $sliderPoint.on("touchstart", function(){
        processor.stop();
    }).on("touchmove", function(e){
        var x = e.changedTouches[0].clientX  ;
        var percent = (x-left)/width;
        if(percent<0){
            percent = 0;
        }else if(percent>1){
            percent = 1;
        }
        processor.update(percent);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX  ;
        var percent = (x-left)/width;
        var curDuration = songList[controlmanager.index].duration * percent;
        audiomanager.jumpToPlay(curDuration);
        $scope.find(".play-btn").addClass("playing");
    })
}

function getData(url) {
    $.ajax({
        url: url,
        type: "get",
        success: function (data) {
            controlmanager = new root.controlManager(data.length);
            bindClick();
            bindTouch();
            songList = data;
            $scope.trigger("play_change", 0);
            playList.renderList(data);
        },
        fail: function () {}
    })
}
getData("mock/data.json")