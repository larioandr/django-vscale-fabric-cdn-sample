(function ($) {
  //////////////////////////////
  // FileInput plugin:
  // consists of a (hidden) <input type="file" ...> and a label with class .ubio-file-name
  // which receives the file name from the <input>.
  //
  // To enable this plugin automatically, wrap the <input> and .ubio-file-name elements
  // inside an element with class '.ubio-file'
  //
  // To use it:
  // * mark the text element to be sed as file name label a class '.ubio-file-name'
  //
  // Example:
  //
  // <div class="ubio-file">
  //   <input type="file" value="Choose file..." name="document">
  //   <p class="ubio-file-name"></p>
  // </div>
  //
  $.fn.ubioFileInput = function () {
    var label = this.find('.ubio-file-name');
    var input = this.find('input[type="file"]');
    input.on('change', function () {
      if (this.files && this.files[0]) {
        label.text(this.files[0].name);
      }
    });
    return this;
  };

  /////////////////////////////////////
  // Submit load indication
  //
  // Using this plugin allows to show a spinner indicator instead of 'Save' button while waiting
  // for the server response on submit.
  //
  // Example:
  //
  // <button type="submit" class="ubio-submit btn btn-success" data-form="#theForm">
  //   <span class="ubio-submit-indicator spinner-border spinner-border-sm d-none"></span>
  //   Submit...
  // </button>
  //
  $.fn.ubioFormSubmitIndicator = function () {
    var form = $(this.attr('data-form'));
    form.submit(event => {
      var indicator = this.find('.ubio-submit-indicator');
      this.prop('disabled', true);
      indicator.removeClass('d-none');
    });
    return this;
  };

  //////////////////////////////////////////
  // File view and delete plugin (file-vd)
  //
  // Expected to have a link to view the file and a form to delete it. To make things work,
  // HTML must contain a `.ubio-file-vd` element, inside which there will be a form and an
  // area to view the file and have a delete link (see the example). The form must have
  // `.ubio-file-vd-form` class, the area - `.ubio-file-vd-box` class.
  //
  // When the delete form is submitted, the plugin initiates an AJAX submit using
  // XMLHttpRequest API. Upon receiving the response, it replaces the working area
  // (which is marked with `.ubio-file-vd-form` class) with the response content.
  // It is expected that the response contains HTML.
  //
  // Example:
  //
  // <div class="ubio-file-vd">
  //   <form class="ubio-file-vd-form" action="/item/delete" method="POST" id="form1"></form>
  //   <div class="ubio-file-vd-box">
  //     <p><a href="/item/view">press to view the file</a></p>
  //     <button type="submit" form="form1">Delete</button>
  //   </div>
  // </div>
  $.fn.ubioFileVD = function () {
    var form = this.find('.ubio-file-vd-form');
    var box = this.find('.ubio-file-vd-box');
    form.on('submit', event => {
      var req = new XMLHttpRequest();
      req.onload = () => { box.html(req.response); };
      req.open(form.attr('method'), form.attr('action'), true);
      req.send(new FormData(form.get(0)));
      event.preventDefault();
      return false;
    });
    return this;
  };


  //////////////////////////////
  // Associating the plugins
  $('.ubio-file').ubioFileInput();
  $('.ubio-submit').ubioFormSubmitIndicator();
  $('.ubio-file-vd').ubioFileVD();
}(jQuery));
