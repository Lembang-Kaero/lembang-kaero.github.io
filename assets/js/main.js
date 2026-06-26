// Jalankan grafik setelah seluruh komponen halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    
    // ================= 1. GRAFIK DISTRIBUSI PENDAPATAN 2026 =================
    const incomeCtx = document.getElementById('pageIncomeChart');
    if (incomeCtx) {
        // Total Pendapatan = 758.468.000
        // PAD = (1.200.000 / 758.468.000) * 100% = ~0.16%
        // Transfer = (757.268.000 / 758.468.000) * 100% = ~99.84%
        
        new Chart(incomeCtx, {
            type: 'pie',
            data: {
                labels: [
                    'Pendapatan Asli Lembang (PAD)', 
                    'Pendapatan Transfer'
                ],
                datasets: [{
                    data: [0.16, 99.84], // Nilai dalam persen (%)
                    backgroundColor: ['#800000', '#FFD700'], // Maroon & Gold
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Poppins', size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // ================= 2. GRAFIK ALOKASI BELANJA PERBIDANG 2026 =================
    const expenseCtx = document.getElementById('pageExpenseChart');
    if (expenseCtx) {
        // Total Belanja = 778.107.072
        // Bid. Pemerintahan   = (475.435.360 / 778.107.072) * 100% = 61.10%
        // Bid. Pembangunan    = (252.433.100 / 778.107.072) * 100% = 32.44%
        // Bid. Pembinaan      = (15.300.000 / 778.107.072) * 100%  = 1.97%
        // Bid. Pemberdayaan   = (10.570.000 / 778.107.072) * 100%  = 1.36%
        // Bid. Penanggulangan = (24.368.612 / 778.107.072) * 100%  = 3.13%

        new Chart(expenseCtx, {
            type: 'pie',
            data: {
                labels: [
                    'Penyelenggaraan Pemerintahan',
                    'Pelaksanaan Pembangunan',
                    'Pembinaan Kemasyarakatan',
                    'Pemberdayaan Masyarakat',
                    'Penanggulangan Bencana & Mendesak'
                ],
                datasets: [{
                    data: [61.10, 32.44, 1.97, 1.36, 3.13], // Nilai dalam persen (%)
                    backgroundColor: [
                        '#DC3545', // Merah (Pemerintahan)
                        '#28A745', // Hijau (Pembangunan)
                        '#FFC107', // Kuning (Pembinaan)
                        '#17A2B8', // Cyan (Pemberdayaan)
                        '#6C757D'  // Abu-abu (Bencana)
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Poppins', size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});
