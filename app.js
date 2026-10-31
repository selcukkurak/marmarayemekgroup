const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü aç' : 'Menüyü kapat');
  primaryNav?.classList.toggle('is-open', !isOpen);
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Menüyü aç');
    primaryNav.classList.remove('is-open');
  });
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const whatsappByService = {
  'Toplu yemek': '905469055527',
  Restoran: '905469055527',
  'Yazılım çözümleri': '905312445705',
  Diğer: '905469055527',
};

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Lütfen zorunlu alanları kontrol edin.';
    status.className = 'form-note is-error';
    return;
  }

  const formData = new FormData(form);
  const service = formData.get('interest');
  const phone = formData.get('phone') || 'Belirtilmedi';
  const message = [
    'Merhaba, Marmara Yemek Group ile iletişime geçmek istiyorum.',
    `İlgilendiğim alan: ${service}`,
    `Ad soyad: ${formData.get('name')}`,
    `Telefon: ${phone}`,
    `Mesaj: ${formData.get('message')}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/${whatsappByService[service]}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  status.textContent = 'WhatsApp sohbeti yeni sekmede açılıyor. Mesajı göndermek için WhatsApp’ta onaylayın.';
  status.className = 'form-note is-success';
});

const reservationForm = document.querySelector('#reservation-form');
const reservationStatus = document.querySelector('#reservation-status');
const reservationDate = document.querySelector('#reserve-date');
const today = new Date();
const localToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
reservationDate?.setAttribute('min', localToday);

reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reservationForm.checkValidity()) {
    reservationForm.reportValidity();
    reservationStatus.textContent = 'Lütfen rezervasyon için gerekli alanları doldurun.';
    reservationStatus.classList.add('is-error');
    return;
  }

  const formData = new FormData(reservationForm);
  const selectedDate = new Date(`${formData.get('date')}T00:00:00`).toLocaleDateString('tr-TR');
  const message = [
    'Merhaba, restoran için rezervasyon talebinde bulunmak istiyorum.',
    `Ad soyad: ${formData.get('name')}`,
    `Tarih: ${selectedDate}`,
    `Saat: ${formData.get('time')}`,
    `Kişi sayısı: ${formData.get('guests')}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/905469055527?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  reservationStatus.textContent = 'WhatsApp sohbeti açılıyor. Rezervasyonun kesinleşmesi için işletmeden teyit alın.';
  reservationStatus.classList.remove('is-error');
  reservationStatus.classList.add('is-success');
});

document.querySelector('#year').textContent = new Date().getFullYear();
