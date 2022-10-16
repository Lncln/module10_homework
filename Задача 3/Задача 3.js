const wsUrl = "wss://echo-ws-service.herokuapp.com";
let btnSend = document.querySelector('.j-btn-send');
let btnLocationSend = document.querySelector('.g-btn-send');
let input = document.querySelector('#input');
let output = document.getElementById("output");

let websocket = new WebSocket(wsUrl);
websocket.onopen = function(e) {
    writeToScreen("Говорите!")
};
websocket.onerror = function(e){
    writeToScreen("Ошибка")
}

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
};

btnSend.addEventListener('click', () => {
    let message = input.value;
    writeToScreen("YOU: " + message);
    websocket.send(message);

    websocket.onmessage = function(e) {
        writeToScreen(
            '<span style="color: red;">ECHO: ' + e.data +'</span>'
        );
    }
});
btnLocationSend.addEventListener('dblclick',() => {
    if (!navigator.geolocation) {
        writeToScreen('Geolocation не поддерживается вашим браузером');
    } else {
        writeToScreen('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

const error = () => {
    writeToScreen('Невозможно получить ваше местоположение');
}
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    writeToScreen(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
}
