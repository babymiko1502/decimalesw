function formatCOP(value) {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2
  });
}

module.exports = { formatCOP };