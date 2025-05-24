function calculatePenetration() {
  const frequency = parseFloat(document.getElementById('frequency').value) * 1000; // kHz to Hz
  const material = document.getElementById('material').value;

  const materialData = {
    steel: { velocity: 5900, attenuation: 0.05 },
    aluminum: { velocity: 6320, attenuation: 0.01 },
    plastic: { velocity: 2300, attenuation: 0.1 },
    glass: { velocity: 5400, attenuation: 0.07 }
  };

  if (!materialData[material]) {
    document.getElementById('result').innerText = 'متریال نامعتبر است.';
    return;
  }

  const { velocity, attenuation } = materialData[material];

  // ساده‌سازی محاسبه عمق نفوذ: عمق = سرعت / (2 * ضریب تضعیف * فرکانس)
  const penetrationDepth = velocity / (2 * attenuation * frequency);

  document.getElementById('result').innerText = `عمق نفوذ تقریبی: ${penetrationDepth.toFixed(2)} میلی‌متر`;
}
