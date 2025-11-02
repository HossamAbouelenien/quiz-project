const questions = [
  { text: 'What is programming?', options: ['Writing stories for computers', 'Writing instructions for a computer to perform tasks', 'Designing computer hardware', 'Typing random codes'], correct: 'Writing instructions for a computer to perform tasks' },
  { text: 'What is an algorithm?', options: ['A computer virus', 'A programming language', 'A step-by-step procedure to solve a problem', 'A type of hardware'], correct: 'A step-by-step procedure to solve a problem' },
  { text: 'Which language runs in a web browser?', options: ['Python', 'C', 'Java', 'JavaScript'], correct: 'JavaScript' },
  { text: 'What is a variable?', options: ['A fixed value that never changes', 'A location in memory to store data', 'A part of the CPU', 'A programming bug'], correct: 'A location in memory to store data' },
  { text: 'What is debugging?', options: ['Creating new programs', 'Finding and fixing errors in a program', 'Deleting old files', 'Installing software'], correct: 'Finding and fixing errors in a program' },
  { text: 'HTML stands for?', options: ['HyperText Markup Language', 'HighText Machine Language', 'None', 'HyperTransfer Main Language'], correct: 'HyperText Markup Language' },
  { text: 'CSS is used for?', options: ['Structure', 'Styling', 'Logic', 'Database'], correct: 'Styling' },
  { text: 'Angular is a?', options: ['Library', 'Framework', 'Language', 'Tool'], correct: 'Framework' },
  { text: 'In JS, == means?', options: ['Strict compare', 'Loose compare', 'Assign', 'None'], correct: 'Loose compare' },
  { text: 'Frontend means?', options: ['Server side', 'Client side', 'Database', 'Hardware'], correct: 'Client side' }
];

let currentIndex = 0;
const marked = new Set();
const answers = {}; 
function loadQuestion(index) {
  const q = questions[index];
  document.getElementById('questionNumber').textContent = `Question ${index + 1}`;
  document.getElementById('questionText').textContent = q.text;

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const inputId = `q${index}_opt${i}`;
    const div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = `
      <input type="radio" name="q${index}" id="${inputId}" value="${opt}">
      <label for="${inputId}">${opt}</label>
    `;

    
    if (answers[index] === opt) {
      div.querySelector('input').checked = true;
    }

   
    div.querySelector('input').addEventListener('change', (e) => {
      answers[index] = e.target.value;
    });

    container.appendChild(div);
  });
}

function nextQ() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
}

function prevQ() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
}

function markQ() {
  marked.add(currentIndex);
  updateMarkedSidebar();
}

function updateMarkedSidebar() {
  const list = document.getElementById('markedList');
  list.innerHTML = '';
  marked.forEach(idx => {
    const item = document.createElement('div');
    item.className = 'marked-item';
    item.textContent = `Q${idx + 1}: ${questions[idx].text}`;
    item.onclick = () => {
      currentIndex = idx;
      loadQuestion(currentIndex);
    };
    list.appendChild(item);
  });
}


function showScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) score++;
  });

 
  document.body.innerHTML = `
    <div class="score-page">
      <h1> Exam Completed!</h1>
      <h2>Your Score: ${score} / ${questions.length}</h2>
      <p>${score >= questions.length / 2 ? "Well done! " : "Keep practicing! "}</p>
      <button onclick="location.reload()">Retake Exam</button>
    </div>
  `;
}


let timeLeft = 5 * 60;
const timerDisplay = document.getElementById("timer");

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    showScore(); 
  }

  timeLeft--;
}

const timerInterval = setInterval(updateTimer, 1000);


document.getElementById('examForm').addEventListener('submit', (e) => {
  e.preventDefault();
  clearInterval(timerInterval);
  showScore();
});

loadQuestion(currentIndex);
