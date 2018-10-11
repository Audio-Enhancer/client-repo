Vue.component('content-component', {
  template: `
     <div class="container">
      <div class="row">
          <letfBarComponent/>
          <contentComponent/>
          <rightBarComponent/>
      </div>
    </div>
  `,
  components: {
    "letfBarComponent": leftBar,
    "contentComponent": content,
    "rightBarComponent": rightBar
  },
  data: function () {
    return {
      count: 0
    }
  },


})