import PptxGenJS from 'pptxgenjs';

const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'OpenAI Codex';
pptx.company = 'Case Study';
pptx.subject = 'Credit Ratings Analytics Application';
pptx.title = 'Credit Ratings Analytics Application - Professional Case Study Presentation';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US'
};

const colors = {
  navy: '20364D',
  blue: '3A6EA5',
  slate: '5D6D7E',
  ink: '1F2937',
  green: '2F855A',
  red: 'C53030',
  amber: 'B7791F',
  light: 'F5F8FB',
  lighter: 'EEF3F8',
  border: 'D9E2EC',
  white: 'FFFFFF'
};

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.6,
    y: 0.35,
    w: 11.2,
    h: 0.45,
    fontFace: 'Aptos Display',
    fontSize: 26,
    bold: true,
    color: colors.navy
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: 0.82,
      w: 11,
      h: 0.28,
      fontSize: 10.5,
      color: colors.slate
    });
  }

  slide.addShape(pptx.ShapeType.line, {
    x: 0.6,
    y: 1.12,
    w: 11.4,
    h: 0,
    line: { color: colors.border, pt: 1.2 }
  });
}

function addBulletList(slide, items, opts = {}) {
  const x = opts.x ?? 0.8;
  const y = opts.y ?? 1.45;
  const w = opts.w ?? 5.2;
  const h = opts.h ?? 4.8;

  slide.addText(
    items.map((text) => ({
      text,
      options: { bullet: { indent: 14 } }
    })),
    {
      x,
      y,
      w,
      h,
      fontSize: opts.fontSize ?? 16,
      color: colors.ink,
      breakLine: true,
      paraSpaceAfterPt: opts.paraSpaceAfterPt ?? 10,
      valign: 'top'
    }
  );
}

function addSectionLabel(slide, text, x, y, w = 5) {
  slide.addText(text, {
    x,
    y,
    w,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: colors.blue
  });
}

function addCard(slide, { x, y, w, h, title, body, fill = colors.white }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    line: { color: colors.border, pt: 1 },
    fill: { color: fill }
  });
  slide.addText(title, {
    x: x + 0.16,
    y: y + 0.12,
    w: w - 0.32,
    h: 0.26,
    fontSize: 14,
    bold: true,
    color: colors.navy
  });
  slide.addText(body, {
    x: x + 0.16,
    y: y + 0.42,
    w: w - 0.32,
    h: h - 0.5,
    fontSize: 11.5,
    color: colors.ink,
    valign: 'top'
  });
}

function addFooter(slide, page) {
  slide.addText(`Nazreen | Credit Ratings Analytics | Slide ${page}`, {
    x: 0.6,
    y: 7.0,
    w: 11.3,
    h: 0.2,
    fontSize: 9,
    color: colors.slate,
    align: 'right'
  });
}

// Slide 1
{
  const slide = pptx.addSlide();
  slide.background = { color: colors.light };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 1.1,
    line: { color: colors.navy, pt: 0 },
    fill: { color: colors.navy }
  });
  slide.addText('Credit Ratings Analytics Application', {
    x: 0.65,
    y: 1.35,
    w: 10.8,
    h: 0.55,
    fontFace: 'Aptos Display',
    fontSize: 28,
    bold: true,
    color: colors.navy
  });
  slide.addText('Professional Case Study Presentation', {
    x: 0.65,
    y: 2.05,
    w: 8.2,
    h: 0.3,
    fontSize: 16,
    color: colors.blue
  });
  slide.addText(
    [
      { text: 'Prepared by: Nazreen\n', options: { breakLine: true } },
      { text: 'Scope: Dashboard, Issuer Detail, Feedback Workflow\n', options: { breakLine: true } },
      { text: 'Focus: Architecture, Design Decisions, Demo Support, and Scale', options: { breakLine: true } }
    ],
    {
      x: 0.7,
      y: 3.0,
      w: 5.8,
      h: 1.4,
      fontSize: 16,
      color: colors.ink
    }
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.6,
    y: 1.55,
    w: 5.0,
    h: 3.5,
    line: { color: colors.border, pt: 1.2 },
    fill: { color: colors.white }
  });
  slide.addText('Presentation Covers', {
    x: 7.95,
    y: 1.9,
    w: 2.3,
    h: 0.3,
    fontSize: 18,
    bold: true,
    color: colors.navy
  });
  addBulletList(
    slide,
    [
      'Architecture diagram and routing/data-flow overview',
      'Technical design and component structure',
      'Implementation highlights for all three screens',
      'Trade-offs, testing strategy, and scalability considerations'
    ],
    { x: 7.95, y: 2.35, w: 4.2, h: 2.2, fontSize: 13.5, paraSpaceAfterPt: 8 }
  );
  addFooter(slide, 1);
}

