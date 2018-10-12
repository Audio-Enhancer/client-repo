const content = {
  template: `<div class="col-sm-7">
    <div id="maincontent">
        <article v-for="(audio, index) in audios" :key="audio._id">
            <div class="cont">
                <h3>{{ audio.name }}</h3>
               
                <img :src="audio.linkimg" width=150; height=150;>
            </div>
            <audio class="audio" controls="controls">
                <source type="audio/mpeg" :src='audio.linkmedia'>
            </audio>
            <time>
                <button class="btn btn-default" v-on:click="like(audio._id)"> <i class="fa fa-thumbs-o-up">({{ audio.likes.length }})</i></button>
                <button class="btn btn-default" v-on:click="unlike(audio._id)"> <i class="fa fa-thumbs-o-down">({{ audio.unlikes.length }})</i></button>
                </time>
            <div class="share-buttons">
                <div id="fb-root" @click="shareAudio"></div>
                <div class="fb-share-button" data-href='' data-layout="button_count" @click="shareAudio(audio._id)"></div>

                <div id="share">
                    <a class="twitter" v-on:click.prevent="openTwitter" @click="shareAudio(audio._id)">
                    <i class="fa fa-twitter"></i></a>
                </div>
                <div id="share">
                    <a class="googleplus" v-on:click.prevent="openGplus" @click="shareAudio(audio._id)">
                        <i class="fa fa-google-plus"></i></a>
                </div>
                <div id="share">
                    <a class="linkedin" v-on:click.prevent="openLinkedin" @click="shareAudio(audio._id)">
                        <i class="fa fa-linkedin"></i></a>
                </div>
                <div id="share">
                    <a class="pinterest" v-on:click.prevent="openPinterest" @click="shareAudio(audio._id)">
                        <i class="fa fa-pinterest-p"></i></a>
                </div>
            </div>
        </article>

    </div>

</div>`,
  props: ['searchaudio', 'responRemove', 'responAdd'],
  data: function () {
    return {
      url: "http://127.0.0.1:8080/",
      title: "Audio-Enhancher",
      source: "Audio-Enhancer App",
      media: "",
      twit: "",


      audios: []
    };
  },
  created() {
    this.getAudios();
  },
  methods: {
    openFacebook() {
      window.open(
        `https://www.facebook.com/share.php?u=${this.url}&title=${this.title}`,
        "popup",
        "width=600,height=600"
      );
    },
    openTwitter() {
      window.open(
        `https://twitter.com/intent/tweet?status=${
          this.twit ? this.twit : "http://127.0.0.1:8080/"
        }`,
        "popup",
        "width=500,height=300"
      );
    },
    openGplus() {
      window.open(
        `https://plus.google.com/share?url=${this.url}`,
        "popup",
        "width=400,height=400"
      );
    },
    openLinkedin() {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${
          this.url
        }&title=${this.title}&source=${this.url}`,
        "popup",
        "width=600,height=600"
      );
    },
    openPinterest() {
      window.open(
        `https://pinterest.com/pin/create/bookmarklet/?media=${
          this.media
        }&url=${this.url}&is_video=false&description==${this.title}`,
        "popup",
        "width=600,height=700"
      );
    },

    getAudios() {

      axios
        .get(`http://localhost:3000/theaudios`, {})
        .then((response) => {
          this.audios = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    shareAudio(audioId) {
      axios({
          method: 'GET',
          url: `http://localhost:3000/theaudios/share/${audioId}`,
          headers: {
            token: localStorage.access_token
          }
        })
        .then((result) => {
          // console.log(result)
          this.getAudios()
          this.$emit('update-top-share', true)
        }).catch((err) => {
          console.log(err.response)
        });
    },

    like: function (audioId) {

      axios({
          method: 'GET',
          url: `http://localhost:3000/theaudios/likes/${audioId}`,
          headers: {
            token: localStorage.access_token
          }
        })
        .then((result) => {
          this.getAudios()
        }).catch((err) => {});
    },

    unlike: function (audioId) {
      axios({
          method: 'GET',
          url: `http://localhost:3000/theaudios/unlikes/${audioId}`,
          headers: {
            token: localStorage.access_token
          }
        })
        .then((result) => {
          this.getAudios()
        }).catch((err) => {});
    }
  },
  watch: {
    searchaudio(value) {
      value = value.trim()
      if (value == '') {
        this.getAudios()
      } else {
        axios
          .get(`http://localhost:3000/theaudios/search/${value}`)
          .then((response) => {
            this.audios = response.data.data;
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    responRemove(val) {
      this.getAudios()
    },
    responAdd(val) {
      this.getAudios()
    }
  }
};