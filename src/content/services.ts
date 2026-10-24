/**
 * Service architecture. Structured so it can move to a CMS unchanged:
 * each entry maps 1:1 to a "service" document type.
 */

export type DomainId = "data" | "technology" | "business";

export type ServiceSlug =
  | "it-audit"
  | "it-risk-advisory"
  | "cyber-advisory"
  | "data-analytics"
  | "ai-process-automation"
  | "data-science"
  | "tax"
  | "financial-accounting"
  | "bpr-erp";

export interface Service {
  slug: ServiceSlug;
  number: string;
  name: string;
  domain: DomainId;
  /** One line — used in menus, ecosystem panel and cards */
  summary: string;
  seo: { title: string; description: string };
  hero: { headline: string; intro: string };
  problem: { heading: string };
  approach: string;
  capabilities: { title: string; detail: string }[];
  outcomes: string[];
  method: { title: string; detail: string }[];
  related: ServiceSlug[];
  disclaimer?: string;
}

export const domains: Record<DomainId, { name: string; line: string; description: string }> = {
  data: {
    name: "Data",
    line: "Turn information into evidence.",
    description:
      "Analytics, data science and AI that make information usable — and trustworthy enough to act on.",
  },
  technology: {
    name: "Technology",
    line: "Know that your systems hold.",
    description:
      "Assurance, risk and security for the technology every process now depends on.",
  },
  business: {
    name: "Business",
    line: "Make the numbers and processes work.",
    description:
      "Finance, tax and process design — where controls, reporting and operations meet.",
  },
};

export const domainOrder: DomainId[] = ["data", "technology", "business"];

