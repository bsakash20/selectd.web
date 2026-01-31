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

async function updateIndex() {
    try {
        console.log('Reading index.html...');
        let content = fs.readFileSync(INDEX_PATH, 'utf8');

        const keywords = generateTrends();
        const keywordsString = keywords.join(', ');

        console.log('Generated New Keywords:', keywordsString);

        // 1. Update Meta Tags
        const metaRegex = /(<!-- DYNAMIC_KEYWORDS_START -->)([\s\S]*?)(<!-- DYNAMIC_KEYWORDS_END -->)/;
        if (metaRegex.test(content)) {
            content = content.replace(metaRegex, `$1, ${keywordsString}$3`);
            console.log('Updated meta keywords successfully.');
        } else {
            console.warn('Meta keywords markers not found!');
        }

        // 2. Update JSON-LD Keywords (For AI Platforms)
        const jsonRegex = /(<!-- DYNAMIC_JSON_KEYWORDS_START -->)([\s\S]*?)(<!-- DYNAMIC_JSON_KEYWORDS_END -->)/;
        if (jsonRegex.test(content)) {
            content = content.replace(jsonRegex, `$1, ${keywordsString}$3`);
            console.log('Updated JSON-LD keywords successfully.');
        } else {
            console.warn('JSON-LD keywords markers not found!');
        }

        // 3. Update Footer Visible Section
        const footerRegex = /(<!-- TRENDING_TERMS_START -->)([\s\S]*?)(<!-- TRENDING_TERMS_END -->)/;
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, `$1${keywordsString}$3`);
            console.log('Updated footer trends successfully.');
        } else {
            console.warn('Footer trends markers not found!');
        }

        fs.writeFileSync(INDEX_PATH, content);
        console.log('Successfully wrote updates to index.html');

    } catch (error) {
        console.error('Error updating trends:', error);
        process.exit(1);
    }
}

updateIndex();
