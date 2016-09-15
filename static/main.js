(function () {
  var angle = 0;
  var smallRectangle = null;
  bigRectangle = $('.big-rectangle')[0].getBoundingClientRect();
  $target = null;
  $body = $('body');
  x = null;
  y = null;

  function isInRectangle(target) {
    var targetBounding = target.getBoundingClientRect();
    var smallRectanglePoints = {
      top_left: { x: targetBounding.top, y: targetBounding.left },
      top_right: { x: targetBounding.top, y: targetBounding.right },
      bottom_left: { x: targetBounding.bottom, y: targetBounding.left },
      bottom_right: { x: targetBounding.bottom, y: targetBounding.right }
    };
    var bigRectanglePoints = {
      top_left: { x: bigRectangle.top, y: bigRectangle.left },
      bottom_right: { x: bigRectangle.bottom, y: bigRectangle.right }
    };

    checkIfSomePointsIn(smallRectanglePoints, bigRectanglePoints);
    checkIfAllPointsIn(smallRectanglePoints, bigRectanglePoints);
  }

  function checkIfSomePointsIn(small, big) {
    var result = isPointIn(small.top_left, big) || isPointIn(small.top_right, big) ||
      isPointIn(small.bottom_left, big) || isPointIn(small.bottom_right, big);
    if (result) {
      $('.small-rectangle').addClass('bg-green');
    } else {
      $('.small-rectangle').removeClass('bg-green');
    }
  }

  function checkIfAllPointsIn(small, big) {
    var result = isPointIn(small.top_left, big) && isPointIn(small.top_right, big) &&
      isPointIn(small.bottom_left, big) && isPointIn(small.bottom_right, big);
    if (result) {
      $('.small-rectangle').removeClass('bg-green');
      $('.big-rectangle').addClass('bg-green');
    } else {
      $('.big-rectangle').removeClass('bg-green');
    }
  }

  function isPointIn(point, rectangle) {
    return point.x > rectangle.top_left.x &&
      point.x < rectangle.bottom_right.x &&
      point.y > rectangle.top_left.y &&
      point.y < rectangle.bottom_right.y;
  };

  $body.keydown(function (e) {
    if (e.keyCode == 37) {
      // left arrow
      angle -= 1;
      $('.small-rectangle').css({ "transform": "rotate(" + angle + "deg)" });
      isInRectangle($('.small-rectangle')[0]);
    } else if (e.keyCode == 39) {
      //right arrow
      angle += 1;
      $('.small-rectangle').css({ "transform": "rotate(" + angle + "deg)" });
      isInRectangle($('.small-rectangle')[0]);
    }
  });

  $body.on("mousedown", ".small-rectangle", function (evt) {
    smallRectangle = $(this);
    x = evt.pageX - smallRectangle.offset().left;
    y = evt.pageY - smallRectangle.offset().top;
    $target = $(evt.target);
  });

  $body.on("mouseup", function (evt) {
    $target = null;
  });

  $body.on("mousemove", function (evt) {
    if ($target) {
      $target.offset({
        top: evt.pageY - y,
        left: evt.pageX - x
      });

      isInRectangle($target[0]);
    }
  });
})();
