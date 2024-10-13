// Firebase 구성 객체
const firebaseConfig = {
  apiKey: "AIzaSyDo9P8Y1NANxSr79Gmj-ZyskLfZ_KtDBqU",
  authDomain: "forestfireforecast.firebaseapp.com",
  databaseURL: "https://forestfireforecast-default-rtdb.firebaseio.com",
  projectId: "forestfireforecast",
  storageBucket: "forestfireforecast.appspot.com",
  messagingSenderId: "566032395610",
  appId: "1:566032395610:web:835be202cae066a6221763",
  measurementId: "G-RPDPN7ZZ69",
};

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const database = firebase.database();

// 데이터를 가져와서 화면에 표시하는 함수
function getLatestSensorData(boardId, tempElementId, humidityElementId) {
  const humidityRef = database
    .ref(`sensor/${boardId}/humidity`)
    .orderByKey()
    .limitToLast(1);
  const temperatureRef = database
    .ref(`sensor/${boardId}/temperature`)
    .orderByKey()
    .limitToLast(1);

  // 최신 humidity 값 가져오기
  humidityRef.on("value", (snapshot) => {
    const latestHumidityData = snapshot.val();
    console.log(`Humidity Data (${boardId}):`, latestHumidityData); // 콘솔에 데이터 출력
    const latestHumidityValue = latestHumidityData
      ? Object.values(latestHumidityData)[0]
      : "- -";
    document.getElementById(humidityElementId).textContent =
      latestHumidityValue + "%";
  });

  // 최신 temperature 값 가져오기
  temperatureRef.on("value", (snapshot) => {
    const latestTemperatureData = snapshot.val();
    console.log(`Temperature Data (${boardId}):`, latestTemperatureData); // 콘솔에 데이터 출력
    const latestTemperatureValue = latestTemperatureData
      ? Object.values(latestTemperatureData)[0]
      : "- -";
    document.getElementById(tempElementId).textContent =
      latestTemperatureValue + "°C";
  });
}

function updateDateTime() {
  const now = new Date();

  // 월과 일을 가져오기
  const formattedDate = now.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });

  // 요일을 가져와서 괄호 안에 넣기
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = daysOfWeek[now.getDay()]; // getDay()는 0(일요일)부터 6(토요일)을 반환

  // 시간 형식 설정 (예: 21:45:23)
  const formattedTime = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24시간 형식
  });

  // 날짜와 시간을 한 줄로 조합하여 업데이트
  document.getElementById(
    "current-date-time"
  ).innerText = `${formattedDate} (${weekday}) ${formattedTime}`;
}

// 페이지 로드 시 날짜 및 시간 업데이트
window.onload = function () {
  updateDateTime(); // 페이지 로드 시 즉시 업데이트
  setInterval(updateDateTime, 1000); // 1초마다 시간 업데이트
};

// 센서 카드 생성 함수
function createSensorCard(sensorId) {
  return `
    <div class="sensor-card" onclick="openSensorDetails('Board${sensorId}')">
      <div class="sensor-data">
        <div class="sensor-header">
          <img src="img/mountain_icon.png" alt="Mountain Icon" class="mountain-icon" />
          <span class="sensor-title">BOARD${sensorId} </span>
        </div>
      </div>
      <div class="sensor-info">
        <div class="sensor-temperature">
          <img src="img/temp_icon.png" alt="Temp Icon" class="temp-icon" /> <span id="sensor${sensorId}-temp">- -</span>
        </div>
        <div class="sensor-humidity">
          <img src="img/humi_icon.png" alt="humi Icon" class="humi-icon" /> <span id="sensor${sensorId}-humidity">- -</span>
        </div>
      </div>
    </div>
  `;
}

// 센서 그리드를 동적으로 생성하는 함수
function generateSensorGrid() {
  const sensorGrid = document.getElementById("sensor-grid");
  let sensorsHTML = "";
  for (let i = 1; i <= 10; i++) {
    sensorsHTML += createSensorCard(i);
  }
  sensorGrid.innerHTML = sensorsHTML;

  // 센서 데이터 로드
  loadSensorData();
}

// 실시간 센서 데이터를 로드하는 함수
function loadSensorData() {
  for (let i = 1; i <= 10; i++) {
    const boardId = `Board${i}`;
    getLatestSensorData(boardId, `sensor${i}-temp`, `sensor${i}-humidity`);
  }
}

// 센서 카드 클릭 시 새 창 열기
function openSensorDetails(boardId) {
  // boardId를 쿼리 매개변수로 전달
  window.open(
    `sensorGraph.html?boardId=${boardId}`,
    "_blank",
    "width=800,height=600"
  );
}

// URL 쿼리에서 boardId 추출
const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get("boardId");

// 이후 boardId에 따라 데이터를 변경하는 로직을 추가할 수 있습니다.
if (boardId === "Board1") {
  // Board1의 데이터를 로드
}

// 페이지 로드 시 센서 카드 및 날짜 시간 업데이트
window.onload = function () {
  updateDateTime(); // 날짜 및 시간 업데이트
  setInterval(updateDateTime, 1000); // 1초마다 시간 업데이트
  generateSensorGrid(); // 센서 카드 생성 후 데이터를 로드
};
