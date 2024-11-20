function plotGraph() {
    let equation = document.getElementById("equation").value;

    // Canvas ve context oluştur
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Grafiğin merkezini belirle
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    const scale = 20;  // Ölçek faktörü

    // Math.js kullanarak fonksiyonu çözme
    let expr = math.parse(equation);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Temizle

    // Eksenleri çiz
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(canvas.width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Fonksiyonu çiz
    ctx.beginPath();
    ctx.moveTo(0, originY - expr.evaluate({x: -10}) * scale);

    for (let x = -10; x < 10; x += 0.1) {
        let y = expr.evaluate({x: x});
        ctx.lineTo(originX + x * scale, originY - y * scale);
    }

    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
}
