//return {top,left} coordinates of element
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
//return rMax
function getMax() {
    target = document.getElementById("target");
    cord = getCoords(target);
    r0 = Math.sqrt(cord.top ** 2 + cord.left ** 2);
    r1 = Math.sqrt(
        (document.documentElement.clientWidth - cord.left) ** 2 + cord.left ** 2
    );
    r2 = Math.sqrt(
        cord.top ** 2 + (document.documentElement.clientHeight - cord.top) ** 2
    );
    r3 = Math.sqrt(
        (document.documentElement.clientWidth - cord.left) ** 2 +
        (document.documentElement.clientHeight - cord.top) ** 2
    );
    rMax = Math.max(r0, r1, r2, r3);
    return Math.round(rMax);
}
let rCur;
let tick;
let oldx = 0;
let oldy = 0;
let msg = new SpeechSynthesisUtterance("поиск");
msg.rate = 1;
audio = new Audio('tick.mp3')
max = getMax();

addEventListener("mousemove", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    cord = getCoords(target);
    if (Math.abs(oldx - x) > 100 || Math.abs(oldy - y) > 100) {
        rCur = (cord["left"] - x) ** 2 + (cord.top - y) ** 2;

        param = Math.round(rCur / max);
        console.log(param);
        console.log(x, y);
        //console.log(rCurdop, "curdop");

        clearInterval(tick);
        //audio.play()
        tick = setInterval(() => audio.play(), param);
        oldx = x;
        oldy = y;
    }


});
target.addEventListener("mouseenter", (e) => {
    speechSynthesis.speak(msg);
});
addEventListener("mouseout", (e) => {
    clearInterval(tick);
})
//vr = setInterval(() => console.log(rCur),param);
//let vr = setInterval(() => console.log(rCur),2000);