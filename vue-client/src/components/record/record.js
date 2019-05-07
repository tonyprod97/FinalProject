import userService from "../../services/UserService";
import logService from "../../services/LogService";
import Log from "../../Models/Log";
import "popper.js";
import $ from "jquery";
import "bootstrap/js/dist/util";
import Modal from './log-modal';


export default {
  name: "record",
  components: {
    modal: Modal
  },
  props: {
    data: Log
  },
  data() {
    return {
      viewModel: new Log(null, null, this.formatDateForView()),
      submitText: "Submit",
      errorMessage: '',
      showAlert: false,
      alertMessage: ''
    };
  },
  watch: {
    viewModel: function () {
      this.submitText = !this.viewModel.id ? "Submit" : "Update";
    },
    data: function (dataProp) {
      this.viewModel = this.createLogFromResponse(dataProp);
    }
  },
  created() {
    $('[data-toggle="popover"]').popover({
      trigger: 'manual'
    })
  },
  methods: {
    onSubmit(e) {
      const postData = {
        userId: userService.getUserId(),
        value: this.viewModel.value,
        date: this.viewModel.date,
        id: this.viewModel.id
      };
      logService
        .submit(postData)
        .then(res => {
          this.clearForm();
          this.$emit(
            "recordSubmited",
            false,
            this.createLogFromResponse(res.data)
          );
          this.displayAlert('New Log successfully saved!');
        })
        .catch(error => {
          if (error.response) {
            this.errorMessage = error.response.data.message;
            this.viewModel.id = error.response.data.logData.id;
            $('#logModal').modal('show');
          } else {
            this.$router.replace("error");
          }
        });
      e.preventDefault();
    },
    displayAlert(message) {
      this.showAlert = true;
      this.alertMessage = message;
      setTimeout(() => this.showAlert = false,1500);
    },
    clearForm() {
      this.viewModel = new Log(null, null, this.formatDateForView());
      $("#logModal").modal("hide");
      this.errorMessage = '';
      this.$emit('submit');
    },
    onDelete: function () {
      logService
        .delete(this.viewModel.id)
        .then(res => {
          this.$emit("recordSubmited", true, this.viewModel);
          this.clearForm();
          this.displayAlert('Log successfully deleted!')
        })
        .catch(err => this.$router.replace("error"));
    },
    createLogFromResponse(log) {
      return new Log(log.id, log.value, this.formatDateForView(log.date));
    },
    formatDateForView(date) {
      if (!date) date = new Date();
      try {
        return date.toISOString().split("T")[0];
      } catch (formatingIgnorable) {
        return date.split("T")[0];
      }
    }
  }
};
