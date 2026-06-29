document.addEventListener("DOMContentLoaded", function () {
    // FORMATTER RUPIAH UTILITY FUNCTION
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // SHARED DATALABELS CONFIG
    const datalabelsConfig = {
        color: '#fff',
        font: { weight: 'bold', size: 11 },
        formatter: function(value, ctx) {
            let sum = 0;
            ctx.chart.data.datasets[0].data.forEach(function(d) { sum += d; });
            let pct = (value * 100 / sum).toFixed(1) + '%';
            return formatRupiah(value) + '
(' + pct + ')';
        }
    };

    // =========================================================================
    // [1] INITIALIZATION GRAFIK TAHUN ANGGARAN 2026
    // =========================================================================
    const ctxIncome2026 = document.getElementById('pageIncomeChart')?.getContext('2d');
    if (ctxIncome2026) {
        new Chart(ctxIncome2026, {
            type: 'pie',
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
                    },
                    datalabels: datalabelsConfig
                }
            }
        });
    }

    const ctxExpense2026 = document.getElementById('pageExpenseChart')?.getContext('2d');
    if (ctxExpense2026) {
        new Chart(ctxExpense2026, {
            type: 'pie',
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
                    },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold', size: 10 },
                        formatter: function(value, ctx) {
                            let sum = 0;
                            ctx.chart.data.datasets[0].data.forEach(function(d) { sum += d; });
                            let pct = (value * 100 / sum).toFixed(1) + '%';
                            return formatRupiah(value) + '
(' + pct + ')';
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
                    },
                    datalabels: datalabelsConfig
                }
            }
        });
    }

    // B. Grafik Realisasi Belanja Perbidang 2025
    const ctxExpense2025 = document.getElementById('pageExpenseChart2025')?.getContext('2d');
    if (ctxExpense2025) {
        new Chart(ctxExpense2025, {
            type: 'pie',
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
                    },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold', size: 10 },
                        formatter: function(value, ctx) {
                            let sum = 0;
                            ctx.chart.data.datasets[0].data.forEach(function(d) { sum += d; });
                            let pct = (value * 100 / sum).toFixed(1) + '%';
                            return formatRupiah(value) + '
(' + pct + ')';
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
