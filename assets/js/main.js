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
    // CUSTOM PLUGIN: DATA LABELS PADA PIE CHART (built-in, tanpa CDN)
    // =====================================================================
    const dataLabelsPlugin = {
        id: 'customDataLabels',
        afterDraw(chart) {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            if (!meta || meta.hidden) return;
            
            const dataset = chart.data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            
            meta.data.forEach((element, index) => {
                const value = dataset.data[index];
                const pct = ((value * 100) / total).toFixed(1) + '%';
                const label = formatRupiah(value);
                
                // Ambil posisi tengah potongan pie
                const pos = element.tooltipPosition();
                
                // Hitung sudut tengah untuk menggeser label ke luar sedikit
                const startAngle = element.startAngle;
                const endAngle = element.endAngle;
                const midAngle = (startAngle + endAngle) / 2;
                const outerRadius = element.outerRadius;
                const offset = outerRadius * 0.65; // 65% dari pusat ke tepi
                
                const x = pos.x + Math.cos(midAngle - Math.PI / 2) * (offset - outerRadius * 0.15);
                const y = pos.y + Math.sin(midAngle - Math.PI / 2) * (offset - outerRadius * 0.15);
                
                // Gambar teks nilai
                ctx.save();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Poppins, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'rgba(0,0,0,0.6)';
                ctx.shadowBlur = 3;
                ctx.fillText(label, x, y - 7);
                
                // Gambar teks persentase
                ctx.font = '10px Poppins, sans-serif';
                ctx.fillStyle = '#FFD54F';
                ctx.fillText(pct, x, y + 10);
                ctx.restore();
            });
        }
    };

    // =========================================================================
    // [1] INITIALIZATION GRAFIK TAHUN ANGGARAN 2026
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
    // [2] INITIALIZATION GRAFIK LAPORAN REALISASI TAHUN 2025
    // =========================================================================
    
    // A. Grafik Realisasi Pendapatan 2025
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
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, font: { size: 11 } }
                    },
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

    // B. Grafik Realisasi Belanja Perbidang 2025
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
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, font: { size: 11 } }
                    },
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
    // [3] FITUR BARU: LOGIKA INTEGRASI TOMBOL KEMBALI KE ATAS (BACK TO TOP)
    // =========================================================================
    const btnBackToTop = document.getElementById("btnBackToTop");
    if (btnBackToTop) {
        // Deteksi scroll halaman
        window.addEventListener("scroll", function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btnBackToTop.style.setProperty("display", "flex", "important");
            } else {
                btnBackToTop.style.setProperty("display", "none", "important");
            }
        });

        // Aksi klik kembali ke atas dengan smooth scroll
        btnBackToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
