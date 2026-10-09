import { useState } from "react";
import "./App.css";
import {
  checkHealth,
  assessRisk,
  evaluateInvestment,
} from "./services/api";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [riskScore, setRiskScore] = useState(24);

  const [riskForm, setRiskForm] = useState({
    asset_criticality: 3,
    threat_likelihood: 3,
    vulnerability_severity: 3,
    control_effectiveness: 20,
  });

  const [riskResult, setRiskResult] = useState(null);
  const [riskLoading, setRiskLoading] = useState(false);
  const [riskError, setRiskError] = useState("");

  const [investmentForm, setInvestmentForm] = useState({
    current_risk: 16,
    expected_risk_reduction: 50,
    implementation_cost: 10000,
  });

  const [investmentResult, setInvestmentResult] = useState(null);
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentError, setInvestmentError] = useState("");

  const [apiStatus, setApiStatus] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  const navItems = [
    "Dashboard",
    "Quick Check",
    "Risk Assessment",
    "Investment Analysis",
    "Agent Activity",
    "Security Events",
    "Break My Agent",
    "Risk Report",
    "Recommendations",
    "API Status",
  ];

  const handleRiskChange = (e) => {
    const { name, value } = e.target;

    setRiskForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;

    setInvestmentForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleRiskAssessment = async (e) => {
    e.preventDefault();

    setRiskLoading(true);
    setRiskError("");
    setRiskResult(null);

    try {
      const result = await assessRisk(riskForm);

      setRiskResult(result);

      if (typeof result.residual_risk === "number") {
        setRiskScore(Math.round(result.residual_risk));
      }
    } catch (error) {
      setRiskError(error.message);
    } finally {
      setRiskLoading(false);
    }
  };

  const handleInvestmentEvaluation = async (e) => {
    e.preventDefault();

    setInvestmentLoading(true);
    setInvestmentError("");
    setInvestmentResult(null);

    try {
      const result = await evaluateInvestment(investmentForm);

      setInvestmentResult(result);
    } catch (error) {
      setInvestmentError(error.message);
    } finally {
      setInvestmentLoading(false);
    }
  };

  const handleApiStatus = async () => {
    setApiLoading(true);
    setApiStatus(null);

    try {
      const result = await checkHealth();
      setApiStatus({
        connected: true,
        data: result,
      });
    } catch (error) {
      setApiStatus({
        connected: false,
        error: error.message,
      });
    } finally {
      setApiLoading(false);
    }
  };

  const renderDashboard = () => (
    <>
      <header className="header">
        <div>
          <h1>Security Dashboard</h1>
          <p>
            Continuous cyber-risk monitoring for autonomous AI agents.
          </p>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          SYSTEM PROTECTED
        </div>
      </header>

      <section className="risk-grid">
        <div className="card risk-card">
          <div className="card-title">
            <span>CYBER RISK SCORE</span>
            <span className="badge low">
              {riskScore <= 30
                ? "LOW"
                : riskScore <= 60
                ? "MEDIUM"
                : riskScore <= 80
                ? "HIGH"
                : "CRITICAL"}
            </span>
          </div>

          <div className="risk-score">
            {riskScore}
            <span>/100</span>
          </div>

          <p>Current overall security risk</p>

          <div className="risk-bar">
            <div
              className="risk-fill"
              style={{ width: `${Math.min(riskScore, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="card">
          <span className="card-label">BLOCKED ACTIONS</span>
          <h2>3</h2>
          <p>Unsafe actions prevented</p>
        </div>

        <div className="card">
          <span className="card-label">PENDING APPROVALS</span>
          <h2>1</h2>
          <p>Actions waiting for review</p>
        </div>

        <div className="card">
          <span className="card-label">VERIFICATION</span>
          <h2>98%</h2>
          <p>Successful verified actions</p>
        </div>
      </section>

      <section className="two-column">
        <div className="card">
          <div className="section-heading">
            <h2>Worker Agent</h2>
            <span className="badge online">ONLINE</span>
          </div>

          <div className="agent-info">
            <div className="agent-avatar">WA</div>

            <div>
              <h3>WorkerAgent</h3>
              <p>Autonomous task execution agent</p>
            </div>
          </div>

          <div className="objective">
            <span>CURRENT OBJECTIVE</span>
            <p>Fix the authentication bug in the repository.</p>
          </div>
        </div>

        <div className="card">
          <div className="section-heading">
            <h2>Security Controls</h2>
          </div>

          <div className="control">
            <span>Tool Gateway</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="control">
            <span>Policy Engine</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="control">
            <span>Sandbox</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="control">
            <span>Verification</span>
            <strong>ACTIVE</strong>
          </div>
        </div>
      </section>

      <section className="card activity-card">
        <div className="section-heading">
          <h2>Recent Security Activity</h2>

          <button
            className="view-btn"
            onClick={() => setActivePage("Security Events")}
          >
            View All
          </button>
        </div>

        <div className="activity">
          <div className="activity-icon safe">✓</div>

          <div>
            <strong>Repository inspected</strong>
            <p>WorkerAgent analyzed authentication files.</p>
          </div>

          <span className="activity-time">Just now</span>
        </div>

        <div className="activity">
          <div className="activity-icon danger">!</div>

          <div>
            <strong>Credential access blocked</strong>
            <p>Attempted access to .env was intercepted.</p>
          </div>

          <span className="activity-time">2 min ago</span>
        </div>

        <div className="activity">
          <div className="activity-icon warning">!</div>

          <div>
            <strong>Database action requires approval</strong>
            <p>Destructive operation detected.</p>
          </div>

          <span className="activity-time">5 min ago</span>
        </div>
      </section>

      <section className="quick-actions">
        <button
          className="primary-btn"
          onClick={() => setActivePage("Quick Check")}
        >
          + Quick Check
        </button>

        <button
          className="danger-btn"
          onClick={() => setActivePage("Break My Agent")}
        >
          🔥 BREAK MY AGENT
        </button>
      </section>
    </>
  );

  const renderPage = () => {
    if (activePage === "Dashboard") {
      return renderDashboard();
    }

    return (
      <>
        <header className="header">
          <div>
            <h1>{activePage}</h1>
            <p>
              AegisForge security control layer for autonomous AI agents.
            </p>
          </div>

          <div className="header-status">
            <span className="status-dot"></span>
            SYSTEM PROTECTED
          </div>
        </header>

        {activePage === "Quick Check" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Quick Check</h2>
            </div>

            <p>
              Analyze a task before the Worker Agent starts executing it.
            </p>

            <div className="objective">
              <span>EXAMPLE USER OBJECTIVE</span>
              <p>Fix the authentication bug in the repository.</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setRiskScore(18)}
            >
              Run Security Check
            </button>
          </section>
        )}

        {activePage === "Risk Assessment" && (
          <section className="card page-card">
            <div className="section-heading">
              <div>
                <h2>Risk Assessment</h2>
                <p>
                  Quantify cyber risk using the backend risk engine.
                </p>
              </div>
            </div>

            <form
              className="form-grid"
              onSubmit={handleRiskAssessment}
            >
              <div className="form-group">
                <label>Asset Criticality</label>

                <select
                  name="asset_criticality"
                  value={riskForm.asset_criticality}
                  onChange={handleRiskChange}
                >
                  <option value={1}>1 - Very Low</option>
                  <option value={2}>2 - Low</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Threat Likelihood</label>

                <select
                  name="threat_likelihood"
                  value={riskForm.threat_likelihood}
                  onChange={handleRiskChange}
                >
                  <option value={1}>1 - Very Low</option>
                  <option value={2}>2 - Low</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Very High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Vulnerability Severity</label>

                <select
                  name="vulnerability_severity"
                  value={riskForm.vulnerability_severity}
                  onChange={handleRiskChange}
                >
                  <option value={1}>1 - Very Low</option>
                  <option value={2}>2 - Low</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Existing Control Effectiveness (%)</label>

                <input
                  type="number"
                  name="control_effectiveness"
                  min="0"
                  max="100"
                  value={riskForm.control_effectiveness}
                  onChange={handleRiskChange}
                />
              </div>

              <button
                className="primary-btn"
                type="submit"
                disabled={riskLoading}
              >
                {riskLoading
                  ? "Assessing..."
                  : "Assess Cyber Risk"}
              </button>
            </form>

            {riskError && (
              <div className="error-box">
                {riskError}
              </div>
            )}

            {riskResult && (
              <div className="result-grid">
                <div className="result-card">
                  <span>INHERENT RISK</span>
                  <strong>{riskResult.inherent_risk}</strong>
                </div>

                <div className="result-card">
                  <span>RESIDUAL RISK</span>
                  <strong>{riskResult.residual_risk}</strong>
                </div>

                <div className="result-card">
                  <span>RISK LEVEL</span>
                  <strong>{riskResult.risk_level}</strong>
                </div>

                <div className="result-card">
                  <span>CONTROL EFFECTIVENESS</span>
                  <strong>
                    {riskResult.control_effectiveness}%
                  </strong>
                </div>
              </div>
            )}
          </section>
        )}

        {activePage === "Investment Analysis" && (
          <section className="card page-card">
            <div className="section-heading">
              <div>
                <h2>Investment Analysis</h2>
                <p>
                  Estimate the impact of a proposed security investment.
                </p>
              </div>
            </div>

            <form
              className="form-grid"
              onSubmit={handleInvestmentEvaluation}
            >
              <div className="form-group">
                <label>Current Risk</label>

                <input
                  type="number"
                  name="current_risk"
                  min="0"
                  max="100"
                  value={investmentForm.current_risk}
                  onChange={handleInvestmentChange}
                />
              </div>

              <div className="form-group">
                <label>Expected Risk Reduction (%)</label>

                <input
                  type="number"
                  name="expected_risk_reduction"
                  min="0"
                  max="100"
                  value={investmentForm.expected_risk_reduction}
                  onChange={handleInvestmentChange}
                />
              </div>

              <div className="form-group">
                <label>Implementation Cost</label>

                <input
                  type="number"
                  name="implementation_cost"
                  min="0"
                  value={investmentForm.implementation_cost}
                  onChange={handleInvestmentChange}
                />
              </div>

              <button
                className="primary-btn"
                type="submit"
                disabled={investmentLoading}
              >
                {investmentLoading
                  ? "Evaluating..."
                  : "Evaluate Investment"}
              </button>
            </form>

            {investmentError && (
              <div className="error-box">
                {investmentError}
              </div>
            )}

            {investmentResult && (
              <div className="result-grid">
                <div className="result-card">
                  <span>CURRENT RISK</span>
                  <strong>{investmentResult.current_risk}</strong>
                </div>

                <div className="result-card">
                  <span>RISK REDUCED</span>
                  <strong>{investmentResult.risk_reduced}</strong>
                </div>

                <div className="result-card">
                  <span>PROJECTED RISK</span>
                  <strong>{investmentResult.projected_risk}</strong>
                </div>

                <div className="result-card">
                  <span>COST EFFECTIVENESS</span>
                  <strong>
                    {investmentResult.cost_effectiveness}
                  </strong>
                </div>
              </div>
            )}
          </section>
        )}

        {activePage === "Agent Activity" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Agent Activity</h2>
            </div>

            <p>Live activity from the Worker Agent.</p>

            <div className="activity">
              <div className="activity-icon safe">✓</div>

              <div>
                <strong>Repository inspection</strong>
                <p>
                  WorkerAgent inspected authentication files.
                </p>
              </div>
            </div>

            <div className="activity">
              <div className="activity-icon safe">✓</div>

              <div>
                <strong>Tool Gateway request</strong>
                <p>
                  WorkerAgent request passed through the security gateway.
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "Security Events" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Security Events</h2>
            </div>

            <div className="activity">
              <div className="activity-icon danger">!</div>

              <div>
                <strong>Credential access blocked</strong>
                <p>
                  WorkerAgent attempted to access .env.
                </p>
              </div>
            </div>

            <div className="activity">
              <div className="activity-icon warning">!</div>

              <div>
                <strong>Destructive database action</strong>
                <p>
                  Database operation requires approval.
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "Break My Agent" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Break My Agent</h2>
            </div>

            <p>
              Run controlled security attack scenarios against the Worker Agent.
            </p>

            <div className="attack-grid">
              <div className="attack-card">
                <div className="activity-icon danger">!</div>

                <h3>Secret Exfiltration</h3>

                <p>
                  Attempt to read .env and send credentials externally.
                </p>

                <span className="badge danger-badge">HIGH RISK</span>
              </div>

              <div className="attack-card">
                <div className="activity-icon warning">!</div>

                <h3>Destructive Database Action</h3>

                <p>
                  Simulate a destructive database operation.
                </p>

                <span className="badge warning-badge">
                  APPROVAL REQUIRED
                </span>
              </div>

              <div className="attack-card">
                <div className="activity-icon danger">!</div>

                <h3>Prompt Injection</h3>

                <p>
                  Detect malicious instructions conflicting with user intent.
                </p>

                <span className="badge danger-badge">BLOCK</span>
              </div>
            </div>
          </section>
        )}

        {activePage === "Risk Report" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Risk Report</h2>
            </div>

            <div className="risk-report-score">
              {riskScore}
              <span>/100</span>
            </div>

            <p>
              Current risk value shown from the latest assessment.
            </p>
          </section>
        )}

        {activePage === "Recommendations" && (
          <section className="card page-card">
            <div className="section-heading">
              <h2>Security Recommendations</h2>
            </div>

            <div className="objective">
              <span>PRIORITY 1</span>
              <p>Restrict credential-file access.</p>
            </div>

            <div className="objective">
              <span>PRIORITY 2</span>
              <p>Add database write restrictions.</p>
            </div>

            <div className="objective">
              <span>PRIORITY 3</span>
              <p>Restrict external network requests.</p>
            </div>
          </section>
        )}

        {activePage === "API Status" && (
          <section className="card page-card">
            <div className="section-heading">
              <div>
                <h2>API Status</h2>
                <p>Check connectivity with the AegisForge backend.</p>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={handleApiStatus}
              disabled={apiLoading}
            >
              {apiLoading ? "Checking..." : "Check Backend"}
            </button>

            {apiStatus && (
              <div
                className={
                  apiStatus.connected
                    ? "success-box"
                    : "error-box"
                }
              >
                {apiStatus.connected ? (
                  <>
                    <strong>Backend Connected</strong>
                    <p>
                      AegisForge API is responding normally.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>Backend Unavailable</strong>
                    <p>{apiStatus.error}</p>
                  </>
                )}
              </div>
            )}
          </section>
        )}
      </>
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">A</div>

          <div>
            <h2>AEGISFORGE</h2>
            <span>Cyber Risk Layer</span>
          </div>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="agent-status">
          <span className="status-dot"></span>
          Worker Agent Online
        </div>
      </aside>

      <main className="main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;