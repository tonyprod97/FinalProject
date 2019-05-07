<template>
    <div
        class="modal fade"
        id="logModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{message}}</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Do you want to replace old weight?
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="close"
              >
                No
              </button>
              <button 
              type="button" @click="submit" class="btn btn-primary">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
</template>


<script>
export default {
    name:'modal',
    props: {
        closeFunc: Function,
        updateFunc: Function,
        message: String
        },
    methods: {
        submit: function(e) {
            this.updateFunc(e);
        },
        close: function() {
            this.closeFunc();
        }
    }
}
</script>

<style scoped>
button {
    margin: 0px 5px;
}
</style>
