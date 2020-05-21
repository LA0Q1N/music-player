(function ($, root) {
    function controlManager(length) {
        this.index = 0;
        this.length = length;
    }
    controlManager.prototype = {
        prve: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (pram) {
            var index = this.index;
            var length = this.length;
            var curIndex = (index + pram + length) % length; //处理临界值
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;
}(window.Zepto, window.player))