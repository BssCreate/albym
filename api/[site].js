const { google } = require('googleapis');
const axios = require('axios');
const key = require('../service_account.json');

const spreadsheetId = '1XOe29zxWW0mgVrZQSAu-9TQ4i7dfvYOBkq7-VvWg2nY';

const sites = {
  site1: 'Лист1',
  site2: 'Лист2',
};

module.exports = async (req, res) => {
  const { site } = req.query;
  const sheetName = sites[site];

  if (!sheetName) {
    console.error('Неизвестный сайт:', site);  // Логируем неизвестный сайт
    return res.status(404).json({ error: 'Неизвестный сайт' });
  }

  try {
    // Инициализация GoogleAuth
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Получаем авторизованный клиент
    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const range = `${sheetName}!A1:Z100`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.status(200).json(response.data.values);
  } catch (err) {
    console.error('Ошибка при получении данных:', err.message || err);  // Логируем ошибку
    res.status(500).json({ error: 'Ошибка при получении данных', details: err.message || err });
  }
};
