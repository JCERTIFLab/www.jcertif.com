(function($, exports) {
  'use strict';

  var GOOGLE_DRIVE_BASE  = 'https://docs.google.com/forms/d/11JHqERYwyI-MsqPn0_aifL5BCLixWJFt8T15amJ3cVw/formResponse';
  var GOOGLE_DRIVE_5APPS = 'https://cors.5apps.com/?uri=' + GOOGLE_DRIVE_BASE;
  var GOOGLE_DRIVE_CORS  = 'https://www.corsproxy.com/' + GOOGLE_DRIVE_BASE;

  var GoogleDrive = (function() {

    function toStringValue(data) {
      var formDataUrl =
        'entry.1317753377=' + encodeURIComponent(data.email) +
        '&entry.1354213850=' + encodeURIComponent(data.fullname) +
        '&entry.1186663987=' + encodeURIComponent(data.title) +
        '&entry.212618856=' + encodeURIComponent(data.desc) +
        '&entry.945483698=' + encodeURIComponent(data.bio) +
        '&entry.327194409=' + encodeURIComponent(data.category);

      $.each(data.countries, function(country){
        formDataUrl += '&entry.1308067311=' + encodeURIComponent(country);
      });

      return formDataUrl;
    }

    function post(data) {
      var stringData = toStringValue(data);

      return $.ajax({
        method: 'POST',
        url: GOOGLE_DRIVE_5APPS,
        data: stringData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    }

    return {
      post: post
    };
  })();

  $(document).ready(function() {
    var

    $form = $('#cp-application-form');

    console.log($form.length);

    function serialize(form) {
      var data = {};
      $(form).find('input').each(function(input) {
        data[$(input).attr('name')] = $(input).val();
      });
      return data;
    }

    $form.on('submit', function(e) {
      e.preventDefault();

      var data = serialize(this);
      console.log(data);
      return false;
    });
  });
})(window.jQuery, window);
