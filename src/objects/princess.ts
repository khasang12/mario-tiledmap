import { ISpriteConstructor } from '../interfaces/sprite.interface'

export class Princess extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body

    private currentScene: Phaser.Scene
    private anim: Phaser.Animations.Animation | false
    private movingTweens: Phaser.Tweens.Tween

    constructor(aParams: ISpriteConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)
        this.currentScene = aParams.scene
        this.initSprite()
        this.currentScene.add.existing(this)
        this.body.allowGravity = false
        this.anim = this.currentScene.anims.create({
            key: 'princessAnim',
            frames: this.currentScene.anims.generateFrameNumbers('princess', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1,
        })

        this.play('princessAnim')
    }

    private initSprite() {
        // sprite
        this.setOrigin(0.5, 0.5)
        this.setFlipX(false)

        // physics
        this.currentScene.physics.world.enable(this)
        //this.adjustPhysicBodyToSmallSize();
        this.body.setSize(15, 21)

        this.movingTweens = this.currentScene.tweens.add({
            targets: this,
            duration: 1000, // duration of each tween, in milliseconds
            ease: 'Linear', // easing function to use
            yoyo: true, // whether to yoyo the tween (play it in reverse after it completes)
            repeat: -1, // number of times to repeat the tween (-1 means repeat indefinitely)
            x: 710,
        })
    }

    public dance(){
        this.anims.play('princessSprint')
    }
}
