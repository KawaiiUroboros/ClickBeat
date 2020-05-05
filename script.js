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
let msg = new SpeechSynthesisUtterance(target.textContent);
msg.rate = 1;
msg.lang = 'ru-RU';
main = document.getElementById('app');
audio = new Audio('tick.mp3');
inn = new Audio('in.mp3');
out = new Audio('out.mp3');
inn.volume = 0.3;
out.volume = 0.3;
inn.playbackRate = 2;
out.playbackRate = 2;
complete = new Audio('complete.mp3');
complete.volume = 0.03;
audio.volume = 0.3;
let countT = 0;
let countTY = 0;
let inTarget = false;
complete.playbackRate = 3;
max = getMax();
let inDoc = false;
main.addEventListener("mousemove", (e) => {
    x = e.pageX;
    y = e.pageY;
    if ((Math.abs(oldx - x) > 5 || Math.abs(oldy - y) > 5 || inDoc) && !inTarget) {
        countT += 1;
        countTY += 1;
        console.log(countT, "counT")
        cord = getCoords(target);
        rCur = (cord["left"] - x) ** 2 + (cord.top - y) ** 2;
        param = Math.round(rCur * 35 / max);
        if (param > 60 && param < 500 && countTY >= 15) {
            audio.play();
            countTY = 0;
            console.log("mew500")
        } else if (param < 1100 && countT >= 3) {
            countT = 0;
            console.log("mew1100")
            audio.play();
        }
        console.log(cord, "cord")
        console.log(param, 'param');
        console.log(x, y, 'x y');
        //console.log(rCurdop, "curdop");
        clearInterval(tick);
        //audio.play()
        tick = setInterval(() => audio.play(), param);
        oldx = x;
        oldy = y;
        inDoc = false;
    }
});
main.addEventListener("mouseenter", (e) => {
    clearInterval(tick);
    inn.play();
    console.log("mew");
    inDoc = true;
});
target.addEventListener("mouseenter", (e) => {
    inTarget = true;
    clearInterval(tick);
    complete.play();
    speechSynthesis.speak(msg);
});
target.addEventListener("mouseover", (e) => {
    inTarget = true;
    clearInterval(tick);

});
target.addEventListener("mouseout", (e) => {
    clearInterval(tick);
    inTarget = false;
    speechSynthesis.cancel();
    inDoc = true;
})
main.addEventListener("mouseleave", (e) => {
    out.play();
    clearInterval(tick);
})
//vr = setInterval(() => console.log(rCur),param);
//let vr = setInterval(() => console.log(rCur),2000);