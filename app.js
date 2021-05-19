/* the main tag */
const mainGrid = document.getElementById('grid');

/* the main function, it runs when the button si clicked */
function showGrid() {
    /* First clear the old grid, then create new grid */
    document.getElementById('grid').innerHTML = '';

    /* the form is hidden, the button remain visible as it is not part of the form. In this way the user can generate
    * new grids n time */
    document.getElementById('mainForm').style.display = 'none';

    /* create array of animals: human, pigeon and dinos (dinos are all in one array) */
    let animals = createAnimals();

    /* randomize the order dinos */
    animals[2] = shuffle(animals[2]);

    /* create rows with images and descriptions */
    makeRows(3, 3, animals);
}

/* Function to create cells. For every cell insert a object human, pigeon or dino
* function found on stackoverflow und changed for our purpose */
function makeRows(rows, cols, animals) {
    mainGrid.style.setProperty('--grid-rows', rows);
    mainGrid.style.setProperty('--grid-cols', cols);

    /* it will contain a random fact of a dino */
    let allDinoRandomFact = '';

    /* set the random position of pigeon */
    let pigeonPosition = randomNumber(4, 8);

    /* create cells  */
    for (c = 0; c < (rows * cols); c++) {

        /* main div of the cell. It contains the div with the image and a paragraph with the
        description (random fact)  */
        /*let mainCell = document.createElement('div');*/

        /* contain the image as background and the description */
        let cell = document.createElement('div');

        /* contain the description (name for human, facts for pigeon and dino) */
        let paragraph = document.createElement('p');
        let description;

        /* image path, the variable is used to clearly read the code */
        let imgPath;

        /* check if the new cell is for the pigeon. In this way we set the pigeon position befor all the others
         are used. In this way if we have more than 7 dinos and , we are sure that pigeon will always been displayed*/
        if(c === pigeonPosition){

            /* pigeon is an object, it has a "facts" parameter which is an array, this array can contain x facts.
            In this case the pigeon has only one fact, so facts[0] */
            description = document.createTextNode(animals[1].name + '\n' + animals[1].facts[0]);

            /* we take the image path of pigeon */
            imgPath = "url(images/" + animals[1].img + ")";

            /* we set the background of the cell */
            cell.style.backgroundImage = imgPath;
        } else if (c === 4) {
            /* If the new cell is the number 4, this mean it is the cell in the center
            (0-8 cells and 4 is in the middle), than we show human */
            /* we take the name */
            description = document.createTextNode(animals[0].name);
            imgPath = "url(images/" + animals[0].img + ")";
            cell.style.backgroundImage = imgPath;
        } else {
            /* if the cell is not for the pigeon or human, then we show dino */

            /* we take randomly a fact of the first dino (dinos are already randomized,
            every time the button is clicked) */
            allDinoRandomFact = animals[2][0].facts[randomNumber(-1,2)];

            /* we take always the first dino image and facts from the randomized array,
            later we will remove the inserted dino */
            description = document.createTextNode(animals[2][0].name + '\n' + allDinoRandomFact);
            imgPath = "url(images/" + animals[2][0].img + ")";
            cell.style.backgroundImage = imgPath;

           /* remove inserted dino. Remove the first element of the array that contains all dino,
           the array is randomized, everytime we
           * insert a dino in a cell, we remove it from the array, in this way will not be duplicates*/
            animals[2].shift();
        }

        /* append the description in the paragraph */
        paragraph.appendChild(description);

        /* append the cell(image) to the main cell */
        /*mainCell.appendChild(cell);*/

        /* append the paragraph (name, description, facts) to the cell */
        cell.appendChild(paragraph);

        /* append the cell to the main grid */
        mainGrid.appendChild(cell).className = "grid-item";
    };
};

/* Random number with possibility to exclude one number, in this case we esclude 4 as it is the cell in teh center */
function randomNumber (exclude, max) {
    /* the random number */
    let randomNumber;
    do {
        /* generate the random number */
        randomNumber = Math.floor(Math.random() * (max + 1))
    } while(randomNumber === exclude); /* if the number equals the number to exclude,
    then regenerate again until the valid number */
    /* return the random number */
    return randomNumber;
}

/* Function to create array of animals */
function createAnimals(){
    /* we create dinos with it's values */
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
    /* we create human, we take his values from the FORM and insert them */
    let human = new Human(document.getElementById('name').value,
        document.getElementById('height').value,
        document.getElementById('weight').value,
        document.getElementById('diet').value,
        'human.png');

    /* we create pigeon  */
    let pigeon = new Pigeon('Pigeon', '10', '10', 'Herbavor', 'pigeon.png',['All birds are dinosaurs.']);

    /* we return an array with the animals */
    return [human, pigeon, allDino];
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



/* animalia class, we extends it to other child classes */
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

/* we can create parameters and methods for a specific sp */
class Human extends Animalia {

}
class Dino extends Animalia {

}
class Pigeon extends Animalia {

}


