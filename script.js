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

function createCanvas(dimensions) {
    addRows(dimensions);
    addItems(dimensions);
}

createCanvas(16);