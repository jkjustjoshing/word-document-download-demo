(function() {
  var textarea = $('#content');
  var button = $('#download');
  var filename = $('#filename');

  // Initialize demo content
  var initialContent = $('#initialContent');
  textarea.val(initialContent.html().trim());
  initialContent.remove();

  // Download on click
  var aEle = document.createElement('a');
  var downloadAttributeSupported = ('download' in aEle);
  if(downloadAttributeSupported || (saveAs() && (window.BlobBuilder || window.Blob))) {
    button.click(function() {
      download((filename.val() || 'default') + '.doc', '<html><body>' + textarea.val() + '</body></html>');
    });
  } else {
    downloadify(filename, textarea);
  }
  function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
  }

  function base64EncodeHtml(data) {
    return 'data:text/html;charset=utf-8,' + encodeURIComponent(data);
  }

  function saveAs(blob, filename) {
    if(blob === undefined && filename === undefined) {
      return window.saveAs || navigator.saveBlob;
    }

    if (window.saveAs) {
      return window.saveAs(blob, filename);
    } else {
      return navigator.saveBlob(blob, filename);
    }
  }

  function download(filename, text) {

    var showSave;
    var url = base64EncodeHtml(text);

    if (downloadAttributeSupported) {
      alert('Saving with <a download>');
      aEle.setAttribute('href', url);
      aEle.setAttribute('download', filename);
      aEle.click();
    } else if(window.BlobBuilder && saveAs()) {
      alert('Saving with BlobBuilder');
      var builder = new window.BlobBuilder();
      builder.append(text);
      var blob = builder.getBlob("text/html");
      saveAs(blob, filename);
    } else if(window.Blob && saveAs()) {
      alert('Saving with new Blob()');
      var blob = new Blob([text], {type: 'text/html'});
      saveAs(blob, filename);
    } else {
      alert('Should never get here! Problem!');
    }
  }

  function downloadify($filename, $text) {
    button.downloadify({
      swf: 'components/Downloadify/media/downloadify.swf',
      downloadImage: 'download.png',
      width: 179,
      height: 12,
      filename: function() {
        return $filename.val() + '.doc';
      },
      data: function() {
        alert('Saving with Flash and Downloadify');
        return '<html><body>' + $text.val() + '</body></html>';
      },
      dataType: 'string'
    });
  }
})();