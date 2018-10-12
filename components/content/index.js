Vue.component('content-component', {
  template: `
     <div class="container">
      <div class="row">
          <letfBarComponent/>
          <contentComponent/>
          <rightBarComponent :islogin="islogin"/>
      </div>
    </div>
  `,
  components: {
    "letfBarComponent": leftBar,
    "contentComponent": content,
    "rightBarComponent": rightBar
  },
  props: ['islogin'],
  data: function () {
    return {
      count: 0
    }
  },


})