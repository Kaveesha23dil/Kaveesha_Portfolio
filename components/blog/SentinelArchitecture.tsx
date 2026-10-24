function Lane({ nodes }: { nodes: string[] }) {
  return <ol className="sentinel-lane">{nodes.map((node, index) => <li key={node}><span>{node}</span>{index < nodes.length - 1 && <b aria-hidden="true">→</b>}</li>)}</ol>;
}

export default function SentinelArchitecture() {
  return <figure className="sentinel-architecture" aria-label="SentinelAPI architecture: gateway responses are independent of asynchronous monitoring">
    <div className="sentinel-path"><h3>Synchronous API request path</h3><Lane nodes={["API Client", "WSO2 API Manager", "DemoCommerce API"]} /><p>OAuth, routing, and throttling stay at the gateway. Responses return to the client without waiting for detection.</p></div>
    <div className="sentinel-log-connection">↓ WSO2 emits API logs independently</div>
    <div className="sentinel-path sentinel-path--async"><h3>Asynchronous telemetry &amp; detection</h3><Lane nodes={["WSO2 API Logs", "Python Log Bridge", "Event Collector", "PostgreSQL"]} />
      <div className="sentinel-fork"><span>↓ PostgreSQL feeds two processing paths</span><div><span>Rule-Based Detection</span><span>Isolation Forest ML Processing<small>Experimental / offline evaluation</small></span></div><span>↓ Findings and records persist in PostgreSQL</span></div>
      <Lane nodes={["Monitoring API", "React Dashboard"]} /><p>The Monitoring API reads persisted records. Neither detector sits in the gateway request path.</p>
    </div>
    <figcaption>Gateway enforcement and asynchronous analysis have separate responsibilities. The ML branch represents the experimentation layer, not verified live ML inference.</figcaption>
  </figure>;
}