// Slide 2
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Presentation Agenda', 'Structured to support the live demo and code walkthrough');
  addSectionLabel(slide, 'Agenda', 0.8, 1.45);
  addBulletList(slide, [
    'Architecture diagram: component hierarchy, routing setup, service layer, data flow, and state management approach',
    'Technical design: key design decisions and component structure',
    'Implementation highlights: diagrams of the dashboard, issuer detail, and feedback screens',
    'Trade-offs and decisions: why specific patterns and technologies were selected',
    'Testing strategy: how code quality is validated',
    'Scalability considerations: how the solution can grow and scale'
  ], { x: 0.8, y: 1.72, w: 6.2, h: 4.0, fontSize: 14 });
  addSectionLabel(slide, 'Application Scope', 7.2, 1.45);
  addCard(slide, { x: 7.2, y: 1.78, w: 1.7, h: 1.35, title: 'Dashboard', body: 'Issuer table\nsearch\nsort' });
  addCard(slide, { x: 9.1, y: 1.78, w: 1.7, h: 1.35, title: 'Detail', body: 'overview\nhistory\ndrivers' });
  addCard(slide, { x: 11.0, y: 1.78, w: 1.7, h: 1.35, title: 'Feedback', body: 'stepper\nvalidation\nsubmit' });
  addSectionLabel(slide, 'Guiding Principle', 7.2, 3.65);
  addBulletList(slide, [
    'Deliver exactly what the brief requested, without unnecessary overbuilding.',
    'Keep the implementation easy to explain during a live code walkthrough.',
    'Show production-aware thinking through routing, testing, performance, and accessibility choices.'
  ], { x: 7.2, y: 3.95, w: 5.0, h: 2.0, fontSize: 13.5 });
  addFooter(slide, 2);
}

// Slide 3 Architecture
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Architecture Diagram', 'Component hierarchy, routing setup, service layer, data flow, and state management approach');

  addCard(slide, { x: 0.6, y: 1.45, w: 2.0, h: 1.0, title: 'App Shell', body: 'AppComponent\n- Route transition loader\n- Router outlet', fill: colors.lighter });
  addCard(slide, { x: 0.6, y: 3.0, w: 2.0, h: 1.0, title: 'Routing', body: 'app.routes.ts\nlazy routes + resolver', fill: colors.lighter });

  addCard(slide, { x: 3.2, y: 1.2, w: 2.2, h: 1.0, title: 'DashboardComponent', body: 'Issuer table\nsearch / sort\nresponsive list' });
  addCard(slide, { x: 3.2, y: 2.55, w: 2.2, h: 1.0, title: 'IssuerDetailComponent', body: 'Overview\nhistory\ndrivers\nAI insight' });
  addCard(slide, { x: 3.2, y: 3.9, w: 2.2, h: 1.0, title: 'FeedbackFormComponent', body: '4-step reactive form\nvalidation\nstatus dialog' });

  addCard(slide, { x: 6.15, y: 2.25, w: 2.2, h: 1.35, title: 'RatingsService', body: 'Mock data access\nissuer list\nissuer detail\nsubmit feedback', fill: 'F8FBFF' });
  addCard(slide, { x: 8.95, y: 1.55, w: 2.2, h: 1.05, title: 'Models', body: 'Issuer\nRatingHistory\nKeyDriver\nAIInsight', fill: colors.lighter });
  addCard(slide, { x: 8.95, y: 3.0, w: 2.2, h: 1.05, title: 'Resolver', body: 'issuerDetailResolver\npreloads route data', fill: colors.lighter });
  addCard(slide, { x: 11.55, y: 2.25, w: 1.2, h: 1.35, title: 'State', body: 'Route params\nresolver data\nlocal reactive form', fill: 'F8FBFF' });

  const arrows = [
    [2.6, 1.95, 0.55, 0],
    [2.6, 3.5, 0.55, 0],
    [5.45, 1.7, 0.55, 0.9],
    [5.45, 3.05, 0.55, 0],
    [5.45, 4.4, 0.55, -0.9],
    [8.35, 2.9, 0.45, -0.7],
    [8.35, 2.9, 0.45, 0.7],
    [11.2, 2.9, 0.25, 0]
  ];

  arrows.forEach(([x, y, w, h]) => {
    slide.addShape(pptx.ShapeType.chevron, {
      x,
      y,
      w,
      h: h === 0 ? 0.18 : Math.abs(h),
      rotate: h > 0 ? 90 : h < 0 ? 270 : 0,
      line: { color: colors.blue, pt: 1 },
      fill: { color: colors.blue }
    });
  });

  addFooter(slide, 3);
}

