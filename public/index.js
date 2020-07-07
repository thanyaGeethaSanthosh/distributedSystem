const getPlayerDetails = function () {
  document.getElementById('detailsDiv').style.visibility = 'hidden';
  document.getElementById(`status`).innerText = '';
  const playerId = document.getElementById(`players`).value;
  const fieldName = document.getElementById(`fields`).value;
  const formatName = document.getElementById(`formats`).value;
  if (playerId && fieldName && formatName) {
    sendXHR(
      JSON.stringify({}),
      `cricInfo/${playerId}/${fieldName}/${formatName}`,
      'POST',
      function () {
        const id = this.response.split(':')[1];
        document.getElementById(`requestId`).value = id;
      }
    );
  }
};

const getStatus = function () {
  document.getElementById('detailsDiv').style.visibility = 'hidden';
  const id = document.getElementById(`requestId`).value;
  sendXHR(JSON.stringify({}), `/status/${id}`, 'GET', function () {
    console.log(this.response);
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
  for (const field in playerStats) {
    html += `<tr><td>${field}</td><td>${playerStats[field]}</td></tr>\n`;
  }
  return html;
};

const sendXHR = function (data, url, method, responseHandler) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(data);
  request.onload = responseHandler;
};
