const content = {
    template: `<div class="col-sm-7">
    <div id="maincontent">

        <article v-for="(audio, index) in audios" :key="audio._id">
            <div class="cont">
                <h3>{{ audio.name }}</h3>
                <time><button class="btn btn-default" v-on:click="like(audio._id)"> <i class="fa fa-thumbs-o-up"></i>
                        {{ likesCount }}</button>
                    <button class="btn btn-default" v-on:click="unlike(audio._id)"> <i class="fa fa-thumbs-o-down"></i>
                        {{ unlikesCount }}</button></time>
            </div>
            <audio class="audio" controls="controls">
                <source type="audio/mpeg" src=''>
            </audio>
            <div class="share-buttons">
                <div id="fb-root"></div>
                <div class="fb-share-button" data-href='' data-layout="button_count">
                </div>

                <div id="share">
                    <a class="twitter" v-on:click.prevent="openTwitter">
                        <i class="fa fa-twitter"></i></a>
                </div>
                <div id="share">
                    <a class="googleplus" v-on:click.prevent="openGplus">
                        <i class="fa fa-google-plus"></i></a>
                </div>
                <div id="share">
                    <a class="linkedin" v-on:click.prevent="openLinkedin">
                        <i class="fa fa-linkedin"></i></a>
                </div>
                <div id="share">
                    <a class="pinterest" v-on:click.prevent="openPinterest">
                        <i class="fa fa-pinterest-p"></i></a>
                </div>
            </div>
        </article>

    </div>

</div>`,
    data: function () {
        return {
            url: 'http://127.0.0.1:8080/',
            title: 'Audio-Enhancher',
            source: 'Audio-Enhancer App',
            media: '',
            twit: '',
            refCount: 0,
            isLoading: false,

            liked: false,
            submitted : false,
            text : 'Like',

            likesCount: 22,
            unlikesCount: 17,
            audios: []
        }
    },
    methods: {
        openFacebook() {
            window.open(`https://www.facebook.com/share.php?u=${this.url}&title=${this.title}`, 'popup', 'width=600,height=600')
        },
        openTwitter() {
            window.open(`https://twitter.com/intent/tweet?status=${this.twit?this.twit:'http://127.0.0.1:8080/'}`, 'popup', 'width=500,height=300')
        },
        openGplus() {
            window.open(`https://plus.google.com/share?url=${this.url}`, 'popup', 'width=400,height=400')
        },
        openLinkedin() {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.title}&source=${this.url}`, 'popup', 'width=600,height=600')
        },
        openPinterest() {
            window.open(`https://pinterest.com/pin/create/bookmarklet/?media=${this.media}&url=${this.url}&is_video=false&description==${this.title}`, 'popup', 'width=600,height=700')
        },

        setLoading(isLoading) {
            if (isLoading) {
                this.refCount++;
                this.isLoading = true;
            } else if (this.refCount > 0) {
                this.refCount--;
                this.isLoading = (this.refCount > 0);
            }
        },


        getAudios() {
            // axios.get(`http://localhost:3000/theaudios`, {})
            // .then(function (response) {
            //     this.audios = response.data.data
            // })
            // .catch(function (error) {
            //     console.log(error)
            // })

            return [{
                _id: 'audio _id1',
                name: "audio name",
                linkmedia: 'linkmediaURL',
                linkimg: 'linkimgUrl',
                likes: [{
                    _id: 'userId'
                }],
                unlikes: [{
                    _id: 'userId'
                }],
                shares: [{
                    _id: 'userId'
                }]

            }, {
                _id: 'audio _id2',
                name: "audio name",
                linkmedia: 'linkmediaURL',
                linkimg: 'linkimgUrl',
                likes: [{
                    _id: 'userId'
                }],
                unlikes: [{
                    _id: 'userId'
                }],
                shares: [{
                    _id: 'userId'
                }]

            }, {
                _id: 'audio _id3',
                name: "audio name",
                linkmedia: 'linkmediaURL',
                linkimg: 'linkimgUrl',
                likes: [{
                    _id: 'userId'
                }],
                unlikes: [{
                    _id: 'userId'
                }],
                shares: [{
                    _id: 'userId'
                }]

            }]
        },
        
        like: function (audioId) {
            this.submitted = true;

            axios.post('http://localhost:3000/theaudios/unlikes/', {
                params: {
                    id:audioId
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response)
                this.liked = true;
                this.submitted = false;
                this.text = 'Unlike';
            })
            .catch(function (error) {
                console.log(error)
            })

         
        },

        unlike: function (audioId) {
            this.submitted = true;

            axios.post('http://localhost:3000/theaudios/unlikes/', {
                params: {
                    id:audioId
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response)
                this.liked = false;
                this.submitted = false;
                this.text = 'Like';
            })
            .catch(function (error) {
                console.log(error)
            })
        }


    },
    created() {
        axios.interceptors.request.use((config) => {
            this.setLoading(true);
            return config;
        }, (error) => {
            this.setLoading(false);
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
            this.setLoading(false);
            return response;
        }, (error) => {
            this.setLoading(false);
            return Promise.reject(error);
        });


        this.audios = this.getAudios() ? this.getAudios() : []
    },

}

// $('audio').mediaelementplayer({
//     features: ['playpause', 'progress', 'current', 'tracks', 'fullscreen']
// });


// <div v-if="isLoading">
//             <div class="lds-ellipsis">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//             </div>

//         </div>