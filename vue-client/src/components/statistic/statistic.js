import PeriodPicker from '../period-picker/index'
import userService from '../../services/UserService';
import logService from '../../services/LogService';

export default {
  name: 'statistic',
  components: {
    PeriodPicker
  },
  props: [],
  data () {
    return {
      title: '',
      model: {}
    }
  },
  computed: {

  },
  mounted () {
    let postData = {
      userId: userService.getUserId(),
      from: undefined,
      to: undefined
    }
    this.handleApiResponse(logService.statistic(postData));
  },
  methods: {
    handleApiResponse: function(res) {
      res.then(response => {
        this.model = {...response.data};

        let from = (new Date(response.data.from)).toLocaleDateString();
        let to = (new Date(response.data.to)).toLocaleDateString();

        //initial load only
        if(!this.title) this.title = `Displaying statistic from: ${from} - to: ${to}`;
        if(!response.data) this.title = "There are no logs in requested period."
      })
         .catch(err =>this.$router.replace('error'));
    },
    onRequest: function(from,to) {
      if(from) this.title = `Displaying statistic from: ${(new Date(from)).toLocaleDateString()} - to: ${(new Date(to)).toLocaleDateString()}`;
      else this.title = null;

      let postData = {
        userId: userService.getUserId(),
        from, to
      }
      this.handleApiResponse(logService.statistic(postData));
    },
    refresh() {
      this.onRequest(undefined,undefined);
    }
  }
}
