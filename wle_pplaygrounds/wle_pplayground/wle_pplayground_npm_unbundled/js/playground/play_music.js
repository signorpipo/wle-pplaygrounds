WL.registerComponent("play-music", {
}, {
    init() {
    },
    start() {
        this._myStarted = false;
    },
    update(dt) {
        if (!this._myStarted) {
            this._myMusic = PP.myAudioManager.createAudioPlayer("playground_ambient");
            this._myMusic.play();

            this._myStarted = true;
        }
    }
});