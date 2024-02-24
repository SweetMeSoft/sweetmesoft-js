namespace SweetMeSoft {
    /**
     *
     * @param options
     */
    export async function generateChart(options: OptionsChart): Promise<boolean> {
        options = <OptionsChart>(setDefaults(options, defaultsChart));

        return get({
            url: options.url,
            data: options.data,
            showSuccess: false,
            successCallback: response => {
                let barChart: Chart;
                let order = 1;
                const labels = options.interval == 'daily' ? days : monthsAbreviated;
                const field = options.interval == 'daily' ? 'day' : 'month'
                const datasets: Chart.ChartDataSets[] = [];
                const datasetData = [[]];
                const documents = [];
                const data = {};

                for (let item of response) {
                    if (documents.indexOf(item[options.subFilter]) == -1) {
                        documents.push(item[options.subFilter])
                        data[item[options.subFilter]] = []
                    }
                }

                let d = []
                for (let i = 1; i <= labels.length; i++) {
                    d.push(data[field])
                }

                for(let i = 0; i< datasetData.length; i++) {
                    datasets.push({
                        type: 'line',
                        order: order++,
                        backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
                        label: '',
                        data: datasetData[i]
                    })
                }

                let speedDataBar: Chart.ChartData = {
                    labels: labels,
                    datasets: datasets
                };

                if (barChart != undefined) {
                    barChart.destroy();
                }

                let canvas = options.chart.get(0) as HTMLCanvasElement;
                barChart = new Chart.Chart(canvas, {
                    type: 'bar',
                    data: speedDataBar,
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }
                });
            }
        });
    }

}
