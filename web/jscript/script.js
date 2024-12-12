let countdownInterval;
let countdownRunning = false;

// Función para convertir minutos y segundos a segundos totales
function convertToSeconds(minutes, seconds) {
    return (parseInt(minutes) * 60) + parseInt(seconds);
}

// Función para iniciar o detener la cuenta atrás según el estado actual
function toggleCountdown() {
    if (!countdownRunning) {
        startCountdown();
    } else {
        stopCountdown();
    }
}

// Función para iniciar la cuenta atrás
function startCountdown() {
    let timeInput = document.getElementById('timeInput').value;
    let [minutes, seconds] = timeInput.split(':');

    // Verificar si no se ingresó ningún valor y utilizar el predeterminado (5 minutos)
    if (isNaN(parseInt(minutes)) || isNaN(parseInt(seconds))) {
        minutes = 5;
        seconds = 0;
        document.getElementById('timeInput').value = '5:00'; // Actualizar el valor del cuadro de texto
    }

    let totalTime = convertToSeconds(minutes, seconds);

    // Mostrar tiempo inicial
    updateCountdown(totalTime);

    // Actualizar cada segundo
    countdownInterval = setInterval(function() {
        totalTime--;
        if (totalTime >= 0) {
            updateCountdown(totalTime);
        } else {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '¡Tiempo finalizado!';
            countdownRunning = false;
            document.getElementById('toggleButton').innerText = 'Start';
        }
    }, 1000);

    countdownRunning = true;
    document.getElementById('toggleButton').innerText = 'Stop';
}

// Función para detener la cuenta atrás
function stopCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    document.getElementById('toggleButton').innerText = 'Start';
}

// Función para actualizar la visualización del contador
function updateCountdown(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Agregar ceros a la izquierda si es necesario
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById('countdown').innerHTML = `${minutes}:${seconds}`;
}
