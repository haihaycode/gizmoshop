<template>
    <div class="revenue-chart">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'RevenueChart',
    props: {
        labels: {
            type: Array,
            required: true,
        },
        dataValues: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            new Chart(this.$refs.chartCanvas, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Doanh thu',
                            data: this.dataValues,
                            backgroundColor: '#38bdf8',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(value);
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(context.parsed.y);
                                    }
                                    return label;
                                },
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.revenue-chart {
    position: relative;
    height: 400px;
}
</style>