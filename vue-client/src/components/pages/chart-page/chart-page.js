import Chart from '../../chart/index'
import PeriodPicker from '../../period-picker/index'
import logService from '../../../services/LogService';
import periodPickerService from '../../../services/PeriodPickerService';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

export default {
    name: 'chart-page',
    components: {
        Chart,
        PeriodPicker
    },
    data() {
        return {
            chartData: {}
        }
    },
    mounted: function() {
        this.handleApiResponse(logService.getAllLogs(), 'Since started logging');
    },
    methods: {
        setData: function(newData, title) {
            this.chartData = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light4",
                zoomEnabled: true,
                title: {
                    text: title
                },
                toolTip: {
                    shared: true
                },
                axisX: {
                    valueFormatString: "MMM YYYY",
                    title: "Date"
                },
                axisY: {
                    title: "Weight",
                    suffix: " kg",
                    minimum: 0,
                },
                data: [{
                    type: "area",
                    name: "kg",
                    dataPoints: newData
                }]
            }
        },
        periodRequest: function(from, to) {
            this.handleApiResponse(periodPickerService.getLogsInPeriod(from, to), 'From '+ (new Date(from)).toLocaleDateString() + ' to '+(new Date(to)).toLocaleDateString());
        },
        handleApiResponse(apiRes,title) {
            apiRes.then(res => {
                let chartData = [];
                res.data.forEach(log => {
                    chartData.push({
                        x: new Date(log.date),
                        y: log.value
                    })
                });
                this.setData(chartData, title);
             })
        }
    }
}