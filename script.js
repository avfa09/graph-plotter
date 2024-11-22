// Canvas ve Grafik Çizimi için JavaScript

function drawGraph() {
    const equation = document.getElementById('equation').value;

    // Eğer kullanıcı denklemi boş bırakmışsa, herhangi bir işlem yapma
    if (!equation) {
        alert("Lütfen bir denklem girin!");
        return;
    }

    // Canvas'ı seç
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Canvas Orta Noktası
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Ölçekleme faktörü
    const scale = 20;
    
    // X ve Y eksenlerinin başlangıç noktasını çiz
    drawAxes(ctx, centerX, centerY);

    // Matematiksel denklemi çöz ve grafiği çiz
    try {
        // Fonksiyon oluşturuluyor
        const fn = math.compile(equation);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Başlangıç noktası

        // X değerini -10 ile 10 arasında değiştir
        for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
            const result = fn.evaluate({ x: x / scale });
            const y = -result * scale;  // Y değeri ters yönde çizilsin

            // Canvas'a noktayı çiz
            ctx.lineTo(centerX + x, centerY + y);
        }
        
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    } catch (error) {
        alert("Geçersiz denklem! Lütfen tekrar deneyin.");
    }
}

// Eksenleri çizme fonksiyonu
function drawAxes(ctx, centerX, centerY) {
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(centerX * 2, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, centerY * 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();
}


