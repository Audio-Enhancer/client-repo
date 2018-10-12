Vue.component('content-component', {
  template: `
     <div class="container">
      <div class="row">
          <letfBarComponent :listTopList="listTopList" :islogin="islogin" :responRemove="responRemove" @respon-add-song="responAddSong"/>
          <contentComponent :searchaudio="searchaudio" @update-top-share="updatTopList" :responRemove="responRemove" :responAdd="responAdd"/>
          <rightBarComponent :islogin="islogin" @update-remove="updateRemove" :responAdd="responAdd"/>
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
      responUpdate: '',
      responRemove: '',
      responAdd: ''
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
    },
    updateRemove: function (val) {
      this.responRemove = val
      this.getTopList()
    },
    responAddSong: function (val) {
      this.responAdd = val
    }
  },
  com: {

  }


})