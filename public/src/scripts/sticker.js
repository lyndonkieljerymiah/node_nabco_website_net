var Sticker = function (obj) {
    var sticker = $("#sticker");
    var previous = null;
    var latest = "#fb-container";
    this.init = init;

    function init() {
        $(".social-icon-bg").on("click", function () {
            var isHide = false;
            var selected = $(this);

            $(".social-icon-bg").removeClass("active");
            selected.addClass("active");
            if (latest !== $(this).data("container")) {
                previous = latest;
                latest = "#" + $(this).data("container");
            }

            if ($(latest).css("display") === "none") {
                $("#social-title").animate({ left: -110 });
                $(previous).fadeOut("slow", function () {
                    $("#social-title").html(selected.data("title"));
                    $("#social-title").animate({ left: 0 });
                    $(latest).fadeIn();
                });
            }
            else {
                isHide = true;
            }

            if (sticker.hasClass("stk-show") && isHide) {
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