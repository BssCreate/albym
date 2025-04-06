const { google } = require('google-auth-library');
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
    return res.status(404).json({ error: 'Неизвестный сайт' });
  }

  try {
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

    res.status(200).json(response.data.values);
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
};
