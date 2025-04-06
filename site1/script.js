fetch('/api/site1')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('data');
    container.innerHTML = data.map(row => `<div>${row.join(' | ')}</div>`).join('');
  })
  .catch(err => {
    document.getElementById('data').innerText = 'Ошибка загрузки данных';
  });
