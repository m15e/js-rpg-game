import Phaser from 'phaser';
import Button from '../objects/Button';
import config from '../config/config';
import getRanking from '../helpers/ranking';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Ranking');
  }

  async create() {
    this.add.text((config.width / 2), 20, 'Hero Rankings', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);

    let res = await getRanking();
    res = res.result;
    res = res.sort((a, b) => b.score - a.score).slice(0, 9);
    res.forEach((el, idx) => {
      this.add.text((config.width / 2), 40 + (idx * 15), `${idx + 1}. ${el.user} ${el.score} dragons slayn`, { fontSize: '12px', fill: '#fff' }).setOrigin(0.5);
    });

    this.menuButton = new Button(this, config.width / 2, 200, 'blueButton1', 'blueButton2', 'Back', 'Title');
  }
}