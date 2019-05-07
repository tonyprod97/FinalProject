export default {
    name: 'chart',
    props : {
        data: Object
    },
    watch: {
        data: function() {
            var chart = new CanvasJS.Chart("chartContainer", this.data);
            chart.render();
        }
    }
}