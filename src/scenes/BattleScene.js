import Phaser from 'phaser';
import gameState from '../state/GameState';

// base class for heroes and enemies
const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
      this.type = type;
      this.maxHp = hp;
      this.hp = hp;
      this.damage = (gameState.swords * 15) + damage; // default damage
      this.living = true;
      this.menuItem = null;
    },
  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  },
  // attack the target unit
  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  },
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      // flip the image so I don"t have to edit it manually
      this.flipX = true;

      this.setScale(2);
    },
});

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    // change the background to green
    const cam = this.cameras.main;
    cam.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  }

  startBattle() {
    // player character - warrior
    const hero = new PlayerCharacter(this, 250, 50, 'player', 1, 'Hero', gameState.life, 125 + (gameState.swords * 25));
    this.add.existing(hero);

    // player character - mage
    const mage = new PlayerCharacter(this, 250, 100, 'magi', 4, 'Mage', 200, 100 + (gameState.swords * 15));
    this.add.existing(mage);

    const dragonRage = gameState.dragons * 10 + 6000;
    const dragonHeart = gameState.dragons * 30 + 6000;

    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Drogol', dragonHeart, dragonRage);
    this.add.existing(dragonblue);

    const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null, 'Rhaegul', dragonHeart, dragonRage);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [hero, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run('UI');
  }

  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random living hero to be attacked
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
    }
  }

  // check for game over or victory
  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    if (gameOver === true) {
      gameState.active = false;
      this.endBattle();
    }

    return victory || gameOver;
  }

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    // next turn in 3 seconds
    this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
  }

  endBattle() {
    if (gameState.active === false) {
      this.scene.sleep('UI');
      this.scene.sleep('Game');
      this.scene.switch('Score');
      return;
    }
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('UI');
    gameState.dragons += 2;
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('Game');
  }
}