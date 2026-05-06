import { useMemo, useState } from 'react'
import { Button } from '@salesforce/design-system-react'
import heroImage from './assets/hero.png'
import './App.css'

const contacts = [
  {
    name: 'Ana Carvalho',
    title: 'Chief Operations Officer',
    email: 'ana.carvalho@acme.example',
    phone: '(11) 4002-8844',
  },
  {
    name: 'Rafael Mendes',
    title: 'VP Procurement',
    email: 'rafael.mendes@acme.example',
    phone: '(11) 4002-8845',
  },
  {
    name: 'Julia Santos',
    title: 'Finance Director',
    email: 'julia.santos@acme.example',
    phone: '(11) 4002-8846',
  },
]

const opportunities = [
  {
    name: 'Cloud migration rollout',
    stage: 'Negotiation',
    amount: '$240,000',
    closeDate: 'May 28, 2026',
    owner: 'Camila Rocha',
  },
  {
    name: 'Field service expansion',
    stage: 'Proposal',
    amount: '$118,500',
    closeDate: 'Jun 14, 2026',
    owner: 'Daniel Lima',
  },
  {
    name: 'Einstein analytics pilot',
    stage: 'Discovery',
    amount: '$74,000',
    closeDate: 'Jul 03, 2026',
    owner: 'Marina Costa',
  },
]

const activity = [
  {
    title: 'Follow up on procurement timeline',
    meta: 'Task due today at 4:00 PM',
    tone: 'warning',
  },
  {
    title: 'Quarterly business review completed',
    meta: 'Call logged yesterday by Camila Rocha',
    tone: 'success',
  },
  {
    title: 'Legal requested revised MSA terms',
    meta: 'Email from Rafael Mendes',
    tone: 'info',
  },
]

const workflowSteps = [
  {
    title: 'Describe the Salesforce page',
    text: 'Write the object, target user, fields, actions, related lists, states, and any special behavior in plain language.',
  },
  {
    title: 'Codex assembles the prototype',
    text: 'The React page is composed with Lightning Design System CSS and Salesforce React primitives where they fit cleanly.',
  },
  {
    title: 'Review at product speed',
    text: 'Run it locally or publish to Vercel, then iterate on layout, fields, copy, and interactions directly from feedback.',
  },
]

const promptRules = [
  'Name the Salesforce object and the page type: record page, list view, wizard, console, dashboard, or flow screen.',
  'List visible regions: header actions, highlights panel, tabs, activity, related lists, right rail, modal, or empty state.',
  'Provide realistic record data so the prototype feels like a business review, not a wireframe.',
  'Call out user intent: seller update, service triage, admin setup, executive summary, or approval flow.',
]

const prototypeTemplates = [
  {
    id: 'account',
    name: 'Account workspace',
    object: 'Account',
    summary: 'Record page, related lists, activity, and approval follow-up screens.',
    accent: '#5867e8',
  },
  {
    id: 'opportunity',
    name: 'Opportunity pursuit',
    object: 'Opportunity',
    summary: 'Pipeline list, deal room, next steps, products, and decision path.',
    accent: '#ff5d2d',
  },
  {
    id: 'case',
    name: 'Service console',
    object: 'Case',
    summary: 'Queue, case detail, knowledge, customer timeline, and escalation flow.',
    accent: '#06a59a',
  },
]

const starterProjects = [
  {
    id: 'acme-account-review',
    name: 'Acme account review',
    templateId: 'account',
    status: 'Ready for review',
    updated: 'Today',
    description: 'Executive account page for a seller preparing a QBR.',
  },
  {
    id: 'enterprise-renewal',
    name: 'Enterprise renewal flow',
    templateId: 'opportunity',
    status: 'Draft',
    updated: 'Yesterday',
    description: 'Renewal workspace with path, stakeholders, and approval screens.',
  },
]

