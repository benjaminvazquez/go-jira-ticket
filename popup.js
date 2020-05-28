document.addEventListener('DOMContentLoaded', function contentLoaded() {
  let ticketPrefix = '';
  let baseUrl = '';
  chrome.storage.sync.get(
    {
      url: '',
      prefix: '',
    },
    (items) => {
      baseUrl = items.url;
      ticketPrefix = items.prefix;
    }
  );

  const button = document.getElementById('go');
  const jiraText = document.getElementById('jira');
  button.addEventListener(
    'click',
    () => buttonClicked(jiraText.value, ticketPrefix, baseUrl),
    false
  );
  jiraText.addEventListener('keypress', checkEnter, false);
  jiraText.focus();
  function checkEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      buttonClicked(jiraText.value, ticketPrefix, baseUrl);
    }
  }
});

function buttonClicked(text, ticketPrefix, baseUrl) {
  if (!ticketPrefix.includes('-')) {
    ticketPrefix = ticketPrefix + '-';
  }
  let ticket = text.trim();
  if (!ticket.includes(ticketPrefix)) {
    ticket = ticketPrefix + ticket;
  }
  const newURL = baseUrl + ticket;
  chrome.tabs.create({ url: newURL });
}
