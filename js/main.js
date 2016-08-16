$(function() {

	//touch.js 上下划屏
	function touchY() {
		document.addEventListener('touchmove', function(e) {
			e.preventDefault()
		})
		var pages = new PageSlide(document.querySelector('.pages'), 'Y');
		window.slide = pages
	}
	 // touchY();

	//loading 定时器通过类loader_spot的动态添加控制css3动画
    clearInterval(timers);
    $spotLoader = $("#loader_spot");
    var timers = setInterval(function(){
        $spotLoader.removeClass("loader_spot");
        setTimeout(function(){
            $spotLoader.addClass("loader_spot");
        },20);
    },2100);

    //loading
	var num = 0,
		$pages = $("#pages"),
		$loader = $("#loader"),
		$pagesImg = $pages.find("img"),
		$loaderNum = $loader.find(".loader_num"),
		imglen = $pagesImg.length;

	function imgLoader($img) {
		var _src = $img.attr("_src");
		$img.attr("src", _src);

		$img.on('load', function() {
			num++;
			if (num < imglen) {
				$loaderNum.html(Math.ceil((num) / (imglen) * 100) + "%");
				imgLoader($pagesImg.eq(num));
			} else {
				$loaderNum.html(100 + "%");
				$pages.show();
				$loader.hide();
				touchY();	//划屏
			}
		});

		$img.on("error", function() {
			$pages.show();
			$loader.hide();
			touchY();	//划屏
		})
	}
	imgLoader($pagesImg.eq(num));

});