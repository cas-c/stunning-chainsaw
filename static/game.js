

        var player;
        var cursors;
class InitialScene extends Phaser.Scene {
    constructor() {
        super('initialScene');
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('shack', 'assets/bigshq.png');
        this.load.image('door', 'assets/door.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('touhou', 'assets/abigail.png', {
            frameWidth: 16,
            frameHeight: 31
        });
    }
    create() {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 580, 'ground').setScale(2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 625, 'ground').setScale(2).refreshBody();

        this.add.image(600, 470, 'shack');

        this.doors = this.physics.add.staticGroup();
        this.doors.create(578, 525, 'door')


        this.player = this.physics.add.sprite(100, 450, 'touhou').setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'neutral',
            frames: [ { key: 'touhou', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('touhou', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('touhou', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('neutral', true);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250, true);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        InitialScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    }
}

const game = new Phaser.Game(config);

