(function() {
  var textarea = $('#content');
  var button = $('#download');
  var filename = $('#filename');

  var initialContent = $('#initialContent');
  textarea.val(initialContent.html().trim());
  initialContent.remove();

  button.click(function() {

    function download(filename, text) {
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);
      pom.click();
    }

    download((filename.val() || 'default') + '.doc', '<html><body>' + textarea.val() + '</body></html>');

  });
})();