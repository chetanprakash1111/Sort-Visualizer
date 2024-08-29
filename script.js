 const bubbleSortBtn = document.getElementById('bubble-sort-btn');
  const heapSortBtn = document.getElementById('heap-sort-btn');


// Generate an array of random numbers
function generateArray(size, min, max) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return arr;
}

// Reset the array and display it
function resetArray() {
  const barContainer = document.querySelector('.bar-container');
  barContainer.innerHTML = '';
  
  const array = generateArray(10, 10, 300);
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${array[i]}px`;
    bar.style.width = "40px";
    bar.textContent = array[i];
    barContainer.appendChild(bar);
  }
}

// Swap two bars in the DOM
function swapBars(bar1, bar2) {
  const tempHeight = bar1.style.height;
  const tempText = bar1.textContent;
  bar1.style.height = bar2.style.height;
  bar1.textContent = bar2.textContent;
  bar2.style.height = tempHeight;
  bar2.textContent = tempText;
}

// Bubble Sort
async function bubbleSort() {

  heapSortBtn.disabled = true;
  const bars = document.querySelectorAll('.bar');
  const n = bars.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const bar1 = bars[j];
      const bar2 = bars[j + 1];
      
      // Visualize comparison
      bar1.style.backgroundColor = 'red';
      bar2.style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const height1 = parseInt(bar1.style.height, 10);
      const height2 = parseInt(bar2.style.height, 10);
      
      if (height1 > height2) {
        // Swap bars
        swapBars(bar1, bar2);
      }
      
      // Reset color
      bar1.style.backgroundColor = '#007bff';
      bar2.style.backgroundColor = '#007bff';
    }
  }

   heapSortBtn.disabled = false;
}

// Merge Sort
async function mergeSort() {
  const bars = document.querySelectorAll('.bar');
  const array = Array.from(bars).map(bar => parseInt(bar.style.height, 10));
  
  await performMergeSort(array, 0, array.length - 1, bars);
}

async function performMergeSort(array, low, high, bars) {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);
    
    await performMergeSort(array, low, mid, bars);
    await performMergeSort(array, mid + 1, high, bars);
    
    await merge(array, low, mid, high, bars);
  }
}

async function merge(array, low, mid, high, bars) {
  const leftArray = array.slice(low, mid + 1);
  const rightArray = array.slice(mid + 1, high + 1);
  
  let i = 0;
  let j = 0;
  let k = low;
  
  while (i < leftArray.length && j < rightArray.length) {
    const leftBar = bars[k];
    const rightBar = bars[mid + 1 + j];
    
    // Visualize comparison
    leftBar.style.backgroundColor = 'red';
    rightBar.style.backgroundColor = 'red';
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const leftHeight = leftArray[i];
    const rightHeight = rightArray[j];
    
    if (leftHeight <= rightHeight) {
      array[k] = leftHeight;
      leftBar.style.height = `${leftHeight}px`;
      leftBar.textContent = leftHeight;
      i++;
    } else {
      array[k] = rightHeight;
      rightBar.style.height = `${rightHeight}px`;
      rightBar.textContent = rightHeight;
      j++;
    }
    
    // Reset color
    leftBar.style.backgroundColor = '#007bff';
    rightBar.style.backgroundColor = '#007bff';
    
    k++;
  }
  
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    bars[k].style.height = `${leftArray[i]}px`;
    bars[k].textContent = leftArray[i];
    
    i++;
    k++;
  }
  
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    bars[k].style.height = `${rightArray[j]}px`;
    bars[k].textContent = rightArray[j];
    
    j++;
    k++;
  }
}

      
// Heap Sort
async function heapSort() {
  bubbleSortBtn.disabled = true;
  
  const bars = document.querySelectorAll('.bar');
  const n = bars.length;
  
  // Heapify the array
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(bars, n, i);
  }
  
  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    swapBars(bars[0], bars[i]);
    
    // Heapify the reduced heap
    await heapify(bars, i, 0);
  }
}

// Heapify the array
async function heapify(bars, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && parseInt(bars[left].style.height, 10) > parseInt(bars[largest].style.height, 10)) {
    largest = left;
  }
  
  if (right < n && parseInt(bars[right].style.height, 10) > parseInt(bars[largest].style.height, 10)) {
    largest = right;
  }
  
  if (largest !== i) {
    // Visualize comparison
    bars[i].style.backgroundColor = 'red';
    bars[largest].style.backgroundColor = 'red';
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Swap bars
    swapBars(bars[i], bars[largest]);
    
    // Reset color
    bars[i].style.backgroundColor = '#007bff';
    bars[largest].style.backgroundColor = '#007bff';
    
    // Heapify the affected sub-tree
    await heapify(bars, n, largest);
  }

   bubbleSortBtn.disabled = false;
}

// Initial array generation
resetArray();
