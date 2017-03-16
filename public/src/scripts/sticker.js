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