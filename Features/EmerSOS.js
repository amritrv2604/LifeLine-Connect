function dialContact(name, number) {
  let confirmDial = confirm(`Are you sure you want to dial ${name}?`);
  if (confirmDial) {
    window.location.href = `tel:${number}`;
  }
}
