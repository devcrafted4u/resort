import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const BASE_URL = 'http://localhost:3000/';
const OUTPUT_DIR = path.resolve('test_output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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

async function evaluate(ws, expression) {
  const res = await sendCDP(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return res.result?.value;
}

async function captureScreenshot(ws, filename) {
  const result = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(result.data, 'base64');
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  return filepath;
}

async function main() {
  console.log('🚀 Launching headless Chrome on port', PORT);
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-sync',
    'about:blank',
  ]);

  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        connected = true;
        break;
      }
    } catch {}
    await sleep(200);
  }

  if (!connected) {
    console.error('❌ Failed to connect to Chrome remote debugging port.');
    chromeProcess.kill();
    process.exit(1);
  }

  console.log('✅ Connected to Chrome. Opening resort application:', BASE_URL);
  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(BASE_URL)}`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const ws = new WebSocket(tabData.webSocketDebuggerUrl);

  await new Promise((resolve) => ws.addEventListener('open', resolve));

  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'DOM.enable');
  await sendCDP(ws, 'Runtime.enable');

  // Wait for initial page load
  await sleep(1500);

  const viewports = [
    { name: 'iphone-se-320x568', width: 320, height: 568, mobile: true, deviceScaleFactor: 2 },
    { name: 'iphone-8-375x667', width: 375, height: 667, mobile: true, deviceScaleFactor: 2 },
    { name: 'iphone-14-390x844', width: 390, height: 844, mobile: true, deviceScaleFactor: 3 },
    { name: 'iphone-15-promax-430x932', width: 430, height: 932, mobile: true, deviceScaleFactor: 3 },
    { name: 'iphone-landscape-844x390', width: 844, height: 390, mobile: true, deviceScaleFactor: 3 },
    { name: 'ipad-portrait-768x1024', width: 768, height: 1024, mobile: true, deviceScaleFactor: 2 },
    { name: 'ipad-landscape-1024x768', width: 1024, height: 768, mobile: true, deviceScaleFactor: 2 },
    { name: 'ipad-air-820x1180', width: 820, height: 1180, mobile: true, deviceScaleFactor: 2 },
    { name: 'ipad-pro-1024x1366', width: 1024, height: 1366, mobile: true, deviceScaleFactor: 2 },
    { name: 'ipad-pro-landscape-1366x1024', width: 1366, height: 1024, mobile: true, deviceScaleFactor: 2 },
    { name: 'macbook-desktop-1440x900', width: 1440, height: 900, mobile: false, deviceScaleFactor: 2 },
  ];

  console.log('\n--- STARTING SYSTEMATIC RESPONSIVE AUDIT ---');
  let totalErrors = 0;

  for (const vp of viewports) {
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
      mobile: vp.mobile,
    });

    await sleep(400);

    const audit = await evaluate(ws, `
      (() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHorizontalScroll = scrollWidth > winWidth + 1;

        // Helper to check if an element is inside an intentional horizontal scroll container
        function isInsideScrollContainer(el) {
          let curr = el.parentElement;
          while (curr && curr !== document.body && curr !== document.documentElement) {
            const style = window.getComputedStyle(curr);
            if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') {
              return true;
            }
            curr = curr.parentElement;
          }
          return false;
        }

        // Find elements that overflow the viewport horizontally without an enclosing overflow container
        const overflowElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.right > winWidth + 2 && !isInsideScrollContainer(el)) {
              overflowElements.push({
                tag: el.tagName.toLowerCase(),
                id: el.id,
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
                right: Math.round(rect.right),
                excess: Math.round(rect.right - winWidth)
              });
            }
          }
        }

        // Check key sections existence and bounds
        const sections = ['hero', 'packages', 'about', 'day-outings', 'accommodation', 'activities', 'gallery', 'events', 'enquiry', 'contact'];
        const sectionStatus = {};
        for (const s of sections) {
          const el = document.getElementById(s);
          if (el) {
            const r = el.getBoundingClientRect();
            sectionStatus[s] = { exists: true, height: Math.round(r.height), width: Math.round(r.width) };
          } else {
            sectionStatus[s] = { exists: false };
          }
        }

        return {
          winWidth,
          scrollWidth,
          hasHorizontalScroll,
          overflowCount: overflowElements.length,
          topOverflows: overflowElements.slice(0, 5),
          sectionStatus
        };
      })()
    `);

    const screenshotPath = await captureScreenshot(ws, `${vp.name}.png`);

    console.log(`\n📱 Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`   ScrollWidth: ${audit.scrollWidth}px vs WindowWidth: ${audit.winWidth}px`);
    console.log(`   Horizontal Scroll: ${audit.hasHorizontalScroll ? '❌ YES (OVERFLOW DETECTED)' : '✅ NONE (PERFECT)'}`);
    
    if (audit.hasHorizontalScroll || audit.overflowCount > 0) {
      console.log(`   ❌ Elements overflowing right edge (${audit.overflowCount}):`);
      audit.topOverflows.forEach((o, idx) => {
        console.log(`      ${idx + 1}. <${o.tag} id="${o.id}"> class="${o.className}" (excess: +${o.excess}px)`);
      });
      totalErrors++;
    } else {
      console.log(`   ✅ All sections rendered within screen boundaries without clipping.`);
    }
  }

  // Mobile menu interactive test at 375px
  console.log('\n--- TESTING MOBILE NAVIGATION MENU INTERACTION ---');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await sleep(300);

  const menuOpenTest = await evaluate(ws, `
    (() => {
      // Find mobile hamburger button
      const btn = document.getElementById('mobile-menu-toggle') || document.querySelector('button[aria-label="Open navigation menu"]');
      if (!btn) return { success: false, error: 'Mobile hamburger button not found' };
      btn.click();
      return { success: true };
    })()
  `);

  await sleep(400);
  await captureScreenshot(ws, 'mobile-menu-opened.png');

  const menuAudit = await evaluate(ws, `
    (() => {
      // Check if drawer is expanded with height > 100
      const drawer = document.querySelector('header .max-h-\\\\[85vh\\\\]') || document.querySelector('header .opacity-100');
      const isDrawerVisible = !!drawer && drawer.clientHeight > 100;
      return { isDrawerVisible, height: drawer ? drawer.clientHeight : 0 };
    })()
  `);
  console.log(`   Mobile Menu Drawer Opens: ${menuAudit.isDrawerVisible ? '✅ YES' : '❌ NO'} (height: ${menuAudit.height}px)`);

  // Close menu
  await evaluate(ws, `
    (() => {
      const closeBtn = document.getElementById('mobile-menu-toggle') || document.querySelector('button[aria-label="Close navigation menu"]');
      if (closeBtn) closeBtn.click();
    })()
  `);
  await sleep(300);

  console.log('\n--- TESTING LIGHTBOX INTERACTION ON MOBILE ---');
  const lightboxTest = await evaluate(ws, `
    (() => {
      // Find first gallery item and click
      const item = document.querySelector('#gallery .cursor-pointer');
      if (!item) return { success: false, error: 'Gallery item not found' };
      item.click();
      return { success: true };
    })()
  `);
  await sleep(500);
  await captureScreenshot(ws, 'lightbox-opened-mobile.png');

  const lightboxAudit = await evaluate(ws, `
    (() => {
      const modal = document.querySelector('[role="dialog"][aria-label="Media Lightbox"]');
      const nextBtn = document.querySelector('button[aria-label="Next image"]');
      const prevBtn = document.querySelector('button[aria-label="Previous image"]');
      const closeBtn = document.querySelector('button[aria-label="Close full-screen view"]');
      return {
        isOpen: !!modal,
        hasNext: !!nextBtn,
        hasPrev: !!prevBtn,
        hasClose: !!closeBtn
      };
    })()
  `);
  console.log(`   Lightbox Opened: ${lightboxAudit.isOpen ? '✅ YES' : '❌ NO'}`);
  console.log(`   Lightbox Prev/Next/Close accessible: ${lightboxAudit.hasNext && lightboxAudit.hasPrev && lightboxAudit.hasClose ? '✅ YES' : '❌ NO'}`);

  // Close lightbox
  await evaluate(ws, `
    (() => {
      const closeBtn = document.querySelector('button[aria-label="Close full-screen view"]');
      if (closeBtn) closeBtn.click();
    })()
  `);
  await sleep(300);

  console.log('\n=============================================');
  console.log(`AUDIT COMPLETE: ${totalErrors === 0 ? 'ALL VIEWPORTS PASSED (0 ERRORS)' : `${totalErrors} VIEWPORTS WITH ISSUES`}`);
  console.log('=============================================\n');

  ws.close();
  chromeProcess.kill();
}

main().catch((err) => {
  console.error('Fatal error running verification:', err);
  process.exit(1);
});
