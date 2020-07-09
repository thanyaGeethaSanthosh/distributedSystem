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
      detailsTable[0].innerHTML = jsonAsTable(res.details, res.type);
      document.getElementById('detailsDiv').style.visibility = 'visible';
    }
  });
};

const createRowForField = function ( playerStats) {
  let html = '<tr>';
   html += `<th></th>`;
  let headings = Object.keys(playerStats.firstClass);
  headings.forEach((heading) => {
    html += `<th>${heading}</th>`;
  });
  html += '</tr>';

  for (const format in playerStats) {
    html += `<tr><td>${format}</td>`;
    for (const key in playerStats[format]) {
      html += `<td>${playerStats[format][key]}</td>`;
    }
    html += `</tr>\n`;
  }
  return html;
};

const jsonAsTable = function (rawData, type) {
  let html = ``;
  let playerStats = JSON.parse(rawData);
  if (type === 'query') {
    html += `<tr><th>Batting</th></tr>`;
    html += createRowForField( playerStats.batting);
    html += `<tr><th>Bowling</th></tr>`;
    html += createRowForField( playerStats.bowling);
    return html;
  }
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

const searchPlayers = function () {
  document.getElementById(`status`).innerText = "";
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

const getPlayerInfo = function () {
  document.getElementById(`status`).innerText = "";
  const playerName = document.getElementById(`nameForQuery`).value;
  if (playerName) {
    sendXHR(
      JSON.stringify({}),
      `cricInfo/${playerName}/query`,
      'POST',
      function () {
        const id = this.response.split(':')[1];
        document.getElementById(`requestId`).value = id;
      }
    );
  }
};
