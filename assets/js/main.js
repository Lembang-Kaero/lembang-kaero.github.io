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
                const pct = (value * 100) / total;
                const pctText = pct.toFixed(1) + '%';
                const rpText = formatRupiah(value);

                const startAngle = element.startAngle;
                const endAngle = element.endAngle;
                const midAngle = (startAngle + endAngle) / 2 - Math.PI / 2;
                const outerR = element.outerRadius;

                const isSmall = pct < 12;
                const PAD = 14; // padding horizontal box

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Ukur teks untuk box
                ctx.font = 'bold 14px "Poppins", "Segoe UI", Arial, sans-serif';
                const rpMetrics = ctx.measureText(rpText);
                ctx.font = '13px "Poppins", "Segoe UI", Arial, sans-serif';
                const pctMetrics = ctx.measureText(pctText);
                const boxW = Math.max(rpMetrics.width, pctMetrics.width) + PAD * 2;
                const boxH = 40;

                if (isSmall) {
                    // === SLICE KECIL (<12%): label di LUAR + garis penunjuk ===
                    const labelR = outerR + 46;
                    const xOut = Math.cos(midAngle) * labelR;
                    const yOut = Math.sin(midAngle) * labelR;
                    const xEdge = Math.cos(midAngle) * outerR;
                    const yEdge = Math.sin(midAngle) * outerR;

                    // Garis penunjuk
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([3, 2]);
                    ctx.moveTo(xEdge, yEdge);
                    ctx.lineTo(xOut, yOut);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Dot di ujung pie
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.arc(xEdge, yEdge, 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Background box
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
                    roundRect(ctx, xOut - boxW / 2, yOut - boxH / 2, boxW, boxH, 7);

                    // Teks rupiah
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 14px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillText(rpText, xOut, yOut - 8);

                    // Teks persentase
                    ctx.font = '13px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, xOut, yOut + 9);
                } else {
                    // === SLICE BESAR (≥12%): label di DALAM ===
                    const offset = outerR * 0.58;
                    const x = Math.cos(midAngle) * offset;
                    const y = Math.sin(midAngle) * offset;

                    // Background box semi-transparan
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
                    roundRect(ctx, x - boxW / 2, y - boxH / 2, boxW, boxH, 6);

                    // Teks rupiah
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 14px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillText(rpText, x, y - 8);

                    // Teks persentase
                    ctx.font = '13px "Poppins", "Segoe UI", Arial, sans-serif';
                    ctx.fillStyle = '#FFD54F';
                    ctx.fillText(pctText, x, y + 9);
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
