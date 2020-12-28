import Phaser from 'phaser';
import gameState from '../state/GameState';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // create the map
    const map = this.make.tilemap({ key: 'map' });

    // first parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    // creating the layers
    map.createStaticLayer('Grass', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    //  animation with key 'left'
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(30, 30, 'player', 1);

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on trees
    this.physics.add.collider(this.player, obstacles);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // collectibles
    this.swords = this.physics.add.group();

    for (let i = 0; i < 3; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      this.swords.create(x, y, 'sword').setScale(0.3);
    }

    this.physics.add.overlap(this.player, this.swords, this.onGatherSword, false, this);

    // where the enemies will be
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 10; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    // add collider
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    // we listen for 'wake' event
    this.sys.events.on('wake', this.wake, this);

    this.dragonScore = this.add.text(this.physics.world.bounds.width / 2 - 25, 5, `Dragons Slayn: ${gameState.dragons}`, {
      font: '10px Arial',
      fill: '#ffffff',
      padding: { x: 10, y: 10 },

    }).setScrollFactor(0);

    this.swordPower = this.add.text(this.physics.world.bounds.width / 2 - 25, 25, `Power Swords: ${gameState.swords}`, {
      font: '10px Arial',
      fill: '#ffffff',
      padding: { x: 10, y: 10 },

    }).setScrollFactor(0);

    this.player.body.setVelocity(0);
  }

  onGatherSword(player, sword) {
    this.cameras.main.shake(300);

    gameState.swords += 1;
    this.swordPower.setText(`Power Swords: ${gameState.swords}`);
    sword.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    sword.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
  }

  wake() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    this.input.stopPropagation();
    this.wake();
    // start battle
    this.scene.switch('Battle');
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }

    this.dragonScore.setText(`Dragons Slayn: ${gameState.dragons}`);
    this.swordPower.setText(`Power Swords: ${gameState.swords}`);
  }
}