

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('touhou', 'assets/abigail.png', {
        frameWidth: 16,
        frameHeight: 32
    });
}

function create() {
    this.add.image(400, 300, 'sky');
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
    player = this.physics.add.sprite(100, 450, 'touhou').setScale(4);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'turn',
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
        repeate: -1
    })
}

function update ()
{
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
        player.anims.play('left', true);
    } else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }
}


const game = new Phaser.Game(config);

