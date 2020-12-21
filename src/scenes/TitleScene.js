import Phaser from 'phaser';
import config from '../config/config'
import Button from '../objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  preload() {
    this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
    this.load.image('box', 'src/assets/ui/grey_box.png');
    this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 70, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 70, 'blueButton1', 'blueButton2', 'Ranking', 'Ranking');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    //this.scene.start('Game')
    //this.cameras.main.setZoom(0)
  }
};