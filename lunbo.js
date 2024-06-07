/*Honorary Production by Yakecan*/ 
let currentIndex = 0;  
const items = document.querySelectorAll('.carousel-item');  
const itemCount = items.length;  
const prevBtn = document.getElementById('prev');  
const nextBtn = document.getElementById('next');  
  
function showItem(index) {  
  items.forEach((item, i) => {  
    if (i === index) {  
      item.classList.add('active');  
    } else {  
      item.classList.remove('active');  
    }  
  });  
}  
  
function nextItem() {  
  currentIndex = (currentIndex + 1) % itemCount;  
  showItem(currentIndex);  
}  
  
function prevItem() {  
  currentIndex = (currentIndex - 1 + itemCount) % itemCount;  
  showItem(currentIndex);  
}  
  
prevBtn.addEventListener('click', prevItem);  
nextBtn.addEventListener('click', nextItem);

setInterval(nextItem, 3000);