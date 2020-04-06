import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    mounted () {
        this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
                {
                    label: 'Total Infections Over time Test Data',
                    backgroundColor: '#f87979',
                    data: [4, 20, 50, 51, 60, 140, 239, 480, 840, 920, 1112, 1211]
                }
            ]
        })
    }
}