const prototypeScreens = [
  {
    id: 'list',
    title: 'Workspace list',
    type: 'List View',
    description: 'A Salesforce list view entry point for choosing a record or process.',
  },
  {
    id: 'record',
    title: 'Record detail',
    type: 'Record Page',
    description: 'A high-fidelity record page with highlights, tabs, related lists, and activity.',
  },
  {
    id: 'flow',
    title: 'Guided flow',
    type: 'Flow Screen',
    description: 'A navigable Salesforce-style flow for the next user action.',
  },
]

function getTemplate(templateId) {
  return prototypeTemplates.find((template) => template.id === templateId) ?? prototypeTemplates[0]
}

function LandingHeader() {
  return (
    <header className="landing-nav">
      <a className="landing-logo" href="#top" aria-label="SF Rapid Prototyping Codex">
        <span>SF</span>
        <strong>Rapid Prototyping Codex</strong>
      </a>
      <nav aria-label="Project sections">
        <a href="#workflow">Workflow</a>
        <a href="#demo">Account demo</a>
        <a href="#stack">Stack</a>
      </nav>
    </header>
  )
}

function LandingHero() {
  return (
    <section className="hero-section" id="top" style={{ '--hero-image': `url(${heroImage})` }}>
      <LandingHeader />
      <div className="hero-content">
        <p className="eyebrow">React + SLDS + Codex</p>
        <h1>SF Rapid Prototyping Codex</h1>
        <p>
          A web project for building high-fidelity Salesforce prototypes from a short page description. Ask for an
          Account, Opportunity, Case, Flow, or console experience and turn it into a deployable React/Vite screen.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#demo">
            View Account demo
          </a>
          <a className="secondary-link" href="#prompt-contract">
            Prompt format
          </a>
        </div>
      </div>
    </section>
  )
}

