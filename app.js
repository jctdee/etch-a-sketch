// LOAD DEFAULT VALUES
window.onload = () => {
  gridRangeLabel.innerHTML = `${gridRangeSlider.value} x ${gridRangeSlider.value}`;
  setDefaultMode();
  createSketchGrid(gridRangeSlider.value);
  assignCellListeners();
}
// END OF LOADING OF DEFAULT VALUES -->

// <-- START OF VARIABLE DECLARTIONS HERE
sketchContainer = document.getElementById('sketch-container');
gridRangeSlider = document.getElementById('grid-range');
gridRangeLabel = document.getElementById('grid-range-label');
parentCell = document.getElementById('sketch-container');
gridCell = parentCell.children;
clearButton = document.getElementById('clear-button');
let mouseDown = false;

// ASSIGN COLOR PICKER VALUE AND FUNCTION HERE
let currentColor = '';
colorInput = document.getElementById('color-picker');
colorInput.addEventListener('input', colorChange);
function colorChange(e) {
  currentColor = this.value;
}

// ASSIGN BUTTONS HERE
let currentMode = "";
let modeList = document.querySelectorAll('.mode');
try {
  modeList.forEach(mdl => {
    mdl.addEventListener('click', setActiveBtn);
  })
} catch(err) {
  console.log(err);
}
// END OF VARIABLE DECLARATIONS HERE -->

// <-- START OF FUNCTION TO RESET THE GRID
clearButton.addEventListener('click', clearGrid);

function clearGrid() {
  try {
  Array.from(gridCell).forEach(cell => {
    cell.style.background = 'white';
  })
  } catch(err) {
    console.log(err);
  }
}
// --> END OF FUNCTION TO RESET THE GRID

// <-- START OF FUNCTION TO RESET GRID
function resetGrid() {
  try {
    sketchContainer.innerHTML = "";
  } catch(err) {
    console.log(err);
  }
}

// <-- START OF CLEARING EVENT LISTENERS
function clearListeners() {
  try {
    Array.from(gridCell).forEach(cell => {
      cell.removeEventListener('drag', fillCell);
    })
  } catch (err) {
    console.log(err);
  }
}

// <-- START OF FUNCTION TO FILL CELLS WITH COLOR
function fillCell(e) {
  if(e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'color') {
    this.style.background = `${currentColor}`;
  } else if (currentMode === 'rainbow') {
    this.style.background = `rgb(${randomRGB()})`;
  } else if (currentMode === 'eraser') {
    this.style.background = 'white';
  }
}
// END OF FUNCTION FILL CELLS WITH COLOR -->

// <-- START OF RANDOM RGB GENERATOR
function randomInteger() {
  return Math.floor(Math.random() * 256);
}

function randomRGB() {
  let r = randomInteger();
  let g = randomInteger();
  let b = randomInteger();
  return `${r},${g},${b}`; 
}
//  END OF RANDOM RGB GENERATOR -->

// <-- REASSIGN THE EVENT LISTENERES HERE
function assignCellListeners() {
  try {
    Array.from(gridCell).forEach(cell => {
      cell.addEventListener('mousedown', fillCell);
      cell.addEventListener('mousedown', changeMouseStatus);
      cell.addEventListener('mouseup', changeMouseStatus);
      // cell.addEventListener('mouseout', changeMouseStatus);
      cell.addEventListener('mouseover', fillCell);
    })
  } catch (err) {
    console.log(err);
  }
}
function changeMouseStatus(e) {
  mouseDown = !mouseDown;
  // if(e.type === 'mousedown') {
  //   try {
  //     Array.from(gridCell).forEach(cell => {
  //       cell.addEventListener('mouseleave', function() {
  //         mouseDown = !mouseDown;
  //       })
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
// END OF REASSIGNING EVENT LISTENERS HERE -->

// <-- START OF GRID RANGE SLIDER ONCHANGE HERE
gridRangeSlider.addEventListener('change', gridChange = (e) => {
  try {
    gridRangeLabel.innerHTML = `${e.target.value} x ${e.target.value}`;
    clearListeners();
    resetGrid();
    createSketchGrid(e.target.value);
    assignCellListeners();
  } catch(err) {
    console.log(err);
  }
});
//  END OF GRID RANGE SLIDER ONCHANGE HERE -->

// <--START OF CREATE SKETCH GRID HERE
function createSketchGrid(cells) {
  const gridSize = Math.pow(cells,2);
  sketchContainer.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${cells}, 1fr)`;
  for(let i = 0; i < gridSize; i++){
    try {
      const gridChild = document.createElement('div');
      gridChild.className = 'sketch-cell';
      sketchContainer.appendChild(gridChild);
    } catch (err) {
      console.log(err);
    }
  }
}
// END OF SKETCH GRID HERE -->

// <-- START OF ASSIGNING ACTIVE BUTTON HERE
function setActiveBtn(e) {
  modeList.forEach(mdl => {
    mdl.removeAttribute('class');
  });
  this.setAttribute('class', 'active');
  
  switch(this.id) {
   case 'color-mode':
      currentMode = 'color';
      break;
    case 'rainbow-mode':
      currentMode = 'rainbow';
      break;
    case 'eraser-mode':
      currentMode = 'eraser';
      break;
    default:
      throw error;
  }
  console.log(currentMode);
}
// END OF ASSINGING ACTIVE BUTTON HERE -->

// <-- ASSIGN DEFAULT BUTTON AND MODE HERE
function setDefaultMode() {
  currentColor = 'black';
  currentMode = 'color';
  const colorBtn = document.getElementById('color-mode');
  colorBtn.setAttribute('class', 'active');
}