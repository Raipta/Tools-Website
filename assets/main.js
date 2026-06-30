/* ============ THEME ============ */
(function(){
  const saved = localStorage.getItem('wb-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme(){
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('wb-theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme){
  const sun = document.getElementById('iconSun');
  const moon = document.getElementById('iconMoon');
  if(!sun || !moon) return;
  sun.style.display = theme === 'dark' ? 'block' : 'none';
  moon.style.display = theme === 'dark' ? 'none' : 'block';
}
document.addEventListener('DOMContentLoaded', ()=>{
  updateThemeIcon(document.documentElement.getAttribute('data-theme'));
});

/* ============ MOBILE MENU ============ */
function toggleMenu(){
  document.getElementById('navLinks')?.classList.toggle('open');
}

/* ============ SEARCH (used on homepage) ============ */
function filterTools(q){
  q = q.toLowerCase();
  document.querySelectorAll('[data-search]').forEach(c=>{
    const txt = c.innerText.toLowerCase();
    c.style.display = txt.includes(q) ? '' : 'none';
  });
}

/* ============ UTIL ============ */
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function setupDrop(dropEl, inputEl, onFiles){
  dropEl.addEventListener('click', ()=>inputEl.click());
  inputEl.addEventListener('change', e=>onFiles(e.target.files));
  ['dragenter','dragover'].forEach(ev=>dropEl.addEventListener(ev, e=>{e.preventDefault(); dropEl.classList.add('drag');}));
  ['dragleave','drop'].forEach(ev=>dropEl.addEventListener(ev, e=>{e.preventDefault(); dropEl.classList.remove('drag');}));
  dropEl.addEventListener('drop', e=>{ if(e.dataTransfer.files.length) onFiles(e.dataTransfer.files); });
}

/* ================================================================
   PDF TOOLS
================================================================ */
let mergeFiles = [];
function handlePdfMergeFiles(fileList){
  mergeFiles = Array.from(fileList);
  const list = document.getElementById('pdfMergeList');
  list.innerHTML = mergeFiles.map(f=>`<div class="f"><span>${f.name}</span><span>${(f.size/1024).toFixed(0)} KB</span></div>`).join('');
  document.getElementById('pdfMergeBtn').disabled = mergeFiles.length < 2;
}
async function runPdfMerge(){
  const { PDFDocument } = PDFLib;
  const merged = await PDFDocument.create();
  for(const file of mergeFiles){
    const bytes = await file.arrayBuffer();
    const src = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(p=>merged.addPage(p));
  }
  const outBytes = await merged.save();
  downloadBlob(new Blob([outBytes], {type:'application/pdf'}), 'merged.pdf');
  showResult('pdfMergeResult', `✅ Merged ${mergeFiles.length} files — your download has started.`);
}

let splitFile = null;
function handlePdfSplitFile(fileList){
  splitFile = fileList[0];
  document.getElementById('pdfSplitList').innerHTML = `<div class="f"><span>${splitFile.name}</span><span>${(splitFile.size/1024).toFixed(0)} KB</span></div>`;
  document.getElementById('pdfSplitBtn').disabled = false;
}
async function runPdfSplit(){
  const { PDFDocument } = PDFLib;
  const bytes = await splitFile.arrayBuffer();
  const src = await PDFDocument.load(bytes);
  const total = src.getPageCount();
  let from = Math.max(1, parseInt(document.getElementById('splitFrom').value||1));
  let to = Math.min(total, parseInt(document.getElementById('splitTo').value||total));
  if(from > to) [from,to] = [to,from];
  const out = await PDFDocument.create();
  const indices = [];
  for(let i=from-1;i<=to-1;i++) indices.push(i);
  const pages = await out.copyPages(src, indices);
  pages.forEach(p=>out.addPage(p));
  const outBytes = await out.save();
  downloadBlob(new Blob([outBytes], {type:'application/pdf'}), 'split.pdf');
  showResult('pdfSplitResult', `✅ Extracted pages ${from}–${to} of ${total} — your download has started.`);
}

let wmFile = null;
function handlePdfWmFile(fileList){
  wmFile = fileList[0];
  document.getElementById('pdfWmList').innerHTML = `<div class="f"><span>${wmFile.name}</span><span>${(wmFile.size/1024).toFixed(0)} KB</span></div>`;
  document.getElementById('pdfWmBtn').disabled = false;
}
async function runPdfWatermark(){
  const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;
  const bytes = await wmFile.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const text = document.getElementById('wmText').value || 'WATERMARK';
  doc.getPages().forEach(page=>{
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width/2 - (text.length*7), y: height/2,
      size: 40, font, color: rgb(1,0.35,0.21), opacity:0.3, rotate: degrees(45)
    });
  });
  const outBytes = await doc.save();
  downloadBlob(new Blob([outBytes], {type:'application/pdf'}), 'watermarked.pdf');
  showResult('pdfWmResult', '✅ Watermark added — your download has started.');
}

/* ================================================================
   IMAGE TOOLS
================================================================ */
let compFile = null;
function handleImgCompFile(fileList){
  compFile = fileList[0];
  document.getElementById('imgCompBtn').disabled = false;
  document.getElementById('compStats').style.display = 'flex';
  document.getElementById('compBefore').textContent = (compFile.size/1024).toFixed(0)+' KB';
  document.getElementById('compAfter').textContent = '-';
}
async function runImgCompress(){
  const maxMB = parseFloat(document.getElementById('compMax').value) || 0.5;
  const options = { maxSizeMB: maxMB, maxWidthOrHeight: 1920, useWebWorker: true };
  const compressed = await imageCompression(compFile, options);
  document.getElementById('compAfter').textContent = (compressed.size/1024).toFixed(0)+' KB';
  downloadBlob(compressed, 'compressed-' + compFile.name);
  showResult('imgCompResult', '✅ Compressed — your download has started.');
}

let resizeFile = null, resizeImgEl = null;
function handleImgResizeFile(fileList){
  resizeFile = fileList[0];
  const img = new Image();
  img.onload = ()=>{
    resizeImgEl = img;
    document.getElementById('resizeW').value = img.width;
    document.getElementById('resizeH').value = img.height;
  };
  img.src = URL.createObjectURL(resizeFile);
  document.getElementById('imgResizeBtn').disabled = false;
}
function syncAspect(src){
  if(document.getElementById('keepAspect')?.checked && resizeImgEl){
    if(src === 'w'){
      document.getElementById('resizeH').value = Math.round(document.getElementById('resizeW').value * resizeImgEl.height / resizeImgEl.width);
    } else {
      document.getElementById('resizeW').value = Math.round(document.getElementById('resizeH').value * resizeImgEl.width / resizeImgEl.height);
    }
  }
}
async function runImgResize(){
  const w = parseInt(document.getElementById('resizeW').value);
  const h = parseInt(document.getElementById('resizeH').value);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(resizeImgEl, 0, 0, w, h);
  canvas.toBlob(blob=>{
    downloadBlob(blob, 'resized-' + resizeFile.name);
    showResult('imgResizeResult', `✅ Resized to ${w}×${h} — your download has started.`);
  }, resizeFile.type || 'image/png');
}

let convFile = null, convImgEl = null;
function handleImgConvFile(fileList){
  convFile = fileList[0];
  const img = new Image();
  img.onload = ()=>{ convImgEl = img; };
  img.src = URL.createObjectURL(convFile);
  document.getElementById('imgConvBtn').disabled = false;
}
async function runImgConvert(){
  const targetType = document.getElementById('convFormat').value;
  const canvas = document.createElement('canvas');
  canvas.width = convImgEl.width; canvas.height = convImgEl.height;
  canvas.getContext('2d').drawImage(convImgEl, 0, 0);
  canvas.toBlob(blob=>{
    const ext = targetType.split('/')[1];
    downloadBlob(blob, 'converted.' + ext);
    showResult('imgConvResult', `✅ Converted to ${ext.toUpperCase()} — your download has started.`);
  }, targetType, 0.92);
}

/* ================================================================
   TEXT TOOLS
================================================================ */
function updateWordCount(){
  const text = document.getElementById('wcText').value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const readSec = Math.ceil(words / 3.5);
  document.getElementById('wcWords').textContent = words;
  document.getElementById('wcChars').textContent = chars;
  document.getElementById('wcSentences').textContent = sentences;
  document.getElementById('wcReadTime').textContent = readSec + 's';
}

function convCase(type){
  const el = document.getElementById('caseText');
  let t = el.value;
  if(type==='upper') t = t.toUpperCase();
  else if(type==='lower') t = t.toLowerCase();
  else if(type==='title') t = t.replace(/\w\S*/g, w=>w.charAt(0).toUpperCase()+w.substr(1).toLowerCase());
  else if(type==='sentence') t = t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c=>c.toUpperCase());
  el.value = t;
}

