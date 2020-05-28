let ticketPrefix = '';
let baseUrl = '';

function contentLoaded() {
  getValuesFromStorage();

  const button = document.getElementById('go');
  const jiraText = document.getElementById('jira');

  button.addEventListener('click', () => buttonClicked(jiraText.value), false);
  jiraText.addEventListener('keypress', checkEnter, false);
  jiraText.focus();

  function checkEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      buttonClicked(jiraText.value);
    }
  }
}

function getValuesFromStorage() {
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
}

function buttonClicked(text) {
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

document.addEventListener('DOMContentLoaded', contentLoaded);
