let areas = {
  a: null,
  b: null,
  c: null
}

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', dragstart);
  item.addEventListener('dragend', dragend);
})

document.querySelectorAll('.area').forEach(area => {
  area.addEventListener('dragover', dragover)
  area.addEventListener('dragleave', dragleave)
  area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragoverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragleaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)


function dragstart(e) {
  e.currentTarget.classList.add('dragging');
}

function dragend(e) {
  e.currentTarget.classList.remove('dragging');
}

function dragover(e) {
  if (e.currentTarget.querySelector('.item') === null) {
    e.preventDefault();
    e.currentTarget.classList.add("hover");
  }

  // console.log("Entrou")
}

function dragleave(e) {
  e.currentTarget.classList.remove("hover");
  // console.log("Saiu")
}

function drop(e) {
  // console.log("Deixou")
  e.currentTarget.classList.remove("hover");

  if (e.currentTarget.querySelector('.item') === null) {
    let draggingItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(draggingItem);
    updateAreas();
  }
}

function dragoverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
}

function dragleaveNeutral(e) {
  e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
  e.currentTarget.classList.remove("hover");

  let draggingItem = document.querySelector('.item.dragging');
  e.currentTarget.appendChild(draggingItem);
  updateAreas();

}

function updateAreas() {
  document.querySelectorAll('.area').forEach(area => {
    let name = area.getAttribute('data-name');

    if (area.querySelector('.item') !== null) {
      areas[name] = area.querySelector('.item').innerHTML;
    } else {
      areas[name] = null;
    }
  });

  if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
    document.querySelector('.areas').classList.add('correct');
  } else {
    document.querySelector('.areas').classList.remove('correct');
  }
}