import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // map tiles
    this.load.image('tiles', 'src/assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'src/assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'src/assets/run_hero.png', { frameWidth: 50, frameHeight: 37 });

    // swords
    this.load.image('sword', 'src/assets/swordquest.png');

    // dragons
    this.load.image('dragonblue', 'src/assets/dragonblue.png');
    this.load.image('dragonorrange', 'src/assets/dragonorrange.png');

    this.load.audio('bgMusic', 'src/assets/TownTheme.mp3');
  }

  create() {
    this.scene.start('Title');
  }
}