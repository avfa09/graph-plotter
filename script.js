// Plotting fonksiyonu
function plotGraph() {
    const equation = document.getElementById("equation").value.trim();

    if (!equation) {
        alert("Please enter a valid equation!");
        return;
    }

    // Grafik alanını temizleyelim
    document.getElementById("graph").innerHTML = '<canvas id="graphCanvas" width="400" height="400"></canvas>';
    
    // Grafik için Canvas elementini alalım
    const ctx = document.getElementById('graphCanvas').getContext('2d');

    // Kullanıcının girdiği denklemi çözmek için Math.js kullanabiliriz
    // Basit bir örnek olarak, y = x^2 denklemine yönelik bir işlevsel çizim yapacağız

    const dataPoints = [];
    const xRange = 10; // -10 ile 10 arasındaki x değerlerini kullanacağız
    const step = 0.1; // x aralığını adım adım artıracağız

    // x ve y değerlerini hesapla ve veri kümesini oluştur
    for (let x = -xRange; x <= xRange; x += step) {
        let y = evaluateEquation(equation, x);
        dataPoints.push({ x: x, y: y });
    }

    // Chart.js ile grafik çizim
    new Chart(ctx, {
        type: 'line', // Çizgi grafiği
        data: {
            datasets: [{
                label: equation, // Denklemi başlık olarak kullan
                data: dataPoints,
                fill: false, // Arka planı doldurma
                borderColor: 'rgba(75, 192, 192, 1)', // Çizgi rengi
                tension: 0.1 // Çizgi eğriliği
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear', // x ekseni sayısal olacak
                    position: 'bottom'
                },
                y: {
                    beginAtZero: false // y ekseninin sıfırdan başlamasını istemiyoruz
                }
            }
        }
    });
}

// Kullanıcıdan alınan denklemi çözmek için basit bir fonksiyon (örnek: y = x^2)
function evaluateEquation(equation, x) {
    try {
        // Dinamik olarak bir denklemi çözmek için eval fonksiyonu kullanılabilir
        // Kullanıcının girdiği denklemde x değişkeni bulunacak
        return Function('x', `return ${equation}`).call(this, x);
    } catch (e) {
        alert('Invalid equation format! Please use a valid mathematical equation.');
        return 0; // Hata durumunda y = 0 döndürüyoruz
    }
}

