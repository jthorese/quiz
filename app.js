const questions = [
  { category: 'Investigative', text: 'What happened?' },
  { category: 'Investigative', text: 'What is and isn’t working?' },
  { category: 'Investigative', text: 'What are the causes of the problem?' },
  { category: 'Investigative', text: 'How feasible and desirable is each option?' },
  { category: 'Investigative', text: 'What evidence supports your proposed plan?' },
  { category: 'Speculative', text: 'What other scenarios might exist?' },
  { category: 'Speculative', text: 'Could we do this differently?' },
  { category: 'Speculative', text: 'What else might we propose?' },
  { category: 'Speculative', text: 'What can we simplify, combine, modify, or eliminate?' },
  { category: 'Speculative', text: 'What potential solutions have we not considered?' },
  { category: 'Productive', text: 'What is the next step?' },
  { category: 'Productive', text: 'What do we need to achieve before taking it?' },
  { category: 'Productive', text: 'Do we have the resources to move forward?' },
  { category: 'Productive', text: 'What is our time frame?' },
  { category: 'Productive', text: 'How should we proceed?' },
  { category: 'Interpretive', text: 'What did we learn from this new information?' },
  { category: 'Interpretive', text: 'What does it mean for our present and future actions?' },
  { category: 'Interpretive', text: 'What should be our overarching goal?' },
  { category: 'Interpretive', text: 'How does this fit with that goal?' },
  { category: 'Interpretive', text: 'What are we trying to achieve?' },
  { category: 'Subjective', text: 'How do you really feel about this decision?' },
  { category: 'Subjective', text: 'What aspect of it most concerns you?' },
  { category: 'Subjective', text: 'Are there differences between what was said, what was heard, and what was meant?' },
  { category: 'Subjective', text: 'Have we consulted the right people?' },
  { category: 'Subjective', text: 'Are all stakeholders genuinely aligned?' }
];

const advice = {
  Investigative: "Focus on gathering and analyzing information comprehensively. Ask open-ended questions to uncover deeper insights and encourage a thorough understanding of the situation.",
  Speculative: "Enhance your ability to think creatively and consider multiple perspectives. Practice brainstorming alternative solutions and exploring 'what if' scenarios to broaden your strategic thinking.",
  Productive: "Improve your action planning and execution skills. Set clear, achievable goals and develop detailed action plans. Ensure you have the necessary resources and a realistic timeline.",
  Interpretive: "Develop your ability to derive meaningful insights from information. Reflect on past experiences and apply lessons learned to current and future situations. Align your actions with overarching goals.",
  Subjective: "Work on understanding and addressing the emotional and interpersonal aspects of decisions. Engage stakeholders in meaningful dialogue, ensure alignment, and build consensus."
};

let currentQuestionIndex = 0;
const scores = { Investigative: 0, Speculative: 0, Productive: 0, Interpretive: 0, Subjective: 0 };

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
});

function showQuestion() {
  const questionContainer = document.getElementById('questionnaire');
  questionContainer.innerHTML = `
    <div class="question">
      <p>${questions[currentQuestionIndex].text}</p>
      <input type="range" id="response" min="1" max="5" step="1" value="3">
    </div>
  `;
}

function nextQuestion() {
  const response = document.getElementById('response').value;
  const category = questions[currentQuestionIndex].category;
  scores[category] += parseInt(response);

  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('questionnaire').classList.add('hidden');
  document.getElementById('nextBtn').classList.add('hidden');

  const resultsDiv = document.getElementById('results');
  const scoresDiv = document.getElementById('scores');
  let lowestScoreCategory = '';
  let lowestScore = Infinity;

  for (const [category, score] of Object.entries(scores)) {
    const avgScore = score / questions.filter(q => q.category === category).length;
    scoresDiv.innerHTML += `<p>${category}: ${avgScore.toFixed(2)}</p>`;
    
    if (avgScore < lowestScore) {
      lowestScore = avgScore;
      lowestScoreCategory = category;
    }
  }

  document.getElementById('focusArea').innerText = `Focus on improving: ${lowestScoreCategory}`;
  document.getElementById('advice').innerText = advice[lowestScoreCategory];
  resultsDiv.classList.remove('hidden');
}
