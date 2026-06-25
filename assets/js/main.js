document.addEventListener("DOMContentLoaded", function () {
    // 1. Grafik Distribusi Pendapatan
    const incomeCtx = document.getElementById('pageIncomeChart');
    if (incomeCtx) {
        new Chart(incomeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Dana Desa (DDS)', 'Alokasi Dana Lembang (ADL)', 'Bagi Hasil Pajak', 'Pendapatan Asli Lembang'],
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

    // 2. Grafik Alokasi Pembiayaan Belanja
    const expenseCtx = document.getElementById('pageExpenseChart');
    if (expenseCtx) {
        new Chart(expenseCtx, {
            type: 'pie',
            data: {
                labels: ['Bidang Pembangunan', 'Penyelenggaraan Pemerintahan', 'Pembinaan Masyarakat', 'Penanggulangan Bencana'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8'],
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
