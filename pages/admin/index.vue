<template>
    <div class="px-2">
        <div class="grid">
            <div class="col-3">
                <Card class="bg-primary">
                    <template #content>
                        <div class="flex flex-column align-items-center">
                            <span class="text-5xl">10</span>
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex flex-column align-items-center">
                            <i class="pi pi-users mt-2 text-5xl"></i>
                            <span class="font-bold text-xl"> No. of Teachers</span>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-3">
                <Card class="bg-primary">
                    <template #content>
                        <div class="flex flex-column align-items-center">
                            <span class="text-5xl">10</span>
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex flex-column align-items-center">
                            <i class="pi pi-users mt-2 text-5xl"></i>
                            <span class="font-bold text-xl"> No. of Students</span>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-12">
                <Card>
                    <template #content>
                        <div class="card">
                            <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';

definePageMeta({
    layout: 'admin',
    middleware: ['admin']
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>