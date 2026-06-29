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
    // CUSTOM PLUGIN: SMART DATA LABELS (anti-tumpuk)
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
                const pct = (value * 100) / total;
                const pctText = pct.toFixed(1) + '%';
                const rpText = formatRupiah(value);
                
                const startAngle = element.startAngle;
                const endAngle = element.endAngle;
                const midAngle = (startAngle + endAngle) / 2 - Math.PI / 2;
                const outerR = element.outerRadius;
                const innerR = element.innerRadius;
                
                const isSmall = pct < 15;
                
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'rgba(0,0,0,0.7)';
                ctx.shadowBlur = 2;
                
                if (isSmall) {
                    // === SLICE KECIL: label di LUAR + garis penunjuk ===
                    const labelR = outerR + 30;
                    const midR = outerR + 8;
                    const xOut = Math.cos(midAngle) * labelR;
                    const yOut = Math.sin(midAngle) * labelR;
                    const xMid = Math.cos(midAngle) * midR;
                    const yMid = Math.sin(midAngle) * midR;
                    
                    // Garis penunjuk
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                    ctx.lineWidth = 1;
                    ctx.moveTo(xMid, yMid);
                    ctx.lineTo(xOut, yOut);
                    ctx.stroke();
                    
                    // Teks
                    ctx.shadowBlur = 4;
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 10px Poppins, sans-serif';
                    ctx.fillText(rpText, xOut, yOut - 8);
                    ctx.font = '9px Poppins, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, xOut, yOut + 6);
                } else {
                    // === SLICE BESAR: label di DALAM ===
                    const offset = outerR * 0.62;
                    const x = Math.cos(midAngle) * offset;
                    const y = Math.sin(midAngle) * offset;
                    
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 11px Poppins, sans-serif';
                    ctx.fillText(rpText, x, y - 7);
                    ctx.font = '10px Poppins, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, x, y + 8);
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
                layout: { padding: { top: 10, bottom: 10, left: 20, right: 20 } },
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
                layout: { padding: { top: 30, bottom: 10, left: 30, right: 30 } },
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

    // ========================================================================
    // [2] GRAFIK LAPORAN REALISASI TAHUN 2025
    // ========================================================================
    
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
                layout: { padding: { top: 10, bottom: 10, left: 20, right: 20 } },
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
                layout: { padding: { top: 30, bottom: 10, left: 30, right: 30 } },
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
