// script.js
const materials = {
  "استیل": 7.85,
  "آلومینیوم": 2.7,
  "مس": 8.96,
  "برنج": 8.5,
  "پلاستیک (ABS)": 1.05,
  "پلاستیک (پلی‌اتیلن)": 0.95,
  "پلاستیک (پلی‌پروپیلن)": 0.91,
  "پلاستیک (PVC)": 1.4
};

const materialSelect = document.getElementById("material");
Object.keys(materials).forEach(mat => {
  const option = document.createElement("option");
  option.value = mat;
  option.textContent = mat;
  materialSelect.appendChild(option);
});

function updateDimensions() {
  const shape = document.getElementById("shape").value;
  const container = document.getElementById("dimensions");
  container.innerHTML = "";

  const fields = {
    cube: ["طول (میلی‌متر)", "عرض (میلی‌متر)", "ارتفاع (میلی‌متر)"],
    cylinder: ["قطر (میلی‌متر)", "ارتفاع (میلی‌متر)"],
    pipe: ["قطر بیرونی (میلی‌متر)", "قطر داخلی (میلی‌متر)", "طول (میلی‌متر)"],
    sheet: ["طول (میلی‌متر)", "عرض (میلی‌متر)", "ضخامت (میلی‌متر)"]
  }[shape];

  fields.forEach((label, i) => {
    const lbl = document.createElement("label");
    lbl.textContent = label;
    const input = document.createElement("input");
    input.type = "number";
    input.id = `dim${i}`;
    input.min = 0;
    container.appendChild(lbl);
    container.appendChild(input);
  });

  // به‌روزرسانی آیکون
  const iconContainer = document.getElementById('shape-icon');
  const shapeIcons = {
    cube: 'https://cdn-icons-png.flaticon.com/512/4145/4145670.png',
    cylinder: 'https://cdn-icons-png.flaticon.com/512/4222/4222633.png',
    pipe: 'https://cdn-icons-png.flaticon.com/512/4819/4819864.png',
    sheet: 'https://cdn-icons-png.flaticon.com/512/6711/6711234.png'
  };
  if (shapeIcons[shape]) {
    iconContainer.innerHTML = `<img src="${shapeIcons[shape]}" alt="${shape}">`;
  } else {
    iconContainer.innerHTML = '';
  }
}

function calculate() {
  const shape = document.getElementById("shape").value;
  const mat = document.getElementById("material").value;
  const rho = materials[mat];

  let volume_mm3 = 0;
  const dim = i => parseFloat(document.getElementById(`dim${i}`).value || 0);

  if (shape === "cube") {
    volume_mm3 = dim(0) * dim(1) * dim(2);
  } else if (shape === "cylinder") {
    const radius = dim(0) / 2;
    volume_mm3 = Math.PI * Math.pow(radius, 2) * dim(1);
  } else if (shape === "pipe") {
    const outerRadius = dim(0) / 2;
    const innerRadius = dim(1) / 2;
    volume_mm3 = Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * dim(2);
  } else if (shape === "sheet") {
    volume_mm3 = dim(0) * dim(1) * dim(2);
  }

  // میلی‌متر مکعب به سانتی‌متر مکعب -> سپس به لیتر -> سپس به کیلوگرم
  const volume_cm3 = volume_mm3 / 1000;
  const weight_kg = (volume_cm3 * rho / 1000).toFixed(3);
  document.getElementById("result").textContent = `وزن: ${weight_kg} کیلوگرم`;
}

function switchLang() {
  const lang = document.documentElement.lang;
  const isFa = lang === "fa";

  document.documentElement.lang = isFa ? "en" : "fa";
  document.documentElement.dir = isFa ? "ltr" : "rtl";

  document.getElementById("title").textContent = isFa ? "Material Weight Calculator" : "ماشین حساب وزن متریال";
  document.querySelector("label[for='shape']").textContent = isFa ? "Shape:" : "شکل هندسی:";
  document.querySelector("label[for='material']").textContent = isFa ? "Material:" : "متریال:";
  document.querySelector("button").textContent = isFa ? "Calculate Weight" : "محاسبه وزن";
  document.querySelector(".lang-switch").textContent = isFa ? "تغییر به فارسی" : "Switch to English";

  updateDimensions();
}
