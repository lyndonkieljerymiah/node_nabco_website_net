
var Slider = function () {
    var disappearBox,
        newBox;

    var controlIndex = {
        topObject: null,
        bottomObject: null,
        objectContainers: $(".nb-slider li"),
        next: function () {
            var currentBottom = controlIndex.objectContainers[controlIndex.objectContainers.length - 1];
            var currentTop = controlIndex.objectContainers[0];
            if (currentBottom) {
                //copy the content
                topObject = $(currentBottom).children().first().clone();

                //create li
                var newList = $("<li style='opacity:0;height:0;overflow:hidden'></li>").append(topObject);
                $(".nb-slider ul").prepend(newList);
                $(".nb-slider ul").children().first().animate(
                    {
                        height: '216px', opacity: '1'
                    },
                    {
                        duration: 500,
                        complete: function () {
                            $(currentBottom).remove();
                            //reinitialize
                            controlIndex.objectContainers = $(".nb-slider li");

                        }
                    });
            }
        },
        prev: function () {
            var currentBottom = controlIndex.objectContainers[controlIndex.objectContainers.length - 1];
            var currentTop = controlIndex.objectContainers[0];
            if (currentTop) {
                //copy the content
                topObject = $(currentTop).children().first().clone();
                //create li
                var newList = $("<li style='opacity:1'></li>").append(topObject);
                $(".nb-slider ul").append(newList);
                $(currentTop).animate({
                    height: '0px', opacity: '0'
                },
                    {
                        duration: 500,
                        complete: function () {
                            $(currentTop).remove();
                            //reinitialize
                            controlIndex.objectContainers = $(".nb-slider li");
                        }
                    });
            }
        }

    };

    var timer,isStopPlay=false;
    var arraySource = [
        { source: "https://www.youtube.com/watch?v=j5jIjI_Ccqc" },
        { source: "https://www.youtube.com/watch?v=DTKQONRv6Ng" },
        { source: "https://www.youtube.com/watch?v=Z1eKNuno7Uw" }
    ];
    
    this.init = function () {
        //setting up button
        $("#downButton").on("click", next);
        $("#upButton").on("click", prev);
        //set timeout
        autoPlay();
    }

    function next() {
        controlIndex.next();
    }

    function prev() {
        controlIndex.prev();
    }

    function autoPlay() {
        if (isStopPlay) {
            clearTimeout(timer);
            return;
        }
        timer = setTimeout(function () {
            next();
            autoPlay();
        },3000);
    }
    function play() {
        isStopPlay = false;
        autoPlay();
    }
    function stop() {
        isStopPlay = true;
    }



};


var Sticker = function (obj) {
    
    var sticker = obj.target;  
    var previous = null;
    var latest = obj.default; 
    this.init = init;

    function init() {

        var icons = obj.target.find(".icon");

        icons.on("click", function () {
            var isHide = false;
            //remove active
            icons.removeClass("active");
            $(this).addClass("active");

            if (latest !== $(this).data("container")) {
                previous = latest;
                latest = "#" + $(this).data("container");
            }

            if ($(latest).css("display") === "none") {
                $(obj.headerTarget).animate(obj.pullOut);
                var selected = $(this);
                $(previous).fadeOut("slow", function ()
                {
                    $(obj.headerTarget).html(selected.data("title"));
                    $(obj.headerTarget).animate(obj.pullIn);
                    $(latest).fadeIn();
                });
            }
            else {
                isHide = true;
            }

            if (sticker.hasClass("stk-show") && isHide) {
                console.log(isHide);
                sticker.removeClass("stk-show");
                sticker.addClass("stk-hide");
            }
            else if (sticker.hasClass("stk-hide")) {
                sticker.removeClass("stk-hide");
                sticker.addClass("stk-show");
            }
        });
    }
};