function WorkflowSection() {
  return (
    <section className="section-band" id="workflow">
      <div className="section-heading">
        <p className="eyebrow">Prototype loop</p>
        <h2>From Salesforce idea to reviewable UI in one pass</h2>
      </div>
      <div className="workflow-grid">
        {workflowSteps.map((step, index) => (
          <article className="workflow-card" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PromptContract() {
  return (
    <section className="split-section" id="prompt-contract">
      <div>
        <p className="eyebrow">Prompt contract</p>
        <h2>Give Codex the page shape, not a pixel spec</h2>
        <p>
          The project is designed for fast product conversations. A good request names the Salesforce surface, the
          record data, the expected actions, and the sections that need to look real enough for stakeholder review.
        </p>
      </div>
      <div className="rules-panel">
        {promptRules.map((rule) => (
          <div className="rule-row" key={rule}>
            <span />
            <p>{rule}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function StackSection() {
  return (
    <section className="section-band stack-band" id="stack">
      <div className="section-heading">
        <p className="eyebrow">Vercel ready</p>
        <h2>Small web stack, Salesforce visual system</h2>
      </div>
      <div className="stack-grid">
        <StackItem title="React 19" text="Component-driven prototype screens with Vite development speed." />
        <StackItem title="SLDS CSS" text="Official Lightning Design System stylesheet for Salesforce visual fidelity." />
        <StackItem title="Design System React" text="Salesforce React components used where the package integrates cleanly." />
        <StackItem title="Vercel" text="Static Vite build output in dist, ready for preview or production deploys." />
      </div>
    </section>
  )
}

function StackItem({ title, text }) {
  return (
    <article className="stack-item">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function ProductTopBar({ onShowLanding }) {
  return (
    <header className="product-topbar">
      <a className="product-logo" href="#projects" aria-label="SF Rapid Prototyping Codex">
        <span>SF</span>
        <strong>Rapid Prototyping Codex</strong>
      </a>
      <nav aria-label="Product navigation">
        <a href="#projects">Projects</a>
        <a href="#create">New prototype</a>
        <button type="button" onClick={onShowLanding}>
          About
        </button>
      </nav>
    </header>
  )
}

function ProjectDashboard({ projects, onCreateProject, onOpenProject, onShowLanding }) {
  const [draft, setDraft] = useState({
    name: '',
    templateId: 'account',
    description: '',
  })

  const selectedTemplate = getTemplate(draft.templateId)

  function handleSubmit(event) {
    event.preventDefault()
    const name = draft.name.trim() || `${selectedTemplate.object} prototype`

    onCreateProject({
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name,
      templateId: draft.templateId,
      status: 'Draft',
      updated: 'Just now',
      description: draft.description.trim() || selectedTemplate.summary,
    })

    setDraft({
      name: '',
      templateId: 'account',
      description: '',
    })
  }

  return (
    <div className="product-shell">
      <ProductTopBar onShowLanding={onShowLanding} />
      <main className="dashboard-page" id="projects">
        <section className="dashboard-hero">
          <div>
            <p className="eyebrow">Prototype command center</p>
            <h1>Manage Salesforce prototypes like product projects</h1>
            <p>
              Start from a Salesforce surface, create a project, and open a navigable prototype workspace with SLDS
              styling, realistic business data, and review-ready screens.
            </p>
          </div>
          <div className="dashboard-metrics" aria-label="Prototype metrics">
            <MetricCard label="Projects" value={String(projects.length).padStart(2, '0')} />
            <MetricCard label="Templates" value="03" />
            <MetricCard label="Vercel" value="Ready" />
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="projects-panel">
            <div className="panel-heading-row">
              <div>
                <p className="eyebrow">Projects</p>
                <h2>Prototype library</h2>
              </div>
              <a className="small-action" href="#create">
                Create
              </a>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} onOpenProject={onOpenProject} />
              ))}
            </div>
          </div>

          <form className="create-panel" id="create" onSubmit={handleSubmit}>
            <p className="eyebrow">New project</p>
            <h2>Create a navigable prototype</h2>
            <label>
              <span>Project name</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                placeholder="Example: Strategic account cockpit"
              />
            </label>
            <label>
              <span>Salesforce starter</span>
              <select
                value={draft.templateId}
                onChange={(event) => setDraft({ ...draft, templateId: event.target.value })}
              >
                {prototypeTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Prototype brief</span>
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                placeholder="Describe the Salesforce page, users, actions, data, and screens you want Codex to generate."
                rows="5"
              />
            </label>
            <div className="template-preview" style={{ borderColor: selectedTemplate.accent }}>
              <strong>{selectedTemplate.object}</strong>
              <p>{selectedTemplate.summary}</p>
            </div>
            <button className="primary-link button-reset" type="submit">
              Create project
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ProjectCard({ project, onOpenProject }) {
  const template = getTemplate(project.templateId)

  return (
    <article className="project-card">
      <div className="project-accent" style={{ background: template.accent }} />
      <div>
        <span className="project-object">{template.object}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-meta">
        <span>{project.status}</span>
        <span>{project.updated}</span>
      </div>
      <button type="button" onClick={() => onOpenProject(project.id)}>
        Open prototype
      </button>
    </article>
  )
}

function PrototypeWorkspace({ project, onBack }) {
  const [activeScreen, setActiveScreen] = useState('list')
  const template = getTemplate(project.templateId)
  const active = prototypeScreens.find((screen) => screen.id === activeScreen) ?? prototypeScreens[0]

  return (
    <div className="workspace-product-shell">
      <aside className="workspace-sidebar">
        <button className="back-button" type="button" onClick={onBack}>
          Back to projects
        </button>
        <div className="workspace-title">
          <span style={{ background: template.accent }}>{template.object.slice(0, 1)}</span>
          <div>
            <p>{template.object}</p>
            <h1>{project.name}</h1>
          </div>
        </div>
        <nav aria-label="Prototype screens">
          {prototypeScreens.map((screen) => (
            <button
              className={screen.id === activeScreen ? 'screen-nav-item active' : 'screen-nav-item'}
              key={screen.id}
              type="button"
              onClick={() => setActiveScreen(screen.id)}
            >
              <strong>{screen.title}</strong>
              <span>{screen.type}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="workspace-main">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">{active.type}</p>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
          </div>
          <div className="workspace-actions">
            <Button label="Share" />
            <Button label="Request review" variant="brand" />
          </div>
        </header>
        <div className="workspace-canvas">
          <SalesforcePrototype project={project} template={template} activeScreen={activeScreen} />
        </div>
      </main>
    </div>
  )
}

function SalesforcePrototype({ project, template, activeScreen }) {
  return (
    <div className="salesforce-shell workspace-salesforce-shell">
      <AppHeader />
      <AppNav />
      <main className="page-frame">
        {activeScreen === 'list' ? <PrototypeListView project={project} template={template} /> : null}
        {activeScreen === 'record' ? <AccountRecordContent /> : null}
        {activeScreen === 'flow' ? <PrototypeFlow project={project} template={template} /> : null}
      </main>
    </div>
  )
}

function PrototypeListView({ project, template }) {
  const rows = [
    ['Acme Global Holdings', 'Customer - Direct', '$18.4M', 'Camila Rocha', 'Green'],
    ['Northstar Logistics', 'Prospect', '$7.8M', 'Daniel Lima', 'Amber'],
    ['BluePeak Manufacturing', 'Customer - Channel', '$12.1M', 'Marina Costa', 'Green'],
  ]

  return (
    <>
      <section className="slds-page-header record-header">
        <div className="slds-page-header__row">
          <div className="slds-page-header__col-title">
            <p className="slds-text-title_caps">{template.object}</p>
            <h1 className="slds-page-header__title slds-truncate">{project.name}</h1>
          </div>
          <div className="slds-page-header__col-actions">
            <Button label="New" variant="brand" />
          </div>
        </div>
      </section>
      <section className="slds-card related-card prototype-list-card">
        <div className="slds-card__header slds-grid">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__body">
              <h2 className="slds-card__header-title">
                <span>Recently viewed strategic records</span>
              </h2>
            </div>
          </header>
        </div>
        <div className="slds-card__body">
          <table className="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead>
              <tr>
                {['Name', 'Type', 'Revenue', 'Owner', 'Health'].map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${cell}`}>{index === 0 ? <a href="#workspace">{cell}</a> : cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function PrototypeFlow({ project, template }) {
  return (
    <section className="slds-card flow-screen">
      <div className="slds-card__header">
        <h2 className="slds-card__header-title">
          <span>{template.object} review flow</span>
        </h2>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <div className="flow-path-row">
          {['Identify record', 'Review gaps', 'Assign action', 'Confirm'].map((step, index) => (
            <div className={`flow-step ${index === 1 ? 'active' : ''}`} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <div className="flow-form-grid">
          <label>
            <span>Review owner</span>
            <input className="slds-input" defaultValue="Camila Rocha" />
          </label>
          <label>
            <span>Business priority</span>
            <select className="slds-select" defaultValue="High">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
          <label className="flow-wide">
            <span>Next best action</span>
            <textarea
              className="slds-textarea"
              defaultValue={`Prepare ${project.name} review notes and confirm stakeholder alignment.`}
              rows="4"
            />
          </label>
        </div>
        <div className="flow-footer">
          <Button label="Previous" />
          <Button label="Save & Finish" variant="brand" />
        </div>
      </div>
    </section>
  )
}

function AppHeader() {
  return (
    <header className="slds-global-header app-global-header">
      <div className="slds-global-header__item">
        <div className="slds-global-header__logo">
          <span className="brand-mark">sf</span>
        </div>
      </div>
      <div className="slds-global-header__item slds-global-header__item_search">
        <div className="slds-form-element search-shell">
          <label className="slds-assistive-text" htmlFor="global-search">
            Search Salesforce
          </label>
          <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
            <span className="slds-icon_container slds-input__icon slds-input__icon_left">
              <span className="search-dot" />
            </span>
            <input
              className="slds-input slds-input_bare"
              id="global-search"
              placeholder="Search Accounts and more..."
              type="search"
            />
          </div>
        </div>
      </div>
      <nav className="slds-global-header__item app-header-actions" aria-label="Global actions">
        <button className="icon-button" aria-label="Favorites">
          *
        </button>
        <button className="icon-button" aria-label="Create">
          +
        </button>
        <button className="avatar-button" aria-label="User profile">
          CK
        </button>
      </nav>
    </header>
  )
}

function AppNav() {
  const items = ['Home', 'Accounts', 'Contacts', 'Opportunities', 'Leads', 'Reports', 'Dashboards']

  return (
    <div className="slds-context-bar app-nav">
      <div className="slds-context-bar__primary">
        <div className="slds-context-bar__item slds-no-hover">
          <span className="slds-context-bar__label-action">
            <span className="slds-truncate app-name" title="Sales">
              Sales
            </span>
          </span>
        </div>
      </div>
      <nav className="slds-context-bar__secondary" aria-label="Sales app">
        <ul className="slds-grid">
          {items.map((item) => (
            <li
              className={`slds-context-bar__item ${item === 'Accounts' ? 'slds-is-active' : ''}`}
              key={item}
            >
              <a className="slds-context-bar__label-action" href="#demo">
                <span className="slds-truncate" title={item}>
                  {item}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function RecordHeader() {
  return (
    <section className="slds-page-header slds-page-header_record-home record-header">
      <div className="slds-page-header__row">
        <div className="slds-page-header__col-title">
          <div className="slds-media">
            <div className="slds-media__figure">
              <span className="slds-icon_container slds-icon-standard-account object-icon" title="Account">
                A
              </span>
            </div>
            <div className="slds-media__body">
              <div className="slds-page-header__name">
                <div className="slds-page-header__name-title">
                  <h1>
                    <span>Account</span>
                    <span className="slds-page-header__title slds-truncate" title="Acme Global Holdings">
                      Acme Global Holdings
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slds-page-header__col-actions">
          <div className="slds-page-header__controls">
            <div className="slds-button-group" role="group">
              <Button label="Follow" />
              <Button label="Edit" />
              <Button label="New Contact" />
              <Button label="New Opportunity" variant="brand" />
            </div>
          </div>
        </div>
      </div>
      <div className="slds-page-header__row slds-page-header__row_gutters">
        <div className="slds-page-header__col-details">
          <ul className="slds-page-header__detail-row">
            <HeaderMetric label="Type" value="Customer - Direct" />
            <HeaderMetric label="Industry" value="Technology" />
            <HeaderMetric label="Annual Revenue" value="$18.4M" />
            <HeaderMetric label="Account Owner" value="Camila Rocha" />
            <HeaderMetric label="Health" value="Green" />
          </ul>
        </div>
      </div>
    </section>
  )
}

function HeaderMetric({ label, value }) {
  return (
    <li className="slds-page-header__detail-block">
      <div className="slds-text-title slds-truncate" title={label}>
        {label}
      </div>
      <div className="slds-truncate metric-value" title={value}>
        {value}
      </div>
    </li>
  )
}

function DetailsPanel() {
  return (
    <section className="slds-card detail-panel">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span>Account Details</span>
            </h2>
          </div>
          <Button label="Edit" />
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <div className="detail-grid">
          <Field label="Account Name" value="Acme Global Holdings" />
          <Field label="Parent Account" value="Acme Group" />
          <Field label="Phone" value="(11) 4002-8800" />
          <Field label="Website" value="www.acmeglobal.example" />
          <Field label="Billing Address" value="Av. Paulista, 1000, Sao Paulo, SP" wide />
          <Field
            label="Description"
            value="Strategic enterprise account expanding service and analytics programs across LATAM."
            wide
          />
        </div>
      </div>
    </section>
  )
}

function Field({ label, value, wide = false }) {
  return (
    <div className={`field-row ${wide ? 'field-row_wide' : ''}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function ActivityPanel() {
  return (
    <section className="slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span>Activity</span>
            </h2>
          </div>
          <Button label="Log a Call" />
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <div className="composer slds-box">
          <div className="composer-tabs">
            <button className="active">Task</button>
            <button>Event</button>
            <button>Email</button>
          </div>
          <textarea className="slds-textarea" placeholder="Create a follow-up..." rows="3" />
          <div className="composer-footer">
            <span>Due today</span>
            <Button label="Save" variant="brand" />
          </div>
        </div>
        <ol className="slds-timeline activity-list">
          {activity.map((item) => (
            <li className="slds-timeline__item" key={item.title}>
              <span className={`timeline-dot timeline-dot_${item.tone}`} />
              <div className="slds-media">
                <div className="slds-media__body">
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function RelatedList({ title, rows, columns }) {
  return (
    <section className="slds-card related-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span>{title}</span>
            </h2>
          </div>
          <Button label="New" />
        </header>
      </div>
      <div className="slds-card__body">
        <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_fixed-layout">
          <thead>
            <tr className="slds-line-height_reset">
              {columns.map((column) => (
                <th scope="col" key={column.key}>
                  <div className="slds-truncate" title={column.label}>
                    {column.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="slds-hint-parent" key={row.name}>
                {columns.map((column, index) => (
                  <td key={column.key}>
                    <div className="slds-truncate" title={row[column.key]}>
                      {index === 0 ? <a href="#demo">{row[column.key]}</a> : row[column.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="slds-card__footer">
        <a className="slds-card__footer-action" href="#demo">
          View All
        </a>
      </footer>
    </section>
  )
}

function AccountRecordContent() {
  return (
    <>
      <RecordHeader />
      <div className="slds-tabs_default record-tabs">
        <ul className="slds-tabs_default__nav" role="tablist">
          {['Related', 'Details', 'News', 'Activity'].map((tab, index) => (
            <li
              className={`slds-tabs_default__item ${index === 0 ? 'slds-is-active' : ''}`}
              key={tab}
              role="presentation"
            >
              <a className="slds-tabs_default__link" href="#demo" role="tab">
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="content-layout">
        <div className="primary-column">
          <RelatedList
            title="Contacts"
            rows={contacts}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'title', label: 'Title' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
            ]}
          />
          <RelatedList
            title="Opportunities"
            rows={opportunities}
            columns={[
              { key: 'name', label: 'Opportunity Name' },
              { key: 'stage', label: 'Stage' },
              { key: 'amount', label: 'Amount' },
              { key: 'closeDate', label: 'Close Date' },
              { key: 'owner', label: 'Owner' },
            ]}
          />
        </div>
        <aside className="side-column">
          <ActivityPanel />
          <DetailsPanel />
        </aside>
      </div>
    </>
  )
}

function AccountDemo() {
  return (
    <section className="demo-section" id="demo">
      <div className="section-heading">
        <p className="eyebrow">Example output</p>
        <h2>Account record page prototype</h2>
        <p>
          This sample is intentionally realistic: it uses Salesforce navigation patterns, record metadata, related
          lists, account details, and activity composition so stakeholders can react to a near-product surface.
        </p>
      </div>
      <div className="salesforce-shell">
        <AppHeader />
        <AppNav />
        <main className="page-frame">
          <AccountRecordContent />
        </main>
      </div>
    </section>
  )
}

function App() {
  const [view, setView] = useState('dashboard')
  const [projects, setProjects] = useState(starterProjects)
  const [activeProjectId, setActiveProjectId] = useState(starterProjects[0].id)
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects],
  )

  function createProject(project) {
    setProjects((currentProjects) => [project, ...currentProjects])
    setActiveProjectId(project.id)
    setView('workspace')
  }

  function openProject(projectId) {
    setActiveProjectId(projectId)
    setView('workspace')
  }

  if (view === 'landing') {
    return (
      <>
        <button className="floating-dashboard-button" type="button" onClick={() => setView('dashboard')}>
          Open project dashboard
        </button>
        <LandingHero />
        <WorkflowSection />
        <PromptContract />
        <AccountDemo />
        <StackSection />
      </>
    )
  }

  if (view === 'workspace' && activeProject) {
    return <PrototypeWorkspace project={activeProject} onBack={() => setView('dashboard')} />
  }

  return (
    <ProjectDashboard
      projects={projects}
      onCreateProject={createProject}
      onOpenProject={openProject}
      onShowLanding={() => setView('landing')}
    />
  )
}

export default App
