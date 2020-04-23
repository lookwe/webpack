const h2 = document.querySelectorAll('.content section div h2');
const length = h2.length;
setInterval(() => {
   for (let i = 0; i<length; i++) {
     h2[i].innerHTML = new Date().toLocaleString();
   }
}, 1000);


console.log(document.querySelector('audio'));


