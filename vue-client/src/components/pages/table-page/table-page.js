import AppTable from '../../table/index'
import Record from '../../record/index'
import logService from '../../../services/LogService'
import Log from '../../../Models/Log'
import PeriodPicker from '../../period-picker/index'
import periodPickerService from '../../../services/PeriodPickerService';


export default {
    name:'table-page',
    components: {
        AppTable,
        Record,
        PeriodPicker
    },
    data() {
        return {
            tableData: [],
            activeLog: new Log(null,null,new Date()),
            tableId: 0
        }
    },
    mounted: function() {
        this.updateTableContent(logService.getAllLogs());
    },
    methods: {
        tableRowClicked: function(log) {
            this.activeLog = log;
        },
        handleRefreshTableData: function(shouldDelete,log) {
            let newTableData;
            newTableData = this.tableData.filter(l => l.id != log.id);
            if(!shouldDelete) newTableData.push(log);
            this.tableData = newTableData;
        },
        periodRequested(from, to) {
            this.updateTableContent(periodPickerService.getLogsInPeriod(from, to));
        },
        updateTableContent(apiResponse) {
            apiResponse.then(res => {
                this.tableData = res.data;
            })
           .catch(err => this.$router.replace('error'));
        }
    }
}