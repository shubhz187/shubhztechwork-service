export interface CaseStudy {
  slug: string;
  client: string;
  subtitle: string;
  industry: string;
  projectType: string;
  excerpt: string;
  gradient: string;
  stack: string[];
  highlights: { value: string; label: string }[];
  metaTitle: string;
  metaDescription: string;
  content: string;
  comingSoon?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'spark-ai-tutor',
    client: 'SPARK AI Tutor',
    subtitle: 'A Socratic AI tutoring agent that teaches through guided questioning, not just answers.',
    industry: 'EdTech / AI',
    projectType: 'AI Product Design + Agent Architecture',
    excerpt: 'ShubhzTechWork designed a Socratic AI tutoring agent under the ShubhzHorizon / SPARK initiative : moving beyond answer bots to build a system that diagnoses understanding, asks layered questions, and adapts in real time.',
    gradient: 'from-violet-500 to-purple-500',
    stack: ['LLM Orchestration', 'Prompt Engineering', 'Multi-Agent Design', 'RAG', 'Python'],
    highlights: [
      { value: '5-Layer', label: 'Tutoring Architecture' },
      { value: '7', label: 'Agent Modules' },
      { value: '3-Phase', label: 'Product Roadmap' },
    ],
    metaTitle: 'SPARK AI Tutor : Socratic AI Agent Case Study | ShubhzTechWork',
    metaDescription: 'How ShubhzTechWork designed a Socratic AI tutoring agent with adaptive questioning, progressive hints, and modular multi-agent architecture for deeper learning outcomes.',
    content: `
<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Executive Summary</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">ShubhzTechWork designed and prototyped a Socratic Agent as part of its broader AI education vision under ShubhzHorizon / SPARK AI Tutor. The goal was clear: move beyond the "answer bot" model and create an AI tutor that teaches learners through guided questioning, adaptive hints, and reflective learning.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">Instead of giving direct solutions immediately, the Socratic Agent follows a structured pedagogy approach : it diagnoses learner understanding, asks layered questions, provides progressive hints, adapts to difficulty in real time, and closes each session with a personalized learning recap.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-1">Core Principle</p>
  <p class="text-muted-foreground text-sm">Ask → Guide → Hint → Reflect → Reinforce : not Ask → Answer → Done.</p>
</div>

%%ANIMATION:socraticTutor%%

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">The Challenge</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Most AI learning tools are optimized for speed: students type a question, and the system returns an answer. While useful for quick help, this creates a hidden problem : students become dependent on answers instead of developing reasoning skills.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">The team set out to solve a difficult but high-value problem: <strong class="text-foreground">how do you build an AI tutor that improves learning quality, not just response speed?</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Avoiding answer-first behavior</strong> : most LLM-based systems default to direct responses, which can reduce genuine learning</li>
  <li><strong class="text-foreground">Making questioning feel helpful, not annoying</strong> : random follow-up questions frustrate users. Questioning must be strategic and relevant</li>
  <li><strong class="text-foreground">Supporting multiple learner levels</strong> : beginners need simpler language and smaller steps; advanced learners need depth and challenge</li>
  <li><strong class="text-foreground">Preserving educational trust</strong> : hallucinated or misleading explanations damage learner confidence and outcomes</li>
  <li><strong class="text-foreground">Balancing pedagogy with product usability</strong> : the system had to be educationally sound and practical enough for a real app experience</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Solution: The Socratic Agent Architecture</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">ShubhzTechWork designed the Socratic Agent as a modular AI tutor architecture built around learning psychology and structured tutoring behavior. The system operates through five functional layers:</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">1. Learner Diagnosis Layer</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Before teaching, the agent evaluates what the learner already knows, where confusion exists, the type of mistake being made, and the learner's confidence level. This eliminates generic responses and enables personalized tutoring from the first interaction.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">2. Socratic Questioning Engine</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The agent asks targeted prompts designed to activate thinking:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Clarifying questions</strong> : "What is the question really asking?"</li>
  <li><strong class="text-foreground">Reasoning questions</strong> : "Why did you choose this method?"</li>
  <li><strong class="text-foreground">Transfer questions</strong> : "How would this change if the values changed?"</li>
  <li><strong class="text-foreground">Reflection questions</strong> : "What part felt confusing?"</li>
</ul>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">3. Progressive Hint System (Hint Ladder)</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Rather than revealing the solution immediately, the agent supports a staged help model that creates a better learning gradient:</p>

<div class="bg-black/60 border border-white/10 p-5 rounded-xl mb-6 font-mono text-sm">
  <div class="text-violet-400">Hint 1: Concept reminder</div>
  <div class="text-violet-400">Hint 2: Direction / next step</div>
  <div class="text-violet-400">Hint 3: Worked structure / skeleton</div>
  <div class="text-violet-400">Hint 4: Full solution + explanation</div>
</div>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">4. Adaptive Tutoring Logic</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The agent adjusts in real time based on learner response quality : simplifying language for beginners, breaking tasks into micro-steps, adding analogies and examples, or increasing challenge for stronger learners.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">5. Session Closure & Reinforcement</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">At the end of each session, the agent provides a summary of what was learned, identifies weak areas, suggests revision prompts, generates follow-up practice questions, and outlines future focus areas.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Multi-Agent Architecture</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">To support scale and future expansion, the project was designed as a modular agent system rather than a single monolithic chatbot:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Intent / Goal Classifier Agent</strong> : identifies whether the user wants to learn, revise, test, or debug a mistake</li>
  <li><strong class="text-foreground">Socratic Strategy Agent</strong> : determines what kind of questions to ask and when</li>
  <li><strong class="text-foreground">Knowledge / RAG Agent</strong> : retrieves trusted content from notes, PDFs, and curated resources</li>
  <li><strong class="text-foreground">Pedagogy Adaptation Agent</strong> : adjusts explanation style and difficulty based on learner behavior</li>
  <li><strong class="text-foreground">Evaluation Agent</strong> : assesses reasoning quality, not just final correctness</li>
  <li><strong class="text-foreground">Learner Memory / Profile Agent</strong> : tracks weak topics, pace, hint dependence, and learning patterns</li>
  <li><strong class="text-foreground">Session Summary Agent</strong> : produces recap notes, progress insights, and next steps</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Implementation Roadmap</h2>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 1 : MVP Foundation</p>
  <p class="text-muted-foreground text-sm">Student chat interface, topic-based tutoring, Socratic questioning flow, multi-level hint support, session summary, basic learner profiling, and RAG-ready PDF/notes upload.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 2 : Product Expansion</p>
  <p class="text-muted-foreground text-sm">Quiz generation, mistake diagnosis mode, progress tracking dashboard, multi-subject support, and personalized revision plans.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 3 : Advanced Learning Intelligence</p>
  <p class="text-muted-foreground text-sm">Multi-agent orchestration, teacher/admin analytics, gamification (streaks, badges, mastery milestones), voice tutoring interfaces, and institutional deployment capabilities.</p>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Outcomes</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li>Designed a pedagogy-first tutoring framework that prioritizes concept mastery and critical thinking over answer speed</li>
  <li>Built a modular 7-agent architecture that can evolve from MVP tutor to full intelligent learning platform</li>
  <li>Created a clear 3-phase product roadmap from student chat to institutional-grade deployment</li>
  <li>Established RAG-ready infrastructure for trusted content retrieval from course materials</li>
  <li>Delivered a system with strong differentiation in the EdTech market : guided questioning, not just answer generation</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">What Makes This Different</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Most AI tutoring experiences stop at "chat with an LLM." The Socratic Agent was intentionally designed as a pedagogy-first system with product architecture that supports scale. Differentiators include guided questioning over answer generation, hint ladders and adaptive tutoring behavior, reasoning evaluation beyond correctness, modular architecture for multi-agent expansion, and a clear path from MVP to institutional-grade product.</p>

<p class="text-muted-foreground leading-relaxed">In short: this is not a chatbot feature. It is a learning engine.</p>
`,
  },
  {
    slug: 'earthen-lifestyles-ecosystem',
    client: 'EarthenLifestyles',
    subtitle: 'A values-driven digital ecosystem for community, commerce, culture, and contribution.',
    industry: 'Lifestyle / Ecosystem',
    projectType: 'Digital Ecosystem Design + Multi-Platform Strategy',
    excerpt: 'EarthenLifestyles needed more than a website : it needed a connected ecosystem of community, commerce, culture, and social impact, designed to start lean and scale into multiple platforms without operational chaos.',
    gradient: 'from-emerald-500 to-teal-500',
    stack: ['Ecosystem Architecture', 'Brand Strategy', 'Community Design', 'Phase Planning', 'UX'],
    highlights: [
      { value: '10+', label: 'Platform Verticals' },
      { value: '3-Phase', label: 'Rollout Strategy' },
      { value: '5-Layer', label: 'Ecosystem Architecture' },
    ],
    metaTitle: 'EarthenLifestyles : Digital Ecosystem Design Case Study | ShubhzTechWork',
    metaDescription: 'How ShubhzTechWork designed a phased digital ecosystem for EarthenLifestyles : combining community, commerce, culture, and contribution under a scalable, values-driven brand architecture.',
    content: `
<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Executive Summary</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">EarthenLifestyles was conceived as more than a single website. It was designed as a digital lifestyle ecosystem that brings people together through meaningful experiences : community participation, mindful commerce, culture, events, wellness, and contribution-led engagement.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">The core challenge was not "how to build a website," but <strong class="text-foreground">how to architect an ecosystem that could start lean, launch fast, and still scale into multiple connected platforms over time</strong> without becoming operationally chaotic.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-1">Strategy</p>
  <p class="text-muted-foreground text-sm">Define the full ecosystem vision upfront → scope each platform clearly → launch one flagship platform in Phase 1 → design the rest as future-ready extensions → build a repeatable growth loop: discover → join → engage → return → refer.</p>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">The Challenge</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">The EarthenLifestyles project faced a classic early-stage growth problem with multiple dimensions:</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Big Vision, High Complexity</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The concept naturally expanded into multiple platform ideas : marketplace, community, events, wellness, music, education, advisory, travel, philanthropy. Without structure, this could lead to fragmented branding, duplicated effort, high build costs, and indefinitely delayed launches.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Community-First Growth Requirement</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The goal was not traffic : the project needed a loop where users join groups, gain benefits, engage repeatedly, bring others in, and strengthen the ecosystem. Standard website metrics were not sufficient.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Startup-Stage Resource Constraints</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Like most founder-led ecosystems, EarthenLifestyles had to balance development cost, hosting cost, team capacity, phased execution, and realistic go-to-market timing.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Scope Ambiguity Across Platforms</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Each sub-platform had promise, but needed clear answers to: What exactly does this platform do? Who are the actors? What workflows does it support? How does it feed the larger ecosystem loop?</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Solution: Phase-First Ecosystem Strategy</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Instead of launching multiple platforms at once, EarthenLifestyles followed a layered strategy designed around three principles:</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">1. Phase-First Ecosystem Planning</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The ecosystem was mapped as a long-term vision, but execution was intentionally sequenced. Phase 1 launches one high-impact platform. Phase 2+ expands into adjacent platforms based on traction, demand, and team capacity.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">2. Scope Standardization</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Each platform was defined using a consistent structure : what it is, who it serves, key actors, core functions, additional scopes, and how it feeds the community growth loop. This made the entire ecosystem easier to compare, prioritize, and budget.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">3. Ecosystem Growth Loop Design</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">A central design principle was that every platform should support this loop:</p>

<div class="bg-black/60 border border-white/10 p-5 rounded-xl mb-6 font-mono text-sm text-emerald-400">
  Discovery → Participation → Value → Repeat Engagement → Community Belonging → Referral / Growth
</div>

%%ANIMATION:ecosystemLoop%%

<p class="mb-5 text-muted-foreground leading-relaxed">This shifted planning from "website features" to behavior design and ecosystem retention.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Ecosystem Architecture</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">The solution was structured as five interconnected layers:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Layer 1 : Brand & Identity:</strong> Unified EarthenLifestyles positioning with values-driven messaging around nature, culture, wellness, and contribution</li>
  <li><strong class="text-foreground">Layer 2 : Flagship Platform:</strong> One launch-ready website chosen for traction and execution feasibility, with structured content and repeat-use mechanics</li>
  <li><strong class="text-foreground">Layer 3 : Engagement & Community:</strong> Groups, circles, recurring participation, events, member activities, and future-ready loyalty/recognition systems</li>
  <li><strong class="text-foreground">Layer 4 : Platform Expansion:</strong> Marketplace, education, advisory, travel, culture/music/spiritual verticals, and philanthropy modules</li>
  <li><strong class="text-foreground">Layer 5 : Operations:</strong> Team roles, content workflows, customer support/moderation, vendor coordination, hosting and maintenance</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Implementation Approach</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Ecosystem Vision Mapping</strong> : identified all potential platforms and their relationship to the core mission</li>
  <li><strong class="text-foreground">Platform Scope Definition</strong> : documented each in a consistent format to eliminate ambiguity</li>
  <li><strong class="text-foreground">Costing & Feasibility Planning</strong> : evaluated dev cost, hosting (VPS-based), people cost, and post-release support</li>
  <li><strong class="text-foreground">Platform Prioritization</strong> : selected a single platform to validate demand, engagement, operations, and brand pull</li>
  <li><strong class="text-foreground">Growth & Community Planning</strong> : designed acquisition and retention through value-based messaging, repeat experiences, and event-led engagement</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Outcomes</h2>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Strategic Outcomes</p>
  <ul class="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
    <li>Clear ecosystem vision documented with 10+ platform verticals identified</li>
    <li>Scope definitions standardized across all platforms</li>
    <li>Phase-wise execution approach established</li>
    <li>Cost planning implemented across dev, hosting, people, and support</li>
    <li>Community-led growth loop defined and integrated into every platform design</li>
  </ul>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Business Readiness</p>
  <ul class="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
    <li>Website-level positioning clarified for professional presentation</li>
    <li>Content direction shifted from ideas to investor/partner-friendly communication</li>
    <li>Execution planning moved from concepts to buildable, budgetable modules</li>
  </ul>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">What Makes This Different</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Ecosystem, not a standalone site</strong> : designed to evolve into an integrated network of experiences, not just content or commerce</li>
  <li><strong class="text-foreground">Utility + Identity</strong> : users interact because the platform reflects a lifestyle and value system, not just because it is useful</li>
  <li><strong class="text-foreground">Intentionally phase-driven</strong> : resists the startup trap of "build everything now," prioritizing sequencing and sustainability</li>
  <li><strong class="text-foreground">Community-native</strong> : built around repeat participation and belonging, not one-time transactions</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Learnings</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Big visions need modular planning : a strong ecosystem vision is an advantage only when translated into phased execution. Scope clarity saves money by preventing feature creep and duplicate builds. Community is a growth asset, not just a feature : when users feel participation and identity, retention improves naturally. And the best balance between speed and scalability is to start small while designing big.</p>

<p class="text-muted-foreground leading-relaxed">EarthenLifestyles is being built as a new kind of digital ecosystem : one that blends community, culture, commerce, and contribution in a way that is practical, scalable, and deeply human.</p>
`,
  },
  {
    slug: 'aws-connect-devops-platform',
    client: 'Connect–Lex–Lambda DevOps Platform',
    subtitle: 'A dependency-aware deployment engine for Amazon Connect ecosystems across AWS accounts.',
    industry: 'Cloud / DevOps',
    projectType: 'Cross-Account DevOps Orchestration Platform',
    excerpt: 'We built a configuration orchestration engine that extracts, versions, packages, and deploys Amazon Connect/Lex/Lambda configurations across AWS accounts : replacing fragile manual migration with repeatable, auditable releases.',
    gradient: 'from-orange-500 to-red-500',
    stack: ['AWS Connect', 'AWS Lambda', 'Amazon Lex', 'S3', 'DynamoDB', 'STS', 'Java / Spring Boot', 'React / Vite'],
    highlights: [
      { value: 'Cross-Account', label: 'Deployment Engine' },
      { value: 'Dependency-Aware', label: 'Snapshotting' },
      { value: 'Full UI', label: 'Operator Dashboard' },
    ],
    metaTitle: 'AWS Connect DevOps Platform : Cross-Account Deployment Case Study | ShubhzTechWork',
    metaDescription: 'How ShubhzTechWork built a dependency-aware cross-account deployment platform for Amazon Connect, Lex, and Lambda with versioned snapshots, packaging, and an operator dashboard.',
    content: `
<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Executive Summary</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Modern Amazon Connect environments are tightly coupled with downstream services : Amazon Lex bots, AWS Lambda functions, prompts, queues, and other referenced resources. Moving these configurations across environments (dev/test/prod) or across AWS accounts is often manual, error-prone, and difficult to audit.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">We designed and implemented a <strong class="text-foreground">Connect–Lex–Lambda DevOps orchestration platform</strong> that can extract environment configurations, parse dependencies embedded in Connect flow definitions, store versioned snapshots, build deployable packages, perform cross-account deployments using AWS STS AssumeRole, and expose the workflow through a professional operator dashboard.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-1">Result</p>
  <p class="text-muted-foreground text-sm">Transformed a fragile manual migration process into a repeatable, versioned, and scalable deployment pipeline for contact-center configurations.</p>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">The Problem</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Amazon Connect deployments often break when organizations try to move contact flows between environments because the flows reference external resources : Lambda ARNs, Lex bot integrations, prompts, queues, and hours of operation. A contact flow may import successfully but still <strong class="text-foreground">fail functionally</strong> if referenced resource ARNs differ between accounts.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">Common approaches rely on manual recreation in the AWS Console, ad hoc export/import scripts, one-off JSON edits, and tribal knowledge of dependencies. These methods create:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li>High operational risk</li>
  <li>Slow release cycles</li>
  <li>Limited traceability</li>
  <li>Difficult rollback procedures</li>
  <li>Environment drift over time</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Solution: Cross-Account Configuration Orchestration</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">We built a modular orchestration engine with the following core capabilities:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Snapshot Extraction</strong> for Amazon Connect, Lex, and Lambda configurations</li>
  <li><strong class="text-foreground">Dependency Mapping</strong> from Connect flow JSON parsing</li>
  <li><strong class="text-foreground">Artifact Storage</strong> in Amazon S3 with versioned organization</li>
  <li><strong class="text-foreground">Metadata & Mapping Storage</strong> in DynamoDB for deployment lookups and audit records</li>
  <li><strong class="text-foreground">Deployment Packaging</strong> into ZIP bundles with included metadata</li>
  <li><strong class="text-foreground">Cross-Account Deployment</strong> via STS AssumeRole</li>
  <li><strong class="text-foreground">Operator Dashboard</strong> with Extract / Build / Deploy workflows</li>
</ul>

%%ANIMATION:connectDeploy%%

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Architecture</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">The platform operates across three account tiers:</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Root / Orchestration Account</p>
  <p class="text-muted-foreground text-sm">Central control plane hosting snapshot and package storage (S3), mapping and metadata store (DynamoDB), backend services/APIs, and the web UI.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Source / Connect Account</p>
  <p class="text-muted-foreground text-sm">Used to extract contact flows, queues, prompts, and linked references. Read-only access in extraction phases.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Target / Client Account</p>
  <p class="text-muted-foreground text-sm">Receives deployments of Connect configurations, Lex bot definitions, and Lambda configurations through controlled deployment workflows.</p>
</div>

<p class="mb-5 text-muted-foreground leading-relaxed">A key design principle was <strong class="text-foreground">separating artifacts from metadata</strong> : S3 for large versioned snapshot objects, DynamoDB for mappings, environment metadata, and deployment state. This separation made the platform more maintainable and easier to debug.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Innovation: Dependency-Aware Snapshotting</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">The most important engineering challenge was not simple export/import : it was <strong class="text-foreground">dependency preservation</strong>.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">When extracting an Amazon Connect contact flow, the system parses the flow JSON to detect and catalog linked resources : Lambda function ARNs, Lex references, queue references, and other Connect-linked entities. Instead of treating each service as an isolated export, the platform builds a relationship-aware package, reducing the risk of broken deployments in the target environment.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">This moved the project from "script automation" to platform-grade release engineering.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Implementation Details</h2>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Snapshot Extraction</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">Implemented service-level extraction for AWS Lambda, Amazon Lex (including V1/V2 handling), Amazon Connect flows, Connect queues, and prompts. Snapshots are serialized and stored in S3 with version-aware organization using ARN-based structured filenames for easier inspection and traceability.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">DynamoDB Mapping Layer</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">DynamoDB stores source/target resource relationship metadata, environment details, version identifiers, operator-provided metadata, and service/resource type mapping context. This enables ARN rewriting, consistent deployment lookups, future rollback traceability, and audit-ready records.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Packaging Engine</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">A packaging service pulls required snapshots from S3, assembles a deployable ZIP package, includes metadata for release execution, and prepares artifacts for cross-account deployment.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">Cross-Account Deployment</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The deployment flow reads and extracts package contents, assumes the target role using AWS STS, resolves mappings and rewrites references where necessary, applies configuration changes in a controlled sequence, and prepares for rollback and audit logging.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Operator Dashboard</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">A professional React-based dashboard was built with three workflow cards : Extract Flow, Build Package, and Deploy Package. Operators provide instance IDs, contact flow IDs, environment, version, and target instance details through the UI.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">The backend did the heavy lifting; the UI made it usable without "call the person who wrote the script." This reduced friction for internal operators, client demos, release management, and future onboarding of non-developer users.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Challenges Solved</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Cross-account client creation</strong> : refactored service integrations to standardize region + role ARN usage after adding STS AssumeRole support</li>
  <li><strong class="text-foreground">Lex snapshot structure mismatches</strong> : improved parsing expectations and added debugging to isolate schema mismatches faster</li>
  <li><strong class="text-foreground">Artifact key strategy migration</strong> : moved from hash-based to ARN-based naming for better transparency, requiring coordinated updates across extractor and packager modules</li>
  <li><strong class="text-foreground">Extensibility</strong> : introduced a strategy-based Snapshot Extractor Dispatcher to support additional resource types without breaking existing logic</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Outcomes</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li>Built a working foundation for dependency-aware configuration extraction across Connect, Lex, and Lambda</li>
  <li>Implemented versioned snapshot storage with ARN-based structured keys in S3</li>
  <li>Established mapping-driven deployment support with DynamoDB</li>
  <li>Enabled cross-account deployment workflows using STS AssumeRole</li>
  <li>Created a ZIP-based deployment package pipeline</li>
  <li>Designed and shipped a professional operator dashboard UI</li>
  <li>Laid groundwork for rollback and audit trail features</li>
  <li>Improved maintainability with modular extractor strategy patterns</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Why This Matters</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">This platform addresses a real operational gap in contact-center engineering. It enables teams to move from manual migration to repeatable releases, from environment drift to versioned artifacts, from hidden dependencies to dependency-aware packaging, and from risky cutovers to controlled deployment workflows.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Ideal Use Cases</p>
  <ul class="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
    <li>AWS consulting firms deploying Amazon Connect for multiple clients</li>
    <li>Enterprises with dev/test/prod Connect environments</li>
    <li>Contact center teams needing release governance and auditability</li>
    <li>Managed service providers offering Connect operations at scale</li>
  </ul>
</div>

<p class="text-muted-foreground leading-relaxed">Need a repeatable way to migrate and deploy Amazon Connect configurations across AWS accounts? ShubhzTechWork builds engineering-grade automation for Connect, Lex, and Lambda deployments : with versioning, dependency mapping, and audit-ready workflows.</p>
`,
  },
  {
    slug: 'dr-mitesh-shah-website',
    client: 'Dr. Mitesh Shah',
    subtitle: 'A professional medical clinic website built for trust, patient access, and fast delivery.',
    industry: 'Healthcare / Medical',
    projectType: 'Professional Clinic Website',
    excerpt: 'Dr. Mitesh Shah needed a trustworthy digital presence for his medical practice : built for patient convenience, mobile-first access, and fast launch. Delivered end-to-end in 15 days with a 20-day total turnaround.',
    gradient: 'from-sky-500 to-blue-500',
    stack: ['Web Development', 'Content Strategy', 'UX Design', 'SEO', 'Mobile-First'],
    highlights: [
      { value: '15 Days', label: 'Build Time' },
      { value: 'Live', label: 'Status' },
      { value: 'End-to-End', label: 'Delivery' },
    ],
    metaTitle: 'Dr. Mitesh Shah : Medical Clinic Website Case Study | ShubhzTechWork',
    metaDescription: 'How ShubhzTechWork delivered a professional medical clinic website for Dr. Mitesh Shah in 15 days : from requirement gathering to live production deployment.',
    content: `
<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Executive Summary</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Dr. Mitesh Shah needed a professional digital presence to represent his medical practice online, improve discoverability, and provide patients with a clear way to understand services and connect with the clinic. The goal was to launch a trustworthy, patient-friendly website quickly without compromising usability.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">ShubhzTechWork delivered a fully functional clinic website in <strong class="text-foreground">15 days of build time</strong>, with complete project delivery in <strong class="text-foreground">20 days</strong>, including content structuring, page setup, service presentation, and deployment support. The final website is live at <strong class="text-foreground">drmiteshshah.in</strong>.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-1">Outcome</p>
  <p class="text-muted-foreground text-sm">A live, professional clinic website : from zero to production in 20 days. Built for trust, patient access, and digital growth.</p>
</div>

%%ANIMATION:clinicWebsite%%

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">The Challenge</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Before this project, the client needed a stronger and more structured web presence that could help with professional credibility online, clear service discovery for patients, contact and appointment convenience, and mobile-friendly access for local users searching from phones.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">Healthcare websites are different from normal portfolio sites : users are often looking for answers fast:</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">What services are available?</strong></li>
  <li><strong class="text-foreground">Where is the clinic?</strong></li>
  <li><strong class="text-foreground">How do I contact or book?</strong></li>
  <li><strong class="text-foreground">Can I trust this doctor/clinic?</strong></li>
</ul>

<p class="mb-5 text-muted-foreground leading-relaxed">The challenge was to build a site that answers those questions clearly and quickly while maintaining a professional tone : all within a tight delivery window.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Solution Strategy</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">To meet the timeline and ensure usability, the project was approached with a practical, outcome-first strategy:</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">1. Clear Information Architecture</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The website was structured to help visitors reach key actions quickly : Home, Services/Treatment pages, About/practice info, Contact details/location, and Inquiry/appointment pathways.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">2. Trust-First Content Presentation</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">In healthcare, design is not just aesthetics : it's confidence. The content layout was shaped to make the website feel professional, reliable, easy to navigate, and patient-friendly.</p>

<h3 class="text-xl font-bold text-foreground mt-8 mb-3">3. Fast Execution, Controlled Delivery</h3>

<p class="mb-5 text-muted-foreground leading-relaxed">The project timeline was managed in two phases: build completed in 15 days, and final delivery in 20 days (including finishing touches, review, and handover). This helped balance speed and quality while meeting client expectations.</p>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Project Execution Timeline</h2>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 1 : Discovery & Planning (Day 1-3)</p>
  <p class="text-muted-foreground text-sm">Understood client requirement and target audience (patients / local search users). Identified key sections and must-have pages. Planned structure for services and clinic information. Defined delivery scope and deadlines.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 2 : Website Build (Day 4-15)</p>
  <p class="text-muted-foreground text-sm">Built the site pages and core structure. Added and organized service/treatment content. Configured contact and inquiry-ready sections. Refined layout for readability and mobile browsing. Performed internal testing and corrections.</p>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Phase 3 : Review, QA & Delivery (Day 16-20)</p>
  <p class="text-muted-foreground text-sm">Final revisions and client review changes. Content cleanup and consistency checks. Launch/handover support. Production readiness and delivery completion.</p>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Key Features Delivered</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Professional Clinic Website Presence</strong> : A complete website that positions Dr. Mitesh Shah as a credible medical practitioner online</li>
  <li><strong class="text-foreground">Structured Service/Treatment Pages</strong> : Service discovery is a core patient need, with organized treatment/service content</li>
  <li><strong class="text-foreground">Contact & Location Accessibility</strong> : Clinic address and contact-oriented pages are easily discoverable</li>
  <li><strong class="text-foreground">Appointment/Inquiry-Oriented Experience</strong> : Booking/contact flow elements help users move from browsing to action</li>
  <li><strong class="text-foreground">Live Deployment</strong> : Successfully launched and live on drmiteshshah.in</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Outcomes & Business Impact</h2>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-2">Business Value</p>
  <ul class="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
    <li>Stronger online identity : live, professional website supporting credibility and discoverability</li>
    <li>Better patient information access : services, contact pathways in one place</li>
    <li>Improved digital readiness : foundation for local SEO, content updates, appointment optimization</li>
    <li>Fast turnaround delivery : client-ready medical website in 15 days build / 20 days total</li>
  </ul>
</div>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">What Made This Project Successful</h2>

<ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
  <li><strong class="text-foreground">Speed + Structure</strong> : Fast delivery without chaos. The work was broken into focused phases and shipped on schedule</li>
  <li><strong class="text-foreground">Practical UX for Real Users</strong> : The site was built for patient behavior, not just visual design</li>
  <li><strong class="text-foreground">Business-First Delivery Mindset</strong> : This was a real client asset delivered for actual usage, not a demo project</li>
</ul>

<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Future Enhancements</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Recommended next steps include local SEO optimization (Google Business Profile, schema markup, city/service targeting), WhatsApp click-to-chat integration, FAQ pages for common patient questions, doctor profile credentials and experience highlights, patient testimonials, and periodic content audits for quality and compliance.</p>

<p class="text-muted-foreground leading-relaxed">A live website is not the finish line : it's the launchpad for digital growth. Dr. Mitesh Shah now has a professional foundation to build on.</p>
`,
  },
  {
    slug: 'vulnerability-management-platform',
    client: 'Vulnerability Management Platform',
    subtitle: 'A centralized remediation workflow that turns security findings into action.',
    industry: 'Cybersecurity / SecOps',
    projectType: 'Security Operations Platform',
    excerpt: 'A workflow-driven platform that centralizes vulnerability findings from multiple sources, applies risk-based prioritization, enforces ownership and SLA tracking, validates remediation, and maintains audit-ready evidence trails.',
    gradient: 'from-rose-500 to-red-600',
    stack: ['Vulnerability Management', 'Risk Prioritization', 'SLA Tracking', 'Audit Trails', 'Compliance'],
    highlights: [
      { value: 'Centralized', label: 'Findings Repository' },
      { value: 'SLA-Based', label: 'Remediation' },
      { value: 'Audit-Ready', label: 'Evidence Trails' },
    ],
    metaTitle: 'Vulnerability Management Platform : Security Operations Case Study | ShubhzTechWork',
    metaDescription: 'How ShubhzTechWork is building a centralized vulnerability management platform with risk-based prioritization, SLA enforcement, and audit-ready remediation workflows.',
    comingSoon: true,
    content: `
<h2 class="text-2xl font-bold font-display text-foreground mt-12 mb-4">Overview</h2>

<p class="mb-5 text-muted-foreground leading-relaxed">Modern organizations don't suffer from a lack of vulnerability data : they suffer from a lack of workflow clarity after detection. Security teams receive findings from multiple tools (SIEM, EDR, cloud security platforms, vulnerability scanners), but the real bottleneck starts afterward: duplicate findings, poor prioritization, unclear ownership, missed SLAs, and no validation proof for audits.</p>

<p class="mb-5 text-muted-foreground leading-relaxed">We are designing and developing a <strong class="text-foreground">Vulnerability Management Tool</strong> that acts as a central control layer between detection systems and remediation teams : transforming vulnerability management from a reporting exercise into an execution system.</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
  <p class="text-foreground font-semibold mb-1">Platform Lifecycle</p>
  <p class="text-muted-foreground text-sm">Ingest → Normalize → Prioritize → Assign → Remediate → Validate → Report → Audit</p>
</div>

%%ANIMATION:comingSoon%%
`,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(currentSlug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.slug !== currentSlug);
}
