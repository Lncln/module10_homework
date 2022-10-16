let button = document.querySelector('button');
button.addEventListener('click', getData);
function getData(){
    let width = window.screen.width;
    let height = window.screen.height;
    alert(width + 'x' + height);
    // console.log(window.innerWidth + 'x' + window.innerHeight);
}