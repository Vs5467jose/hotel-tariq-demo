// Nexo Digital - Lógica de comportamiento en JS para Hotel Tariq con soporte para AOS y Bootstrap 5

// 1. Efecto sombra en el Header al hacer scroll (con comprobación de seguridad para evitar errores JS)
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-custom');
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.6)';
      nav.style.padding = '0.8rem 6%';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.padding = '1.2rem 6%';
    }
  }
});

// 2. Función para construir y enviar el formulario de reserva vía WhatsApp
function enviarConsulta() {
  const name = document.getElementById('guest-name').value || 'Cliente';
  const room = document.getElementById('room-type').value;
  const checkin = document.getElementById('check-in').value || 'Por confirmar';
  const checkout = document.getElementById('check-out').value || 'Por confirmar';
  const guests = document.getElementById('guests').value || '1';

  // Obtener cálculos del simulador
  const nights = document.getElementById('calc-nights').innerText || '0';
  const total = document.getElementById('calc-total').innerText || '$0 COP';

  // Construir mensaje formateado con emojis
  const msgText = `¡Hola Hotel Tariq! 🏨\n\nQuiero consultar disponibilidad para una reserva directa:\n\n👤 Nombre: ${name}\n🛏️ Habitación: ${room}\n📅 Entrada: ${checkin}\n📅 Salida: ${checkout}\n🌙 Noches: ${nights}\n👥 Huéspedes: ${guests}\n💰 Valor Total Est.: ${total}\n\n¿Tienen disponibilidad?`;
  
  const encodedMsg = encodeURIComponent(msgText);
  
  // WhatsApp real del hotel receptor de reservas
  const hotelWhatsAppNumber = '573114191754'; 

  window.open(`https://wa.me/${hotelWhatsAppNumber}?text=${encodedMsg}`, '_blank');
}

// 3. Calculadora de Estadía y Ahorro Directo (Booking 15% Commision Saved)
function calcularEstadia() {
  const checkinVal = document.getElementById('check-in').value;
  const checkoutVal = document.getElementById('check-out').value;
  const roomType = document.getElementById('room-type').value;
  const calcBox = document.getElementById('calculator-box');

  if (!checkinVal || !checkoutVal) return;

  const date1 = new Date(checkinVal);
  const date2 = new Date(checkoutVal);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    let pricePerNight = 80000; // Tarifa básica Tariq
    if (roomType.includes("Doble")) pricePerNight = 120000;
    if (roomType.includes("Premium")) pricePerNight = 160000;

    const total = pricePerNight * diffDays;
    const savings = Math.round(total * 0.15); // Ahorro Booking 15%

    document.getElementById('calc-nights').innerText = diffDays;
    document.getElementById('calc-total').innerText = `$${total.toLocaleString('es-CO')} COP`;
    document.getElementById('calc-savings').innerText = `$${savings.toLocaleString('es-CO')} COP`;
    calcBox.style.display = 'block';
  } else {
    calcBox.style.display = 'none';
  }
}

// 4. Inicializaciones al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  // Asignar escuchadores a la calculadora
  const ci = document.getElementById('check-in');
  const co = document.getElementById('check-out');
  const rt = document.getElementById('room-type');
  
  if(ci && co && rt) {
    ci.addEventListener('change', calcularEstadia);
    co.addEventListener('change', calcularEstadia);
    rt.addEventListener('change', calcularEstadia);
  }

  // Inicializar la librería de animaciones AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});
