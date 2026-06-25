document.addEventListener("DOMContentLoaded", function () {
    // 1. Grafik Distribusi Pendapatan
    const incomeCtx = document.getElementById('pageIncomeChart');
    if (incomeCtx) {
        new Chart(incomeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Dana Desa (DDS) - 60%', 'Alokasi Dana Lembang (ADL) - 25%', 'Bagi Hasil Pajak - 10%', 'Pendapatan Asli Lembang - 5%'],
                datasets: [{
                    data: [60, 25, 10, 5],
                    backgroundColor: ['#800000', '#FFD700', '#20B2AA', '#87CEEB'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 2. Grafik Alokasi Pembiayaan Belanja (5 Bidang)
    const expenseCtx = document.getElementById('pageExpenseChart');
    if (expenseCtx) {
        new Chart(expenseCtx, {
            type: 'pie',
            data: {
                labels: [
                    'Penyelenggaraan Pemerintahan - 30%', 
                    'Pelaksanaan Pembangunan - 40%', 
                    'Pembinaan Masyarakat - 12%', 
                    'Pemberdayaan Masyarakat - 10%', 
                    'Penanggulangan Bencana & Mendesak - 8%'
                ],
                datasets: [{
                    data: [30, 40, 12, 10, 8],
                    backgroundColor: ['#dc3545', '#28a745', '#ffc107', '#17a2b8', '#6c757d'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
