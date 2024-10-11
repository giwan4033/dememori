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

// 페이지 로드 시 센서데이터를 가져오는 함수 호출
window.onload = function () {
  getLatestSensorData("Board1", "sensor1-temp", "sensor1-humidity");
  getLatestSensorData("Board2", "sensor2-temp", "sensor2-humidity");
  getLatestSensorData("Board3", "sensor3-temp", "sensor3-humidity");
  getLatestSensorData("Board4", "sensor4-temp", "sensor4-humidity");
  getLatestSensorData("Board5", "sensor5-temp", "sensor5-humidity");
  getLatestSensorData("Board6", "sensor6-temp", "sensor6-humidity");
  getLatestSensorData("Board7", "sensor7-temp", "sensor7-humidity");
  getLatestSensorData("Board8", "sensor8-temp", "sensor8-humidity");
  getLatestSensorData("Board9", "sensor9-temp", "sensor9-humidity");
  getLatestSensorData("Board10", "sensor10-temp", "sensor10-humidity");
};

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
