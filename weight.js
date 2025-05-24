const densities = {
  steel: 7.85,
  aluminum: 2.7,
  plastic: 1.2,
  copper: 8.96,
  brass: 8.5
};

function updateInputs() {
  const shape = document.getElementById("shape").value;
  const dimensionsDiv = document.getElementById("dimensions");
  const iconDiv = document.getElementById("icon");
  dimensionsDiv.innerHTML = "";
  iconDiv.innerHTML = "";

  if (shape === "cube") {
    dimensionsDiv.innerHTML = `
      <label>طول (میلیمتر):</label>
      <input type="number" id="length" />
      <label>عرض (میلیمتر):</label>
      <input type="number" id="width" />
      <label>ارتفاع (میلیمتر):</label>
      <input type="number" id="height" />
    `;
    iconDiv.innerHTML = "📦";
  } else if (shape === "cylinder") {
    dimensionsDiv.innerHTML = `
      <label>قطر (میلیمتر):</label>
      <input type="number" id="diameter" />
      <label>ارتفاع (میلیمتر):</label>
      <input type="number" id="height" />
    `;
    iconDiv.innerHTML = "🛢️";
  } else if (shape === "hollowCylinder") {
    dimensionsDiv.innerHTML = `
      <label>قطر بیرونی (میلیمتر):</label>
      <input type="number" id="outerDiameter" />
      <label>قطر داخلی (میلیمتر):</label>
      <input type="number" id="innerDiameter" />
      <label>ارتفاع (میلیمتر):</label>
      <input type="number" id="height" />
    `;
    iconDiv.innerHTML = "🧯";
  }
}

function calculateWeight() {
  const shape = document.getElementById("shape").value;
  const material = document.getElementById("material").value;
  const density = densities[material];
  let volume = 0;

  if (shape === "cube") {
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    if (isNaN(length) || isNaN(width) || isNaN(height)) {
      document.getElementById("result").innerText = "لطفاً همه ابعاد را وارد کنید.";
      return;
    }
    volume = length * width * height;
  } else if (shape === "cylinder") {
    const diameter = parseFloat(document.getElementById("diameter").value);
    const height = parseFloat(document.getElementById("height").value);
    if (isNaN(diameter) || isNaN(height)) {
      document.getElementById("result").innerText = "لطفاً همه ابعاد را وارد کنید.";
      return;
    }
    const radius = diameter / 2;
    volume = Math.PI * radius * radius * height;
  } else if (shape === "hollowCylinder") {
    const outerDiameter = parseFloat(document.getElementById("outerDiameter").value);
    const innerDiameter = parseFloat(document.getElementById("innerDiameter").value);
    const height = parseFloat(document.getElementById("height").value);
    if (isNaN(outerDiameter) || isNaN(innerDiameter) || isNaN(height)) {
      document.getElementById("result").innerText = "لطفاً همه ابعاد را وارد کنید.";
      return;
    }
    const outerRadius = outerDiameter / 2;
    const innerRadius = innerDiameter / 2;
    volume = Math.PI * height * (outerRadius ** 2 - innerRadius ** 2);
  } else {
    document.getElementById("result").innerText = "لطفاً یک شکل را انتخاب کنید.";
    return;
  }

  const volumeInCm3 = volume / 1000;
  const weight = (volumeInCm3 * density) / 1000; // گرم به کیلوگرم

  document.getElementById("result").innerText =
    `وزن تقریبی: ${weight.toFixed(2)} کیلوگرم`;
}
