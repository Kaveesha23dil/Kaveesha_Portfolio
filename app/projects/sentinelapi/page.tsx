import Link from "next/link";
import DevelopmentCaseStudy, { type DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "SentinelAPI: a local API security monitoring prototype by Kaveesha Dilshan, connecting WSO2 gateway events, PostgreSQL, explainable alerts, and controlled Isolation Forest experiments.";

export const metadata = createMetadata({ title: "SentinelAPI — API Security Monitoring Case Study", description, path: "/projects/sentinelapi", image: "/blog/sentinelapi/dashboard.png", imageAlt: "SentinelAPI dashboard in explicitly labeled demo mode", type: "article" });

const project: DevelopmentProject = {
  eyebrow: "API SECURITY & FULL-STACK ENGINEERING",
  title: "SentinelAPI",
  accent: "Evidence First",
  summary: "I built an API security monitoring prototype that turns WSO2 gateway activity into stored telemetry and explainable alerts, alongside controlled machine-learning experiments and a React investigation dashboard.",
  year: "2026",
  role: "Full-Stack Developer",
  scope: "Gateway integration, telemetry, detection, dashboard",
  deliverable: "Local engineering prototype",
  mockup: "/blog/sentinelapi/dashboard.png",
  github: "https://github.com/Kaveesha23dil/sentinelapi",
  disclaimer: "Dashboard preview uses labeled demo fixtures with no live backend connection. Runtime findings come from controlled local validation; ML results come from synthetic offline evaluation, not production attack-detection accuracy.",
  overview: ["An HTTP 200 confirms a successful request, but says little about patterns across an API. SentinelAPI complements gateway enforcement by collecting request outcomes and evaluating them asynchronously, outside the live request path.", "The project connects a FastAPI sample backend and WSO2 API Manager to a Python log bridge, collector, PostgreSQL database, detection worker, authenticated monitoring API, and React dashboard."],
  challenge: "Turn raw gateway activity into trustworthy security signals without slowing application requests or overstating what the evidence proves.",
  solution: "Separate enforcement from monitoring. Normalize sanitized gateway events, persist them with replay protection, and link each detection result to the observations that support it.",
  contributionIntro: "I worked across the gateway integration, backend pipeline, persistence, detection logic, ML evaluation, and monitoring interface to verify the complete workflow.",
  contributions: [
    { title: "Gateway integration", detail: "Registered DemoCommerceAPI in WSO2 and verified OAuth rejection, authorized routing, and 10PerMin throttling through controlled requests." },
    { title: "Reliable telemetry", detail: "Built a bounded host log bridge and collector with sanitization, checkpoints, and database uniqueness constraints to support recovery and replay." },
    { title: "Explainable detection", detail: "Implemented API-level sliding-window error-rate detection with linked evidence, transactional checkpoint advancement, and incident deduplication." },
    { title: "ML and dashboard", detail: "Evaluated Isolation Forest on 180 synthetic traffic windows and built React views for traffic, alerts, rules, services, and ML monitoring." },
  ],
  process: [
    { number: "01", title: "Verify the gateway", detail: "Establish the client-to-gateway-to-backend path and observe HTTP 401, 200, and 429 behavior." },
    { number: "02", title: "Connect the pipeline", detail: "Transport gateway logs into a shared spool, normalize completed events, and verify durable PostgreSQL records." },
    { number: "03", title: "Detect with evidence", detail: "Evaluate five-minute windows with at least 20 requests and an error ratio above 50%, preserving supporting events." },
    { number: "04", title: "Evaluate and present", detail: "Compare rules and ML on controlled synthetic data and present monitoring information with clear demo, empty, and failure states." },
  ],
  features: ["OAuth 2.0 and gateway throttling validation", "Sanitized gateway-event collection", "Checkpoint recovery and replay deduplication", "Asynchronous API-level error-rate detection", "Alerts linked to underlying event evidence", "Authenticated monitoring and security APIs", "Role-based reader, analyst, and administrator access", "Isolation Forest offline experimentation", "React dashboard with explicit demo states"],
  stack: ["WSO2 API Manager 4.5", "Python", "FastAPI", "PostgreSQL 17", "SQLAlchemy", "Alembic", "Isolation Forest", "React", "TypeScript", "Vite", "Docker Compose"],
  challenges: [
    { title: "A healthy gateway, an unhealthy pipeline", detail: "Traced missing telemetry across collector health, Docker mounts, spool contents, and checkpoints. Restarting the host bridge restored fresh input; the collector committed 54 events and database verification showed 75 persisted gateway records at that stage." },
    { title: "Successful migrations, outdated schema", detail: "Found that the migration image predated newer Alembic files. Rebuilding it and applying the remaining migrations brought the schema to the expected revision while preserving the existing telemetry." },
    { title: "Keeping conclusions within the evidence", detail: "Enabled only API-level error-rate detection for the available BASIC telemetry. Client-specific rules remain disabled until trustworthy identity and classification inputs are available. Synthetic ML scores are presented as experimental signals." },
  ],
  outcome: "A verified local workflow from gateway events to a persisted error-rate alert with 16 evidence links, supported by a monitoring interface and controlled ML experiments.",
};

export default function SentinelAPIPage() {
  return <>
    <JsonLd data={[{ "@context": "https://schema.org", "@type": "CreativeWork", name: "SentinelAPI", description, url: absoluteUrl("/projects/sentinelapi"), image: absoluteUrl(project.mockup), author: { "@id": `${siteConfig.url}/#person` }, sameAs: project.github }, createProjectBreadcrumb("SentinelAPI", "/projects/sentinelapi")]} />
    <DevelopmentCaseStudy project={project} />
    <section className="blog-section" aria-label="SentinelAPI engineering article"><div className="blog-intro"><div><h2>Go behind the build.</h2><p>Read the full engineering story, with gateway configuration, database evidence, and the controlled ML evaluation charts.</p></div><Link className="blog-link" href="/blog/engineering-sentinelapi-api-security-monitoring">Read Technical Article ↗</Link></div></section>
    <Footer />
  </>;
}
