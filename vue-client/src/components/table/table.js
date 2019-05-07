import Log from "../../Models/Log";

export default {
    name:'app-table',
    props: {
      data: Array
    },
    components: {
    },
    data() {
        return {
            search: '',
            headers: [
                {
                  text: 'Weight in kg',
                  align: 'center',
                  sortable: true,
                  value: 'value'
                },
                { 
                  text: 'Date', 
                  align: 'center',
                  sortable: true,
                  value: 'date' 
                }
              ]
        }
    },
    methods: {
        rowClicked: function(row) {
          const log = new Log(row.id, row.value, row.date);
            this.$emit('rowClicked',log);
        }
    }
}