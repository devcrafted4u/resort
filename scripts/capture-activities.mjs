import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9227;
const BASE_URL = 'http://localhost:3000/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCDP(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        if (data.error) {
          reject(new Error(`${method} failed: ${JSON.stringify(data.error)}`));
        } else {
          resolve(data.result);
        }
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--user-data-dir=C:\\Users\\Avi\\AppData\\Local\\Temp\\chrome-act-test-3'
  ]);
  
  await sleep(1500);
  
  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(BASE_URL)}`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const ws = new WebSocket(tabData.webSocketDebuggerUrl);
  
  await new Promise((r) => ws.addEventListener('open', r));
  
  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'DOM.enable');
  await sendCDP(ws, 'Runtime.enable');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  
  await sleep(2000);
  
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: 'document.getElementById("activities")?.scrollIntoView({ behavior: "instant", block: "start" })',
  });
  await sleep(1200);
  
  const res = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_output/activities-mobile-view.png', Buffer.from(res.data, 'base64'));
  console.log('Successfully saved test_output/activities-mobile-view.png');
  
  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);
