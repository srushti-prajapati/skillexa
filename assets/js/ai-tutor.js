// assets/js/ai-tutor.js

const lessons = {
  en: [
    "Welcome to your first lesson on Communication Skills.",
    "Good communication helps in jobs, business, and leadership.",
    "Practice listening, speaking clearly, and expressing yourself confidently.",
  ],
  hi: [
    "आपका पहला पाठ 'संचार कौशल' पर शुरू हो रहा है।",
    "अच्छा संचार नौकरी, व्यापार और नेतृत्व में मदद करता है।",
    "सुनना, स्पष्ट बोलना और आत्मविश्वास से खुद को व्यक्त करना सीखें।"
  ],
  ta: [
    "உங்கள் முதல் பாடம் தொடர்பாடல் திறன்கள் குறித்தது.",
    "நல்ல தொடர்பாடல் வேலை, வணிகம், தலைமையில் உதவும்.",
    "கவனமாக கேட்கவும், தெளிவாக பேசவும், நம்பிக்கையுடன் பேசவும்."
  ],
  te: [
    "మీ మొదటి పాఠం కమ్యూనికేషన్ స్కిల్స్ పై.",
    "మంచి కమ్యూనికేషన్ ఉద్యోగం, వ్యాపారానికి, నాయకత్వానికి ఉపయోగపడుతుంది.",
    "శ్రద్ధగా వినడం, స్పష్టంగా మాట్లాడడం, ఆత్మవిశ్వాసంతో మాట్లాడడం అభ్యాసించండి."
  ]
};

let currentIndex = 0;
let currentLang = "en";

function playLesson() {
  const msg = new SpeechSynthesisUtterance(lessons[currentLang][currentIndex]);
  msg.lang = currentLang;
  speechSynthesis.speak(msg);

  document.getElementById("lessonText").textContent = lessons[currentLang][currentIndex];
}

function nextLesson() {
  currentIndex = (currentIndex + 1) % lessons[currentLang].length;
  playLesson();
}

function repeatLesson() {
  playLesson();
}

function changeLanguage(lang) {
  currentLang = lang;
  currentIndex = 0;
  playLesson();
}
