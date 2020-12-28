import Phaser from 'phaser';
import config from '../config/config';
import gameState from '../state/GameState';
import sendScore from '../helpers/score';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.endText = this.add.text(0, 0, 'Game Over :(', { fontSize: '10px', fill: '#fff' });
    this.dragonsSlaynText = this.add.text(0, 0, `You have slayn ${gameState.dragons} dragons`);

    this.zone = this.add.zone(config.width / 2,
      config.height / 2, config.width, config.height);
    this.playerText = this.add.text(50, 15, 'Enter your name to save your score!', { fontSize: '10px', fill: '#fff' });

    Phaser.Display.Align.In.Center(
      this.endText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.playerText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.dragonsSlaynText,
      this.zone,
    );

    this.endText.setY(15);
    this.dragonsSlaynText.setY(40);
    this.playerText.setY(60);

    this.add.dom(config.width / 2, 100, 'input', 'background-color: white; border: 1px solid #fff; width: 150px; height: 20px; font: 14px Arial');
    this.add.dom(config.width / 2, 140, 'button', 'background-color: #00b3ff; color: #fff; border: 1px solid #fff; width: 80px; height: 20px; font: 12px Arial', 'Send');

    const nameSend = document.querySelector('button');


    nameSend.addEventListener('click', () => {
      let name = document.querySelector('input')
      sendScore(name.value.toString(), gameState.dragons);
      console.log(name.value.toString(), gameState.dragons);
      name.value = '';
      gameState.active = false;
      gameState.dragons = 0;
      gameState.swords = 0;
      gameState.life = 200;
      this.scene.restart('Game');
      this.scene.sleep('Game');
      this.scene.switch('Title');
    });
  }

}