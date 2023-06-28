let char = new Knight('Iuzer');
let monster = new LittleMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
);

stage.start();