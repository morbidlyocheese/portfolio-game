import kaboom from 'kaboom';

kaboom({
    width: 320,
    heigth: 240,
    font: 'sink',
    background: [0, 0, 255],
});

loadSprite("js", "sprites/js.png");
loadSound('jump', '/sounds/jump-16bit.wav');

scene("main", () => {
    let score = 0;
    gravity(2400);
    layers(["bg","obj","ui"], "obj");
    ui = add([layer("ui")]);
    const scoreLabel = ui.on('draw', () => {
        drawText({
            text: "Score: " + score,
            size: 14,
            font: "sink",
            pos: vec2(8, 24)
        });
    });
    ui.on("draw", () => {
        drawText({
            text: "Lives: " + js.lives,
            size: 14,
            font: "sink",
            pos: vec2(8, 48)
        });
    });
    
    const platform = add([
        rect(width(), 48),
        pos(0, height() - 48),
        outline(4),
        area(),
        solid(),
        color(127, 200, 255)
    ]);
    
    function spawnObstacle() {
        const obstacle = add([
            rect(48, 64),
            area(),
            outline(4),
            pos(width(), height() - 48),
            origin('botleft'),
            color(255, 180, 255),
            move(LEFT, 240),
            "obstacle"
        ]);
        wait(rand(0.5, 1.5), spawnObstacle);
    }
    
    spawnObstacle();
    
    const js = add([
        sprite("js"),
        pos(80, 80),
        area(),
        body(),
        rotate(0),
        solid(),
        origin("center"),
        "player",
        "mobile",
        "wraps",
        {
            speed: 320,
            lives: 3,
            can_shoot: true,
            special_cooldown: 0.5,
            invulnerable: false,
            invulnerablity_time: 3,
            animation_frame: 0,
        },
    ]);
    
    js.onCollide('obstacle', () => {
        addKaboom(js.pos);
        shake();
        if (js.lives === 0) {
            go('main');
        } else {
            js.lives--;
        }
    });
    
    onKeyDown("left", () => {
        if (js.pos.x >= 0 + js.width) {
            js.move(-1 * js.speed, 0);
        }
    });
    onKeyDown("right", () => {
        if (js.pos.x <= width() - js.width) {
            js.move(js.speed, 0);
        }
    });
    onKeyDown("space", () => {
        if (js.isGrounded()) {
            play('jump');
            js.jump();
        }
    });
    
    onKeyDown('escape', () => {
        go('main');
    });
    
    onUpdate(() => {
        score++;
    });
    js.onUpdate(() => {
        let currCam = camPos();
        if (currCam.x < js.pos.x) {
            camPos(js.pos.x, currCam.y);
        }
        if (js.pos.x < 0) {
            js.pos.x = 0;
        }
        if (js.pos.x + js.width > width) {
            js.pos.x = width() - js.width;
        }
    })
});

go('main');