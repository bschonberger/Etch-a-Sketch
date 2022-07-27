const defaultSize = 32
const defaultColor = '#000000'
const defaultMode = 'black'
currentSizeBox.style.display = "grid"
currentSizeBox.innerHTML = defaultSize + " x " + defaultSize

let currentMode = defaultMode
let currentSize = defaultSize
let currentColor = defaultColor

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}
function setCurrentSize(newSize) {
    currentSize = newSize

}

function setCurrentColor(newColor){
    currentColor = newColor
}


const black = document.getElementById('black')
const rainbow = document.getElementById('rainbow')
const eraser = document.getElementById('eraser')
const reset = document.getElementById('reset')
const changeGrid = document.getElementById('changeGrid')

black.onclick = () => setCurrentMode('black')
rainbow.onclick = () => setCurrentMode('rainbow')
eraser.onclick = () => setCurrentMode('eraser')
reset.onclick = () => reloadGrid()
changeGrid.onclick = () => showList()

const sixteen = document.getElementById('16')
const thirtytwo = document.getElementById('32')
const sixtyfour = document.getElementById('64')
const input = document.getElementById('input')

sixteen.onclick = () => changeSize(16)
thirtytwo.onclick = () => changeSize(32)
sixtyfour.onclick = () => changeSize(64)

function getInput(){
  var inputVal = document.getElementById("myinput").value;
  if (inputVal > 100){
    alert("input over 100, try again.")
  }
  else{
  changeSize(inputVal)
  }
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value){
    setCurrentSize(value)
    reloadGrid()
    var sizes = document.getElementById('sizes');
    const changeGrid = document.getElementById('changeGrid')
    sizes.style.display = "none";
    currentSizeBox.style.display = "grid"
    currentSizeBox.innerHTML = value + " x " + value
    changeGrid.style.backgroundColor = "white";

}

function showList(){


        if (sizes.style.display == "grid") {
            sizes.style.display = "none";
            currentSizeBox.style.display = "grid"
            changeGrid.style.backgroundColor = "white";
        } else {
            currentSizeBox.style.display = "none"
            sizes.style.display = "grid";
            changeGrid.style.backgroundColor = "orchid";
        }
    }

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid(){
    clearGrid()
    makeGrid(currentSize)
    if (currentMode === 'eraser'){
        setCurrentMode('black')
    }
}

function clearGrid(){
    grid.innerHTML = ''
}

function makeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList.add('grid-element')
      gridElement.addEventListener('mouseover', changeColor)
      gridElement.addEventListener('mousedown', changeColor)
      grid.appendChild(gridElement)
    }
  }

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
        } 
    else if (currentMode === 'black') {
      e.target.style.backgroundColor = currentColor
    } 
    else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
  }

  function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbow.classList.remove('active')
    } else if (currentMode === 'black') {
      black.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraser.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbow.classList.add('active')
    } else if (newMode === 'black') {
      black.classList.add('active')
    } else if (newMode === 'eraser') {
      eraser.classList.add('active')
    }
  }
  
  window.onload = () => {
    makeGrid(defaultSize)
    activateButton(defaultMode)
  }