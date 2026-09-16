const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const whatsappNumber = '50672144339';

function openWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const catalogForm = document.getElementById('catalog-request');
const selectionCount = document.getElementById('selection-count');
const catalogStatus = document.getElementById('catalog-status');

function updateSelectionCount() {
  const total = catalogForm?.querySelectorAll('input[name="product"]:checked').length ?? 0;
  if (selectionCount) {
    selectionCount.textContent = total === 1 ? '1 opción seleccionada' : `${total} opciones seleccionadas`;
  }
  if (catalogStatus) catalogStatus.textContent = '';
}

catalogForm?.addEventListener('change', updateSelectionCount);

catalogForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = [...catalogForm.querySelectorAll('input[name="product"]:checked')];

  if (!selected.length) {
    catalogStatus.textContent = 'Seleccione al menos una opción antes de enviar la solicitud.';
    catalogForm.querySelector('input[name="product"]')?.focus();
    return;
  }

  const grouped = new Map();
  selected.forEach((input) => {
    const group = input.dataset.group;
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(input.value);
  });

  const lines = ['Hola, estoy interesado(a) en los siguientes muebles:', ''];
  grouped.forEach((items, group) => {
    lines.push(`• ${group}: ${items.join(', ')}`);
  });
  lines.push('', 'Quisiera recibir más información y una cotización.');
  openWhatsApp(lines.join('\n'));
});

const customForm = document.getElementById('custom-request');
const customStatus = document.getElementById('custom-status');

customForm?.addEventListener('input', () => {
  if (customStatus) customStatus.textContent = '';
});

customForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!customForm.reportValidity()) return;

  const furnitureType = document.getElementById('custom-type').value.trim();
  const measures = document.getElementById('custom-measures').value.trim();
  const details = document.getElementById('custom-details').value.trim();
  const lines = [
    'Hola, estoy interesado(a) en un mueble a la medida.',
    '',
    `• Tipo de mueble: ${furnitureType}`,
    `• Medidas aproximadas: ${measures}`
  ];

  if (details) lines.push(`• Detalles adicionales: ${details}`);
  lines.push('', 'Quisiera recibir más información y una cotización.');
  openWhatsApp(lines.join('\n'));
});

document.querySelectorAll('.whatsapp-link').forEach((link) => {
  const message = link.dataset.message;
  if (message) {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
