(()=>{"use strict";var e,t={286:(e,t,s)=>{var i=s(260),r=s.n(i);const n=e=>"animation"in e;class a extends r().Plugins.ScenePlugin{constructor(e,t,s){super(e,t,s),this.animatedTiles=[],this.activeLayer=[],this.followTimeScale=!0,this.active=!1,this.rate=1}boot(){var e;const t=null===(e=this.systems)||void 0===e?void 0:e.events;null==t||t.on("postupdate",this.postUpdate,this),null==t||t.on("shutdown",this.shutdown,this),null==t||t.on("destroy",this.destroy,this)}shutdown(){this.animatedTiles.length=0}destroy(){this.shutdown(),this.scene=void 0}init(e){const t={map:e,animatedTiles:this.getAnimatedTiles(e),active:!0,rate:1,activeLayer:[]};t.activeLayer=e.layers.map((()=>!0)),this.animatedTiles.push(t),1===this.animatedTiles.length&&(this.active=!0)}start(){}stop(){}postUpdate(e,t){if(!this.active)return;const s=t*this.rate*(this.followTimeScale&&this.scene?this.scene.time.timeScale:1);for(const e of this.animatedTiles){if(!e.active)continue;const t=s*e.rate;for(const s of e.animatedTiles)if(s.next-=t*s.rate,s.next<0){const t=s.currentFrame,i=s.frames[t]?s.frames[t].tileid:0;let r=t+1;r>s.frames.length-1&&(r=0),s.next=s.frames[r].duration,s.currentFrame=r;for(const[t,r]of s.tiles.entries())e.activeLayer[t]&&this.updateLayer(s,r,i)}}}updateLayer(e,t,s=-1){const i=[],r=e.frames[e.currentFrame].tileid;for(const e of t)s>-1&&(null==e?void 0:e.index)!==s?i.push(e):e.index=r;for(const e of i){const s=t.indexOf(e);s>-1?t.splice(s,1):console.error("This shouldn't happen. Not at all. Blame Phaser Animated Tiles plugin. You'll be fine though.")}}getAnimatedTiles(e){var t,s;const i=[];for(const r of e.tilesets){const a=r.tileData;for(const[h,o]of Object.entries(a)){const a=parseInt(h);if(!n(o))continue;const l={index:a+r.firstgid,frames:[],currentFrame:0,tiles:[],rate:1,next:0};for(const e of o.animation){const t={duration:e.duration,tileid:e.tileid+r.firstgid};l.frames.push(t)}l.next=null!==(s=null===(t=l.frames[0])||void 0===t?void 0:t.duration)&&void 0!==s?s:0,l.currentFrame=l.frames.findIndex((e=>e.tileid===a+r.firstgid));for(const t of e.layers){const e=[];for(const s of t.data)for(const t of s)t.index-r.firstgid===a&&e.push(t);l.tiles.push(e)}i.push(l)}}for(const[t]of e.layers.entries())this.activeLayer[t]=!0;return i}updateAnimatedTiles(){var e,t;const s=this.animatedTiles;for(const i of s){const s=0,r=0,n=null!==(e=i.map.width)&&void 0!==e?e:10,a=null!==(t=i.map.height)&&void 0!==t?t:10;for(const e of i.animatedTiles)for(const[t,h]of e.tiles.entries())for(let o=s;o<s+n;o++)for(let s=r;s<r+a;s++){const r=i.map.layers[t].data,n=r[o]?r[o][s]:null;n&&n.index==e.index&&(-1===h.indexOf(n)&&h.push(n),n.index=e.frames[e.currentFrame].tileid)}}}}a.key="AnimatedTiles",a.mapping="animatedTiles";class h{constructor(e,t){this.scene=e,this.animationData=t,this.createGameAnimations()}createGameAnimations(){for(const e of this.animationData.anims){let t;const s=[];if("generateFrameNames"===e.frames.typeOfGeneration)t=this.scene.anims.generateFrameNames(e.frames.key,{prefix:e.frames.prefix||"",start:e.frames.start||0,end:e.frames.end||0,suffix:e.frames.suffix||"",zeroPad:e.frames.zeroPad||0,frames:e.frames.frames||!1});else if("generateFrameNumbers"===e.frames.typeOfGeneration)t=this.scene.anims.generateFrameNumbers(e.frames.key,{start:e.frames.start||0,end:e.frames.end||-1,first:e.frames.first||!1,frames:e.frames.frames||!1});else for(const t of e.frames){const e={key:t.key,frame:t.frame,duration:t.duration||0,visible:t.visible};s.push(e)}this.scene.anims.create({key:e.key,frames:t||s,defaultTextureKey:e.defaultTextureKey||null,frameRate:e.frameRate||24,duration:e.duration,skipMissedFrames:e.skipMissedFrames||!0,delay:e.delay||0,repeat:e.repeat||0,repeatDelay:e.repeatDelay||0,yoyo:e.yoyo||!1,showOnStart:e.showOnStart||!1,hideOnComplete:e.hideOnComplete||!1})}}}class o extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.animationHelperInstance=new h(this,this.cache.json.get("animationJSON")),this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.scenePlugin("AnimatedTiles","AnimatedTiles.js","animatedTiles","animatedTiles"),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class l extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.points=e.points,this.initSprite(),this.setDepth(5),this.currentScene.add.existing(this)}initSprite(){this.setOrigin(0,0),this.setFrame(0),this.currentScene.physics.world.enable(this),this.body.setSize(8,8),this.body.setAllowGravity(!1)}collected(){this.destroy(),this.currentScene.registry.values.score+=this.points,this.currentScene.events.emit("scoreChanged")}addCoinAndScore(e,t){this.currentScene.registry.values.coins+=e,this.currentScene.events.emit("coinsChanged"),this.currentScene.registry.values.score+=t,this.currentScene.events.emit("scoreChanged")}}class c extends Phaser.GameObjects.Sprite{getContent(){return this.content}getBoxContentString(){return this.boxContent}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.boxContent=e.content,this.initSprite(),this.currentScene.add.existing(this)}initSprite(){this.hitBoxTimeline=this.currentScene.tweens.createTimeline({}),this.setOrigin(0,0),this.setFrame(0),this.currentScene.physics.world.enable(this),this.body.setSize(16,16),this.body.setAllowGravity(!1),this.body.setImmovable(!0)}update(){}yoyoTheBoxUpAndDown(){this.hitBoxTimeline.add({targets:this,props:{y:this.y-10},duration:60,ease:"Power0",yoyo:!0,onComplete:function(){this.targets[0].active=!1,this.targets[0].setFrame(1)}})}spawnBoxContent(){return this.content=new l({scene:this.currentScene,x:this.x,y:this.y-16,texture:this.boxContent,points:1e3}),this.content}tweenBoxContent(e,t,s){this.hitBoxTimeline.add({targets:this.content,props:e,delay:0,duration:t,ease:"Power0",onComplete:s})}startHitTimeline(){this.hitBoxTimeline.play()}popUpCollectible(){this.content.body.setVelocity(30,-50),this.content.body.setAllowGravity(!0),this.content.body.setGravityY(-300)}addCoinAndScore(e,t){this.currentScene.registry.values.coins+=e,this.currentScene.events.emit("coinsChanged"),this.currentScene.registry.values.score+=t,this.currentScene.events.emit("scoreChanged")}}class d extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.destroyingValue=e.value,this.initSprite(),this.currentScene.add.existing(this)}initSprite(){this.setOrigin(0,0),this.setFrame(0),this.currentScene.physics.world.enable(this),this.body.setSize(16,16),this.body.setAllowGravity(!1),this.body.setImmovable(!0)}update(){if(this.body.touching.down){for(let e=-2;e<2;e++){const e=this.currentScene.add.sprite(this.x,this.y,"brick").setOrigin(0,0).setDisplaySize(4,4);this.currentScene.physics.world.enable(e)}this.destroy(),this.currentScene.registry.values.score+=this.destroyingValue,this.currentScene.events.emit("scoreChanged")}}}class y extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.initSprite(),this.currentScene.add.existing(this)}initSprite(){this.isActivated=!1,this.isDying=!1,this.setOrigin(0,0),this.setFrame(0),this.currentScene.physics.world.enable(this),this.body.setSize(16,16)}showAndAddScore(){this.currentScene.registry.values.score+=this.dyingScoreValue,this.currentScene.events.emit("scoreChanged");const e=this.currentScene.add.dynamicBitmapText(this.x,this.y-20,"font",this.dyingScoreValue.toString(),4).setOrigin(0,0);this.currentScene.add.tween({targets:e,props:{y:e.y-25},duration:800,ease:"Power0",yoyo:!1,onComplete:function(){e.destroy()}})}}class p extends y{constructor(e){super(e),this.speed=-20,this.dyingScoreValue=100,this.body.setSize(17,17)}update(){this.isDying?(this.anims.stop(),this.body.setVelocity(0,0),this.body.checkCollision.none=!0):this.isActivated?(this.body.setVelocityX(this.speed),(this.body.blocked.right||this.body.blocked.left)&&(this.speed=-this.speed,this.body.velocity.x=this.speed),this.anims.play("goombaWalk",!0)):Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(),this.currentScene.cameras.main.worldView)&&(this.isActivated=!0)}gotHitOnHead(){this.isDying=!0,this.setFrame(2),this.showAndAddScore()}gotHitFromBulletOrMarioHasStar(){this.isDying=!0,this.body.setVelocityX(20),this.body.setVelocityY(-20),this.setFlipY(!0)}isDead(){this.destroy()}}class u extends Phaser.GameObjects.Sprite{getKeys(){return this.keys}getVulnerable(){return this.isVulnerable}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.initSprite(),this.lastDirection="right",this.currentScene.add.existing(this),this.isDancing=!1}initSprite(){this.marioSize=this.currentScene.registry.get("marioSize"),this.acceleration=500,this.isJumping=!1,this.isDying=!1,this.isVulnerable=!0,this.vulnerableCounter=100,this.setOrigin(.5,.5),this.setFlipX(!1),this.bullet=this.scene.physics.add.sprite(this.x,this.y,"bullet"),this.bullet.body.allowGravity=!1,this.bullet.setAlpha(0),this.bullet.setDepth(1),this.equip=this.scene.physics.add.sprite(this.x,this.y,"equip"),this.equip.body.allowGravity=!1,this.keys=new Map([["LEFT",this.addKey("LEFT")],["RIGHT",this.addKey("RIGHT")],["DOWN",this.addKey("DOWN")],["JUMP",this.addKey("SPACE")],["SHOOT",this.addKey("Q")],["BONK",this.addKey("F")]]),this.currentScene.physics.world.enable(this),this.body.setSize(15,22),this.body.maxVelocity.x=50,this.body.maxVelocity.y=300}addKey(e){return this.currentScene.input.keyboard.addKey(e)}update(){Phaser.Display.Bounds.SetCenterX(this.equip,this.body.center.x),Phaser.Display.Bounds.SetCenterY(this.equip,this.body.center.y+2),"right"==this.lastDirection?Phaser.Display.Bounds.SetLeft(this.equip,this.body.right-5):Phaser.Display.Bounds.SetRight(this.equip,this.body.left+5),this.isDying?(this.setFrame(12),this.y>this.currentScene.sys.canvas.height&&(this.currentScene.scene.stop("GameScene"),this.currentScene.scene.stop("HUDScene"),this.currentScene.scene.start("MenuScene"))):(this.handleInput(),this.handleAnimations()),this.isVulnerable||(this.vulnerableCounter>0?this.vulnerableCounter-=1:(this.vulnerableCounter=100,this.isVulnerable=!0))}handleInput(){var e,t,s,i,r;this.y>this.currentScene.sys.canvas.height&&(this.isDying=!0),(this.body.onFloor()||this.body.touching.down||this.body.blocked.down)&&(this.isJumping=!1),(null===(e=this.keys.get("RIGHT"))||void 0===e?void 0:e.isDown)?(this.lastDirection="right",this.body.setAccelerationX(this.acceleration),this.setFlipX(!1)):(null===(t=this.keys.get("SHOOT"))||void 0===t?void 0:t.isDown)?this.isFighting||this.fireBullet():(null===(s=this.keys.get("BONK"))||void 0===s?void 0:s.isDown)?this.isFighting||(this.equip.enableBody(!1,this.x,this.y,!0,!0),this.isFighting=!0,"right"==this.lastDirection?this.equip.setAngle(90):this.equip.setAngle(-90),this.scene.time.delayedCall(300,(()=>{this.equip.setAngle(0),this.isFighting=!1,this.equip.disableBody(!0,!1)}))):(null===(i=this.keys.get("LEFT"))||void 0===i?void 0:i.isDown)?(this.lastDirection="left",this.body.setAccelerationX(-this.acceleration),this.setFlipX(!0)):(this.body.setVelocityX(0),this.body.setAccelerationX(0)),this.isDancing||!(null===(r=this.keys.get("JUMP"))||void 0===r?void 0:r.isDown)||this.isJumping||(this.body.setVelocityY(-200),this.isJumping=!0)}getIsDancing(){return this.isDancing}getIsFighting(){return this.isFighting}reset(){this.texture.key="mario",this.equip.setTexture("equip")}fireBullet(){if(this.currentScene.registry.values.coins>=5){this.currentScene.registry.values.coins-=5,this.currentScene.events.emit("coinsChanged"),this.bullet.enableBody(!0,this.x,this.y,!0,!0),this.bullet.setAlpha(1),this.bullet.setPosition(this.x,this.y),this.bullet.setVelocityX("right"==this.lastDirection?300:-300);let e="bullet";"knight"==this.texture.key?e="bullet-knight":"hermit"==this.texture.key&&(e="bullet-hermit"),this.scene.anims.create({key:e,frames:this.scene.anims.generateFrameNumbers(e,{start:0,end:3}),frameRate:10,repeat:5}),this.bullet.anims.play(e),this.scene.time.addEvent({delay:2e3,callback:this.stopBullet,callbackScope:this})}}getBullet(){return this.bullet}getEquip(){return this.equip}stopBullet(){this.bullet.setAlpha(0)}respawnBullet(){this.bullet.disableBody(!0,!0)}handleAnimations(){var e;0!==this.body.velocity.y?(this.anims.stop(),"small"===this.marioSize?this.setFrame(8):this.setFrame(10)):0!==this.body.velocity.x?((this.body.velocity.x<0&&this.body.acceleration.x>0||this.body.velocity.x>0&&this.body.acceleration.x<0)&&("small"===this.marioSize?this.setFrame(5):this.setFrame(11)),"knight"==this.texture.key?this.anims.play(this.marioSize+"KnightWalk",!0):"mario"==this.texture.key?this.anims.play(this.marioSize+"MarioWalk",!0):this.anims.play(this.marioSize+"HermitWalk",!0)):(this.anims.stop(),"small"===this.marioSize?this.setFrame(0):(null===(e=this.keys.get("DOWN"))||void 0===e?void 0:e.isDown)?this.setFrame(7):this.setFrame(6))}growMario(){this.marioSize="big",this.currentScene.registry.set("marioSize","big"),this.adjustPhysicBodyToBigSize()}shrinkMario(){this.marioSize="small",this.currentScene.registry.set("marioSize","small"),this.adjustPhysicBodyToSmallSize()}adjustPhysicBodyToSmallSize(){this.body.setSize(6,12),this.body.setOffset(6,4)}adjustPhysicBodyToBigSize(){this.body.setSize(8,16),this.body.setOffset(4,0)}bounceUpAfterHitEnemyOnHead(){this.currentScene.add.tween({targets:this,props:{y:this.y-5},duration:200,ease:"Power1",yoyo:!0})}gotHit(){this.isVulnerable=!1,"big"===this.marioSize?this.shrinkMario():(this.isDying=!0,this.body.stop(),this.anims.stop(),this.body.setVelocityY(-180),this.body.checkCollision.up=!1,this.body.checkCollision.down=!1,this.body.checkCollision.left=!1,this.body.checkCollision.right=!1)}revive(){this.isVulnerable&&(this.currentScene.registry.values.lives-=1),this.currentScene.events.emit("livesChanged"),this.isVulnerable=!1,this.currentScene.tweens.add({targets:this,alpha:0,duration:400,yoyo:!0,repeat:3}),this.currentScene.time.delayedCall(2e3,(()=>{this.isVulnerable=!0}))}dance(){this.isDancing=!0,"knight"==this.texture.key?this.anims.play(this.marioSize+"KnightSprint",!0):"mario"==this.texture.key?this.anims.play(this.marioSize+"MarioSprint",!0):this.anims.play(this.marioSize+"HermitSprint",!0),this.currentScene.tweens.add({targets:this,duration:1e3,ease:"Linear",x:763}),this.currentScene.time.delayedCall(1500,(()=>{this.currentScene.scene.stop("GameScene"),this.currentScene.scene.stop("HUDScene"),this.currentScene.scene.start("MenuScene")}))}}class m extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.tweenProps=e.tweenProps,this.initImage(),this.initTween(),this.currentScene.add.existing(this)}initImage(){this.setOrigin(0,0),this.setFrame(0),this.currentScene.physics.world.enable(this),this.body.setSize(42,7),this.body.setAllowGravity(!1),this.body.setImmovable(!0)}initTween(){this.currentScene.tweens.add({targets:this,props:this.tweenProps,ease:"Power0",yoyo:!0,repeat:-1})}update(){}isMovingLRType(){return Object.hasOwn(this.tweenProps,"x")}}class g extends Phaser.GameObjects.Zone{getPortalDestination(){return this.portalDestinationForMario}constructor(e){super(e.scene,e.x,e.y,e.width,e.height),this.currentScene=e.scene,this.portalDestinationForMario={x:e.spawn.x,y:e.spawn.y,dir:e.spawn.dir},this.initZone(),this.currentScene.add.existing(this)}initZone(){this.setOrigin(0,0),this.currentScene.physics.world.enable(this),this.body.setSize(this.height,this.width),this.body.setOffset(0,0),this.body.setAllowGravity(!1),this.body.setImmovable(!0)}}class b extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.currentScene=e.scene,this.initSprite(),this.currentScene.add.existing(this),this.body.allowGravity=!1,this.anim=this.currentScene.anims.create({key:"princessAnim",frames:this.currentScene.anims.generateFrameNumbers("princess",{start:0,end:8}),frameRate:10,repeat:-1}),this.play("princessAnim")}initSprite(){this.setOrigin(.5,.5),this.setFlipX(!1),this.currentScene.physics.world.enable(this),this.body.setSize(15,21),this.movingTweens=this.currentScene.tweens.add({targets:this,duration:1e3,ease:"Linear",yoyo:!0,repeat:-1,x:710})}dance(){this.anims.play("princessSprint")}}class S extends Phaser.Scene{constructor(){super({key:"GameScene"})}create(){this.map=this.make.tilemap({key:this.registry.get("level")}),this.tileset=this.map.addTilesetImage("new_tiles"),this.backgroundLayer=this.map.createLayer("backgroundLayer",this.tileset,0,0),this.foregroundLayer=this.map.createLayer("foregroundLayer",this.tileset,0,0),this.foregroundLayer.setName("foregroundLayer"),this.foregroundLayer.setCollisionByProperty({collide:!0}),this.animatedTiles.init(this.map),this.portals=this.add.group({runChildUpdate:!0}),this.boxes=this.add.group({runChildUpdate:!0}),this.bricks=this.add.group({runChildUpdate:!0}),this.collectibles=this.add.group({runChildUpdate:!0}),this.enemies=this.add.group({runChildUpdate:!0}),this.platforms=this.add.group({runChildUpdate:!0}),this.loadObjectsFromTilemap(),this.physics.add.collider(this.player,this.foregroundLayer),this.physics.add.collider(this.enemies,this.foregroundLayer),this.physics.add.collider(this.enemies,this.boxes),this.physics.add.collider(this.enemies,this.bricks),this.physics.add.collider(this.player,this.bricks),this.physics.add.collider(this.player,this.boxes,((e,t)=>this.playerHitBox(e,t)),void 0,this),this.physics.add.overlap(this.player,this.enemies,((e,t)=>this.handlePlayerEnemyOverlap(e,t)),void 0,this),this.physics.add.overlap(this.player.getBullet(),this.enemies,((e,t)=>this.handleBulletEnemyOverlap(e,t)),void 0,this.player),this.physics.add.overlap(this.player.getEquip(),this.enemies,((e,t)=>{this.player.getIsFighting()&&this.handleEquipEnemyOverlap(e,t)}),void 0,this.player),this.physics.add.overlap(this.player,this.portals,((e,t)=>this.handlePlayerPortalOverlap(e,t)),void 0,this),this.physics.add.collider(this.player,this.platforms,((e,t)=>this.handlePlayerOnPlatform(e,t)),void 0,this),this.physics.add.overlap(this.player,this.collectibles,((e,t)=>this.handlePlayerCollectiblesOverlap(e,t)),void 0,this),this.physics.add.collider(this.player,this.princess,((e,t)=>this.handlePlayerRescuePrincess(e,t)),void 0,this),this.player.reset(),this.cameras.main.startFollow(this.player),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)}update(){this.sys.isActive()?(this.player.update(),this.player.getIsDancing()&&(Phaser.Display.Bounds.SetCenterX(this.princess,this.player.body.center.x+15),Phaser.Display.Bounds.SetCenterY(this.princess,this.player.body.center.y)),this.animatedTiles.updateAnimatedTiles()):console.log("not active yet")}loadObjectsFromTilemap(){this.map.getObjectLayer("objects").objects.forEach((e=>{"portal"===e.type&&this.portals.add(new g({scene:this,x:e.x,y:e.y,height:e.width,width:e.height,spawn:{dir:e.properties[0].value,x:e.properties[1].value,y:e.properties[2].value}}).setName(e.name)),"player"===e.type&&(this.player=new u({scene:this,x:this.registry.get("spawn").x,y:this.registry.get("spawn").y,texture:"mario"})),"princess"===e.type&&(this.princess=new b({scene:this,x:e.x,y:e.y,texture:"princess"})),"goomba"===e.type&&this.enemies.add(new p({scene:this,x:e.x,y:e.y,texture:"goomba"})),"brick"===e.type&&this.bricks.add(new d({scene:this,x:e.x,y:e.y,texture:"brick",value:50})),"box"===e.type&&this.boxes.add(new c({scene:this,content:e.properties[0].value,x:e.x,y:e.y,texture:"box"})),"collectible"===e.type&&this.collectibles.add(new l({scene:this,x:e.x,y:e.y,texture:e.properties[0].value,points:100})),"platformMovingUpAndDown"===e.type&&this.platforms.add(new m({scene:this,x:e.x,y:e.y,texture:"platform",tweenProps:{y:{value:50,duration:1500,ease:"Power0"}}})),"platformMovingLeftAndRight"===e.type&&this.platforms.add(new m({scene:this,x:e.x,y:e.y,texture:"platform",tweenProps:{x:{value:e.x+50,duration:1200,ease:"Power0"}}}))}))}handlePlayerEnemyOverlap(e,t){e.body.touching.down&&t.body.touching.up?(e.bounceUpAfterHitEnemyOnHead(),t.gotHitOnHead(),this.add.tween({targets:t,props:{alpha:0},duration:1e3,ease:"Power0",yoyo:!1,onComplete:function(){t.isDead()}})):e.getVulnerable()&&(0==this.registry.get("lives")?e.gotHit():e.revive())}handlePlayerRescuePrincess(e,t){0==e.getIsDancing()&&(e.dance(),t.dance())}handleBulletEnemyOverlap(e,t){t.gotHitFromBulletOrMarioHasStar(),e.disableBody(!0,!0),this.add.tween({targets:t,props:{alpha:0},duration:1e3,ease:"Power0",yoyo:!1,onComplete:function(){t.isDead()}})}handleEquipEnemyOverlap(e,t){t.gotHitFromBulletOrMarioHasStar(),this.add.tween({targets:t,props:{alpha:0},duration:1e3,ease:"Power0",yoyo:!1,onComplete:function(){t.isDead()}})}playerHitBox(e,t){if(t.body.touching.down&&t.active){switch(t.yoyoTheBoxUpAndDown(),this.collectibles.add(t.spawnBoxContent()),t.getBoxContentString()){case"coin":case"rotatingCoin":t.tweenBoxContent({y:t.y-40,alpha:0},700,(function(){t.getContent().destroy()})),t.addCoinAndScore(1,100);break;case"flower":t.tweenBoxContent({y:t.y-8},200,(function(){t.getContent().anims.play("flower")}));break;case"mushroom":case"star":t.popUpCollectible()}t.startHitTimeline()}}handlePlayerPortalOverlap(e,t){var s,i;(null===(s=e.getKeys().get("DOWN"))||void 0===s?void 0:s.isDown)&&"down"===t.getPortalDestination().dir||(null===(i=e.getKeys().get("RIGHT"))||void 0===i?void 0:i.isDown)&&"right"===t.getPortalDestination().dir?(this.registry.set("level",t.name),this.registry.set("spawn",{x:t.getPortalDestination().x,y:t.getPortalDestination().y,dir:t.getPortalDestination().dir}),this.scene.restart()):"exit"===t.name&&(this.scene.stop("GameScene"),this.scene.stop("HUDScene"),this.scene.start("MenuScene"))}handlePlayerCollectiblesOverlap(e,t){switch(t.texture.key){case"coin2":t.addCoinAndScore(1,50);break;case"flower":case"star":default:break;case"mushroom":e.growMario();break;case"hermit":case"knight":e.texture.key=t.texture.key,e.getEquip().setTexture("equip-"+t.texture.key)}t.collected()}handlePlayerOnPlatform(e,t){t.body.moves&&t.body.touching.up&&e.body.touching.down&&t.isMovingLRType()&&e.setX(t.x+t.width/2)}}class v extends Phaser.Scene{constructor(){super({key:"HUDScene"})}create(){this.textElements=new Map([["LIVES",this.addText(0,0,`MARIOx ${this.registry.get("lives")}`)],["WORLDTIME",this.addText(80,0,`${this.registry.get("worldTime")}`)],["SCORE",this.addText(40,8,`${this.registry.get("score")}`)],["COINS",this.addText(80,8,`${this.registry.get("coins")}`)],["WORLD",this.addText(96,8,`${this.registry.get("world")}`)],["TIME",this.addText(136,8,`${this.registry.get("time")}`)]]);const e=this.scene.get("GameScene");e.events.on("coinsChanged",this.updateCoins,this),e.events.on("scoreChanged",this.updateScore,this),e.events.on("livesChanged",this.updateLives,this),this.timer=this.time.addEvent({delay:1e3,callback:this.updateTime,callbackScope:this,loop:!0})}addText(e,t,s){return this.add.bitmapText(e,t,"font",s,8)}updateTime(){var e;this.registry.values.time-=1,null===(e=this.textElements.get("TIME"))||void 0===e||e.setText(`${this.registry.get("time")}`)}updateCoins(){var e;null===(e=this.textElements.get("COINS"))||void 0===e||e.setText(`${this.registry.get("coins")}`).setX(80-8*(this.registry.get("coins").toString().length-1))}updateScore(){var e;null===(e=this.textElements.get("SCORE"))||void 0===e||e.setText(`${this.registry.get("score")}`).setX(40-8*(this.registry.get("score").toString().length-1))}updateLives(){var e;null===(e=this.textElements.get("LIVES"))||void 0===e||e.setText(`Lives: ${this.registry.get("lives")}`)}}class x extends Phaser.Scene{constructor(){super({key:"MenuScene"}),this.bitmapTexts=[]}init(){this.startKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.startKey.isDown=!1,this.initGlobalDataManager()}create(){this.add.image(0,0,"title").setOrigin(0,0),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-22,180,"font","Press S to START",8)),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2-22,200,"font","Instructions:",8)),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2,225,"font","* Q to Fire! 5 coins",8)),this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width/2,240,"font","* F to Bonk! 0 coins",8))}update(){this.startKey.isDown&&(this.scene.start("HUDScene"),this.scene.start("GameScene"),this.scene.bringToTop("HUDScene"))}initGlobalDataManager(){this.registry.set("time",400),this.registry.set("level","level1"),this.registry.set("world","1-1"),this.registry.set("worldTime","WORLD TIME"),this.registry.set("score",0),this.registry.set("coins",0),this.registry.set("lives",2),this.registry.set("spawn",{x:12,y:44,dir:"down"}),this.registry.set("marioSize","small")}}const f={title:"Super Mario Land",url:"https://github.com/digitsensitive/phaser3-typescript",version:"2.0",width:320,height:288,zoom:5,type:Phaser.AUTO,parent:"game",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[o,x,v,S],plugins:{scene:[{key:a.key,plugin:a,mapping:a.mapping,start:!0}]},input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{y:475},debug:!1}},backgroundColor:"#f8f8f8",render:{pixelArt:!0,antialias:!1}};class w extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new w(f)}))}},s={};function i(e){var r=s[e];if(void 0!==r)return r.exports;var n=s[e]={exports:{}};return t[e].call(n.exports,n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,s,r,n)=>{if(!s){var a=1/0;for(c=0;c<e.length;c++){for(var[s,r,n]=e[c],h=!0,o=0;o<s.length;o++)(!1&n||a>=n)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(h=!1,n<a&&(a=n));if(h){e.splice(c--,1);var l=r();void 0!==l&&(t=l)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[s,r,n]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var r,n,[a,h,o]=s,l=0;if(a.some((t=>0!==e[t]))){for(r in h)i.o(h,r)&&(i.m[r]=h[r]);if(o)var c=o(i)}for(t&&t(s);l<a.length;l++)n=a[l],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(c)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var r=i.O(void 0,[216],(()=>i(286)));r=i.O(r)})();