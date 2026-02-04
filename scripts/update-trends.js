const fs = require('fs');
const path = require('path');

// Configuration
const INDEX_PATH = path.join(__dirname, '..', 'index.html');

// Curated pools of keywords to ensure high-quality SEO even if external APIs fail
const JOB_KEYWORDS = [
    "Remote Product Design", "AI Engineering", "Data Science Careers", "Software Engineering Trends",
    "UX Research Roles", "Full-stack Bootcamp", "Technical Product Management", "Cloud Architecture Jobs",
    "DevOps Engineering", "Cybersecurity Analyst", "Machine Learning Specialist", "Digital Marketing Strategy",
    "Blockchain Developer", "SaaS Sales", "Customer Success Lead", "Growth Marketing", "iOS Development Trends"
];

const EDUCATION_KEYWORDS = [
    "EdTech Certifications", "MBA Admissions 2026", "Online Graduate Programs", "Career Transition Skills",
    "Professional Certifications", "Higher Ed Trends", "Executive Education", "Skill Upgrading 2026",
    "Masters in AI", "STEM Education", "Virtual Learning Tech", "Lifelong Learning", "Corporate Training Tech"
];

const MISC_TRENDS = [
    "Hybrid Work Jobs", "Future of Work", "Career Mapping", "Application Tracking Tips", "Interview Prep Strategies"
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateTrends() {
    const selectedJobs = shuffle([...JOB_KEYWORDS]).slice(0, 4);
    const selectedEd = shuffle([...EDUCATION_KEYWORDS]).slice(0, 3);
    const selectedMisc = shuffle([...MISC_TRENDS]).slice(0, 1);

    return [...selectedJobs, ...selectedEd, ...selectedMisc];
}

function generateTickerItems() {
    const selectedJobs = shuffle([...JOB_KEYWORDS]).slice(0, 4);
    const selectedEd = shuffle([...EDUCATION_KEYWORDS]).slice(0, 3);

    const items = [];

    // Add Live Metrics
    const activeSeekers = Math.floor(Math.random() * (3000 - 1500) + 1500).toLocaleString();
    items.push({ text: `Seekers Online: ${activeSeekers}`, type: 'metric' });

    const avgOfferTime = Math.floor(Math.random() * (22 - 14) + 14);
    items.push({ text: `Avg. Hiring Cycle: ${avgOfferTime} Days`, type: 'metric' });

    // Add Job Trends with %
    selectedJobs.forEach(job => {
        const trend = Math.floor(Math.random() * (35 - 8) + 8);
        items.push({ text: job, trend: `+${trend}%`, type: 'job' });
    });

    // Add Education
    selectedEd.forEach(ed => {
        items.push({ text: ed, type: 'ed' });
    });

    return items;
}

async function updateIndex() {
    try {
        console.log('Reading index.html...');
        let content = fs.readFileSync(INDEX_PATH, 'utf8');

        // Keywords for SEO (just strings)
        const seoKeywords = generateTrends();
        const seoKeywordsString = seoKeywords.join(', ');

        console.log('Generated SEO Keywords:', seoKeywordsString);

        // Ticker items (rich objects)
        const tickerData = generateTickerItems();

        const tickerItems = tickerData.map(item => {
            if (item.type === 'metric') {
                return `<span class="ticker-item metric"><strong>${item.text}</strong></span>`;
            }
            if (item.type === 'job') {
                return `<span class="ticker-item"><strong>${item.text}</strong> <span class="trend-badge">${item.trend}</span></span>`;
            }
            return `<span class="ticker-item"><strong>${item.text}</strong> <span class="trend-up">▲</span></span>`;
        }).join('\n                    ');

        // 1. Update Meta Tags
        const metaRegex = /(<!-- DYNAMIC_KEYWORDS_START -->)([\s\S]*?)(<!-- DYNAMIC_KEYWORDS_END -->)/;
        if (metaRegex.test(content)) {
            // Replaces the ENTIRE content between tags, avoiding duplication
            content = content.replace(metaRegex, `$1, ${seoKeywordsString}$3`);
        }

        // 2. Update JSON-LD Keywords
        const jsonRegex = /(<!-- DYNAMIC_JSON_KEYWORDS_START -->)([\s\S]*?)(<!-- DYNAMIC_JSON_KEYWORDS_END -->)/;
        if (jsonRegex.test(content)) {
            content = content.replace(jsonRegex, `$1, ${seoKeywordsString}$3`);
        }

        // 3. Update Footer Visible Section
        const footerRegex = /(<!-- TRENDING_TERMS_START -->)([\s\S]*?)(<!-- TRENDING_TERMS_END -->)/;
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, `$1${seoKeywordsString}$3`);
        }

        // 4. Update Live Market Ticker
        const tickerRegex = /(<!-- DYNAMIC_TICKER_START -->)([\s\S]*?)(<!-- DYNAMIC_TICKER_END -->)/;
        if (tickerRegex.test(content)) {
            content = content.replace(tickerRegex, `$1\n                    ${tickerItems}\n                    $3`);
        }

        const tickerDupRegex = /(<!-- DYNAMIC_TICKER_DUPLICATE_START -->)([\s\S]*?)(<!-- DYNAMIC_TICKER_DUPLICATE_END -->)/;
        if (tickerDupRegex.test(content)) {
            content = content.replace(tickerDupRegex, `$1\n                    ${tickerItems}\n                    $3`);
        }

        // Generate Momentum Stats for Footer (Randomized for "Dynamic" Feel)
        const sentiments = [
            { v: 'Bullish', i: '🔥' }, { v: 'High Growth', i: '🚀' },
            { v: 'Competitive', i: '⚔️' }, { v: 'Stable', i: '⚖️' }
        ];
        const remoteStatus = [
            { v: 'Expanding', i: '🌍' }, { v: 'Stabilizing', i: '🏢' },
            { v: 'High Demand', i: '📶' }
        ];
        const premiums = ['+12.4%', '+14.2%', '+16.8%', '+11.5%', '+15.1%'];

        const selectedSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        const selectedRemote = remoteStatus[Math.floor(Math.random() * remoteStatus.length)];
        const selectedPremium = premiums[Math.floor(Math.random() * premiums.length)];

        const momentum = [
            { label: 'Market Sentiment', value: selectedSentiment.v, indicator: selectedSentiment.i },
            { label: 'Remote Opportunities', value: selectedRemote.v, indicator: selectedRemote.i },
            { label: 'AI Role Premium', value: selectedPremium, indicator: '↗️' }
        ];
        const momentumHtml = momentum.map(stat => `
            <div class="momentum-item">
                <span class="momentum-label">${stat.label}</span>
                <span class="momentum-value">${stat.indicator} ${stat.value}</span>
            </div>`).join('');

        const momentumRegex = /(<!-- MOMENTUM_STATS_START -->)([\s\S]*?)(<!-- MOMENTUM_STATS_END -->)/;
        if (momentumRegex.test(content)) {
            content = content.replace(momentumRegex, `$1${momentumHtml}\n        $3`);
        }

        // 5. Update Date
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const dateRegex = /(<!-- DYNAMIC_DATE_START -->)([\s\S]*?)(<!-- DYNAMIC_DATE_END -->)/;
        if (dateRegex.test(content)) {
            content = content.replace(dateRegex, `$1${dateString}$3`);
        }

        fs.writeFileSync(INDEX_PATH, content);
        console.log('Successfully wrote updates to index.html');

    } catch (error) {
        console.error('Error updating trends:', error);
        process.exit(1);
    }
}

updateIndex();
