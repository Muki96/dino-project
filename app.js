function showGrid() {
    /* First clear the old grid, then create new grid */
    document.getElementById('grid').innerHTML = '';
    makeRows(3, 3);

    let allDino = [
        new Dino('Anklyosaurus', '1000', '1000','Herbavor', 'anklyosaurus'),
        new Dino('Brachiosaurus', '1000', '1000','Herbavor', 'brachiosaurus'),
        new Dino('Elasmosaurus', '1000', '1000','Herbavor', 'elasmosaurus'),
        new Dino('Pteranodon', '1000', '1000','Carnivor', 'pteranodon'),
        new Dino('Stegosaurus', '1000', '1000','Herbavor', 'stegosaurus'),
        new Dino('Triceratops', '1000', '1000','Herbavor', 'triceratops'),
        new Dino('Tyrannosaurus rex', '1000', '1000','Herbavor', 'tyrannosaurus rex')
    ];

    let human = new Human(document.getElementById('name').value,
        document.getElementById('height').value,
        document.getElementById('weight').value,
        document.getElementById('diet').value,
        'human');

    let pigeon = new Pigeon('Pigeon', '10', '10', 'Herbavor', 'pigeon','All birds are dinosaurs.');
}

const mainGrid = document.getElementById('grid');

function makeRows(rows, cols) {
    mainGrid.style.setProperty('--grid-rows', rows);
    mainGrid.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement('div');
        cell.innerText = (c + 1);
        mainGrid.appendChild(cell).className = 'grid-item';
    };
};

class Animalia {
    constructor(name, height, weight, diet, img) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.img = img;
    }
}
class Human extends Animalia {

}
class Dino extends Animalia {

}
class Pigeon extends Animalia {
    constructor(name, height, weight, diet, img, fact) {
        super(name, height, weight, diet);
        this.fact = fact;
    }
}


