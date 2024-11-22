function drawGraph(funcStr, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const xMin = -10;
    const xMax = 10;
    const yMin = -10;
    const yMax = 10;
    const stepSize = 0.01;

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);
    const transformX = (x) => (x - xMin) * scaleX;
    const transformY = (y) => height - (y - yMin) * scaleY;

    // Fonksiyon Çizimi
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    let firstPoint = true;
    for (let x = xMin; x <= xMax; x += stepSize) {
        try {
            // Kullanıcı girdisini güvenli hale getir
            const sanitizedFuncStr = funcStr.replace(/([a-zA-Z]+)\(/g, 'Math.$1(');
            const y = eval(sanitizedFuncStr);

            if (!isFinite(y) || y < yMin || y > yMax) continue;

            const px = transformX(x);
            const py = transformY(y);

            if (firstPoint) {
                ctx.moveTo(px, py);
                firstPoint = false;
            } else {
                ctx.lineTo(px, py);
            }
        } catch (e) {
            console.error(`Hata: ${e.message} (x = ${x})`);
        }
    }
    ctx.stroke();

    // Eksenleri Çizme
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.moveTo(transformX(xMin), transformY(0));
    ctx.lineTo(transformX(xMax), transformY(0));
    ctx.moveTo(transformX(0), transformY(yMin));
    ctx.lineTo(transformX(0), transformY(yMax));
    ctx.stroke();
}

document.getElementById('plotButton').addEventListener('click', () => {
    const funcInput = document.getElementById('functionInput').value;
    drawGraph(funcInput, 'graphCanvas');
});

// Varsayılan Fonksiyon
try {
    drawGraph('Math.sin(x)', 'graphCanvas');
} catch (e) {
    console.error('Varsayılan grafik çizilemedi:', e.message);
}

