import './App.css'

type Status = 'healthy' | 'degraded' | 'offline'
type Severity = 'critical' | 'high' | 'medium' | 'low'

type Service = {
  name: string
  status: Status
  uptime: string
  latency: string
  packetLoss: string
  location: string
}

type Alert = {
  title: string
  severity: Severity
  scope: string
  opened: string
  owner: string
}

type Site = {
  name: string
  status: Status
  devicesOnline: number
  devicesTotal: number
  isp: string
}

const summaryCards = [
  { label: 'Monitored endpoints', value: '142', note: '+12 this month' },
  { label: 'Healthy services', value: '11 / 14', note: '2 degraded, 1 offline' },
  { label: 'Mean response time', value: '18 min', note: 'Against 30 min target' },
  { label: 'SLA attainment', value: '99.82%', note: 'Last 30 days' },
]

const services: Service[] = [
  {
    name: 'Core Switch Stack',
    status: 'healthy',
    uptime: '99.99%',
    latency: '1.8 ms',
    packetLoss: '0.0%',
    location: 'HQ server room',
  },
  {
    name: 'VPN Gateway',
    status: 'degraded',
    uptime: '99.21%',
    latency: '38 ms',
    packetLoss: '0.6%',
    location: 'Edge firewall cluster',
  },
  {
    name: 'File Server FS-02',
    status: 'healthy',
    uptime: '99.95%',
    latency: '4.2 ms',
    packetLoss: '0.0%',
    location: 'VM host 03',
  },
  {
    name: 'Warehouse Wi-Fi',
    status: 'offline',
    uptime: '97.84%',
    latency: 'No response',
    packetLoss: '100%',
    location: 'AP group B',
  },
]

const alerts: Alert[] = [
  {
    title: 'Warehouse access points stopped responding to ICMP and SNMP',
    severity: 'critical',
    scope: '23 APs',
    opened: '8 minutes ago',
    owner: 'Assigned to on-site support',
  },
  {
    title: 'VPN gateway latency exceeded threshold for 3 consecutive checks',
    severity: 'high',
    scope: 'Remote staff access',
    opened: '26 minutes ago',
    owner: 'Investigating WAN utilization',
  },
  {
    title: 'Backup job completed with warning on FS-02',
    severity: 'medium',
    scope: 'Nightly backup',
    opened: '1 hour ago',
    owner: 'Reviewing storage logs',
  },
  {
    title: 'Printer queue spike cleared automatically after service restart',
    severity: 'low',
    scope: 'Finance floor',
    opened: 'Today 07:15',
    owner: 'Closed by automation',
  },
]

const sites: Site[] = [
  {
    name: 'Headquarters',
    status: 'healthy',
    devicesOnline: 58,
    devicesTotal: 60,
    isp: 'Wave Business',
  },
  {
    name: 'Warehouse',
    status: 'offline',
    devicesOnline: 17,
    devicesTotal: 40,
    isp: 'Comcast Business',
  },
  {
    name: 'Remote Office',
    status: 'degraded',
    devicesOnline: 24,
    devicesTotal: 28,
    isp: 'AT&T Fiber',
  },
]

const runbooks = [
  'Validate reachability with ping, traceroute, and switch port status.',
  'Check firewall, DHCP, and DNS services before escalating to ISP.',
  'Document blast radius, updates, and resolution notes for the incident timeline.',
]

const changeWindow = [
  { time: '06:00', value: 32 },
  { time: '08:00', value: 54 },
  { time: '10:00', value: 42 },
  { time: '12:00', value: 68 },
  { time: '14:00', value: 74 },
  { time: '16:00', value: 47 },
  { time: '18:00', value: 39 },
]

function App() {
  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">IT Operations Portfolio Project</p>
          <h1>Network Monitoring Dashboard</h1>
          <p className="hero-copy">
            A support-focused dashboard for watching service health, identifying
            outages quickly, and showing incident response discipline.
          </p>
        </div>

        <div className="hero-aside">
          <div className="incident-pill incident-pill-critical">
            Active incident: Warehouse Wi-Fi outage
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Escalation state</dt>
              <dd>In progress</dd>
            </div>
            <div>
              <dt>Last check-in</dt>
              <dd>2 min ago</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>Inspect core uplink and AP power</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="summary-grid" aria-label="Overview metrics">
        {summaryCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <p>{card.label}</p>
            <strong>{card.value}</strong>
            <span>{card.note}</span>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Live performance</p>
              <h2>Latency trend during today&apos;s change window</h2>
            </div>
            <p className="panel-note">WAN and internal gateway checks every 5 minutes</p>
          </div>

          <div className="chart-card" aria-label="Latency bar chart">
            {changeWindow.map((point) => (
              <div className="chart-column" key={point.time}>
                <span
                  className="chart-bar"
                  style={{ height: `${point.value}%` }}
                  aria-hidden="true"
                />
                <strong>{point.value} ms</strong>
                <p>{point.time}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Response workflow</p>
              <h2>Runbook highlights</h2>
            </div>
          </div>

          <ol className="runbook-list">
            {runbooks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Service health</p>
              <h2>Critical infrastructure watchlist</h2>
            </div>
            <p className="panel-note">Status driven by simulated ping and SNMP checks</p>
          </div>

          <div className="service-table">
            <div className="service-table-head">
              <span>Service</span>
              <span>Status</span>
              <span>Latency</span>
              <span>Packet loss</span>
              <span>30-day uptime</span>
            </div>

            {services.map((service) => (
              <div className="service-row" key={service.name}>
                <div>
                  <strong>{service.name}</strong>
                  <p>{service.location}</p>
                </div>
                <div>
                  <span className={`status-chip status-${service.status}`}>
                    {service.status}
                  </span>
                </div>
                <div>{service.latency}</div>
                <div>{service.packetLoss}</div>
                <div>{service.uptime}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Site availability</p>
              <h2>Office and branch coverage</h2>
            </div>
          </div>

          <div className="site-list">
            {sites.map((site) => {
              const fill = `${(site.devicesOnline / site.devicesTotal) * 100}%`

              return (
                <article className="site-card" key={site.name}>
                  <div className="site-card-top">
                    <div>
                      <strong>{site.name}</strong>
                      <p>{site.isp}</p>
                    </div>
                    <span className={`status-dot status-${site.status}`}>
                      {site.status}
                    </span>
                  </div>
                  <div className="site-bar" aria-hidden="true">
                    <span style={{ width: fill }} />
                  </div>
                  <p className="site-meta">
                    {site.devicesOnline}/{site.devicesTotal} monitored devices online
                  </p>
                </article>
              )
            })}
          </div>
        </article>

        <article className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Alert feed</p>
              <h2>Open notifications and recent events</h2>
            </div>
            <p className="panel-note">Prioritized for support triage</p>
          </div>

          <div className="alert-list">
            {alerts.map((alert) => (
              <article className="alert-item" key={alert.title}>
                <div className={`severity severity-${alert.severity}`}>
                  {alert.severity}
                </div>
                <div className="alert-body">
                  <strong>{alert.title}</strong>
                  <p>
                    {alert.scope} | {alert.opened}
                  </p>
                </div>
                <span className="alert-owner">{alert.owner}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
