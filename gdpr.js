const prefill = () => {
  document.getElementById('name').value = localStorage.getItem('gdpr.name') || '';
  document.getElementById('email').value = localStorage.getItem('gdpr.email') || '';
  document.getElementById('phone').value = localStorage.getItem('gdpr.phone') || '';
  document.getElementById('address1').value = localStorage.getItem('gdpr.address1') || '';
  document.getElementById('address2').value = localStorage.getItem('gdpr.address2') || '';
  document.getElementById('address3').value = localStorage.getItem('gdpr.address3') || '';
  document.getElementById('address4').value = localStorage.getItem('gdpr.address4') || '';
  if (localStorage.getItem('gdpr.contact')) {
    document.getElementById('contact').value = localStorage.getItem('gdpr.contact');
  }
};

const clear = () => {
  localStorage.clear();
  prefill();
}

const generate = (event) => {
  event.preventDefault();
  const context = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address1: document.getElementById('address1').value,
    address2: document.getElementById('address2').value,
    address3: document.getElementById('address3').value,
    address4: document.getElementById('address4').value,
    contact: document.getElementById('contact').value,
    errors: [],
  };

  localStorage.setItem('gdpr.name', context.name);
  localStorage.setItem('gdpr.email', context.email);
  localStorage.setItem('gdpr.phone', context.phone);
  localStorage.setItem('gdpr.address1', context.address1);
  localStorage.setItem('gdpr.address2', context.address2);
  localStorage.setItem('gdpr.address3', context.address3);
  localStorage.setItem('gdpr.address4', context.address4);
  localStorage.setItem('gdpr.contact', context.contact);
  prefill();

  if (!context.name) {
    context.errors.push('The name field is required.');
  }

  if (context.contact === 'email' && !context.email) {
    context.errors.push('You must provide an email if your contact preference is email.');
  }

  if (context.contact === 'phone' && !context.phone) {
    context.errors.push('You must provide a phone number if your contact preference is phone.');
  }

  if (context.contact === 'mail' && !context.address1 && !context.address2 && !context.address3 && !context.address4) {
    context.errors.push('You must provide an address if your contact preference is mail.');
  }

  context.address = context.address1 + context.address2 + context.address3 + context.address4;

  const language = 'en';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const template = Handlebars.compile(xhr.responseText);
      document.getElementById('content').innerHTML = template(context);
    }
  };
  xhr.open('GET', `/templates/${language}.hbr`, true);
  xhr.send();
};

const form = document.getElementById('form');
if (form.addEventListener) {
  form.addEventListener('submit', generate, false);
} else if (form.attachEvent) {
  form.attachEvent('onsubmit', generate);
}

const clearbtn = document.getElementById('clear');
if (clearbtn.addEventListener) {
  clearbtn.addEventListener('click', clear, false);
} else if (clearbtn.attachEvent) {
  clearbtn.attachEvent('onclick', clear);
}

prefill();