const express = require('express');
const path = require('path');
const { google } = require('google-auth-library');
const axios = require('axios');
const key = require('./service_account.json');

const app = express();
const PORT = process.env.PORT || 3000;

// ID Google Таблицы
const spreadsheetId = '1XOe29zxWW0mgVrZQSAu-9TQ4i7dfvYOBkq7-VvWg2nY';

// Названия листов, соответствующие подсайтам
const sites = {
  site1: 'Лист1',
  site2: 'Лист2',
};

// Авторизация через сервисный аккаунт
async function getSheetData(sheetName) {
  const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  await client.authorize();
  const token = await client.getAccessToken();

  const range = `${sheetName}!A1:Z100`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  return response.data.values;
}

// Обслуживание HTML, CSS, JS файлов из каждой папки
app.use('/:site', (req, res, next) => {
  const site = req.params.site;
  if (sites[site]) {
    express.static(path.join(__dirname, site))(req, res, next);
  } else {
    res.status(404).send('Неизвестный сайт');
  }
});

// API для получения данных из листа
app.get('/api/:site', async (req, res) => {
  const sheetName = sites[req.params.site];
  if (!sheetName) return res.status(404).send('Неизвестный сайт');

  try {
    const data = await getSheetData(sheetName);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при получении данных');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
