// From
const nameInput = document.querySelector('#name-input');
const addBtn = document.querySelector('.add');

// Liste mit Teilnehmern
const listWrapper = document.querySelector('.list-wrapper');

// Resultat
const resultName = document.querySelector('.result h2');
const message = document.querySelector('.result h3');
const restartBtn = document.querySelector('.restart');

// verschiedene Variablen
const names = [];
const buttons = [];
let gameover = false;

// Event um die Teilnehmer anzufügen
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Es wird geprüft, dass das Inputfeld nicht leer ist.
    if(nameInput.value === ''){
        return;
    }else{
        listWrapper.innerHTML = '';
        message.innerHTML = '';
        names.push(nameInput.value.trim());
        const ul = document.createElement('ul');
        names.forEach(name => {
            listWrapper.innerHTML = '';
            const button = document.createElement('button');
            button.innerHTML = name;
            buttons.push(button);
            button.addEventListener('click', () => {
                // Es wird geprüft ob es mehr als ein Teilnehmer gibt.
                if(buttons.length > 1){
                    let num = 10;   
                    const myself = name;
                    const position = names.indexOf(myself);
                    buttons.forEach(button => button.disabled = true);
                    // Hier wird geprüft ob die Person bereits gezogen wurde oder nicht.
                    if(position !== -1){
                        // Wurde die Person noch nicht gezogen, wird sie hier kurz aus dem Array
                        // genommen um zu versichern, dass sie sich nicht selbst ziehen kann.
                        names.splice(position, 1);
                        const random = Math.floor(Math.random() * names.length);
                        resultName.innerHTML = names[random];
                        names.splice(random, 1);
                        // Hier wird die Person wieder ins Array eingefügt.
                        names.push(myself);
                    }else{
                        const random = Math.floor(Math.random() * names.length);
                        resultName.innerHTML = names[random];
                        names.splice(random, 1);
                    }
                    const count = setInterval(() => {
                        message.innerHTML = `Du hast <span>${num}</span> Sekunden um dir den Namen zu merken`;
                        num--;
                    }, 1000)
                    
                    // Der Name soll 10 Sekunden angezeigt werden
                    setTimeout(() => {
                        resultName.innerHTML = '';
                        message.innerHTML = '';
                        clearInterval(count);
                        buttons.forEach(button => {
                            button.disabled = false;
                        })
                        // Sind alle Teilnehmer an der Reihe gewesen, wird das Spiel auf
                        // Gameover gesetzt.
                        if(names.length === 0){
                            gameover = true;
                            if(gameover){
                                addBtn.disabled = true;
                            }
                            setTimeout(() => {
                                message.innerHTML = 'Alle sind vergeben.';
                                restartBtn.style.display = 'block';
                            }, 500)
                        }
                    }, 11000)
                    button.classList.add('fade');
                }else{
                    message.innerHTML = 'Es müssen mindestens 2 Wichtel vorhanden sein.';
                    names.splice(0, names.length);
                    buttons.splice(0, buttons.length);
                    resultName.innerHTML = '';
                    listWrapper.innerHTML = '';
                }
            })
            ul.append(button);
        })
        listWrapper.append(ul);
    }
    nameInput.value = '';
    nameInput.focus();
    console.log(names);
});

// Der Neustart-Button bewirkt einen reload der Seite.
restartBtn.addEventListener('click', () => {
    window.location.reload();
});

