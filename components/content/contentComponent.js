const content = {
  template: `
    <div class="col-sm-7">
      <div>
        <audio controls>
            <source src="horse.ogg" type="audio/ogg">
            <source src="horse.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <div class="share-buttons">
            <div id="fb-root"></div>
            <div class="fb-share-button" data-href="https://medium.com/datadriveninvestor/stopping-using-console-log-and-start-using-your-browsers-debugger-62bc893d93ff"
                data-layout="button_count">
            </div>
            <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=AudioEnhancer%20rules">
                Tweet</a>
        </div>
      </div>      
    </div>
  `,
  data: function () {
    return {

    }
  },

}