// Knight ou Sorcerer
// LittleMonster ou BigMonster

class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 800;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster')
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Pecadora')
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

//EL = Element
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        //Evento botão atacar.

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life} de HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`

        //Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life} de HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(player, target) {
        if (player.life <= 0) {
            this.log.addMessage(`😭 ${player.name} tá morta praga ruim!`);
            return; //para o ataque
        } if (target.life <= 0) {
            this.log.addMessage(`⚰️ ${target.name} foi de base!`);
            return; //para o ataque
        }

        let attackFactor = (Math.random() * 2).toFixed(2); //ataque aleatório máximo pode duplicar o dano
        let defenseFactor = (Math.random() * 2).toFixed(2); //defesa aleatório máximo pode duplicar a defesa 

        let actualAttack = attackFactor * player.attack;
        let actualDefense = defenseFactor * target.defense;

        if (actualAttack > actualDefense) {
            target.life -= actualAttack;
            this.log.addMessage(`⚔️ ${player.name} causou ${actualAttack.toFixed(2)} de dano em ${target.name}`)
        } else {
            this.log.addMessage(`🛡️ ${target.name} desviou do ataque de ${player.name}!`)
        }
        this.update() //atualiza o ambiente (vida, etc)
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
        this.listEl.addEventListener('DOMNodeInserted', () => {
            this.listEl.scrollTop = this.listEl.scrollHeight;
        });
    }

    addMessage(msg) {
        this.list.push(msg); //add msg no array
        this.render(); //renderiza o log toda vez que tiver algo novo, tira tudo e atualiza.
    }

    render() {
        this.listEl.innerHTML = ''; //limpa a lista antiga

        for (let i in this.list) { //percorre a lista e preenche os LIs
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}