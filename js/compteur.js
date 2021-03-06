function dateAujourdui() {
  var Aujourdui = new Date();
  Aujourdui.setDate(Aujourdui.getDate() + 1);
  Aujourdui = Aujourdui.toISODate();
  return Aujourdui;
}
function dateSeptJour() {
  var septJours = new Date();
  septJours.setDate(septJours.getDate() - 7);
  septJours = septJours.toISODate();
  return septJours;
}
if (!Date.prototype.toISODate) {
  Date.prototype.toISODate = function() {
    return this.getFullYear() + '-' +
    ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
    ('0'+ this.getDate()).slice(-2);
  }
}

function Compteur() {
  var nbWeek;
  var NbWeekURL = `https://www.dvkbuntu.org/nodejs/gettotal/?startdate=${dateSeptJour()}&enddate=${dateAujourdui()}`;
  var nbWeekDV;
  var NbWeekDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
  var nbWeekDVL;
  var NbWeekDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
  fetch(NbWeekURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data1) {
    fetch(NbWeekDVURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data2) {
      fetch(NbWeekDVLURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data3) {
        nbWeek = `${data1.result[0].total}`;
        nbWeekDV = `${data2.summaries.time.downloads}`;
        nbWeekDVL = `${data3.summaries.time.downloads}`;
        var weektot = parseInt(nbWeek,10) + parseInt(nbWeekDV,10) + parseInt(nbWeekDVL,10);
        weektot = weektot.toString() + ' cette semaine';
        document.getElementById('byweek').setAttribute('src','');
        document.getElementById('byweek').setAttribute('src','https://img.shields.io/static/v1?message='+weektot+'&labelColor=black&color=36393f&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHBhdGggZD0iTTE0LjAwMSA3LjAwOGMuMDQzIDIuNzUzLTEuNzMyIDUuNDA4LTQuMjc1IDYuNDUtMi41IDEuMDgyLTUuNjAzLjUyNC03LjU1My0xLjM4M0MuMTk4IDEwLjI0LS41MjMgNy4yMTUuMzk5IDQuNjgyIDEuMjkxIDIuMDU2IDMuODY5LjEyMiA2LjY0Mi4wMTdjMi42OTYtLjE3NCA1LjM5IDEuMzkgNi41OTMgMy44MDUuNTA0Ljk4Ljc2NyAyLjA4Mi43NjYgMy4xODZ6IiBmaWxsPSIjMDA3OWMxIi8%2BPHBhdGggZD0iTTE0LjAwMSA3LjAwOGMuMDY0IDMuMTQ1LTIuMjkzIDYuMTI1LTUuMzYgNi44MS0yLjY4Mi42NTgtNS42OTktLjQyMy03LjMtMi42ODQtMS42ODYtMi4yODEtMS43OTYtNS41OTgtLjIwMy03Ljk1N0MyLjU5LjkzNSA1LjM3OC0uMzQ4IDguMDI0LjA3N2MyLjcyNC4zODcgNS4xMTMgMi41MDcgNS43NTkgNS4xOTEuMTQ1LjU2OC4yMTkgMS4xNTQuMjE4IDEuNzR6IiBmaWxsPSIjMGVhNWZmIiBmaWxsLW9wYWNpdHk9Ii45MzciLz48cGF0aCBkPSJNMy4zNjUgMi45MDZjLS40NDMuMjUtMS4xOS44MTEtLjU4NiAxLjMxNi4yMjkuNDcxLjc5NC45MDEuMzY0IDEuNDEtLjIzNi45MzgtMi4wNjIuMTA0LTEuNzk2IDEuMjk4LS4yMjQuOTA5Ljk0NS43MDYgMS41MDUuOTU2LjMwNi40MDIuNjUxIDEuMTczLjA2NSAxLjU5Ny0uNDEzLjQ0Ny0uNjQuOTU4IDAgMS4zMTEuNTQ2LjY4Ljk3OC0uNjEgMS40NDYtLjkwMi44NTctLjUyMi0uNTI2LTEuMDAzLS41MjUtMS42OC0uNTQzLTEuMzU1LS4wNTItMi45OTUgMS4wOTYtMy44NzgtLjUyMy0uNDc1LTEuMDQ2LS45NTEtMS41NjgtMS40Mjh6TTYuNjA4IDEuNDIzYy0uNzMyLjAyMi0xLjQxNC4yOC0uOTc3IDEuMDgyLjIzOS4zODctLjA0IDEuNTkyLjY3OSAxLjE5MSAxLjgxNy0uNDI3IDMuODEzLjk0NSA0LjAzIDIuODA3LjY1Mi0uMjU0IDEuNjktLjE0NyAyLjA5OC0uNjMyLS4xMDMtLjQ1OS0uMTI2LTEuMjEyLS43OTEtMS4wMDVoLTEuMTc0Yy0uNTU1LS41NS0uNDg5LTEuMjIzLS4xMDYtMS44Ny40MTgtLjU1NC0uNTctLjk1My0uOTMxLS45NzMtLjUxLjI4NC0uNzk4IDEuMjI2LTEuNDQyLjk3OC0uODkyLjEyNS0uOTUxLS44ODctMS4zMDgtMS40NDdsLS4wNzgtLjEzek0xMC4zMDcgNy43MzdjLS4zNTEgMS42NzUtMi4wOTcgMi45MDgtMy43OTUgMi42Mi0uNDQtLjA4Ny0uOTAzLS4zODctLjg2My4zMjMtLjA0Ny42MTktLjg4IDEuNzgxLjIyNCAxLjc3MS40NzEuMzQuNzA1LS4xNS44Ny0uNTFsLjQ3LS44NTRjLjc0OS0uMjI0IDEuMzA3LjE2IDEuNjkuODA1LjI4Ni42MzIgMS4xMDktLjA0IDEuMy0uMzQ3LS4wMDMtLjU4NS0uNjg5LTEuMjktLjE2Mi0xLjczNi4zMi0uODQzIDEuMjM0LS40MDQgMS44OTctLjQ1LjMwNS0uMDg3LjUzMi0uOTY1LjMyNy0xLjE3LS42NDUtLjE3NS0xLjMwNy0uMjk0LTEuOTU4LS40NTJ6IiBmaWxsPSIjZmZmIi8%2BPHNjcmlwdC8%2BPGVsbGlwc2UgY3g9IjYuODMiIGN5PSIzLjEzIiByeD0iLjg5OSIgcnk9Ii45MDMiIGZpbGw9Im5hdnkiIHN0cm9rZS13aWR0aD0iLjAzOSIvPjxwYXRoIGQ9Ik0xMS45MzIgNC4xMTZsLS4wMi40NzhMOC4zNiA1Ljg0djEuNzI0bDIuMDk4IDQuMzQxLS42MDMuMDItMi44MDMtMy44ODMtMi4zMjYgMy44NjNINC4yOWwxLjM3LTQuMTk2LjAyMS0xLjg5LTMuNTEtMS4yMjV2LS40NTdsNC42NzMuNTR6IiBmaWxsPSJuYXZ5IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjA0MiIvPjwvc3ZnPg%3D%3D&label=T%C3%A9l%C3%A9chargements%20DVKBuntu&style=for-the-badge');
      })
      .catch(err => { throw err });
    })
    .catch(err => { throw err });
  })
  .catch(err => { throw err });

  var nbTotal;
  var nbTotalURL = `https://www.dvkbuntu.org/nodejs/gettotal/?startdate=2010-01-01&enddate=${dateAujourdui()}`;
  var nbTotalDV;
  var nbTotalDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
  var nbTotalDVL;
  var nbTotalDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
  fetch(nbTotalURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data1) {
    fetch(nbTotalDVURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data2) {
      fetch(nbTotalDVLURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data3) {
        nbTotal = `${data1.result[0].total}`;
        nbTotalDV = `${data2.total}`;
        nbTotalDVL = `${data3.total}`;
        var Totaltot = parseInt(nbTotal,10) + parseInt(nbTotalDV,10) + parseInt(nbTotalDVL,10);
        Totaltot = Totaltot.toString() + ' au total';
        document.getElementById('total').setAttribute('src','');
        document.getElementById('total').setAttribute('src','https://img.shields.io/static/v1?message='+Totaltot+'&label=T%C3%A9l%C3%A9chargements%20dvkbuntu&labelColor=black&style=for-the-badge&color=36393f&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0Ij48cGF0aCBkPSJNLjE3NSAxMy44MjNoMTMuNjQ4Vi4xNzZILjE3NXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwNjNhMyIgc3Ryb2tlLXdpZHRoPSIuMzUyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8%2BPHBhdGggZD0iTS41ODMgMTMuNDE1aDEyLjgzMlYuNTg0SC41ODN6IiBmaWxsPSIjMDA2M2EzIi8%2BPHBhdGggZD0iTS41ODMgMTMuNDE1aDEyLjgzMlYuNTg0SC41ODN6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDYzYTMiIHN0cm9rZS13aWR0aD0iLjMyOSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik01LjQ1NSA5LjMxM2wxLjAzLjE4Mi0uMDUyLjQ1Mi0xLjAwOS0uNDgzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02LjA0IDEyLjM2Yy41MzUuMzMzIDEuMTk4LjUzOCAyLjAxNi41MzUgNC4yNjMuMDE3IDQuMjY4LTUuNjM0IDQuMjY4LTUuNjM0bC0uMDAyLS4wMDIuMDAzLjAwNC0uMDEtLjAwN2MuMzMyLjA1Ni40LS4zOS40MzQtLjU1OS4wMzQtLjE3LS4wMi0uNjQ2LS4wMjMtLjg3Ni4wMTQtLjMwNy4xNzUtMS4wNC4xNzQtMS4zMzYgMC0uMjU4LjA5Ny0uODY1LS42LS42NzNhMzEuNDIgMzEuNDIgMCAwMS0uMDA5LS43NjdzLS4wMDgtLjQ1NC0uMDM3LS45MjJhNy42NTMgNy42NTMgMCAwMC0uMzU2LTEuNzM5SDYuNzQ1IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjA4OCIvPjxwYXRoIGQ9Ik0uMzUzIDEwLjgwNWMxLjEzIDEuMTIyIDMuODE2IDIuNDY0IDUuNTIxIDEuNzhhLjgwNy44MDcgMCAwMC4yNC0uMTU0Ljg3Ny44NzcgMCAwMC4yNzYtLjc4NHMuMDA4LS4xNDMtLjE2Mi0uNzI4Yy0uMDM0LS4xMzEuMDcxLS4yMDcuMjA4LS4yNTguMzExLS4xMTYuNDYtLjQ5OC0uMDAzLS43MTQgMCAwLS45OC0uNDExLTEuNjYtLjg0NiAwIDAgMS4yNjcuNDI1IDIuMDcuNDI1LjEgMCAuMzYuMDM1LjQxNy0uMjc3LjAyNC0uMTY1LS4xMjUtLjQ2MS0uMTI1LS42OTYgMCAwLS4wMzktLjEyNC4yMjctLjE1NS4wMzktLjAwNSAxLjU3NS0uMTU2LjQ2Ny0xLjkyIDAgMC0uNTUxLS44NzYtLjYwNS0yLjc3IDAtLjQ4Mi4wNTYtMS44OTUtLjQ1LTMuMzI0IiBmaWxsPSIjMDA2M2EzIi8%2BPHBhdGggZD0iTS4zNTMgMTAuODA1YzEuMTMgMS4xMjIgMy44MTYgMi40NjQgNS41MjEgMS43OGEuODA3LjgwNyAwIDAwLjI0LS4xNTQuODc3Ljg3NyAwIDAwLjI3Ni0uNzg0cy4wMDgtLjE0My0uMTYyLS43MjhjLS4wMzQtLjEzMS4wNzEtLjIwNy4yMDgtLjI1OC4zMTEtLjExNi40Ni0uNDk4LS4wMDMtLjcxNCAwIDAtLjk4LS40MTEtMS42Ni0uODQ2IDAgMCAxLjI2Ny40MjUgMi4wNy40MjUuMSAwIC4zNi4wMzUuNDE3LS4yNzcuMDI0LS4xNjUtLjEyNS0uNDYxLS4xMjUtLjY5NiAwIDAtLjAzOS0uMTI0LjIyNy0uMTU1LjAzOS0uMDA1IDEuNTc1LS4xNTYuNDY3LTEuOTIgMCAwLS41NTEtLjg3Ni0uNjA1LTIuNzcgMC0uNDgyLjA1Ni0xLjg5NS0uNDUtMy4zMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuMTk4IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8%2BPHBhdGggZD0iTTguOTU0IDQuNzY5Yy0uMTUuMDMzLS4wOTgtLjA5MS4wMDItLjIzLjE5LS4yNjMgMS4wMTUtLjkxOCAxLjQ1NC4wNTQuMDYzLjE0LjA3Ni4yMTMtLjAyLjE5NS0uMTY4LS4wMzItLjY3NC0uMTg3LTEuNDM2LS4wMiIgZmlsbD0iIzAwNjNhMyIvPjxwYXRoIGQ9Ik0zLjY0MyA0LjY5MmMtLjE1LjAyLS4wOS0uMDk5LjAyLS4yMy4yMTEtLjI0NyAxLjA4Ni0uODM0IDEuNDQ2LjE3LjA1Mi4xNDYuMDU4LjIxOS0uMDM1LjE5My0uMTY2LS4wNDUtLjY1OC0uMjQtMS40My0uMTMzIiBmaWxsPSIjZmZmIi8%2BPHBhdGggZD0iTS4zMzkgMTAuODk1Yy45NjIgMS4wOCAzLjg4NiAyLjQ2IDUuNTg1IDEuNzY1YS45OTUuOTk1IDAgMDAuMjQ1LS4xNTUuOTMuOTMgMCAwMC4xNTItLjE4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjI2NCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik02LjY1NC40NDVjLjAwNS0uMDE0LS4wNC0uMDUtLjAzNi0uMDYuMDI3IDAgLjA1My0uMDY2LjA1My0uMDY2LjU4IDEuNzA3LjUzOCAzLjU2NS42NDggNC40OTIuMTM3IDEuMDUxLjYxMSAyLjA1NC42MjcgMi4wODYuMDI4LjI5OC0xLjIwMy4zODctMS4yMDMuMzg3cy0xLjA5LTMuODE3LTEuMDktNC4wMzZjMC0uMTk2LjgzNy0yLjM3OCAxLTIuODAzbS0uNTI1IDkuMjU2Yy0uMTEzLS4wNjUtLjA1Mi0uMjA4LjA3OC0uMTc2LjYzOC4xNzkgMS40MjMuMjkxIDEuODk1LjI5MS4wNjMgMCAuOTczLjA0MiAxLjg2LS4yOTYuMDc5LS4wMy4xMjMtLjAyMy4xNS4wMjIuMDI1LjA1NC4wMTEuMDk1LS4wNDIuMTM1LS4zMTIuMjM4LS45NjcuNTkyLTEuOTU3LjU5Mi0uODM2IDAtMS43MDMtLjQxNS0xLjk4NC0uNTY4IiBmaWxsPSIjMDA2M2EzIi8%2BPHBhdGggZD0iTS4yNDMgMTMuNzU2aDEzLjUxMlYuMjQ0SC4yNDN6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjM1IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8%2BPC9zdmc%2B');
      })
      .catch(err => { throw err });
    })
    .catch(err => { throw err });
  })
  .catch(err => { throw err });
}
