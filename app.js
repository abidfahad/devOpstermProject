const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;

app.get('/', (req, res) => {
  visitorCount++;
  const containerID = os.hostname();
  const timestamp = new Date().toISOString();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Node.js K8s App</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 40px 48px;
            max-width: 560px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          }
          h1 { font-size: 24px; margin-bottom: 28px; color: #f1f5f9; }
          .row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 0;
            border-bottom: 1px solid #334155;
          }
          .row:last-child { border-bottom: none; }
          .label { font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
          .value { font-size: 15px; color: #38bdf8; font-family: monospace; }
          .badge {
            background: #0ea5e9;
            color: #0c4a6e;
            font-size: 11px;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 999px;
            margin-left: 8px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1> DevOps Demo Video Attemp 2 - SAP ID 74230</h1>
          <div class="row">
            <span class="label">Timestamp</span>
            <span class="value">${timestamp}</span>
          </div>
          <div class="row">
            <span class="label">Container ID</span>
            <span class="value">${containerID}</span>
          </div>
          <div class="row">
            <span class="label">Visitor Count</span>
            <span class="value">${visitorCount}</span>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint (required for K8s probes)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    containerID: os.hostname(),
    visitors: visitorCount
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});