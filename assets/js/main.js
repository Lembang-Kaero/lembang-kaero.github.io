document.addEventListener("DOMContentLoaded", function () {
    // FORMATTER RUPIAH UTILITY FUNCTION
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // =====================================================================
    // HELPER: rounded rectangle (kompatibel semua browser)
    // =====================================================================
    function roundRect(ctx, x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
        ctx.fill();
    }

    // =====================================================================
    // CUSTOM PLUGIN: SMART DATA LABELS (visible edition)
    // =====================================================================

    const dataLabelsPlugin = {
        id: 'smartDataLabels',
        afterDraw(chart) {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            if (!meta || meta.hidden) return;

            const dataset = chart.data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);

            meta.data.forEach((element, index) => {
                const value = dataset.data[index];
                if (value === 0) return; // Lewati data bernilai Rp 0

                const pct = (value * 100) / total;
                const pctText = pct.toFixed(1) + '%';
                const rpText = formatRupiah(value);

                const centerX = element.x;
                const centerY = element.y;

                const startAngle = element.startAngle;
                const endAngle = element.endAngle;
                const midAngle = (startAngle + endAngle) / 2;
                const outerR = element.outerRadius;

                // Batasan persentase slice kecil
                const isSmall = pct < 12;
                const PAD = 10; 

                ctx.save();
                ctx.textAlign = 'center'; // Tetap Center agar kalkulasi box stabil di semua layar
                ctx.textBaseline = 'middle';

                ctx.font = 'bold 12px "Poppins", "Segoe UI", Arial, sans-serif';
                const rpMetrics = ctx.measureText(rpText);
                ctx.font = '11px "Poppins", "Segoe UI", Arial, sans-serif';
                const pctMetrics = ctx.measureText(pctText);
                const boxW = Math.max(rpMetrics.width, pctMetrics.width) + PAD * 2;
                const boxH = 34;

                if (isSmall) {
                    // === SLICE KECIL: Memencar ke Luar Secara Simetris Sesuai Index ===
                    // Memberikan radius tambahan yang bervariasi berdasarkan urutan data (index)
                    // Trik ini memisahkan box yang se-arah agar bertingkat dan tidak menumpuk
                    const extraRadius = 38 + (index * 12); 
                    const labelR = outerR + extraRadius;
                    
                    const xEdge = centerX + Math.cos(midAngle) * outerR;
                    const yEdge = centerY + Math.sin(midAngle) * outerR;
                    const xOut = centerX + Math.cos(midAngle) * labelR;
                    const yOut = centerY + Math.sin(midAngle) * labelR;

                    // 1. Gambar Garis Bantu Penunjuk (Dashed Line)
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
                    ctx.lineWidth = 1.2;
                    ctx.setLineDash([3, 2]);
                    ctx.moveTo(xEdge, yEdge);
                    ctx.lineTo(xOut, yOut);
                    ctx.stroke();
                    ctx.setLineDash([]); 

                    // 2. Gambar Titik Penunjuk di Tepi Grafik
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                    ctx.arc(xEdge, yEdge, 2.5, 0, Math.PI * 2);
                    ctx.fill();

                    // 3. Gambar Background Box (Hitam Pekat)
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
                    roundRect(ctx, xOut - boxW / 2, yOut - boxH / 2, boxW, boxH, 5);

                    // 4. Cetak Teks Rupiah
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 12px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillText(rpText, xOut, yOut - 6);

                    // 5. Cetak Teks Persentase
                    ctx.font = '11px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, xOut, yOut + 8);
                } else {
                    // === SLICE BESAR: Tetap di Dalam Sektor ===
                    const offset = outerR * 0.55; 
                    const xIn = centerX + Math.cos(midAngle) * offset;
                    const yIn = centerY + Math.sin(midAngle) * offset;

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
                    roundRect(ctx, xIn - boxW / 2, yIn - boxH / 2, boxW, boxH, 5);

                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 12px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillText(rpText, xIn, yIn - 6);

                    ctx.font = '11px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, xIn, yIn + 8);
                }

                ctx.restore();
            });
        }
    };

    // =========================================================================
    // [1] GRAFIK TAHUN ANGGARAN 2026
    // =========================================================================
    const ctxIncome2026 = document.getElementById('pageIncomeChart')?.getContext('2d');
    if (ctxIncome2026) {
        new Chart(ctxIncome2026, {
            type: 'pie',
            plugins: [dataLabelsPlugin],
            data: {
                labels: ['Pendapatan Asli Lembang', 'Pendapatan Transfer'],
                datasets: [{
                    data: [1200000, 757268000],
                    backgroundColor: ['#fd7e14', '#0d6efd'],
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 25, bottom: 10, left: 40, right: 40 } },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + formatRupiah(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }

    const ctxExpense2026 = document.getElementById('pageExpenseChart')?.getContext('2d');
    if (ctxExpense2026) {
        new Chart(ctxExpense2026, {
            type: 'pie',
            plugins: [dataLabelsPlugin],
            data: {
                labels: [
                    'Penyelenggaraan Pemerintahan',
                    'Pelaksanaan Pembangunan',
                    'Pembinaan Kemasyarakatan',
                    'Pemberdayaan Masyarakat',
                    'Penanggulangan Bencana'
                ],
                datasets: [{
                    data: [475435360, 252433100, 15300000, 10570000, 24368612],
                    backgroundColor: ['#dc3545', '#198754', '#ffc107', '#0dcaf0', '#6c757d'],
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 40, bottom: 10, left: 55, right: 55 } },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + formatRupiah(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }

    // =========================================================================
    // [2] GRAFIK LAPORAN REALISASI TAHUN 2025
    // =========================================================================

    const ctxIncome2025 = document.getElementById('pageIncomeChart2025')?.getContext('2d');
    if (ctxIncome2025) {
        new Chart(ctxIncome2025, {
            type: 'pie',
            plugins: [dataLabelsPlugin],
            data: {
                labels: [
                    'Dana Lembang',
                    'Bagi Hasil Pajak & Retribusi',
                    'Alokasi Dana Lembang'
                ],
                datasets: [{
                    data: [724620800, 4728000, 561106000],
                    backgroundColor: ['#0d6efd', '#fd7e14', '#20c997'],
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 25, bottom: 10, left: 40, right: 40 } },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + formatRupiah(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }

    const ctxExpense2025 = document.getElementById('pageExpenseChart2025')?.getContext('2d');
    if (ctxExpense2025) {
        new Chart(ctxExpense2025, {
            type: 'pie',
            plugins: [dataLabelsPlugin],
            data: {
                labels: [
                    'Penyelenggaraan Pemerintahan',
                    'Pelaksanaan Pembangunan',
                    'Pembinaan Kemasyarakatan',
                    'Pemberdayaan Masyarakat',
                    'Penanggulangan Bencana'
                ],
                datasets: [{
                    data: [552156800, 531502996, 38400000, 1650000, 144000000],
                    backgroundColor: ['#dc3545', '#198754', '#ffc107', '#0dcaf0', '#6c757d'],
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 40, bottom: 10, left: 55, right: 55 } },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + formatRupiah(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }

    // =========================================================================
    // [3] TOMBOL KEMBALI KE ATAS
    // =========================================================================
    const btnBackToTop = document.getElementById("btnBackToTop");
    if (btnBackToTop) {
        window.addEventListener("scroll", function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btnBackToTop.style.setProperty("display", "flex", "important");
            } else {
                btnBackToTop.style.setProperty("display", "none", "important");
            }
        });

        btnBackToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
