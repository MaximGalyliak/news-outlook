$(document).ready(() => {
  $("button.expansion").on("click", function() {
    $(this).toggleClass("active");

    const panel = $(this).next(".panel");

    if (panel.height() === 0) {
      panel.css("max-height", $(panel)[0].scrollHeight);
    } else {
      panel.css("max-height", "0px");
    }
  });

  $("input.sub-com").on("click", function() {
    var comment = {};
    const id = $(this).attr("data-art-id");
    comment.title = $(this)
      .siblings(".user-com-title")
      .val();
    comment.body = $(this)
      .siblings(".user-com-body")
      .val();
    $.post(`/comments/${id}`, comment, data => {
      $(this)
        .siblings(".user-com-title")
        .val("");
      $(this)
        .siblings(".user-com-body")
        .val("");
    });
  });
});
