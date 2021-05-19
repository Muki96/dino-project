function showGrid() {
    /* First clear the old grid, then create new grid */
    document.getElementById('grid').innerHTML = '';
    document.getElementById('mainForm').style.display = 'none';
    let animals = createAnimals();



    animals[2] = shuffle(animals[2]);
    makeRows(3, 3, animals);
}

const mainGrid = document.getElementById('grid');
/* Function to create cells. For every cell insert a object dino, human or pigeon */
function makeRows(rows, cols, animals) {
    mainGrid.style.setProperty('--grid-rows', rows);
    mainGrid.style.setProperty('--grid-cols', cols);
    let allDinoRandomFact = '';

    let pigeonPosition = randomNumber(4, 8);
    for (c = 0; c < (rows * cols); c++) {
        let mainCell = document.createElement('div');
        let cell = document.createElement('div');
        // cell.style.backgroundSize = '100%';
        // mainCell.style.backgroundSize = '100%';
        let paragraph = document.createElement('p');
        let description;
        let imgPath;

        if(c === pigeonPosition){
            /* First check where to put the pigeon, in this way if we have more than 7 dinos, we are sure that pigeon
            * will always been displayed */
            description = document.createTextNode(animals[1].name + '\n' + animals[1].facts[0]);
            // description.innerText = animals[1].name + '\n' + animals[1].facts[0];
            imgPath = "url(images/" + animals[1].img + ")";
            cell.style.backgroundImage = imgPath;
        } else if (c === 4) {
            /* If in the center, than show human */
            description = document.createTextNode(animals[0].name);
            // description.innerText = animals[0].name;
            imgPath = "url(images/" + animals[0].img + ")";
            cell.style.backgroundImage = imgPath;
        } else {
            /* show dino */
            allDinoRandomFact = animals[2][0].facts[randomNumber(-1,2)];
            description = document.createTextNode(animals[2][0].name + '\n' + allDinoRandomFact);
            // description.innerText = animals[2][0].name + '\n' + allDinoRandomFact;
            imgPath = "url(images/" + animals[2][0].img + ")";
            cell.style.backgroundImage = imgPath;
            // remove the first element
            animals[2].shift();
        }
        paragraph.appendChild(description);
        mainCell.appendChild(cell);
        cell.appendChild(paragraph);
        mainGrid.appendChild(cell).className = "grid-item";
    };

    /*for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement('div');

        //document.getElementById('grid').innerHTML = c;
        /!* 4 means the cell in the middle, it must be human *!/
        if (c === 4) {
            //document.getElementById('grid').innerHTML = animals[0].name + 'aaaaasfagvregehg';
            let imgPath = "url(images/" + animals[0].img + ")";
            cell.style.backgroundImage = imgPath;
            cell.innerText = animals[0].name;
         } else {
            let imgPath = 'url(images/' + animals[0][c].img + ')';
            cell.style.backgroundImage = imgPath;
            cell.innerText = animals[0][c].name;
        }
        mainGrid.appendChild(cell).className = 'grid-item';
    };*/
};
/* Random number exclude one */
function randomNumber (exclude, max) {
    let randomNumber = 0;
    do {
        randomNumber = Math.floor(Math.random() * (max + 1))
    } while(randomNumber === exclude);
    return randomNumber;
}
/* Function to create array of animals */
function createAnimals(){
    let allDino = [
        new Dino('Anklyosaurus', '1000', '1000','Herbavor', 'anklyosaurus.png',
            ['it eats only vegetables', 'it has an armor', 'it is blue']),
        new Dino('Brachiosaurus', '1000', '1000','Herbavor', 'brachiosaurus.png',
            ['it eats only vegetables', 'it has a long neck', 'it is red']),
        new Dino('Elasmosaurus', '1000', '1000','Herbavor', 'elasmosaurus.png',
            ['it lives in the water', 'it has a long neck', 'it is blue']),
        new Dino('Pteranodon', '1000', '1000','Omnivor', 'pteranodon.png',
            ['it eats everything', 'it can fly', 'it is grey']),
        new Dino('Stegosaurus', '1000', '1000','Herbavor', 'stegosaurus.png',
            ['it eats only vegetables', 'it has an armor', 'it is red']),
        new Dino('Triceratops', '1000', '1000','Herbavor', 'triceratops.png',
            ['it eats only vegetables', 'it has two honrs', 'it is grey']),
        new Dino('Tyrannosaurus rex', '1000', '1000','Carnivor', 'tyrannosaurus-rex.png',
            ['it eats only meat', 'it has big tooth', 'it is red'])
    ];

    let human = new Human(document.getElementById('name').value,
        document.getElementById('height').value,
        document.getElementById('weight').value,
        document.getElementById('diet').value,
        'human.png');

    let pigeon = new Pigeon('Pigeon', '10', '10', 'Herbavor', 'pigeon.png',['All birds are dinosaurs.']);
    let animals = [human, pigeon, allDino];
    return animals;
}

/* Function to randomize the order of the array, taken it from stackoverflow */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




class Animalia {
    constructor(name, height, weight, diet, img, facts= []) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.img = img;
        this.facts = facts;
    }
}
class Human extends Animalia {

}
class Dino extends Animalia {

}
class Pigeon extends Animalia {

}