// Slide 4 technical design
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Technical Design', 'Key design decisions and component structure');

  addCard(slide, {
    x: 0.7, y: 1.55, w: 3.75, h: 2.0, title: 'Component Structure',
    body:
      'The app is organized around user-facing features instead of a deep shared module tree.\n\nPages:\n- Dashboard\n- Issuer Detail\n- Feedback Form\n- Not Found'
  });
  addCard(slide, {
    x: 4.8, y: 1.55, w: 3.75, h: 2.0, title: 'Data & State Approach',
    body:
      'Issuer identity flows through route parameters.\nDetail payloads are resolved before route activation.\nScreen-local UI state stays inside components and reactive forms.'
  });
  addCard(slide, {
    x: 8.9, y: 1.55, w: 3.75, h: 2.0, title: 'Design Decisions',
    body:
      'Standalone Angular components, service-based state, PrimeNG UI controls, lazy-loaded routes, and a lightweight mock-data backend boundary.'
  });
  addBulletList(slide, [
    'Reasoning: this design keeps the code easy to demo, avoids unnecessary complexity, and still leaves a clear path to scale later.',
    'The implementation remains closely aligned with the exact requirements in the case study rather than introducing features outside the brief.'
  ], { x: 0.85, y: 4.15, w: 11.4, h: 1.5, fontSize: 14 });
  addFooter(slide, 4);
}

// Slide 5 implementation highlights
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Implementation Highlights', 'Diagrams showing the three main screens');

  addCard(slide, {
    x: 0.65, y: 1.45, w: 3.95, h: 4.8, title: 'Screen 1: Ratings Dashboard',
    body:
      'Layout:\n- Header with app context\n- Table heading + search bar\n- PrimeNG table with sortable columns\n\nKey features:\n- Responsive issuer table\n- Rating and outlook tags\n- Debounced search\n- Loading + empty state support'
  });
  addCard(slide, {
    x: 4.7, y: 1.45, w: 3.95, h: 4.8, title: 'Screen 2: Issuer Detail View',
    body:
      'Layout:\n- Breadcrumb and page title\n- Issuer summary card\n- Rating history table\n- Driver cards with scores\n- AI insight summary\n\nKey features:\n- Resolver-based preloading\n- Back + feedback actions\n- Clear visual sections'
  });
  addCard(slide, {
    x: 8.75, y: 1.45, w: 3.95, h: 4.8, title: 'Screen 3: Feedback Form',
    body:
      'Layout:\n- Stepper with 4 steps\n- User information\n- Rating evaluation\n- Detailed driver feedback\n- Review and submit\n\nKey features:\n- Reactive form validation\n- Required field gating\n- Accessible focus management\n- Centered submission dialog'
  });

  addFooter(slide, 5);
}

// Slide 6 trade-offs and decisions
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Trade-Offs and Decisions', 'Why specific patterns and technologies were chosen');
  addBulletList(slide, [
    'Feature-oriented page structure instead of a deep enterprise folder model to keep the case study readable and fast to demo.',
    'Standalone Angular components for lighter setup and cleaner lazy loading.',
    'Service-based state instead of NgRx because the application state is small, route-scoped, and short-lived.',
    'Route parameters used for entity identity so routes remain refresh-safe, shareable, and bookmarkable.',
    'Route resolver added for detail and feedback screens so critical issuer context loads before activation.',
    'PrimeNG used selectively for table, cards, tags, rating, stepper, dialog, and form controls to stay aligned with the brief.'
  ], { x: 0.75, y: 1.55, w: 11.5, h: 4.8, fontSize: 15 });
  addFooter(slide, 6);
}

// Slide 7 testing strategy
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Testing Strategy', 'Approach to ensuring code quality and delivery confidence');
  addCard(slide, {
    x: 0.7, y: 1.5, w: 3.75, h: 2.2, title: 'Current Coverage',
    body:
      'Jest tests were added for the three main screens:\n- dashboard\n- issuer detail\n- feedback form\n\nThis validates critical render and interaction behavior.'
  });
  addCard(slide, {
    x: 4.8, y: 1.5, w: 3.75, h: 2.2, title: 'Recommended Layers',
    body:
      '1. Unit tests for services, validators, and resolver\n2. Component tests for UI behavior\n3. Integration tests for route flow\n4. E2E tests for the complete user journey'
  });
  addCard(slide, {
    x: 8.9, y: 1.5, w: 3.75, h: 2.2, title: 'Quality Gates',
    body:
      'Automated test runs in CI, code review checklists, linting, accessibility checks, and demo-path regression coverage before release.'
  });
  addBulletList(slide, [
    'Goal: make the walkthrough reliable, keep regressions visible, and prove that both core behavior and user flow have been validated.',
    'The strategy balances current case-study scope with a production-ready testing roadmap.'
  ], { x: 0.85, y: 4.25, w: 11.2, h: 1.3, fontSize: 14 });
  addFooter(slide, 7);
}

