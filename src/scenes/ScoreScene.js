import Phaser from 'phaser';
import config from '../config/config'
import gameState from '../state/GameState'

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  preload() {
  }

  create() {
    this.endText = this.add.text(0, 0, 'Game Over :(', { fontSize: '10px', fill: '#fff' });
    this.dragonsSlaynText = this.add.text(0, 0, `You have slayn ${gameState.dragons} dragons`)
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.playerText = this.add.text(50, 15, 'Enter your name to save your score!', { fontSize: '10px', fill: '#fff' })

    Phaser.Display.Align.In.Center(
      this.endText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.playerText,
      this.zone
    );


    Phaser.Display.Align.In.Center(
      this.dragonsSlaynText,
      this.zone
    );


    this.endText.setY(15)
    this.dragonsSlaynText.setY(40);
    this.playerText.setY(60)

    this.add.dom(config.width / 2, config.height / 2, 'input', 'background-color: #000; width: 120px; height: 40px; font: 12px Arial');




  }
};