fetch('/api/site1')
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => { throw new Error(error.error || 'Ошибка сервера'); });
    }
    return res.json();
  })
  .then(data => {
    document.getElementById('data').textContent = JSON.stringify(data, null, 2);
  })
  .catch(err => {
    document.getElementById('data').textContent = 'Ошибка загрузки данных: ' + err.message;
    console.error(err);
  });
