'use strict'

const section = {
  131:["1係","2係","3係","4係"],
  132:["1係","2係","3係","4係","5係","6係","7係","8係"],
  133:["1係","2係","3係","4係","5係","6係"],
}

const changeItem = () => {
  const di = document.getElementById("monday").innerText;
  const si = document.getElementById("section").value;
  
  document.getElementById("comm").value = localStorage.getItem(si+di) ? localStorage.getItem(si+di) : "";

}

const displayDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = ('00' + (date.getMonth()+1)).slice(-2);
  const dd = ('00' + date.getDate()).slice(-2);

  document.getElementById("monday").innerText = `${yyyy}/${mm}/${dd}`;
  changeItem();
}

function nm() {
  
  let date = new Date();

  while (date.getDay() !== 1) {
    date.setDate( date.getDate() + 1);
  }
  
  displayDate(date);

  return function (next) { 
    date.setDate( date.getDate() + next)
    return date;
  }
  
}

function setSelect(line, sectionNo) {
  const selectLine = document.getElementById("line");
  const selectSction = document.getElementById("section");
  
  if (selectSction.hasChildNodes()) {
    while (selectSction.hasChildNodes() > 0) {
      selectSction.removeChild(selectSction.firstChild);
    }
  }

  for (const o of selectLine.options) {
    if (o.value == line) {
      o.selected = true;
      for (let i = 0; i < section[line].length; i++) {
        const newOption = document.createElement("option");
        newOption.text = section[line][i];
        newOption.value = line + (i + 1);
        if (i+1 == sectionNo){
          newOption.selected = true;
        }
        selectSction.appendChild(newOption); 
      }
    }
  }

  changeItem();
}

const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const line = params.get("code") ? params.get("code") : "1311";

setSelect(line.substring(0,3), line.substring(line.length-1));

const nextMonday = nm();

document.getElementById("nextmonday").addEventListener("click", function (){
  displayDate(nextMonday(7));
})
document.getElementById("forwardmonday").addEventListener("click", function (){
  displayDate(nextMonday(-7));
})

document.getElementById("line").addEventListener("change", function () {
  setSelect(this.value, 1);
});

document.getElementById("section").addEventListener("change", function () {
  changeItem();
});

document.getElementById("comm").addEventListener("keyup", function (event){
  if(event.shiftKey && event.code === "Enter") {
    const dateItem = document.getElementById("monday").innerText;
    const sectionItem = document.getElementById("section").value;
    const commItem = document.getElementById("comm").value;

    localStorage.setItem(sectionItem + dateItem, commItem);
    //XMLHttpRequestGet();
  };
});

document.getElementById("sectionCode").addEventListener("keyup", function () {
  const code = this.value;
  
  if (3 < code.length) {
    location.href = location.pathname + "?code=" + code;
  }
});

function XMLHttpRequestGet () {
  const eq = new XMLHttpRequest();
  const dateItem = "d=" + document.getElementById("monday").innerText;
  const sectionItem = "s=" + document.getElementById("section").value;
  const commItem = "c=" + document.getElementById("comm").value;

  req.open('GET', `../uplodComment.asp?d=${dateItem}&s=${sectionItem}c=${commItem}` , true);
  req.send(null);
}
