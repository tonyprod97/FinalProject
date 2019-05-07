import userService from '../../services/UserService';
import 'popper.js'
import $ from 'jquery'
import 'bootstrap/js/dist/util'
import { authEmitter } from '../../main';

export default {
    name: 'sign-form',
    props: ['formControls','postUrl','registerMode'],
    data() {
      return(
        {
          error: null,
          toastMessage: ''
        }
      )
    },
    methods: {
      submit: function(event) {
        event.preventDefault();

        userService.submitForm(this.postUrl, this.prepareData())
        .then(
          (res) => {
            let href;
            if(res.data.id) {
              this.toastMessage = 'Login success';
              localStorage.setItem('user',JSON.stringify(res.data));
              authEmitter.$emit('auth_changed',true);
              href = '/home';
            } else {
              this.toastMessage = 'Thank you for registration'
              href = '/login';
            }
            $('.toast').toast('show');
            $('.toast').on('hidden.bs.toast', function () {
            })
            this.$router.replace(href);
          })
          .catch(error => {
              this.error = error.response.data.message;
        })
      },
      prepareData() {
        let postData = {
          UserName: this.formControls.username.value,
          Password: this.formControls.password.value
        }
        if(this.formControls.firstName) postData.FirstName = this.formControls.firstName.value;
        if(this.formControls.lastName) postData.LastName = this.formControls.lastName.value;
        return postData;
      }
    }
}