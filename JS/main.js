window.onload = function () {
    
    //Variable
    var switcher = document.getElementById("switcher"),
        block = document.getElementById("block"),
        time = document.getElementById("time"),
        phrase = document.getElementById("phrase"),
        timeOfDay,
        memoryTimeOfDay,
        plays = true;
    
    // Music
    melody = new Audio();
    melody.src = "/audio/melody.mp3";
    melody.play();
    
    // Phrase(m - morning, d - day, n - night)
    var mPhrase = ["Доброе утро, тебя ждёт великолепный день!",
                   "Сегодня отличное утро, новый день для новых свершений!",
                   "Сегодня именно то утро, за которое ты изменишь что-то к лучшему :)",
                   "Сегодня утренний воздух будет способствовать твоим начинаниям и великим планам, самое время, чтобы начать!",
                   "Наполеон строил грандиозные планы, а ты сегодня сможешь их построить и воплотить, начни именно сегодня!"];
    var dPhrase = ["Добрый день, именно сейчас ты сможешь продолжить свои дела, которые ты не успевал начать!",
                  "До конца дня ещё много времени, ты успеешь воплотить свои идеи, если начнёшь сейчас!",
                  "Сейчас именно тот момент, в который ты должен позвонить друзьям и пообщаться с ними, ведь они этого так ждут :)",
                  "День только начинается! Самое время для активного провождения, стоит сходить на улицу.",
                  "Дни бывают разные, но никогда не забывай про свою мечту. Рисуй своё солнце, грейся!"];
    var nPhrase = ["Многие известные люди уделяли мало времени на сон, <b>чтобы</b> привести себя к успеху. Так что либо иди спать, либо займись делом!",
                  "Многие считают ночь <b>пустым временем</b>, но лишь единицы превращают <b>время</b> в успех.",
                  "Ночь. Время мечтаний и свершений. Время мыслей и рассуждений. Подумай над следующим днем и будь к нему готов.",
                  "Думай о ночи как не о потраченом времени, а как о времени на обдумавании своих планов.",
                  "Ночь неотъемлемая часть жизни, как времена суток так и жизненные случаи. За любым закатом начинается рассвет, не забывай об этом."];
    
    clock(); // Here to quickly start the watch.
    
    // Globalization function
    switcher.onclick = MusicMute;
    
    
    // The memory of music. True and False dont work in localStorage(or i retard).
    if (localStorage.getItem("musicMute") == "Mute") {
        plays = true;
        MusicMute();
    } else if (localStorage.getItem("musicMute") == "NOT Mute" || localStorage.getItem("musicMute") == null) {
        plays = false;
        MusicMute();
    }
    
//    FUNCTION
    
    // Change wallpaper
    function wallpaper() {
        var hoursNow = new Date().getHours();
        if (hoursNow > 5 && hoursNow < 12) {
            switcher.style.filter = "invert(0%)";
            time.style.textShadow = "black 0px 0px 3px";
            document.body.style.backgroundImage = "url(/img/morning.jpg)";
            timeOfDay = "morning";
            refreshPhrase ();
        } else if (hoursNow > 11 && hoursNow < 21) {
            switcher.style.filter = "invert(0%)";
            time.style.textShadow = "black 0px 0px 3px";
            document.body.style.backgroundImage = "url(/img/day.jpg)";
            timeOfDay = "day";
            refreshPhrase ();
        } else {
            switcher.style.filter = "invert(100%)";
            block.style.boxShadow = "0 0 10px RGBA(255,255,255, 0.75)";
            time.style.textShadow = "#787878 0px 0px 5px";
            document.body.style.backgroundImage = "url(/img/night.jpg)";
            timeOfDay = "night";
            refreshPhrase ();
        }
    }
    
    // Watch
    function clock() {
        wallpaper();

        var hoursNow = addNull(new Date().getHours());
        var minsNow = addNull(new Date().getMinutes());
        var secsNow = addNull(new Date().getSeconds());
        var timeNow = hoursNow + ":" + minsNow + ":" + secsNow;
        time.innerHTML = timeNow;
        time.style.color = "#" + hoursNow + minsNow + secsNow;
        setTimeout(clock, 500);
    }
    
    // Refresh Phrase, and fix bug, when Phrase did not change after changing timeOfDays.
    function refreshPhrase (){
        if (timeOfDay != memoryTimeOfDay){
            switch(timeOfDay){
            case "morning":
                phrase.innerHTML = mPhrase[Math.round(Math.random() * (3 - 0 + 1)) + 0];
                memoryTimeOfDay = timeOfDay;
                break;
            case "day":
                phrase.innerHTML = dPhrase[Math.round(Math.random() * (3 - 0 + 1)) + 0];
                memoryTimeOfDay = timeOfDay;
                break;
            case "night":
                phrase.innerHTML = nPhrase[Math.round(Math.random() * (3 - 0 + 1)) + 0];
                memoryTimeOfDay = timeOfDay;
                break;
            }
        }    
    }
    
    // Mute and unmute music
    function MusicMute() {
        if (plays == true) {
            plays = false;
            melody.volume = 0;
            switcher.style.background = "url(/img/mute.svg)";
            localStorage.setItem("musicMute", "Mute") // True or False dont work.
        } else {
            plays = true;
            melody.volume = 0.5;
            switcher.style.background = "url(/img/unmute.svg)";
            localStorage.setItem("musicMute", "NOT Mute") // True or False dont work.
        }
    }
    
    // Add "0"  to numbers from 0 to 9
    function addNull(times) {
        if (times <= 9) {
            return "0" + times;
        } else {
            return times;
        }
    }
    
    // Looped music
    melody.onended = function () {
        melody.play();
    }
}