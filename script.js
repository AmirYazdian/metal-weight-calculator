
const materials = {
    fa: {
        "فولاد کربنی": 7.85,
        "استیل ضد زنگ": 8.0,
        "آلومینیوم": 2.7,
        "مس": 8.96,
        "برنج": 8.5,
        "پلی‌اتیلن (PE)": 0.95,
        "پلی‌پروپیلن (PP)": 0.91,
        "PVC": 1.38,
        "پلی‌کربنات": 1.2,
        "تفلون": 2.2
    },
    en: {
        "Carbon Steel": 7.85,
        "Stainless Steel": 8.0,
        "Aluminum": 2.7,
        "Copper": 8.96,
        "Brass": 8.5,
        "Polyethylene (PE)": 0.95,
        "Polypropylene (PP)": 0.91,
        "PVC": 1.38,
        "Polycarbonate": 1.2,
        "Teflon": 2.2
    }
};

let currentLang = 'fa';

const shapeFields = {
    cube: {fa: "ابعاد (طول × عرض × ارتفاع) به سانتی‌متر", fields: ['length', 'width', 'height']},
    cylinder: {fa: "ابعاد (قطر × ارتفاع) به سانتی‌متر", fields: ['diameter', 'height']},
    pipe: {fa: "ابعاد (قطر بیرونی × قطر داخلی × ارتفاع) به سانتی‌متر", fields: ['outer_diameter', 'inner_diameter', 'height']},
    sheet: {fa: "ابعاد (طول × عرض × ضخامت) به سانتی‌متر", fields: ['length', 'width', 'thickness']}
};

function renderDimensions() {
    const shape = document.getElementById('shape').value;
    const container = document.getElementById('dimensions');
    container.innerHTML = `<label>${shapeFields[shape][currentLang === 'fa' ? 'fa' : 'en']}</label>`;
    shapeFields[shape].fields.forEach(field => {
        container.innerHTML += `<input type="number" id="${field}" placeholder="${field}">`;
    });
}

function populateMaterials() {
    const materialSelect = document.getElementById('material');
    materialSelect.innerHTML = '';
    for (const [name, density] of Object.entries(materials[currentLang])) {
        const option = document.createElement('option');
        option.value = density;
        option.textContent = name;
        materialSelect.appendChild(option);
    }
}

function calculate() {
    const shape = document.getElementById('shape').value;
    let volume = 0;
    if (shape === 'cube') {
        const l = getVal('length'), w = getVal('width'), h = getVal('height');
        volume = l * w * h;
    } else if (shape === 'cylinder') {
        const d = getVal('diameter'), h = getVal('height');
        volume = Math.PI * Math.pow(d / 2, 2) * h;
    } else if (shape === 'pipe') {
        const d1 = getVal('outer_diameter'), d2 = getVal('inner_diameter'), h = getVal('height');
        volume = Math.PI * h * (Math.pow(d1 / 2, 2) - Math.pow(d2 / 2, 2));
    } else if (shape === 'sheet') {
        const l = getVal('length'), w = getVal('width'), t = getVal('thickness');
        volume = l * w * t;
    }
    const density = parseFloat(document.getElementById('material').value);
    const weight = volume * density / 1000; // cm³ to kg
    document.getElementById('result').textContent = currentLang === 'fa' ? `وزن: ${weight.toFixed(2)} کیلوگرم` : `Weight: ${weight.toFixed(2)} kg`;
}

function getVal(id) {
    return parseFloat(document.getElementById(id).value || '0');
}

function switchLang() {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.getElementById('title').textContent = currentLang === 'fa' ? 'ماشین حساب وزن متریال' : 'Material Weight Calculator';
    document.querySelector("label[for='shape']").textContent = currentLang === 'fa' ? 'شکل هندسی:' : 'Shape:';
    document.querySelector("label[for='material']").textContent = currentLang === 'fa' ? 'متریال:' : 'Material:';
    document.querySelector("button").textContent = currentLang === 'fa' ? 'محاسبه وزن' : 'Calculate Weight';
    document.querySelector(".lang-switch").textContent = currentLang === 'fa' ? 'Switch to English' : 'تغییر به فارسی';
    renderDimensions();
    populateMaterials();
}

document.getElementById('shape').addEventListener('change', () => {
    renderDimensions();
});
window.onload = () => {
    renderDimensions();
    populateMaterials();
};