function runDiff(){
  const a = document.getElementById('diffA').value.split(/\s+/);
  const b = document.getElementById('diffB').value.split(/\s+/);
  const setA = new Set(a);
  const html = b.map(w => setA.has(w) ? w : `<mark style="background:var(--accent-soft); color:var(--accent); padding:1px 3px; border-radius:3px;">${w}</mark>`).join(' ');
  showResult('diffResult', '<b>Text B vs Text A</b> (highlighted = not found in A):<br><br>' + html, true);
}

/* ================================================================
   GENERATORS
================================================================ */
function genQR(){
  const val = document.getElementById('qrInput').value || 'https://example.com';
  const box = document.getElementById('qr-box');
  box.innerHTML = '';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  new QRCode(box, { text: val, width:200, height:200, colorDark: isDark ? '#f1f1ee' : '#15161a', colorLight:'transparent' });
  document.getElementById('qrDownload').style.display = 'inline-flex';
}
function downloadQR(){
  const canvas = document.querySelector('#qr-box canvas');
  if(!canvas) return;
  canvas.toBlob(blob=>downloadBlob(blob, 'qrcode.png'));
}

function genPwd(){
  const len = parseInt(document.getElementById('pwdLen').value);
  document.getElementById('pwdLenVal').textContent = len;
  const sets = [];
  if(document.getElementById('pwdUpper').checked) sets.push('ABCDEFGHJKLMNPQRSTUVWXYZ');
  if(document.getElementById('pwdLower').checked) sets.push('abcdefghijkmnpqrstuvwxyz');
  if(document.getElementById('pwdNum').checked) sets.push('23456789');
  if(document.getElementById('pwdSym').checked) sets.push('!@#$%^&*()-_=+');
  const out = document.getElementById('pwdOut');
  if(sets.length===0){ out.textContent = 'Select at least one character set'; return; }
  const all = sets.join('');
  let pwd = '';
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for(let i=0;i<len;i++) pwd += all[arr[i] % all.length];
  out.textContent = pwd;
}

/* ============ shared result display ============ */
function showResult(id, html, isHtml){
  const r = document.getElementById(id);
  if(!r) return;
  r.classList.add('active');
  r.innerHTML = html;
}
