import kaboom from 'kaboom';

kaboom({
    width: 320,
    heigth: 240,
    font: 'sink',
    background: [0, 0, 255],
});

// setGravity(2400);
loadSprite("js", "sprites/js.png");

scene("main", () => {
    layers(["bg","obj","ui"], "obj");
});

let score = 0;

ui = add([layer("ui")]);
ui.on("draw", () => {
    drawText({
        text: "Score: " + score,
        size: 14,
        font: "sink",
        pos: vec2(8, 24)
    });
});

const js = add([
    sprite("js"),
    pos(80, 80),
    area(),
    rotate(0),
    solid(),
    origin("center"),
    "player",
    "mobile",
    "wraps",
    {
        turn_speed: 4.58,
        speed: 320,
        max_thrust: 48,
        acceleration: 2,
        deceleration: 4,
        lives: 3,
        can_shoot: true,
        special_cooldown: 0.5,
        invulnerable: false,
        invulnerablity_time: 3,
        animation_frame: 0,
        thrusting: false,
    },
]);

onKeyDown("left", () => {
    js.move(-js.speed, 0)
});
onKeyDown("right", () => {
    js.move(js.speed, 0)
});
onKeyDown("up", () => {
    js.move(0, -js.speed)
});
onKeyDown("down", () => {
    js.move(0, js.speed)
});