fetch('/api/site1')
  .then(res => res.json())
  .then(data => {
    document.getElementById('data').textContent = JSON.stringify(data, null, 2);
  })
  .catch(err => {
    document.getElementById('data').textContent = 'Ошибка загрузки данных';
    console.error(err);
  });