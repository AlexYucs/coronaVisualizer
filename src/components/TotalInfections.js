import { Line, mixins } from 'vue-chartjs'

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    methods: {
        formatData(stateData){
            const { days } = stateData;
            const sorted_stateData = days.concat().sort((day1, day2) => (day1.date > day2.date) ? 1 : -1);
            const x_values = sorted_stateData.map(day => day.date.slice(5, 10));
            const deaths = sorted_stateData.map(day => day.deaths);
            const cases = sorted_stateData.map(day => day.cases);
            return {
                labels: x_values,
                datasets: [
                    {
                        label: 'Total Deaths Over time Test Data',
                        backgroundColor: '#0C7BDC',
                        data: deaths
                    },
                    {
                        label: 'Total Infections Over time',
                        backgroundColor: '#FFC20A',
                        data: cases
                    },
                ]
            };
        }
    },
    mounted () {
        this.renderChart(this.formatData(this.chartData), this.options);
    }
}
