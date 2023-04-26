const canvas = document.getElementById('canvas');

function addRow() {
    const canvasRow = document.createElement('div');
    canvasRow.classList.add('canvasRow');
    canvas.appendChild(canvasRow);
}

function addRows(rows) {
    for (i = 0; i < rows; i++) {
        addRow();
    }
}

function createItem() {
    const canvasItem = document.createElement('div');
    canvasItem.classList.add('canvasItem');
    return canvasItem;
} 

function addItems(items) {
    const canvasRows = Array.from(document.querySelectorAll('.canvasRow'));
    canvasRows.forEach((canvasRow) => {
        for (i = 0; i < items; i++) {
            canvasRow.appendChild(createItem());
        }
    })
}

function deleteRowsAndItemsAll() {
    const canvasRows = Array.from(document.querySelectorAll('.canvasRow'));
    canvasRows.forEach((canvasRow) => {
        canvasRow.remove();
    })
}

function addDrawnClass(element) {
    element.classList.add('drawn');
}

function createCanvas() {
    dimensions = prompt("How many rows and columns do you want?")
    while (!(dimensions >= 2 && dimensions <= 100)) {
        dimensions = prompt("Please choose a number from 2 to 100.")
    }
    deleteRowsAndItemsAll();
    addRows(dimensions);
    addItems(dimensions);

    const canvasItems = Array.from(document.querySelectorAll('.canvasItem'));
    canvasItems.forEach((canvasItem) => {
        canvasItem.addEventListener('mouseover', () => addDrawnClass(canvasItem));
    })
}

const buttonCreateCanvas = document.getElementById('createCanvas');
buttonCreateCanvas.addEventListener('click', () => {createCanvas()});

