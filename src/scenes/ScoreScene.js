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
    //this.cameras.main.setZoom(1)
    this.endText = this.add.text(0, 0, 'Game Over :(', { fontSize: '10px', fill: '#fff' });
    this.dragonsSlaynText = this.add.text(0, 0, `You have slayn ${gameState.dragons} dragons`)
    //this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.zone = this.add.zone(config.width / 2,
      config.height / 2, config.width, config.height);
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



    this.add.dom(config.width / 2, 100, 'input', 'background-color: white; border: 1px solid #fff; width: 150px; height: 20px; font: 14px Arial');
    this.add.dom(config.width / 2, 140, 'button', 'background-color: #00b3ff; color: #fff; border: 1px solid #fff; width: 80px; height: 20px; font: 12px Arial', 'Send');


    const sendScore = async (user, score) => {
      try {
        const data = { user, score };
        let apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tB4vCeH1M2zdNORMm4cr/scores'
        await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch {
        throw new Error('API Error');
      }
    };



    const nameSend = document.querySelector('button');
    // console.log(nameSub)
    nameSend.addEventListener('click', (e) => {
      const name = document.querySelector('input').value
      sendScore(name, gameState.dragons)
      this.scene.switch('Title')
    })




    //   const player = document.querySelector('input').value
    //   console.log('player')
    //   this.scene.switch('Title')
    // }

    // gameID: tB4vCeH1M2zdNORMm4cr

    // https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tB4vCeH1M2zdNORMm4cr/scores/


  }
};