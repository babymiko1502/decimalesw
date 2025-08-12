const express = require('express');
const cors = require('cors');
const { formatCOP } = require('./utils/format');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/formatear', (req, res) => {
  const { data } = req.body;

  if (!data || typeof data !== 'string') {
    return res.status(400).json({ error: 'Formato inválido' });
  }

  const lines = data.trim().split('\n');
  const resultados = lines.map(line => {
    const [numero, deudaRaw] = line.split(',');
    const deuda = parseFloat(deudaRaw);
    return {
      numero: numero.trim(),
      deuda: formatCOP(deuda)
    };
  });

  res.json({ resultados });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
