$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    $(".cover").css({
        backgroundSize: (100 + scroll / 5) + "%",
        top: -(scroll / 10) + "%"
    });
});