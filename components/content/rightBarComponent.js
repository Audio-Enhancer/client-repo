const rightBar = {
  template: `
    <div class="col-sm-3 rightbar-grid" v-if="islogin">
      <h4><b>my playlist</b></h4>
      <div class="card rightbar-card" style="width: 18rem;" v-for="(audio) in myAudioList">
          <div class="card-body">
              <h5 class="card-title">{{audio.name}}</h5>
              likes: {{audio.likes.length}}
              unlikes: {{audio.unlikes.length}}
              shares: {{audio.shares.length}}
              <a class="btn-sm btn-danger" @click="removeAudio(audio._id)">remove</a>
          </div>
      </div>
    </div>
  `,
  props: ['islogin', 'responAdd'],
  data: function () {
    return {
      myAudioList: []
    }
  },

  methods: {
    fetchUserAudio() {
      axios({
        method: 'GET',
        url: `http://localhost:3000/theaudios/myaudios`,
        headers: {
          token: localStorage.access_token
        }
      }).then((result) => {
        console.log(result.data.data);
        this.myAudioList = result.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    removeAudio(id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/theaudios/${id}`,
        headers: {
          token: localStorage.access_token
        }
      }).then((result) => {
        this.fetchUserAudio();
        this.$emit('update-remove', id)
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  created() {


  },
  watch: {
    islogin(val) {
      if (val) {
        this.fetchUserAudio()
      }
    },
    responAdd(val) {
      this.fetchUserAudio()
    }
  }
}