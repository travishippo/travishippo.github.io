//game will have only 1 state
var GameState = {

    //initiate game settings
    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.world.setBounds(0, 0, 600, 375);

    },

    preload: function() {
        this.load.image("eightBall", "assets/images/eightBallCoconut.png");
    },


    create: function() {
        this.coconutTextHeaderHeight = game.height / 2 - 155;
        this.playButton = game.add.button(game.width / 2, game.height - 150, "eightBall", this.fadeOut, this);
        this.playButton.anchor.set(0.5);

        var style = {
            font: "25px helvetica",
            fill: "#ffffff",
            align: "center"
        }

        var question = "MAGIC COCONUT Says Ask One Question";
        var coconutText = game.add.text(game.width / 2, game.height / 2 - 100, question, style);
        coconutText.anchor.setTo(0.5);
        coconutText.stroke = '#000000';
        coconutText.strokeThickness = 8;

        //Earthquake effect
        //we needto add margin tot he world, so the camera can move
        var margin = 50;
        //and set the world's bounds according to the given margin
        var x = -margin;
        var y = -margin;
        var w = game.world.width + margin * 2;
        var h = game.world.height + margin * 2;
        //it's not necessary to increase height, we do it to keep uniformity
        game.world.setBounds(x, y, w, h);
        //we make sure camera is at position(0,0)
        game.world.camera.position.set(0);

    },


    fadeOut: function() {
        if (this.playButton.input.enabled === true) {
            this.playButton.input.enabled = false;
            this.addQuake();

            var predictions = [
            "NEVERMIND YOUR QUESTIONS, WE GO BEACH!",
            "YES...I MEAN NO \n WAIT I MEAN... \nWHAT WAS DA QUESTION AGAIN?",
            "YOU SURE YOU WANNA ASK DAT \n QUESTION TO ONE COCONUT?",
            "WHAT KINE QUESTION IS DAT \n ASK ONE NUDDA ONE",
            "Who cares?",
            "COCONUT STAY HUNGRY \n CANNOT TINK RIGHT NOW TRY AGAIN",
            "COCONUT STAY BROKEN \n CANNOT PREDICT NOW TRY AGAIN",
            "CHEE-HEE \nMIGHT HAPPEN, MIGHT NOT WHO KNOWS. ",
            "HOW SHOULD I KNOW \nI'M JUST ONE COCONUT",
            "Why You ask That, \nI starting to tink you the coconut here...", 
            "HO BRAH, why you even ask Dat\n I NOT GON TELL U!", 
            "HALA Y U ASK DAT 4!", 
            "YOU TALKING TO ONE COCONUT \n ...U MUST BE CRAZY.",
            "DA ANSWER IS \n I DON'T KNOW.",
            "THE GUY WHO MADE THIS APP \n TINKS HE'S FUNNY \n HE IS NOT. \n ASK ONE NUDDA QUESTION."
            ];
           
            var randomPredictions = predictions[game.rnd.between(0, predictions.length - 1)];
            var style = {
                font: "25px helvetica",
                fill: "#ffffff",
                align: "center"
            }
            this.randomText = game.add.text(game.width / 2, game.height / 2 + 100, randomPredictions, style);
            this.randomText.anchor.set(0.5);
            this.randomText.stroke = '#000000';
            this.randomText.strokeThickness = 8;
            console.log("hello");
            game.time.events.add(Phaser.Timer.SECOND * 4, function(randomText, playButton) {
                this.randomText.destroy();
                this.newButton();
            }, this);

        }
    },

    newButton: function() {
        this.playButton.input.enable = true;
        this.playButton = game.add.button(game.width / 2, game.height - 150, "eightBall", this.fadeOut, this);
        this.playButton.anchor.set(0.5);

        var style = {
            font: "25px helvetica",
            fill: "#ffffff",
            align: "center"
        }

        var question = "MAGIC COCONUT Says Ask One Question";
        var coconutText = game.add.text(game.width / 2, game.height / 2 - 100, question, style);
        coconutText.anchor.setTo(0.5);
        coconutText.stroke = '#000000';
        coconutText.strokeThickness = 8;


    },

    addQuake: function() {
        // define the camera offset for the quake
        var rumbleOffset = 10;
        // move according to the camera's current position
        var properties = {
            x: game.camera.x - rumbleOffset
        };
        // make it a relly fast movement
        var duration = 100;
        // because it will repeat
        var repeat = 4;
        // use bounce in-out to soften it a little bit
        var ease = Phaser.Easing.Bounce.InOut;
        var autoStart = false;
        // a little delay because we will run it indefinitely
        var delay = 0;
        // go back to the original position
        var yoyo = true;
        var quake = game.add.tween(game.camera)
            .to(properties, duration, ease, autoStart, delay, 4, yoyo);
        // we're using this line for the example to run indefinitely
        //quake.onComplete.addOnce(addQuake);
        // let the earthquake begins
        quake.start();
    },


};

var game = new Phaser.Game(600, 375, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');