// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('url').value;
  var prefix = document.getElementById('prefix').value;
  chrome.storage.sync.set(
    {
      url,
      prefix,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    {
      url: '',
      prefix: '',
    },
    function (items) {
      document.getElementById('url').value = items.url;
      document.getElementById('prefix').value = items.prefix;
    }
  );
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
