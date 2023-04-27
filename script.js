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

addBlackBackground = function (element) {
    let rgbaValues = [0,0,0,1];
    element.style.cssText = `background-color: rgba(${rgbaValues})`;
};

addRandomBackground = function (element) {
    let rgbaValues = [0,0,0,0]
    rgbaValues = rgbaValues.map((value) => value = Math.floor(Math.random() * 256));
    rgbaValues[3] = 1;
    element.style.cssText = `background-color: rgba(${rgbaValues})`;
};

reduceBackgroundOpacity = function (element) {
    let cssString = element.style.cssText;
    if (cssString === "") {
        cssString = "background-color: rgba(255, 255, 255, 1);";
    } else if (cssString.includes("background-color: rgb(")) {
        cssString = element.style.cssText.replace("background-color: rgb(","background-color: rgba(");
        cssString = element.style.cssText.replace(")", ", 1)");
    }
    const rgbaString = cssString.slice(23,-2);
    const rgbaArray = rgbaString.split(",");
    let rgbaArrayNew = rgbaArray;
    rgbaArrayNew[3] = rgbaArrayNew[3] - 0.1;
    rgbaStringNew = rgbaArrayNew.join();
    element.style.cssText = cssString.replace(rgbaString,rgbaStringNew);

    console.log(element.style.cssText);
}

function createCanvas(dimensions) {
    deleteRowsAndItemsAll();
    addRows(dimensions);
    addItems(dimensions);

    const canvasItems = Array.from(document.querySelectorAll('.canvasItem'));
    canvasItems.forEach((canvasItem) => {
        canvasItem.addEventListener('mouseover', () => addBlackBackground(canvasItem));
    })
}

createCanvas(100);

function promptCreateCanvas() {
    dimensions = prompt("How many rows and columns do you want?")
    while (!(dimensions >= 2 && dimensions <= 100)) {
        dimensions = prompt("Please choose a number from 2 to 100.");
    }
    createCanvas(dimensions);
}

function addHoverEventToItems(fn) {
    let canvasItems = Array.from(document.querySelectorAll('.canvasItem'));
    canvasItems.forEach((canvasItem) => {
        canvasItem.replaceWith(canvasItem.cloneNode(true));
    })
    canvasItems = Array.from(document.querySelectorAll('.canvasItem'));
    canvasItems.forEach((canvasItem) => {
        canvasItem.addEventListener('mouseover', () => fn(canvasItem));
    })
}

function useBlackPen() {
    addHoverEventToItems(addBlackBackground);
}

function useRainbowPen() {
    addHoverEventToItems(addRandomBackground);
}

function useSoftBrush() {
    addHoverEventToItems(reduceBackgroundOpacity);
}

const buttonCreateCanvas = document.getElementById('createCanvas');
buttonCreateCanvas.addEventListener('click', () => {promptCreateCanvas()});

const buttonBlackPen = document.getElementById('blackPen');
buttonBlackPen.addEventListener('click', () => useBlackPen());

const buttonRainbowPen = document.getElementById('rainbowPen');
buttonRainbowPen.addEventListener('click', () => useRainbowPen())

const buttonSoftBrush = document.getElementById('softBrush');
buttonSoftBrush.addEventListener('click', () => useSoftBrush());