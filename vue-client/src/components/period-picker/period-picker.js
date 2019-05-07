export default {
    name: 'period-picker',
    props: {
        startingDate: Date,
        finalDate: Date,
        errorMessage: ''
    },
    data() {
        return {
            to: null,
            from: null
        }
    },
    mounted: function() {
            let monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth()-1);
            let dateToFromat = this.startingDate ? this.startingDate : monthAgo;
            this.from = this.formatDateForView(dateToFromat)
            dateToFromat = this.finalDate ? this.finalDate : new Date();
            this.to = this.formatDateForView(dateToFromat);
        }
    ,
    methods: {
        onSubmit: function(e) {
            //format: YYYY-MM-DD
            const from = new Date(this.from);
            const to = new  Date(this.to);
            e.preventDefault();

            if(from.getTime() >= to.getTime()) {
                this.errorMessage = 'Starting date has to be before final date';
                return;
            }
            else this.errorMessage = null;

            this.$emit('onSubmit',this.from,this.to);
        },
        formatDateForView(date) {
            if(!date) date = new Date();
            try {
                return date.toISOString().split('T')[0];
            }catch(formatingIgnorable) {
                return date.split('T')[0];
            }
        }
    }
}