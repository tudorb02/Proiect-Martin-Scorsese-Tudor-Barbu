// Crearea butonului pentru test
const testButton = document.createElement('button');
testButton.textContent = "Start Test";
testButton.classList.add('start-test-button'); 
document.body.appendChild(testButton);  

// Logica pentru butonul "Start Test"
testButton.addEventListener('click', () => {
    // Ascunderea butonului inițial
    testButton.style.display = 'none';

    // Crearea butoanelor "Da" și "Nu"
    const yesButton = document.createElement('button');
    yesButton.textContent = "Da";
    yesButton.classList.add('yes-button');

    const noButton = document.createElement('button');
    noButton.textContent = "Nu";
    noButton.classList.add('no-button');

    // Crearea unui container pentru butoane
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    document.body.appendChild(buttonContainer); 

    // Stilizare pentru poziționare inițială
    yesButton.style.position = 'relative';
    noButton.style.position = 'absolute';
    noButton.style.left = `${yesButton.offsetLeft + yesButton.offsetWidth + 10}px`; 
    noButton.style.top = `${yesButton.offsetTop}px`;

    noButton.style.transition = 'transform 0.5s ease';

    // Logica pentru butonul "Da"
    yesButton.addEventListener('click', () => {
        buttonContainer.remove();

        const testContainer = document.createElement('div');
        testContainer.id = 'test-container';
        testContainer.classList.add('test-container');

        const questions = [
            "Care este filmul tău preferat regizat de Martin Scorsese?",
            "Ce an consideri că a fost cel mai prolific pentru Scorsese?",
            "Care este actorul preferat al lui Martin Scorsese în filmele sale?",
            "Care este genul de filme regizate de Scorsese pe care le preferi?",
            "Ce colaborare a lui Scorsese consideri că a avut cel mai mare impact?",
        ];

        const form = document.createElement('form');

        questions.forEach((question, index) => {
            const questionLabel = document.createElement('label');
            questionLabel.textContent = question;
            questionLabel.classList.add('question-label');

            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerInput.name = `question${index + 1}`;
            answerInput.classList.add('answer-input');

            form.appendChild(questionLabel);
            form.appendChild(answerInput);
        });

        // Adăugarea întrebării cu răspunsuri multiple
        const multiQuestionLabel = document.createElement('label');
        multiQuestionLabel.textContent = "În ce an s-a născut regizorul?";
        multiQuestionLabel.classList.add('question-label');

        const options = ["1935", "1942", "1950", "1960"];
        const correctAnswer = "1942";

        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');

        options.forEach((option) => {
            const optionWrapper = document.createElement('div');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'birthYear';
            optionInput.value = option;
            optionInput.classList.add('option-input');

            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;
            optionLabel.classList.add('option-label');

            optionWrapper.appendChild(optionInput);
            optionWrapper.appendChild(optionLabel);
            optionContainer.appendChild(optionWrapper);
        });

        form.appendChild(multiQuestionLabel);
        form.appendChild(optionContainer);

        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = 'Salvează răspunsurile';
        saveButton.classList.add('save-button');

        saveButton.addEventListener('click', () => {
            const answers = {};
            form.querySelectorAll('input[type="text"]').forEach((input) => {
                answers[input.name] = input.value;
            });

            const selectedOption = form.querySelector('input[name="birthYear"]:checked');
            if (selectedOption) {
                answers.birthYear = selectedOption.value;
                if (selectedOption.value === correctAnswer) {
                    alert('Răspuns corect pentru întrebarea despre anul nașterii!');
                } else {
                    alert('Răspuns greșit pentru întrebarea despre anul nașterii.');
                }
            } else {
                alert('Nu ai selectat un răspuns pentru întrebarea despre anul nașterii.');
            }

            localStorage.setItem('testAnswers', JSON.stringify(answers));
            alert('Răspunsurile au fost salvate!');

            const closeButton = document.createElement('button');
            closeButton.textContent = "Închide";
            closeButton.classList.add('close-button');

            closeButton.addEventListener('click', () => {
                testContainer.remove();
                testButton.style.display = 'block';
            });

            testContainer.appendChild(closeButton);
        });

        testContainer.appendChild(form);
        testContainer.appendChild(saveButton);
        document.body.appendChild(testContainer);
    });

    // Logica pentru butonul "Nu"
    noButton.addEventListener('mouseover', () => {
        const randomY = Math.random() > 0.5 
            ? Math.floor(Math.random() * 101) * -1 
            : Math.floor(Math.random() * 11);     

        noButton.style.transform = `translateY(${randomY}px)`;
    });
});
