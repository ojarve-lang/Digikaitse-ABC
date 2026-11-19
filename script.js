function checkScam() {
    const input = document.getElementById("userInput").value.toLowerCase();
    const result = document.getElementById("result");

    let score = 0;
    let reasons = [];

    if (input.trim() === "") {
        result.innerHTML = `
            <div class="alert alert-warning">
                Palun kleebi enne mõni sõnum või link.
            </div>
        `;
        return;
    }

    const dangerWords = [
        "pin", "parool", "password", "smart-id", "mobiil-id",
        "kiiresti", "koheselt", "täna", "maksa", "tasuda",
        "konto suletakse", "blokeeritud", "kinnita", "verify",
        "pakki ei saanud", "pakk on kinni", "auhind", "võitsid"
    ];

    dangerWords.forEach(word => {
        if (input.includes(word)) {
            score++;
            reasons.push(`Sisaldab kahtlast sõna või väljendit: "${word}"`);
        }
    });

    if (input.includes("http") || input.includes("www")) {
        score++;
        reasons.push("Sõnum sisaldab linki.");
    }

    if (input.includes(".xyz") || input.includes(".top") || input.includes(".click")) {
        score++;
        reasons.push("Link kasutab kahtlast domeeni.");
    }

    if (input.includes("€") || input.includes("eur")) {
        score++;
        reasons.push("Sõnumis küsitakse raha või makset.");
    }

    let level = "";
    let alertClass = "";

    if (score >= 4) {
        level = "❌ Väga tõenäoline pettus";
        alertClass = "alert-danger";
    } else if (score >= 2) {
        level = "⚠️ Kahtlane sõnum";
        alertClass = "alert-warning";
    } else {
        level = "✅ Madal risk";
        alertClass = "alert-success";
        reasons.push("Sõnumis ei leitud palju tüüpilisi pettuse tunnuseid.");
    }

    result.innerHTML = `
        <div class="alert ${alertClass} text-start">
            <h4>${level}</h4>
            <p><strong>Põhjused:</strong></p>
            <ul>
                ${reasons.map(reason => `<li>${reason}</li>`).join("")}
            </ul>
            <p class="mb-0"><strong>Soovitus:</strong> ära vajuta kahtlaseid linke ega sisesta PIN-koode/parooli.</p>
        </div>
    `;
}
const scamExamples = [
    {
        text: "Teie pank on tuvastanud kahtlase tegevuse. Kinnitage konto siin: https://swedbank-turvaline-login.com",
        isScam: true,
        explanation: "See on pettus. Päris Swedbanki aadress on swedbank.ee, mitte sarnane võltsdomeen."
    },
    {
        text: "Omniva: Teie pakk ootab tollimaksu 1.99€. Tasuge siin: http://omniva-track24.xyz",
        isScam: true,
        explanation: "See on pettus. Väike kiire makse ja imelik domeen on väga tüüpilised ohumärgid."
    },
    {
        text: "Tere! Tuletame meelde, et Teie hambaarsti aeg on homme kell 10:30.",
        isScam: false,
        explanation: "See tundub pigem turvaline. Ei ole linki, maksenõuet ega paroole."
    },
    {
        text: "Võitsid 500€ kinkekaardi! Auhinna kättesaamiseks sisesta oma pangakaardi andmed.",
        isScam: true,
        explanation: "See on pettus. Auhinna nimel pangakaardi andmete küsimine on suur ohumärk."
    }
];

const newsItems = [
    {
        title: "Eestis levib uus panga SMS-pettus",
        summary: "Võltsitud teavitus nõuab uut kinnitust ja suunab kasutaja valesse veebilehte.",
        link: "#",
        source: "TurvaRadar",
        date: "09.06.2026"
    },
    {
        title: "Kiire autokaupmehe petuskeem",
        summary: "Ostja saadetakse lahtiva toote järelmaksu lingile, mis kogub andmeid ja raha.",
        link: "#",
        source: "CyberInfo",
        date: "08.06.2026"
    },
    {
        title: "Tööpakk e-kirjas? Kontrolli domeeni",
        summary: "Paljud tööpakkide e-kirjad kasutavad valesid CV-platvorme ja nõuavad isiklikke andmeid.",
        link: "#",
        source: "Eesti Turva",
        date: "07.06.2026"
    },
    {
        title: "Küberpettus kasutab sotsiaalmeediat ",
        summary: "Petukontod jagavad võltsitud allahindluste linke, mis kopeerivad populaarseid brände.",
        link: "#",
        source: "NetiUudised",
        date: "06.06.2026"
    }
];

function showNews() {
    const newsList = document.getElementById("newsList");
    newsList.innerHTML = newsItems.map(item => `
        <div class="col-md-6 mb-3">
            <div class="card p-3 h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text flex-grow-1">${item.summary}</p>
                    <div class="mt-3">
                        <small class="text-muted">${item.source} · ${item.date}</small>
                        <a href="${item.link}" class="btn btn-sm btn-outline-secondary float-end">Loe rohkem</a>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function refreshNews() {
    newsItems.sort(() => Math.random() - 0.5);
    showNews();
}

let currentExample = 0;

function showExample() {
    document.getElementById("exampleText").innerText = scamExamples[currentExample].text;
    document.getElementById("exampleResult").innerHTML = "";
}

function guessSafe() {
    checkGuess(false);
}

function guessScam() {
    checkGuess(true);
}

function checkGuess(userGuess) {
    const example = scamExamples[currentExample];
    const result = document.getElementById("exampleResult");

    if (userGuess === example.isScam) {
        result.innerHTML = `
            <div class="alert alert-success">
                ✅ Õige!<br>${example.explanation}
            </div>
        `;
    } else {
        result.innerHTML = `
            <div class="alert alert-danger">
                ❌ Vale!<br>${example.explanation}
            </div>
        `;
    }
}

function nextExample() {
    currentExample++;

    if (currentExample >= scamExamples.length) {
        currentExample = 0;
    }

    showExample();
}

function addReport() {
    const input = document.getElementById("reportInput");
    const message = document.getElementById("reportMessage");

    const text = input.value.trim();

    if (text === "") {
        message.innerHTML = `<div class="alert alert-warning">Palun lisa enne mõni sõnum.</div>`;
        return;
    }

    let reports = JSON.parse(localStorage.getItem("scamReports")) || [];

    reports.unshift({
        text: text,
        date: new Date().toLocaleDateString("et-EE")
    });

    localStorage.setItem("scamReports", JSON.stringify(reports));

    input.value = "";
    message.innerHTML = `<div class="alert alert-success">Hoiatus lisatud!</div>`;

    showReports();
}

function showReports() {
    const reportList = document.getElementById("reportList");
    let reports = JSON.parse(localStorage.getItem("scamReports")) || [];

    if (reports.length === 0) {
        reportList.innerHTML = `
            <div class="col-12">
                <p class="text-muted">Ühtegi kogukonna hoiatust pole veel lisatud.</p>
            </div>
        `;
        return;
    }

    reportList.innerHTML = reports.map(report => `
        <div class="col-md-4 mb-3">
            <div class="card p-3">
                <small class="text-muted">${report.date}</small>
                <p class="mt-2">${report.text}</p>
            </div>
        </div>
    `).join("");
}

showExample();
showNews();
showReports();