// Firebase 구성 객체 (Firebase 콘솔에서 복사한 내용으로 교체하세요)
const firebaseConfig = {
    apiKey: "AIzaSyBJNLBY2X1CwZrJVKCLbv26GTOqwP9Nx9k",
    authDomain: "capstone-44da8.firebaseapp.com",
    databaseURL: "https://capstone-44da8-default-rtdb.firebaseio.com",
    projectId: "capstone-44da8",
    storageBucket: "capstone-44da8.appspot.com",
    messagingSenderId: "413756607044",
    appId: "1:413756607044:web:79f60604f3d8e3cf8b0a11",
    measurementId: "G-XVJYCXTY7T"
  };

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 데이터베이스 참조
const database = firebase.database();

// 센서 1의 데이터 가져오기
const sensor1Ref = database.ref('sensors/sensor1'); // 경로를 실제 Firebase 데이터 경로로 변경

sensor1Ref.on('value', (snapshot) => {
    const data = snapshot.val();
    
    // 데이터가 없을 때 대비
    if (!data) {
        console.log('데이터를 가져올 수 없습니다.');
        document.querySelector('.grid-item[data-sensor="sensor1"] p').textContent = '데이터를 가져올 수 없습니다.';
        return;
    }

    // 온도와 습도 데이터 가져오기
    const temperature = data.temperature || '데이터 없음';
    const humidity = data.humidity || '데이터 없음';

    // 센서 1의 데이터를 HTML에 표시하기
    document.querySelector('.grid-item[data-sensor="sensor1"] p').textContent = `온도: ${temperature}°C, 습도: ${humidity}%`;
});
