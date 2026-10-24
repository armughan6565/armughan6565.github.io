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
    line: "Analytics, data science and AI.",
    description:
      "Analytics, data science and AI services.",
  },
  technology: {
    name: "Technology",
    line: "IT audit, technology risk and cyber.",
    description:
      "Assurance, risk and security services for your technology.",
  },
  business: {
    name: "Business",
    line: "Tax, accounting and ERP.",
    description:
      "Finance, tax and process design services.",
  },
};

export const domainOrder: DomainId[] = ["data", "technology", "business"];

export const services: Service[] = [
  {
    slug: "it-audit",
    number: "01",
    name: "IT Audit",
    domain: "technology",
    summary: "Independent testing of IT general, application and ERP controls.",
    seo: {
      title: "IT Audit — ITGC, Application Controls & Technology Assurance",
      description:
        "IT general controls, application controls, ERP controls and system implementation reviews. Independent technology assurance from Data Fold.",
    },
    hero: {
      headline: "IT Audit",
      intro:
        "We test the controls in your systems so that management, auditors and boards can rely on the information they produce.",
    },
    approach:
      "Risk-based audit plans, evidence-based testing, and findings that state root cause, impact and a recommended fix.",
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
      "Fewer issues raised late in year-end and statutory audits",
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
    summary: "Technology risk assessment, governance and control frameworks.",
    seo: {
      title: "IT Risk Advisory — Technology Risk, IT Governance & Control Frameworks",
      description:
        "Technology risk assessments, IT governance, third-party technology risk and control maturity reviews that help leadership understand and manage IT risk.",
    },
    hero: {
      headline: "IT Risk Advisory",
      intro:
        "We identify technology risks, assess how well they are controlled and set priorities for remediation.",
    },
    approach:
      "Risk assessments linked to business processes, and governance and control frameworks sized to your organization.",
    capabilities: [
      { title: "Technology risk assessments", detail: "Identify, rate and prioritise technology risks against business impact and appetite." },
      { title: "IT governance", detail: "Decision rights, policies, committees and reporting lines for technology." },
      { title: "Risk & control frameworks", detail: "Control libraries mapped to recognised good-practice frameworks and to your actual systems." },
      { title: "Third-party technology risk", detail: "Due diligence, ongoing oversight and exit planning for critical technology suppliers." },
      { title: "Control maturity assessments", detail: "Where you are, where you need to be, and the sequence to get there." },
      { title: "Risk remediation", detail: "Hands-on support to close findings and embed durable fixes." },
    ],
    outcomes: [
      "A technology risk profile for management review",
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
    summary: "Cyber maturity assessments, vulnerability testing and security roadmaps.",
    seo: {
      title: "Cybersecurity Advisory — Cyber Risk, Maturity & Vulnerability Assessment",
      description:
        "Cyber maturity and risk assessments, security governance, vulnerability assessment, penetration testing and incident readiness from Data Fold.",
    },
    hero: {
      headline: "Cyber Advisory",
      intro:
        "We assess your security controls, test for vulnerabilities and provide a prioritised improvement plan.",
    },
    approach:
      "Governance assessment combined with technical testing, with findings linked to business risk.",
    capabilities: [
      { title: "Cyber maturity assessment", detail: "Benchmark capability across governance, protection, detection and response." },
      { title: "Cyber risk assessment", detail: "Threat-informed view of the scenarios most likely to hurt your organization." },
      { title: "Vulnerability assessment & penetration testing", detail: "Scoped, authorised testing of infrastructure, applications and cloud exposure." },
      { title: "Security governance & architecture", detail: "Policies, roles and architecture principles that scale with the business." },
      { title: "Incident readiness", detail: "Response plans, playbooks and tabletop exercises for leadership and technical teams." },
      { title: "Security awareness", detail: "Targeted awareness for staff, leadership and high-risk roles." },
    ],
    outcomes: [
      "A board-level summary of cyber risk",
      "Technical findings prioritised by business impact",
      "A sequenced roadmap linking spend to risk reduction",
      "Incident response plans tested through exercises",
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
    summary: "Management reporting, dashboards and data quality.",
    seo: {
      title: "Data Analytics & Business Intelligence — Power BI, Tableau, SQL",
      description:
        "Management dashboards, KPI reporting, audit and financial analytics, data quality and automated reporting using Power BI, Tableau and SQL.",
    },
    hero: {
      headline: "Data Analytics",
      intro:
        "We build reports and dashboards that reconcile to source data and refresh automatically.",
    },
    approach:
      "We agree metric definitions, fix the underlying data, then design the reports and train users.",
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
      "Less time spent preparing reports manually",
      "Automated exception reporting",
      "Dashboards adopted by their intended users",
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
    summary: "Process automation and AI solutions with appropriate controls.",
    seo: {
      title: "AI & Process Automation — Enterprise AI, RPA & Intelligent Automation",
      description:
        "AI strategy, generative AI solutions, document processing, knowledge assistants, RPA and workflow automation — designed with governance and measurable outcomes.",
    },
    hero: {
      headline: "AI & Process Automation",
      intro:
        "We identify processes suited to automation and AI, build the solutions and measure the results.",
    },
    approach:
      "We define the process change, risks and success measures before building any solution.",
    capabilities: [
      { title: "AI strategy & use-case prioritisation", detail: "Identify, size and sequence use cases by value, feasibility and risk." },
      { title: "Generative AI solutions", detail: "Retrieval-based assistants, drafting and summarisation integrated into existing workflows." },
      { title: "AI document processing", detail: "Extraction and classification of invoices, contracts, forms and correspondence." },
      { title: "Intelligent automation & RPA", detail: "Rules-based and AI-assisted automation of high-volume, repeatable tasks." },
      { title: "AI-assisted reporting", detail: "Narrative generation and variance commentary with human review built in." },
      { title: "AI governance", detail: "Usage policies, model risk controls, human-in-the-loop design and monitoring." },
    ],
    outcomes: [
      "Use cases selected on measured benefit",
      "Automations with clear owners, controls and fallbacks",
      "Measured reduction in manual handling time",
      "An AI governance framework",
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
    summary: "Forecasting, predictive models and anomaly detection.",
    seo: {
      title: "Data Science Consulting — Predictive Analytics, Forecasting & Machine Learning",
      description:
        "Forecasting, predictive analytics, risk modelling, customer analytics and anomaly detection built with statistical rigour and explainability.",
    },
    hero: {
      headline: "Data Science",
      intro:
        "We build forecasting and predictive models that are documented, explainable and maintainable by your team.",
    },
    approach:
      "We use the simplest suitable method, validate it on out-of-sample data and report the uncertainty.",
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
      "Models documented in plain language",
      "Earlier detection of fraud, default or operational failure",
      "Documented, maintainable model pipelines",
    ],
    method: [
      { title: "Frame", detail: "Translate the business question into a measurable prediction target." },
      { title: "Explore", detail: "Understand the data, its gaps and its biases before modelling." },
      { title: "Model", detail: "Build, compare and validate candidate models." },
      { title: "Operationalise", detail: "Deploy, monitor drift and document for the people who inherit it." },
    ],
    related: ["data-analytics", "ai-process-automation", "it-risk-advisory"],
  },
  {
    slug: "tax",
    number: "07",
    name: "Tax",
    domain: "business",
    summary: "Tax compliance, advisory and tax process improvement.",
    seo: {
      title: "Tax Advisory — Corporate Tax, Sales Tax, Compliance & Tax Process",
      description:
        "Corporate tax, sales tax, tax compliance, planning, tax risk and tax process improvement — supported by data and controls.",
    },
    hero: {
      headline: "Tax",
      intro:
        "We support tax compliance and planning, and improve the processes and data behind your tax figures.",
    },
    approach:
      "Technical tax advice combined with process and data work, so figures are traceable.",
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
    summary: "Financial reporting, IFRS advisory and month-end close support.",
    seo: {
      title: "Financial Accounting Advisory — IFRS, Financial Close & Finance Transformation",
      description:
        "IFRS advisory, financial reporting, month-end and financial close support, management reporting, financial controls and finance transformation.",
    },
    hero: {
      headline: "Financial Accounting",
      intro:
        "We support finance teams on accounting judgements, the month-end close and financial controls.",
    },
    approach:
      "We resolve technical accounting questions and fix the process and control gaps behind recurring issues.",
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
      "Management reporting with variance analysis",
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
    summary: "Business process redesign, and ERP selection and implementation.",
    seo: {
      title: "Business Process Re-engineering & ERP Consulting — SAP, Oracle, Dynamics",
      description:
        "Business process assessment and redesign, ERP advisory, implementation and transformation across procure-to-pay, order-to-cash, record-to-report and hire-to-retire.",
    },
    hero: {
      headline: "BPR & ERP",
      intro:
        "We redesign business processes and help select, implement and optimise ERP systems, with controls designed in.",
    },
    approach:
      "Process design first, then system configuration, with customisation only where there is a clear business case.",
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
      "Controls included in the system design",
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
