document.addEventListener("DOMContentLoaded", function () {
    // FORMATTER RUPIAH UTILITY FUNCTION
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // =========================================================================
    // [1] INITIALIZATION GRAFIK TAHUN ANGGARAN 2026 (Grafik Existing Anda)
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
                    }
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
                    }
                }
            }
        });
    }


    // =========================================================================
    // [2] INITIALIZATION GRAFIK LAPORAN REALISASI TAHUN 2025 (GRAFIK BARU)
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
                    // Mengambil data angka murni dari kolom Realisasi APBL 2025 di tabel Anda
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
            data: {
                labels: [
                    'Penyelenggaraan Pemerintahan',
                    'Pelaksanaan Pembangunan',
                    'Pembinaan Kemasyarakatan',
                    'Pemberdayaan Masyarakat',
                    'Penanggulangan Bencana'
                ],
                datasets: [{
                    // Mengambil data murni dari kolom Realisasi Belanja Perbidang 2025 di tabel Anda
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
});
