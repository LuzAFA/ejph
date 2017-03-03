var game = new Phaser.Game(800,600,Phaser.Auto,'',
	{preload:preload, create:create, update:update});

var platos;
var player;
var cursors;
var hojas;
var score = 0;
var scoreText;

function preload() {
	game.load.image('sky', 'assets/sky.jpg'); // fondo
	game.load.image('mi', 'assets/mi.jpg');
	game.load.image('hoja', 'assets/leaf.gif');
	game.load.image('plato', 'assets/plato.jpg');
	game.load.spritesheet('mochii', 'assets/mi.jpg',100,70); // el mochi q es el pj
	
}

function create() {

	game.add.sprite(0, 0, 'sky'); //agregamos fondo 
	
	game.physics.startSystem(Phaser.Physics.ARCADE); //fisicas del juego 
	platos= game.add.group(); //grupo -- platos se manejan todos los ob como uno solo 
	platos.enableBody = true;
	var piso = platos.create(0, game.world.height - 43, 'plato'); //el piso
	piso.scale.setTo(4, 1);//ajusta im al piso
	piso.body.immovable = true;// no c mueve el pj 

	var platoforma = platos.create(400, 400, 'plato');
    platoforma.body.immovable = true;
    platoforma.scale.setTo(2, 1)
    platoforma = platos.create(-150, 250, 'plato');
    platoforma.body.immovable = true;
    platoforma.scale.setTo(2, 1)

    player = game.add.sprite(32, game.world.height - 150, 'mochii');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    hojas = game.add.group();
    hojas.enableBody = true;

    for (var i = 0; i <= 5; i++) {     
        var hoja = hojas.create(i *Math.random()*80, 0, 'hoja');
        hoja.body.gravity.y = 300;
        hoja.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
}

function update() {

	game.physics.arcade.collide(player, platos);
	game.physics.arcade.collide(hojas, platos);

	game.physics.arcade.overlap(player, hojas, comeHoja, null, this);
	
	player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
       
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;        
    }
    else
    {
        //  Stand still
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}

function comeHoja(player, hoja) {
	hoja.kill();

	score += 10;
    scoreText.text = 'Score: ' + score;
}

