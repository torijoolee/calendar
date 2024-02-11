//date 객체생성
let date = new Date();
const month = document.querySelector("select.month");
const year = document.querySelector("select.year");
const tableBody = document.querySelector(".dates-wrap table tbody");
let curr;
let currYear;
let currMonth;
let currDate;
let selectedYear;
let selectedMonth;
let currentDate = `${currYear} ${currMonth} ${currDate}`;

//연도 옵션을 변경했을때 날짜
year.addEventListener("change", function () {
  setNewDate();
});
//월 옵션을 변경했을때 날짜
month.addEventListener("change", function () {
  setNewDate();
});

//옵션이 변경되면 선택한 옵션 연도의 일자 구하기
function setNewDate() {
  selectedYear = year.value;
  selectedMonth = month.value - 1;
  let newDay = new Date(selectedYear, selectedMonth);
  console.log(`옵션변경날짜${newDay}`);
  currYear = newDay.getFullYear();
  currMonth = parseInt(newDay.toLocaleString("ko-KR", { month: "numeric" }));
  console.log(currYear, currMonth);
  tableBody.innerHTML = ``;
  renderCalendar(currYear, currMonth);
}

function setCurrent() {
  currYear = date.getFullYear();
  currMonth = parseInt(date.toLocaleString("ko-KR", { month: "numeric" }));
  currDate = date.getDate();
  console.log(`////${`${currYear}, ${currMonth}, ${currDate}`}`);

  //현재 월 기본으로 설정
  function setCurrentMonth() {
    curr = month.options[currMonth - 1];
    curr.selected = true;
  }
  setCurrentMonth();

  //년도 옵션 생성
  function yearOptions() {
    let years = "";
    for (let i = currYear - 20; i <= currYear + 2; i++) {
      years = document.createElement("option");
      years.setAttribute("value", i);
      years.innerText = `${i}`;
      year.appendChild(years);
    }
    //현재 년도 기본으로 설정
    for (let i = 0; i < year.options.length; i++) {
      let currentYear = year.options[i];
      if (currentYear.value == currYear) {
        currentYear.selected = true;
      }
    }
  }
  yearOptions();
}
setCurrent();
//**************** 현재 날짜 달력 그리기 ****************//
//지난달, 다음달, 오늘로 date 객체 수정
//년과 월에 따라 마지막 일 구하기

const renderCalendar = () => {
  //지난달 마지막 날짜
  let prevLast = new Date(currYear, currMonth - 1, 0);
  console.log(`지난달마지막날짜 ${prevLast}`);
  //이번달의 마지막 날짜
  let thisLast = new Date(currYear, currMonth, 0);
  console.log(`이번달마지막날짜 ${thisLast}`);

  //지난달의 마지막 일
  let PLDate = prevLast.getDate();
  console.log(`지난달 마지막 일 ${PLDate}`);
  //지난달의 마지막 요일 //일요일 0
  let PLDay = prevLast.getDay();
  console.log(`지난달 마지막 요일 ${PLDay}`);

  //이번달의 마지막 일
  let TLDate = thisLast.getDate();
  console.log(`이번달마지막일${TLDate}`);
  //이번달의 마지막 요일
  let TLDay = thisLast.getDay();
  console.log(`이번달마지막요일${TLDay}`); //3수요일

  let prevDates = [];
  let thisDates = [...Array(TLDate + 1).keys()].slice(1);
  let nextDates = [];
  console.log(thisDates);

  //지난달의 마지막요일이 토요일이 아니면??
  console.log(`지난달 마지막 요일${PLDay}`);
  if (PLDay != 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      //새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환
      prevDates.unshift(PLDate - i);
    }
  }
  console.log(`지난달 요일들임////////${prevDates}`);

  //7 - 이번달 요일만큼 다음달의 요일 배열에 추가
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }
  console.log(nextDates);

  var dates = prevDates.concat(thisDates, nextDates);
  console.log(dates);

  //배열 5줄로 나누기
  function splitIntoChunk(arr, chunk) {
    const result = [];
    for (i = 0; i < dates.length; i += chunk) {
      // 7개씩 배열 분리
      let seperateWeeks = arr.slice(i, i + chunk);
      result.push(seperateWeeks);
    }
    return result;
  }
  const newArray = splitIntoChunk(dates, 7);

  //총 날짜 / 7 만큼 tr태그 생성
  //tr태그 안에 총 7개의 td span 생성
  for (let i = 0; i < newArray.length; i++) {
    let temp = document.createElement("tr");
    tableBody.appendChild(temp);
    for (let j = 0; j < newArray[i].length; j++) {
      let td = document.createElement("td");
      temp.appendChild(td);
      const inputDates = document.querySelectorAll("tbody tr td");

      inputDates.forEach((elem, i) => {
        elem.innerHTML = `
        <span class="">${dates[i]}</span>`;
      });
    }
  }
};
renderCalendar();

//지난달, 다음달, 오늘로 이동하는 함수 생성
const prevMonth = () => {
  setNewDate();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  let curr = month.options[date.getMonth()];
  curr.selected = true;
  tableBody.innerHTML = ``;
  renderCalendar();
};

const nextMonth = () => {
  setNewDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  let curr = month.options[date.getMonth()];
  curr.selected = true;
  tableBody.innerHTML = ``;
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  setCurrent();
  tableBody.innerHTML = ``;
  renderCalendar();
};
