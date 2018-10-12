Vue.component('content-component', {
  template: `
     <div class="container">
      <div class="row">
          <letfBarComponent :listTopList="listTopList" />
          <contentComponent :searchaudio="searchaudio" @update-top-share="updatTopList"/>
          <rightBarComponent :islogin="islogin"/>
      </div>
    </div>
  `,
  components: {
    "letfBarComponent": leftBar,
    "contentComponent": content,
    "rightBarComponent": rightBar
  },
  props: ['islogin', 'searchaudio'],
  data: function () {
    return {
      count: 0,
      listTopList: [],
      responUpdate: ''
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/theaudios/topshare',
      }).then((result) => {
        this.listTopList = result.data.data
      }).catch((err) => {
        console.log(err);
      });
    },
    updatTopList: function (val) {
      if (val == true) {
        this.getTopList()
      }
    }
  },
  com: {

  }


})