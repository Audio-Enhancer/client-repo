Vue.component('socmed-bar', {
    data: function () {
        return {
            url : 'http://127.0.0.1:8080/',
            title : 'Audio-Enhancher',
            source : 'http://127.0.0.1:8080/',
            media : '',
            twit : ''
        }
    },
    methods: {
        openFacebook() {
            window.open(`https://www.facebook.com/share.php?u=${this.url}&title=${this.title}`, 'popup', 'width=600,height=600')
        },
        openTwitter() {
            window.open(`https://twitter.com/intent/tweet?status=${this.twit?this.twit:'http://127.0.0.1:8080/'}`,'popup','width=600,height=600')
        },
        openGplus() {
            window.open(`https://plus.google.com/share?url=${this.url}`, 'popup', 'width=600,height=600')
        },
        openLinkedin() {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.title}&source=${this.url}`, 'popup', 'width=600,height=600')
        },
        openPinterest() {
            window.open(`https://pinterest.com/pin/create/bookmarklet/?media=${this.media}&url=${this.url}&is_video=false&description==${this.title}`, 'popup', 'width=600,height=600')
        }
    },
    template: `

        <div id="share">
            <!-- facebook -->
            <a class="facebook"  v-on:click.prevent="openFacebook">
               <i class="fa fa-facebook"></i></a>
            <!-- twitter -->
            <a class="twitter" v-on:click.prevent="openTwitter">
                <i class="fa fa-twitter"></i></a>
            <!-- google plus -->
            <a class="googleplus" v-on:click.prevent="openGplus">
            <i class="fa fa-google-plus"></i></a>
            <!-- linkedin -->
            <a class="linkedin" v-on:click.prevent="openLinkedin">
                <i class="fa fa-linkedin"></i></a>
            <!-- pinterest -->
            <a class="pinterest" v-on:click.prevent="openPinterest">
                <i class="fa fa-pinterest-p"></i></a>
        </div>
        
    `


})