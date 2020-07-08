const getStatus = function () {
  document.getElementById('detailsDiv').style.visibility = 'hidden';
  const id = document.getElementById(`requestId`).value;
  sendXHR(JSON.stringify({}), `/status/${id}`, 'GET', function () {
    const res = JSON.parse(this.response);
    document.getElementById(`status`).innerText = res
      ? ` Your request is ${res.status}`
      : 'Wrong request';
    if (res.status === 'completed') {
      const detailsTable = document.getElementsByClassName('details-table');
      detailsTable[0].innerHTML = jsonAsTable(res.details);
      document.getElementById('detailsDiv').style.visibility = 'visible';
    }
  });
};

const jsonAsTable = function (rawData) {
  let html = ``;
  let playerStats = JSON.parse(rawData);
  playerStats.forEach((player) => {
    html += `<tr><td>${player.name}</td></tr>\n`;
  });
  return html;
};

const sendXHR = function (data, url, method, responseHandler) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(data);
  request.onload = responseHandler;
};

const getPlayerInfo = function () {
  const playerName = document.getElementById(`inputBox`).value;
  if (playerName) {
    sendXHR(
      JSON.stringify({}),
      `cricInfo/${playerName}/search`,
      'POST',
      function () {
        const id = this.response.split(':')[1];
        document.getElementById(`requestId`).value = id;
      }
    );
  }
};
