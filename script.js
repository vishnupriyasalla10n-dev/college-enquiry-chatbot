
window.addEventListener("DOMContentLoaded", function () {

    const currentStudent = sessionStorage.getItem("loggedInStudent");

    if (!currentStudent) {
        window.location.href = "login.html";
        return;
    }

    const student = JSON.parse(currentStudent);
    document.getElementById("student-name").textContent =
        "Hello, " + student.name + "!";

});

function logout() {
    sessionStorage.removeItem("loggedInStudent");
    window.location.href = "login.html";
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    const reply = getReply(message.toLowerCase());

    setTimeout(function () {
        addMessage(reply, "bot");
    }, 500);
}

function sendQuick(question) {
    document.getElementById("user-input").value = question;
    sendMessage();
}




function addMessage(message, type) {
    let chat = document.getElementById("chat-box");
    let div = document.createElement("div");

    div.className = "message " + type;
    div.textContent = message;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    if (type === "bot") {
        speakAnswer(message);
    }
}

// Smooth Indian English female voice
function speakAnswer(message) {
    window.speechSynthesis.cancel();

    let voices = window.speechSynthesis.getVoices();

    let femaleVoice = voices.find(voice =>
        voice.lang.toLowerCase() === "en-in" &&
        /female|heera/i.test(voice.name)
    );

    if (!femaleVoice) {
        femaleVoice = voices.find(voice =>
            voice.lang.toLowerCase() === "en-in"
        );
    }

    let speech = new SpeechSynthesisUtterance(message);

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1.1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

function clearChat() {
    document.getElementById("chat-box").innerHTML = "";
}

function getReply(message) {

    if (message.includes("scholarship") ||
        message.includes("scholorship")) {
        return "Eligible students can apply for government and college scholarships. Contact the college office for details.";
    }

    if (message.includes("hello") ||
        message === "hi" || message === "hey") {
        return "Hello! Welcome to our college enquiry chatbot. How can I help you?";
    }

    if (message.includes("course"))
        return "We offer CSE, ECE, EEE, Mechanical and Civil Engineering.";

    if (message.includes("fee"))
        return "Please contact the college office for fee details.";

    if (message.includes("admission"))
        return "Admissions are based on eligibility and college guidelines.";

    if (message.includes("placement"))
        return "Our placement cell helps students with training and job opportunities.";

    if (message.includes("hostel"))
        return "Hostel facilities are available. Contact the college office for details.";

    if (message.includes("library"))
        return "Our college library provides books and study materials.";

    if (message.includes("transport") || message.includes("bus"))
        return "College transportation may be available on selected routes.";

    if (message.includes("exam"))
        return "Exam schedules are shared by the examination department.";

    if (message.includes("thank"))
        return "You're welcome! Happy to help you.";

    if (message.includes("bye"))
        return "Goodbye! Have a great day.";

    return "Sorry, I don't understand. Please ask about courses, fees, scholarships, admission or placements.";
}


function startVoice() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Your browser does not support voice recognition. Please use Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log("Microphone started! Speak now.");
    };

    recognition.onresult = function(event) {
        const voiceText = event.results[0][0].transcript;
        document.getElementById("user-input").value = voiceText;
        sendMessage();
    };

    recognition.onerror = function(event) {
        alert("Voice error: " + event.error);
    };

    recognition.start();
}
window.speechSynthesis.onvoiceschanged = function() {
    let voices = window.speechSynthesis.getVoices();

    console.log("Available voices:");

    voices.forEach(voice => {
        console.log(voice.name, voice.lang);
    });
};