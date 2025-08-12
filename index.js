const express = require('express');
const cors = require('cors');
const path = require('path');
const { formatCOP } = require('./utils/format');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/formatear', (req, res) => {
  const { data } = req.body;

  if (!data || typeof data !== 'string') {
    return res.status(400).send('Formato inválido');
  }

  const lines = data.trim().split('\n');
  const resultados = lines.map(line => {
    const [numero, deudaRaw] = line.split(',');
    const deuda = parseFloat(deudaRaw);
    let formateada = formatCOP(deuda).replace('$', '').trim();
    formateada = formateada.replace(',00', '.00'); // cambio solicitado
    return `${numero.trim()},${formateada}`;
  });

  res.type('text/plain').send(resultados.join('\n'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});