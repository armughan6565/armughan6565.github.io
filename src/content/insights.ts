/**
 * Insights content model.
 *
 * Bodies are structured blocks (not HTML strings) so they render without
 * dangerouslySetInnerHTML and map cleanly onto portable-text / rich-text
 * fields in Sanity, Contentful, Strapi or WordPress (via its block API).
 * To connect a CMS, replace `getAllInsights` / `getInsight` with fetchers
 * returning the same `Insight` shape — no component changes needed.
 *
 * All entries below are EDITORIAL SAMPLES (`sample: true`) written to
 * demonstrate the layout. Review, replace or approve before launch.
 */

export type InsightCategory = "Risk" | "Technology" | "AI" | "Data" | "Finance";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface Insight {
  slug: string;
  title: string;
  dek: string;
  category: InsightCategory;
  format: "Article" | "Perspective";
  published: string; // ISO date
  readingMinutes: number;
  sample: boolean;
  body: Block[];
}

export const insightCategories: InsightCategory[] = ["Risk", "Technology", "AI", "Data", "Finance"];

const insights: Insight[] = [
  {
    slug: "itgc-evidence-that-holds",
    title: "IT general controls: why evidence, not design, is where audits are lost",
    dek: "Most ITGC deficiencies are not missing controls. They are controls that run but cannot be proven.",
    category: "Risk",
    format: "Perspective",
    published: "2026-06-12",
    readingMinutes: 6,
    sample: true,
    body: [
      { type: "p", text: "When IT general controls fail an audit, the conversation usually turns to design: was the right control in place? In practice, a large share of deficiencies arise somewhere else — the control operated, but nobody can show that it did." },
      { type: "h2", text: "The evidence gap" },
      { type: "p", text: "User access reviews are completed but signed off by email with no record of what list was reviewed. Changes are approved in a ticketing tool, but the population of changes cannot be reconciled to what actually moved into production. Each is a control that exists and still fails." },
      { type: "list", items: [
        "Define the evidence for each control before the period starts, not when the auditor asks.",
        "Make populations complete and system-generated wherever possible.",
        "Retain the parameters of every report used as evidence.",
      ] },
      { type: "h2", text: "Designing for proof" },
      { type: "p", text: "A control that is designed to produce evidence as a by-product of operating is cheaper to run and easier to rely on. That often means small configuration changes — a mandatory field, an automated log export — rather than new process." },
      { type: "quote", text: "The best control evidence is the kind nobody has to assemble." },
      { type: "p", text: "Organizations that treat evidence as a design requirement tend to see fewer late findings and shorter audit fieldwork. The effort moves earlier, where it is cheaper." },
    ],
  },
  {
    slug: "ai-pilots-to-production",
    title: "From AI pilot to production: the control questions to answer first",
    dek: "Most AI initiatives stall between a promising demo and a process people rely on. The gap is usually governance, not technology.",
    category: "AI",
    format: "Article",
    published: "2026-05-28",
    readingMinutes: 7,
    sample: true,
    body: [
      { type: "p", text: "Generative AI has made it easy to build a convincing prototype in days. Moving that prototype into a process that finance, compliance or operations teams depend on is a different problem." },
      { type: "h2", text: "Five questions before scaling" },
      { type: "list", items: [
        "What decision or task changes — and who remains accountable for it?",
        "What data does the solution see, and is it permitted to?",
        "How will errors be detected before they reach a customer, a ledger or a regulator?",
        "What happens when the model is unavailable or wrong?",
        "How will you know, in six months, whether it is still working?",
      ] },
      { type: "p", text: "None of these are exotic. They are the same questions risk and audit teams ask of any automated control. Answering them early keeps AI projects moving instead of stalling in review." },
      { type: "h2", text: "Human review as a design choice" },
      { type: "p", text: "Human-in-the-loop is often added as a safety net. It works better as a deliberate design decision: which outputs are reviewed, by whom, with what evidence, and when review can be relaxed as confidence grows." },
    ],
  },
  {
    slug: "dashboards-that-survive",
    title: "Why most dashboards stop being used — and how to build ones that last",
    dek: "Adoption fails on definitions and trust long before it fails on design.",
    category: "Data",
    format: "Article",
    published: "2026-05-06",
    readingMinutes: 5,
    sample: true,
    body: [
      { type: "p", text: "A new dashboard usually launches well. Three months later, the old spreadsheet is back. The reason is rarely the visual design." },
      { type: "h2", text: "Three reasons dashboards die" },
      { type: "list", items: [
        "The numbers do not match another report, and nobody can explain why.",
        "The metric definitions were never agreed, only assumed.",
        "There is no owner responsible for the data once the project team leaves.",
      ] },
      { type: "p", text: "Each of these is solvable before a single chart is drawn. Agree the decisions the dashboard supports, write down definitions, reconcile to the system of record, and name an owner." },
      { type: "quote", text: "Trust is a data problem first and a design problem second." },
    ],
  },
  {
    slug: "erp-process-before-configuration",
    title: "Design the process before you configure the ERP",
    dek: "Configuration decisions made without an agreed process become expensive customisations later.",
    category: "Technology",
    format: "Perspective",
    published: "2026-04-17",
    readingMinutes: 6,
    sample: true,
    body: [
      { type: "p", text: "ERP programmes often begin with system demonstrations. It is an understandable instinct, but it inverts the order that produces good outcomes." },
      { type: "h2", text: "Why sequence matters" },
      { type: "p", text: "When the future-state process is not agreed, every workshop becomes a negotiation about configuration. Teams defend current workarounds, and the system is bent to match them." },
      { type: "list", items: [
        "Agree end-to-end processes and ownership first.",
        "Identify controls and segregation-of-duties requirements during design, not after go-live.",
        "Treat every customisation as a business case, not a default.",
      ] },
      { type: "p", text: "The result is a cleaner system, easier upgrades and a control environment that does not need to be retrofitted." },
    ],
  },
  {
    slug: "faster-close-without-shortcuts",
    title: "A faster close without cutting corners",
    dek: "Shortening the close is mostly about removing late surprises, not working longer hours.",
    category: "Finance",
    format: "Article",
    published: "2026-03-30",
    readingMinutes: 5,
    sample: true,
    body: [
      { type: "p", text: "Finance leaders often want a shorter close. The instinct is to compress the timetable. The more durable approach is to remove the reasons the close runs long." },
      { type: "h2", text: "Where time actually goes" },
      { type: "list", items: [
        "Reconciliations started after period end instead of continuously.",
        "Late adjustments from operations that finance could have anticipated.",
        "Manual consolidation and report preparation.",
      ] },
      { type: "p", text: "Moving reconciliation earlier, agreeing cut-off rules with operations and automating repeatable reporting typically shortens the close without adding risk." },
    ],
  },
  {
    slug: "board-level-cyber-reporting",
    title: "Cyber reporting boards can actually use",
    dek: "Boards do not need more technical detail. They need a clearer link between exposure, investment and risk reduction.",
    category: "Risk",
    format: "Perspective",
    published: "2026-03-09",
    readingMinutes: 6,
    sample: true,
    body: [
      { type: "p", text: "Security reporting to boards tends to fall into two traps: dashboards full of technical metrics, or reassuring summaries that hide real exposure." },
      { type: "h2", text: "What good looks like" },
      { type: "list", items: [
        "A small number of risk scenarios described in business terms.",
        "Current capability against each scenario, based on evidence.",
        "The investment required to close the gap, and what it buys.",
      ] },
      { type: "p", text: "Framed this way, cybersecurity becomes a risk decision like any other — which is exactly what boards are equipped to make." },
    ],
  },
];

export const getAllInsights = () =>
  [...insights].sort((a, b) => b.published.localeCompare(a.published));

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
