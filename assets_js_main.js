document.addEventListener("DOMContentLoaded", function () {
    // INSISIALISASI ANIMASI SCROLL (AOS)
    AOS.init({ duration: 800, once: true });

    // FITUR DARK MODE SWITCHER
    const modeToggle = document.getElementById('darkModeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            modeToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
        });
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
            modeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    }

    // BACK TO TOP CONTROLLER
    const bttButton = document.getElementById("btnBackToTop");
    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            bttButton.style.display = "block";
        } else {
            bttButton.style.display = "none";
        }
    };
    bttButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // INTEGRASI CHART.JS (DATA ANGGARAN REALISTIS APBL)
    const setupChart = (id, type, labels, data, colors) => {
        const ctx = document.getElementById(id);
        if (ctx) {
            new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{ data: data, backgroundColor: colors, borderWidth: 1 }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    };

    const incomeLabels = ['Dana Desa (DDS)', 'Alokasi Dana Lembang (ADL)', 'Bagi Hasil Pajak', 'Pendapatan Asli Lembang'];
    const incomeData = [55, 30, 10, 5];
    const incomeColors = ['#8B1E1E', '#D4A017', '#4B7B42', '#2c3e50'];

    const expenseLabels = ['Pembangunan Infrastruktur', 'Penyelenggaraan Pemerintahan', 'Pembinaan Masyarakat', 'Pemberdayaan Posyandu & Kesehatan'];
    const expenseData = [40, 25, 15, 20];
    const expenseColors = ['#2980b9', '#27ae60', '#e67e22', '#9b59b6'];

    setupChart('incomeChart', 'pie', incomeLabels, incomeData, incomeColors);
    setupChart('expenseChart', 'doughnut', expenseLabels, expenseData, expenseColors);
    setupChart('pageIncomeChart', 'bar', incomeLabels, incomeData, incomeColors);
    setupChart('pageExpenseChart', 'polarArea', expenseLabels, expenseData, expenseColors);
});