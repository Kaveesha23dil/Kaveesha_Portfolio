import type { Metadata } from "next";
import DevelopmentCaseStudy, { DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "QuizServer is an Electron and Express assessment platform for creating, hosting, grading, and analyzing browser-based quizzes over a local network.";
export const metadata: Metadata = createMetadata({ title: "QuizServer Local-Network Quiz Platform", description, path: "/projects/quizserver", image: "/mockup-quizserver.png", imageAlt: "QuizServer desktop administration and mobile quiz interfaces", type: "article", keywords: ["Electron application", "Express.js project", "quiz management platform", "education technology", "local network application"] });

const project: DevelopmentProject = {
  eyebrow: "FULL-STACK ACADEMIC CASE STUDY", title: "QuizServer", accent: "Local Quiz Platform", year: "ACADEMIC PROJECT", role: "Interface & Quiz Logic Contributor", scope: "Interface implementation, quiz and session logic", deliverable: "Functional prototype", mockup: "/mockup-quizserver.png",
  summary: "A desktop-powered assessment platform that lets administrators create reusable quizzes, host sessions over a local network, and grade browser-based participant submissions from one central interface.",
  disclaimer: "QuizServer is a functional academic group prototype. The live experience requires local installation and devices connected to the same network.",
  overview: ["QuizServer combines an Electron administration application, a Node.js and Express backend, and responsive browser interfaces. Participants join from their own phones or computers without installing software.", "Each session preserves participant-specific question mappings, submitted answers, timing data, grading state, and analytics while keeping reusable quiz definitions separate from completed sessions."],
  challenge: "Classroom assessments often depend on paper, manual marking, or cloud platforms that require internet access, accounts, and subscriptions.",
  solution: "QuizServer provides a complete offline-friendly workflow: author quizzes, launch a local server, share a QR code, randomize each participant's assessment, grade objective answers automatically, review written responses, and export results.",
  contributionIntro: "My contribution focused on implementing the application interfaces and developing the quiz and session logic that supports the core assessment workflow.",
  contributions: [
    { title: "Interface implementation", detail: "Implemented responsive administrator and participant interfaces for quiz creation, delivery, question navigation, grading, and result review." },
    { title: "Quiz and session logic", detail: "Developed functionality for reusable quiz management, timed sessions, participant interactions, answer persistence, and assessment state handling." },
  ],
  process: [
    { number: "01", title: "Model the assessment", detail: "Defined a consistent quiz structure capable of storing six question formats, timers, images, answer rules, and randomization settings." },
    { number: "02", title: "Connect desktop and browser", detail: "Used Electron for administration and Express REST routes to serve participant experiences across devices on the selected local network." },
    { number: "03", title: "Protect grading accuracy", detail: "Recorded participant-specific question and option mappings, then reversed those mappings before evaluating each submission." },
    { number: "04", title: "Complete the feedback loop", detail: "Combined automatic scoring, manual essay grading, session analytics, historical results, and CSV, JSON, and HTML exports." },
  ],
  diagrams: {
    architecture: [
      { title: "Electron Admin", detail: "Quiz authoring, server control and result review", kind: "desktop" },
      { title: "Express Server", detail: "REST API, quiz delivery and grading logic", kind: "server" },
      { title: "Participant Devices", detail: "Responsive browser quiz experience", kind: "mobile" },
      { title: "JSON Storage", detail: "Reusable quizzes and session result files", kind: "storage" },
    ],
    flows: [
      { role: "ADMINISTRATOR FLOW", steps: ["Create or select a reusable quiz", "Start the local server and share its QR code", "Monitor participants and launch the assessment", "Review grading, analytics, and exports"] },
      { role: "PARTICIPANT FLOW", steps: ["Join from a browser on the same network", "Register and receive an individualized quiz", "Answer, navigate, flag, and track time", "Submit and receive confirmation"] },
    ],
  },
  features: ["Six question and answer formats", "Quiz-level and question-level timers", "Participant-specific question randomization", "QR-code local-network access", "Responsive participant interface", "Automatic and manual grading", "Session analytics and question analysis", "CSV, JSON, and detailed HTML exports"],
  stack: ["Electron", "Node.js", "Express.js", "JavaScript", "HTML5", "CSS3", "REST API", "JSON persistence", "Electron IPC", "QR code generation"],
  challenges: [
    { title: "Grading randomized assessments", detail: "Per-participant question and option maps are stored and reversed on submission so randomized presentation never changes the source grading rules." },
    { title: "Supporting six question formats", detail: "Question-type-specific interfaces and evaluation logic share one consistent quiz model without flattening their different answer structures." },
    { title: "Bridging separate devices", detail: "Local IPv4 detection, an embedded Express server, Electron IPC, and QR access connect a desktop administrator with browser participants." },
    { title: "Mixing automatic and manual grading", detail: "Structured responses are scored immediately while essays remain clearly marked for administrator review and later score updates." },
  ],
  outcome: "A complete assessment prototype demonstrating desktop application development, REST API design, local networking, responsive interfaces, data modeling, grading logic, and multi-user workflow design.",
};

export default function Page() {
  return <><JsonLd data={[{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "QuizServer", description, url: absoluteUrl("/projects/quizserver"), image: absoluteUrl("/mockup-quizserver.png"), applicationCategory: "EducationalApplication", operatingSystem: "Desktop and web browser", author: { "@id": `${siteConfig.url}/#person` } }, createProjectBreadcrumb("QuizServer", "/projects/quizserver")]} /><DevelopmentCaseStudy project={project} /><Footer /></>;
}
