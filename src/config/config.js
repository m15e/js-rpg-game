import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 320,
  height: 240,
  dom: {
    createContainer: true,
  },
  zoom: 2.5,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};