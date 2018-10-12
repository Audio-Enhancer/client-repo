const leftBar = {
  template: `
    <div class="col-sm-2">
      <div class="card" style="width: 12rem;">
        <img class="card-img-top" src="https://via.placeholder.com/350x350" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text"></p>
        </div>
      </div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Add Audio
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            
            <form>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail3" placeholder="Title" v-model="title"> 
                </div>
              </div>
              <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Cover</label>
                <div class="col-sm-10">
                  <input type="file" class="form-control" v-on:change="getCover($event)">
                </div>
              </div>
              <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Audio</label>
                <div class="col-sm-10">
                  <input type="file" class="form-control" v-on:change="getAudio($event)">
                </div>
              </div>
              
            </form>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addAudio">Add Audio</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      title: '',
      cover: '',
      audio: '',
    }
  },
  methods: {
    addAudio: function () {
      let formdata = new FormData()
      let formdata1 = new FormData()
      formdata.append('audiofile', this.audio)
      formdata1.append('picturefile', this.cover)

      axios.post('http://localhost:3000/theaudios/uploads/audio', formdata)
        .then((result) => {
          axios.post('http://localhost:3000/theaudios/uploads/picture', formdata1)
            .then((image) => {
              // console.log('ini log dari upload result.data.link', result.data.link);
              axios({
                  method: 'post',
                  url: 'http://localhost:3000/theaudios',
                  headers: {
                    token: localStorage.getItem('access_token')
                  },
                  data: {
                    name: this.title,
                    linkmedia: result.data.link,
                    linkimg: image.data.link
                  }
                })
                .then((value) => {
                  console.log(value);
                })
                .catch((err) => {
                  console.log(err)
                });
            })
            .catch((err) => {
              console.log(err);

            })
        })
        .catch((err) => {
          console.log(err);

        });
    },

    getCover(link) {
      this.cover = link.target.files[0]
      // console.log("ini cover", this.cover);
    },

    getAudio(link) {
      this.audio = link.target.files[0]
      // console.log("ini audio", this.audio);
    }
  }

}