// Slide 8 scalability considerations
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Scalability Considerations', 'How the solution can grow and scale');
  addCard(slide, {
    x: 0.7, y: 1.5, w: 3.75, h: 2.2, title: 'Data Scale',
    body:
      'For 10,000+ issuers, move from client-side table handling to server-side pagination, filtering, and sorting with a backend query API.'
  });
  addCard(slide, {
    x: 4.8, y: 1.5, w: 3.75, h: 2.2, title: 'Domain Scale',
    body:
      'For 50+ issuer types, extend the model into a shared base issuer contract with issuer-type-specific sections and components.'
  });
  addCard(slide, {
    x: 8.9, y: 1.5, w: 3.75, h: 2.2, title: 'Team Scale',
    body:
      'Split the codebase into clearer feature ownership areas and shared libraries so multiple developers can work in parallel safely.'
  });
  addBulletList(slide, [
    'Performance path: server-side pagination, virtual scrolling where appropriate, caching, and smaller API payloads.',
    'Architecture path: feature libraries, stronger shared UI patterns, and a richer state model only when complexity justifies it.',
    'Delivery path: CI quality gates, reusable design system pieces, and clearer ownership boundaries.'
  ], { x: 0.85, y: 4.15, w: 11.3, h: 1.8, fontSize: 14 });
  addFooter(slide, 8);
}

// Slide 9 supporting live demo
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Support for Live Demo & Code Walkthrough', 'How the presentation connects to the actual demo flow');
  addCard(slide, {
    x: 0.8, y: 1.55, w: 3.6, h: 3.8, title: 'Demo Flow',
    body:
      '1. Open dashboard\n2. Search and sort issuers\n3. Navigate to issuer detail\n4. Explain rating history, drivers, and AI insight\n5. Open feedback form\n6. Show validation and submission'
  });
  addCard(slide, {
    x: 4.85, y: 1.55, w: 3.6, h: 3.8, title: 'Code Walkthrough Focus',
    body:
      'Walk through:\n- app.routes.ts\n- issuer-detail.resolver.ts\n- ratings.service.ts\n- dashboard component\n- detail component\n- feedback component\n- Jest tests'
  });
  addCard(slide, {
    x: 8.9, y: 1.55, w: 3.6, h: 3.8, title: 'Key Message',
    body:
      'The implementation is intentionally simple, aligned with the brief, easy to explain, and ready to scale with additional backend and domain complexity.'
  });
  addFooter(slide, 9);
}

// Slide 10 appendix quality topics
{
  const slide = pptx.addSlide();
  addTitle(slide, 'Appendix: Additional Quality Considerations', 'Helpful supporting points for Q&A');
  addBulletList(slide, [
    'Accessibility: explicit form labels, keyboard navigation, focus management, and screen-reader-friendly error announcements.',
    'Security direction: authentication, role-based authorization, HTTPS, CSP, backend validation, and secure issuer-level access control.',
    'Performance improvements already added: lazy routes, OnPush, takeUntilDestroyed(), debounced search, resolver-based detail loading.',
    'Testing setup: Jest-based component tests for the three main screens to support safer iteration.'
  ], { x: 0.85, y: 1.65, w: 11.1, h: 3.2, fontSize: 15 });
  addFooter(slide, 10);
}

// Slide 11 close
{
  const slide = pptx.addSlide();
  slide.background = { color: colors.navy };
  slide.addText('Thank You', {
    x: 0.8,
    y: 1.45,
    w: 4,
    h: 0.6,
    fontFace: 'Aptos Display',
    fontSize: 30,
    bold: true,
    color: colors.white
  });
  slide.addText('Credit Ratings Analytics Application', {
    x: 0.8,
    y: 2.2,
    w: 5.5,
    h: 0.3,
    fontSize: 18,
    color: 'D7E5F3'
  });
  slide.addText(
    'Questions welcome on architecture, trade-offs, scaling strategy, testing, accessibility, and security.',
    {
      x: 0.8,
      y: 3.25,
      w: 7.8,
      h: 0.8,
      fontSize: 18,
      color: colors.white
    }
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.6,
    y: 1.45,
    w: 3.8,
    h: 3.0,
    line: { color: '7FA7CE', pt: 1.2 },
    fill: { color: '294968' }
  });
  slide.addText('Prepared by\nNazreen', {
    x: 9.15,
    y: 2.1,
    w: 2.7,
    h: 0.9,
    align: 'center',
    valign: 'mid',
    fontSize: 22,
    bold: true,
    color: colors.white
  });
  addFooter(slide, 11);
}

await pptx.writeFile({ fileName: 'Professional-Credit-Ratings-Analytics-Presentation.pptx' });
