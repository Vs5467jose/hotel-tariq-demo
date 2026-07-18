// 1. Efecto sombra en el Header al hacer scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.6)';
  } else {
    nav.style.boxShadow = 'none';
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
  
  // Usamos un número de teléfono de respaldo o el del usuario mientras conseguimos el del gerente
  const hotelWhatsAppNumber = '573000000000'; 

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
    if (roomType.includes("Suite")) pricePerNight = 160000;

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

// 4. Lógica de FAQs e IntersectionObserver
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

  // Acordeón FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      const isOpen = answer.style.display === 'block';
      
      document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
      document.querySelectorAll('.faq-icon').forEach(ic => ic.innerText = '+');

      if (!isOpen) {
        answer.style.display = 'block';
        icon.innerText = '-';
        item.style.borderColor = 'var(--green-light)';
      } else {
        answer.style.display = 'none';
        icon.innerText = '+';
        item.style.borderColor = 'rgba(142,90,51,0.1)';
      }
    });
  });

  // Animaciones fade-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s ease forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1 
  });

  const animElements = document.querySelectorAll(
    '.room-card, .service-box, .direct-card, .review-card, .info-item, .faq-item'
  );

  animElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