export const services: Service[] = [
  {
    slug: "it-audit",
    number: "01",
    name: "IT Audit",
    domain: "technology",
    summary: "Independent assurance over the controls your systems and reporting depend on.",
    seo: {
      title: "IT Audit — ITGC, Application Controls & Technology Assurance",
      description:
        "IT general controls, application controls, ERP controls and system implementation reviews. Independent technology assurance from Data Fold.",
    },
    hero: {
      headline: "Assurance that stands up to scrutiny.",
      intro:
        "We test whether the controls inside your systems actually operate — so management, auditors and boards can rely on what those systems produce.",
    },
    problem: {
      heading: "Most financial and operational risk now sits inside systems.",
    },
    approach:
      "We plan IT audit work around the risks that matter to your reporting and operations, test controls with evidence rather than inquiry, and write findings that owners can act on — root cause, impact and a practical fix.",
    capabilities: [
      { title: "IT general controls (ITGC)", detail: "Access, change, operations and program development across applications, databases and infrastructure." },
      { title: "Application controls", detail: "Automated controls, configurations, calculations, interfaces and IT-dependent manual controls." },
      { title: "ERP controls", detail: "Segregation of duties, role design and configurable controls in major ERP platforms." },
      { title: "IT internal audit", detail: "Co-sourced or outsourced delivery of the technology portion of your internal audit plan." },
      { title: "System implementation reviews", detail: "Pre- and post-implementation reviews covering data migration, cut-over and control design." },
      { title: "Control design & effectiveness", detail: "Design walkthroughs, test-of-one and operating-effectiveness testing with clear evidence standards." },
    ],
    outcomes: [
      "Controls evidence that external auditors and regulators can rely on",
      "Fewer late surprises in year-end and statutory audits",
      "Findings ranked by impact, with owners and realistic remediation",
      "A repeatable testing approach your team can sustain",
    ],
    method: [
      { title: "Scope", detail: "Map in-scope systems to financial and operational risks; agree evidence standards up front." },
      { title: "Walk through", detail: "Confirm control design with control owners and identify gaps before testing." },
      { title: "Test", detail: "Sample, re-perform and inspect — using data analytics where full-population testing is feasible." },
      { title: "Report", detail: "Clear findings with root cause, risk rating and agreed actions — then follow up." },
    ],
    related: ["it-risk-advisory", "bpr-erp", "data-analytics"],
  },
  {
    slug: "it-risk-advisory",
    number: "02",
    name: "IT Risk Advisory",
    domain: "technology",
    summary: "Governance and control frameworks that keep technology risk visible and managed.",
    seo: {
      title: "IT Risk Advisory — Technology Risk, IT Governance & Control Frameworks",
      description:
        "Technology risk assessments, IT governance, third-party technology risk and control maturity reviews that help leadership understand and manage IT risk.",
    },
    hero: {
      headline: "Technology risk, made visible to the people who own it.",
      intro:
        "We help leadership understand where technology risk sits, how well it is controlled, and what to prioritise — in language a board can use.",
    },
    problem: {
      heading: "Technology risk is rarely measured the way business risk is.",
    },
    approach:
      "We connect technology risk to business processes and outcomes, then build governance and control frameworks sized to your organization — rigorous enough to rely on, light enough to run.",
    capabilities: [
      { title: "Technology risk assessments", detail: "Identify, rate and prioritise technology risks against business impact and appetite." },
      { title: "IT governance", detail: "Decision rights, policies, committees and reporting lines for technology." },
      { title: "Risk & control frameworks", detail: "Control libraries mapped to recognised good-practice frameworks and to your actual systems." },
      { title: "Third-party technology risk", detail: "Due diligence, ongoing oversight and exit planning for critical technology suppliers." },
      { title: "Control maturity assessments", detail: "Where you are, where you need to be, and the sequence to get there." },
      { title: "Risk remediation", detail: "Hands-on support to close findings and embed durable fixes." },
    ],
    outcomes: [
      "A technology risk profile leadership can read and challenge",
      "Controls mapped to owners, systems and evidence",
      "Clear oversight of critical third-party technology",
      "A prioritised, costed remediation roadmap",
    ],
    method: [
      { title: "Understand", detail: "Interview leadership and system owners; map critical services to the technology beneath them." },
      { title: "Assess", detail: "Rate inherent and residual risk against a consistent, agreed methodology." },
      { title: "Design", detail: "Right-size governance, controls and reporting to the risks that matter." },
      { title: "Embed", detail: "Support owners through remediation and set up ongoing monitoring." },
    ],
    related: ["cyber-advisory", "it-audit", "data-science"],
    disclaimer:
      "References to frameworks describe the good-practice structures we align work to; they do not imply certification or accreditation.",
  },
  {
    slug: "cyber-advisory",
    number: "03",
    name: "Cyber Advisory",
    domain: "technology",
    summary: "An evidence-based view of your security posture — and a plan leadership can fund.",
    seo: {
      title: "Cybersecurity Advisory — Cyber Risk, Maturity & Vulnerability Assessment",
      description:
        "Cyber maturity and risk assessments, security governance, vulnerability assessment, penetration testing and incident readiness from Data Fold.",
    },
    hero: {
      headline: "Security posture you can explain — and defend.",
      intro:
        "We assess how exposed you really are, test the controls that matter, and turn the result into a prioritised plan that leadership can fund with confidence.",
    },
    problem: {
      heading: "Security spend is rising. Confidence often isn't.",
    },
    approach:
      "We combine governance-level assessment with technical testing, so strategy is grounded in evidence and technical findings are tied to business risk.",
    capabilities: [
      { title: "Cyber maturity assessment", detail: "Benchmark capability across governance, protection, detection and response." },
      { title: "Cyber risk assessment", detail: "Threat-informed view of the scenarios most likely to hurt your organization." },
      { title: "Vulnerability assessment & penetration testing", detail: "Scoped, authorised testing of infrastructure, applications and cloud exposure." },
      { title: "Security governance & architecture", detail: "Policies, roles and architecture principles that scale with the business." },
      { title: "Incident readiness", detail: "Response plans, playbooks and tabletop exercises for leadership and technical teams." },
      { title: "Security awareness", detail: "Targeted awareness for staff, leadership and high-risk roles." },
    ],
    outcomes: [
      "A clear, board-ready picture of cyber exposure",
      "Technical findings prioritised by business impact",
      "A sequenced roadmap that ties spend to risk reduction",
      "Teams rehearsed for the incidents most likely to occur",
    ],
    method: [
      { title: "Baseline", detail: "Establish current maturity and the assets and processes that matter most." },
      { title: "Test", detail: "Validate controls technically — within an agreed scope and rules of engagement." },
      { title: "Prioritise", detail: "Rank findings by likelihood and business impact, not by scanner severity alone." },
      { title: "Plan", detail: "A funded, sequenced roadmap with owners and measurable milestones." },
    ],
    related: ["it-risk-advisory", "it-audit", "ai-process-automation"],
    disclaimer:
      "Technical testing is performed only under written authorisation and agreed rules of engagement.",
  },
  {
    slug: "data-analytics",
    number: "04",
    name: "Data Analytics",
    domain: "data",
    summary: "Dashboards and analytics that leadership trusts — built on data that reconciles.",
    seo: {
      title: "Data Analytics & Business Intelligence — Power BI, Tableau, SQL",
      description:
        "Management dashboards, KPI reporting, audit and financial analytics, data quality and automated reporting using Power BI, Tableau and SQL.",
    },
    hero: {
      headline: "Reporting leadership trusts the first time.",
      intro:
        "We build analytics that reconcile to source, answer the questions leaders actually ask, and refresh without a spreadsheet marathon.",
    },
    problem: {
      heading: "Most organizations have plenty of reports and too little insight.",
    },
    approach:
      "We start with the decisions a report must support, agree definitions, fix the data underneath, and only then design the dashboard. Adoption is part of the scope, not an afterthought.",
    capabilities: [
      { title: "Business intelligence", detail: "Semantic models, KPI definitions and self-service reporting foundations." },
      { title: "Dashboards & visualization", detail: "Management and operational dashboards in Power BI, Tableau or your chosen platform." },
      { title: "SQL & data engineering", detail: "Queries, transformations and pipelines that make reporting repeatable." },
      { title: "Audit analytics", detail: "Full-population testing, exception reporting and continuous control monitoring." },
      { title: "Financial & operational analytics", detail: "Margin, cost, working-capital and operational performance analysis." },
      { title: "Data quality", detail: "Profiling, rules and monitoring to find and fix data issues at source." },
    ],
    outcomes: [
      "One agreed version of key metrics",
      "Hours returned from manual report preparation",
      "Exceptions surfaced automatically instead of by chance",
      "Dashboards that are still used a year later",
    ],
    method: [
      { title: "Define", detail: "Agree the decisions, metrics and definitions before touching tools." },
      { title: "Prepare", detail: "Source, clean and model the data — reconciled to the system of record." },
      { title: "Build", detail: "Iterate dashboards with the people who will use them." },
      { title: "Adopt", detail: "Documentation, training and ownership so reporting survives handover." },
    ],
    related: ["data-science", "financial-accounting", "it-audit"],
  },
  {
    slug: "ai-process-automation",
    number: "05",
    name: "AI & Process Automation",
    domain: "data",
    summary: "Practical AI and automation, governed properly and tied to measurable work.",
    seo: {
      title: "AI & Process Automation — Enterprise AI, RPA & Intelligent Automation",
      description:
        "AI strategy, generative AI solutions, document processing, knowledge assistants, RPA and workflow automation — designed with governance and measurable outcomes.",
    },
    hero: {
      headline: "Automation that removes work, not just adds tools.",
      intro:
        "We identify where AI and automation genuinely improve a process, build solutions with appropriate controls, and measure whether they deliver.",
    },
    problem: {
      heading: "AI pilots are easy. Useful, governed AI in production is not.",
    },
    approach:
      "We treat AI as a process and control question first and a technology question second: what work changes, what could go wrong, how will we know it's working. Then we build.",
    capabilities: [
      { title: "AI strategy & use-case prioritisation", detail: "Identify, size and sequence use cases by value, feasibility and risk." },
      { title: "Generative AI solutions", detail: "Retrieval-based assistants, drafting and summarisation integrated into existing workflows." },
      { title: "AI document processing", detail: "Extraction and classification of invoices, contracts, forms and correspondence." },
      { title: "Intelligent automation & RPA", detail: "Rules-based and AI-assisted automation of high-volume, repeatable tasks." },
      { title: "AI-assisted reporting", detail: "Narrative generation and variance commentary with human review built in." },
      { title: "AI governance", detail: "Usage policies, model risk controls, human-in-the-loop design and monitoring." },
    ],
    outcomes: [
      "Use cases chosen on evidence, not enthusiasm",
      "Automations with clear owners, controls and fallbacks",
      "Measured reduction in manual handling time",
      "Governance that lets you scale AI responsibly",
    ],
    method: [
      { title: "Discover", detail: "Map the process as it runs today and measure where time and errors accumulate." },
      { title: "Prototype", detail: "Build a narrow, testable solution against real data and real users." },
      { title: "Control", detail: "Add review steps, logging, access controls and failure handling." },
      { title: "Scale", detail: "Productionise, monitor outcomes and extend to adjacent processes." },
    ],
    related: ["data-science", "bpr-erp", "cyber-advisory"],
  },
  {
    slug: "data-science",
    number: "06",
    name: "Data Science",
    domain: "data",
    summary: "Forecasts, models and anomaly detection you can explain and defend.",
    seo: {
      title: "Data Science Consulting — Predictive Analytics, Forecasting & Machine Learning",
      description:
        "Forecasting, predictive analytics, risk modelling, customer analytics and anomaly detection built with statistical rigour and explainability.",
    },
    hero: {
      headline: "Models that earn a place in the decision.",
      intro:
        "We build forecasting and predictive models that are statistically sound, explainable to non-specialists, and designed to be maintained after we leave.",
    },
    problem: {
      heading: "A model nobody understands rarely changes a decision.",
    },
    approach:
      "We choose the simplest method that answers the question well, validate it honestly against out-of-sample data, and present results with the uncertainty that belongs to them.",
    capabilities: [
      { title: "Forecasting", detail: "Demand, revenue, cash and volume forecasting with transparent assumptions." },
      { title: "Predictive analytics", detail: "Classification and regression models for churn, default, conversion and more." },
      { title: "Risk modelling", detail: "Scoring and early-warning models for credit, fraud and operational risk." },
      { title: "Anomaly detection", detail: "Statistical and machine-learning detection of unusual transactions and behaviour." },
      { title: "Customer analytics", detail: "Segmentation, lifetime value and behaviour analysis." },
      { title: "Statistical modelling", detail: "Experiment design, driver analysis and hypothesis testing." },
    ],
    outcomes: [
      "Forecasts with explicit assumptions and error ranges",
      "Models business owners can explain in their own words",
      "Earlier signals of fraud, default or operational failure",
      "Documented, maintainable model pipelines",
    ],
    method: [
      { title: "Frame", detail: "Translate the business question into a measurable prediction target." },
      { title: "Explore", detail: "Understand the data, its gaps and its biases before modelling." },
      { title: "Model", detail: "Build, compare and validate candidate approaches honestly." },
      { title: "Operationalise", detail: "Deploy, monitor drift and document for the people who inherit it." },
    ],
    related: ["data-analytics", "ai-process-automation", "it-risk-advisory"],
  },
  {
    slug: "tax",
    number: "07",
    name: "Tax",
    domain: "business",
    summary: "Tax compliance, planning and process — with the data and controls to back them up.",
    seo: {
      title: "Tax Advisory — Corporate Tax, Sales Tax, Compliance & Tax Process",
      description:
        "Corporate tax, sales tax, tax compliance, planning, tax risk and tax process improvement — supported by data and controls.",
    },
    hero: {
      headline: "Tax positions you can support with data.",
      intro:
        "We help organizations meet their obligations accurately, plan with clarity, and build the processes and data that make tax less of a year-end scramble.",
    },
    problem: {
      heading: "Tax risk often starts in systems and processes, not in the tax return.",
    },
    approach:
      "We combine technical tax advice with process and data work — so positions are well reasoned and the numbers behind them are traceable.",
    capabilities: [
      { title: "Corporate tax", detail: "Computations, provisions and advisory on corporate income tax matters." },
      { title: "Sales tax & indirect tax", detail: "Registration, compliance and review of indirect tax treatment." },
      { title: "Tax compliance", detail: "Preparation and review of returns and supporting documentation." },
      { title: "Tax planning", detail: "Structuring and planning within applicable law, documented clearly." },
      { title: "Tax risk & controls", detail: "Tax control frameworks and review of tax-relevant system configuration." },
      { title: "Tax process & reporting", detail: "Automation of tax data collection, reconciliation and reporting." },
    ],
    outcomes: [
      "Accurate, timely filings with traceable support",
      "Reduced exposure from system and process errors",
      "Tax data that reconciles to the general ledger",
      "Clear documentation for queries and reviews",
    ],
    method: [
      { title: "Diagnose", detail: "Review filings, positions, processes and the data that feeds them." },
      { title: "Advise", detail: "Set out treatment options, risks and our recommendation clearly." },
      { title: "Implement", detail: "Correct system configuration, reconciliations and documentation." },
      { title: "Sustain", detail: "Calendars, controls and reporting that keep compliance on track." },
    ],
    related: ["financial-accounting", "bpr-erp", "data-analytics"],
    disclaimer:
      "Tax advice depends on the laws of each jurisdiction and on specific facts. Content on this site is general information only and is not tax or legal advice.",
  },
  {
    slug: "financial-accounting",
    number: "08",
    name: "Financial Accounting",
    domain: "business",
    summary: "Faster, cleaner close and reporting — from IFRS judgement to finance transformation.",
    seo: {
      title: "Financial Accounting Advisory — IFRS, Financial Close & Finance Transformation",
      description:
        "IFRS advisory, financial reporting, month-end and financial close support, management reporting, financial controls and finance transformation.",
    },
    hero: {
      headline: "A close that is faster, calmer and easier to audit.",
      intro:
        "We support finance teams on reporting judgement, close discipline and the controls and processes that make numbers reliable month after month.",
    },
    problem: {
      heading: "Finance teams spend too much time producing numbers and too little explaining them.",
    },
    approach:
      "We work alongside your finance team — resolving technical accounting questions, then fixing the process and control gaps that cause the same issues to recur.",
    capabilities: [
      { title: "IFRS advisory", detail: "Technical accounting positions, policy papers and implementation of new standards." },
      { title: "Financial reporting", detail: "Preparation and review of financial statements and disclosures." },
      { title: "Financial close", detail: "Close calendar, reconciliations, journal controls and bottleneck removal." },
      { title: "Management reporting", detail: "Performance packs that connect financial results to operational drivers." },
      { title: "Financial controls", detail: "Design and testing of controls over financial reporting." },
      { title: "Finance transformation", detail: "Operating model, systems and process redesign for finance." },
    ],
    outcomes: [
      "Shorter, more predictable close cycles",
      "Well-documented accounting judgements",
      "Fewer audit adjustments and management letter points",
      "Reporting that explains performance, not just records it",
    ],
    method: [
      { title: "Assess", detail: "Review the close, reporting outputs and recurring audit points." },
      { title: "Resolve", detail: "Address open technical accounting and reporting questions first." },
      { title: "Redesign", detail: "Streamline the close and strengthen controls where issues originate." },
      { title: "Hand over", detail: "Documented procedures and a team equipped to run them." },
    ],
    related: ["tax", "data-analytics", "bpr-erp"],
  },
  {
    slug: "bpr-erp",
    number: "09",
    name: "BPR & ERP",
    domain: "business",
    summary: "Processes redesigned around how work should flow — and ERP configured to match.",
    seo: {
      title: "Business Process Re-engineering & ERP Consulting — SAP, Oracle, Dynamics",
      description:
        "Business process assessment and redesign, ERP advisory, implementation and transformation across procure-to-pay, order-to-cash, record-to-report and hire-to-retire.",
    },
    hero: {
      headline: "Processes that fit the business. Systems that fit the process.",
      intro:
        "We redesign end-to-end processes and help select, implement and optimise ERP platforms — with controls built in from the first design workshop.",
    },
    problem: {
      heading: "ERP projects often automate the problems they were meant to fix.",
    },
    approach:
      "We design the process first, then the system: standard where possible, configured where necessary, customised only when there is a clear business case — and always with the control implications understood.",
    capabilities: [
      { title: "Process assessment & redesign", detail: "Current-state mapping, pain-point analysis and future-state design." },
      { title: "ERP advisory & selection", detail: "Requirements, vendor evaluation and business case for ERP decisions." },
      { title: "ERP implementation support", detail: "Design authority, testing, data migration and cut-over support." },
      { title: "End-to-end processes", detail: "Procure-to-pay, order-to-cash, record-to-report, hire-to-retire and supply chain." },
      { title: "ERP controls", detail: "Role design, segregation of duties and configurable controls." },
      { title: "Platform experience", detail: "Advisory across SAP, Oracle and Microsoft Dynamics environments." },
    ],
    outcomes: [
      "Processes agreed before configuration begins",
      "Fewer customisations and cleaner upgrades",
      "Controls designed in, not retrofitted",
      "Adoption supported by clear roles and training",
    ],
    method: [
      { title: "Map", detail: "Document how work actually flows today — including the workarounds." },
      { title: "Design", detail: "Agree future-state processes, controls and data ownership." },
      { title: "Configure", detail: "Support build, testing and migration against the agreed design." },
      { title: "Stabilise", detail: "Resolve post-go-live issues and optimise for adoption." },
    ],
    related: ["it-audit", "ai-process-automation", "financial-accounting"],
    disclaimer:
      "Data Fold is an independent advisor. Platform names are trademarks of their respective owners; no partnership is implied.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByDomain = (domain: DomainId) => services.filter((s) => s.domain === domain);

/**
 * Cross-service relationships drawn in the ecosystem visualization.
 * Each link names the joint capability that connects the two services.
 */
export const serviceLinks: { a: ServiceSlug; b: ServiceSlug; reason: string }[] = [
  { a: "it-audit", b: "it-risk-advisory", reason: "Control frameworks tested in practice" },
  { a: "it-risk-advisory", b: "cyber-advisory", reason: "Security risk in the enterprise risk view" },
  { a: "it-audit", b: "cyber-advisory", reason: "Security control assurance" },
  { a: "data-analytics", b: "data-science", reason: "From reporting to prediction" },
  { a: "data-science", b: "ai-process-automation", reason: "Models embedded in workflows" },
  { a: "data-analytics", b: "ai-process-automation", reason: "AI-assisted reporting" },
  { a: "financial-accounting", b: "tax", reason: "Provisions and reporting that reconcile" },
  { a: "financial-accounting", b: "bpr-erp", reason: "Finance transformation" },
  { a: "tax", b: "bpr-erp", reason: "Tax configuration in ERP" },
  { a: "it-audit", b: "data-analytics", reason: "Full-population audit analytics" },
  { a: "it-audit", b: "bpr-erp", reason: "ERP controls and segregation of duties" },
  { a: "it-risk-advisory", b: "data-science", reason: "Risk scoring and early warning" },
  { a: "cyber-advisory", b: "ai-process-automation", reason: "Secure, governed AI" },
  { a: "data-analytics", b: "financial-accounting", reason: "Management reporting" },
  { a: "ai-process-automation", b: "bpr-erp", reason: "Process automation" },
  { a: "data-science", b: "financial-accounting", reason: "Forecasting and planning" },
  { a: "tax", b: "data-analytics", reason: "Tax data analytics" },
  { a: "it-audit", b: "financial-accounting", reason: "Controls over financial reporting" },
];
