let energia = 0;
let fuerza = 0;
let intervalo;

function actualizarMedidores() {
  document.getElementById('circleFuerza').setAttribute('data-label', 'Fuerza: ' + fuerza + '%');
  document.getElementById('circleEnergia').setAttribute('data-label', 'Energía: ' + energia + '%');
}

function mostrarAlerta(mensaje, tipo) {
  const alerta = document.getElementById('alertaSistema');
  alerta.style.display = 'block';
  alerta.textContent = mensaje;
  alerta.className = 'alerta-sistema ' + tipo;
}

function iniciarSistema() {
  document.getElementById('waveAnimation').style.display = 'block';
  document.getElementById('aguaLed').classList.add('on');
  setTimeout(() => document.getElementById('flujoLed').classList.add('on'), 1000);
  setTimeout(() => document.getElementById('fuerzaLed').classList.add('on'), 1500);
  setTimeout(() => document.getElementById('energiaLed').classList.add('on'), 2000);
  setTimeout(() => document.getElementById('luzLed').classList.add('on'), 3000);

  energia = 0;
  fuerza = 0;
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    if (energia < 100) {
      energia += 4;
      fuerza = energia;
      document.getElementById('barraEnergia').style.width = energia + '%';
      actualizarMedidores();
    } else {
      mostrarAlerta('⚠️ Mantenimiento requerido: sobrecarga de energía', 'alerta-mantenimiento');
      detenerSistema();
    }
  }, 400);

  mostrarAlerta('✅ Sistema funcionando correctamente', 'alerta-bien');
  document.getElementById('circleFuerza').classList.add('fill');
  document.getElementById('circleEnergia').classList.add('fill');
}

function detenerSistema() {
  document.querySelectorAll('.led').forEach(led => led.classList.remove('on'));
  document.getElementById('barraEnergia').style.width = '0%';
  document.getElementById('waveAnimation').style.display = 'none';
  document.getElementById('circleFuerza').classList.remove('fill');
  document.getElementById('circleEnergia').classList.remove('fill');
  energia = 0;
  fuerza = 0;
  actualizarMedidores();
  clearInterval(intervalo);
}

document.addEventListener('DOMContentLoaded', () => {
  const fecha = new Date().toLocaleString();
  document.getElementById('fecha').textContent = fecha;
  document.getElementById('waveAnimation').style.display = 'none';
  actualizarMedidores();
});
