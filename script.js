// Firebase 구성 객체 (Firebase 콘솔에서 복사한 내용으로 교체하세요)
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

// 최신 데이터를 가져와서 화면에 표시하는 함수
function getLatestSensorData() {
  const humidityRef = database
    .ref("sensor/humidity")
    .orderByKey()
    .limitToLast(1);
  const temperatureRef = database
    .ref("sensor/temperature")
    .orderByKey()
    .limitToLast(1);

  // 최신 humidity 값 가져오기
  humidityRef.on("value", (snapshot) => {
    const latestHumidityData = snapshot.val();
    console.log("Humidity Data:", latestHumidityData); // 콘솔에 데이터 출력
    const latestHumidityValue = latestHumidityData
      ? Object.values(latestHumidityData)[0]
      : "No Data";
    document.getElementById("sensor1-humidity").textContent =
      latestHumidityValue + "%";
  });

  // 최신 temperature 값 가져오기
  temperatureRef.on("value", (snapshot) => {
    const latestTemperatureData = snapshot.val();
    console.log("Temperature Data:", latestTemperatureData); // 콘솔에 데이터 출력
    const latestTemperatureValue = latestTemperatureData
      ? Object.values(latestTemperatureData)[0]
      : "No Data";
    document.getElementById("sensor1-temp").textContent =
      latestTemperatureValue + "°C";
  });
}

// 함수 호출
window.onload = getLatestSensorData;

// 각각의 센서 데이터를 가져오기
getSensorData("sensor1", "sensor1-temp", "sensor1-humidity"); // 근린공원 방향
getSensorData("sensor2", "sensor2-temp", "sensor2-humidity"); // 헬기장 방향
getSensorData("sensor3", "sensor3-temp", "sensor3-humidity"); // 주공 5단지 방향
getSensorData("sensor4", "sensor4-temp", "sensor4-humidity"); // 약수터 방향
getSensorData("sensor5", "sensor5-temp", "sensor5-humidity"); // 경복대 방향
getSensorData("sensor6", "sensor6-temp", "sensor6-humidity"); // 배드민턴장 방향
getSensorData("sensor7", "sensor7-temp", "sensor7-humidity"); // 경복대 방향
getSensorData("sensor8", "sensor8-temp", "sensor8-humidity"); // 경복대 방향
getSensorData("sensor9", "sensor9-temp", "sensor9-humidity"); // 경복대 방향
