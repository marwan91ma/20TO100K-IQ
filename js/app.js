const DATA_PATH = new URL('../data/', document.baseURI);
const fmtUSD = n => Number.isFinite(Number(n)) ? new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(n)) : '—';
const fmtNum = n => Number.isFinite(Number(n)) ? new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(Number(n)) : '—';
const pct = n => Number.isFinite(Number(n)) ? `${Number(n).toFixed(2)}%` : '—';
const esc = s => String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function getJSON(file){const r=await fetch(new URL(file,DATA_PATH)); if(!r.ok) throw new Error(file); return r.json();}
function progressPercent(c){return Math.max(0,Math.min(100,(Number(c.current_balance||c.start_balance)-Number(c.start_balance))/(Number(c.target_balance)-Number(c.start_balance))*100));}
function targetProgress(c){return Math.max(0,Math.min(100,(Number(c.current_balance||c.start_balance)/Number(c.target_balance))*100));}
async function renderHome(){
  const [c,t,m,u]=await Promise.all([getJSON('challenge.json'),getJSON('trades.json'),getJSON('milestones.json'),getJSON('updates.json')]);
  const trades=Array.isArray(t.trades)?t.trades:[];
  const normalized=trades.map(x=>({...x,result:String(x.result||'').toLowerCase()}));
  const p=targetProgress(c);
  document.querySelectorAll('[data-balance]').forEach(x=>x.textContent=fmtUSD(c.current_balance));
  const q=document.querySelector('[data-progress]'); if(q){q.style.width=`${p}%`; q.parentElement?.setAttribute('aria-valuenow',p.toFixed(2));}
  const wins=normalized.filter(x=>x.result==='win').length;
  const losses=normalized.filter(x=>x.result==='loss').length;
  const stats={trades:normalized.length,wins,losses,noTrade:Number(c.no_trade_days||0)};
  Object.entries(stats).forEach(([k,v])=>document.querySelectorAll(`[data-stat="${k}"]`).forEach(x=>x.textContent=fmtNum(v)));
  const winRate=normalized.length?wins/normalized.length*100:null;
  document.querySelectorAll('[data-winrate]').forEach(x=>x.textContent=pct(winRate));
  renderMilestones(m,c); renderUpdates(u); renderTrades({trades:normalized});
  document.querySelectorAll('[data-last-update]').forEach(x=>x.textContent=c.last_update||'لم يبدأ التوثيق بعد');
  document.querySelectorAll('[data-phase]').forEach(x=>x.textContent=c.phase||'—');
}
function renderMilestones(m,c){const root=document.querySelector('[data-milestones]'); if(!root)return; root.innerHTML=m.milestones.map((x,i)=>{const passed=Number(c.current_balance)>=Number(x.value); const width=Math.min(100,Math.max(0,Number(c.current_balance)/Number(x.value)*100)); return `<div class="milestone"><strong>${esc(x.label)}</strong><div class="track"><i style="width:${width}%"></i></div><span class="${passed?'unlocked':'locked'}">${passed?'تم':'قادم'}</span></div>`}).join('');}
function renderUpdates(u){const root=document.querySelector('[data-updates]'); if(!root)return; root.innerHTML=u.updates.map(x=>`<article class="update"><time>${esc(x.date)}</time><div><h4>${esc(x.title)}</h4><p>${esc(x.body)}</p></div></article>`).join('');}
function renderTrades(t){const body=document.querySelector('[data-trades]'); if(!body)return; if(!t.trades.length){body.innerHTML=`<tr><td colspan="8"><div class="empty">لم تُسجل أي صفقة بعد. عند بدء التحدي أضف الصفقات إلى <code>data/trades.json</code>.</div></td></tr>`;return;} body.innerHTML=t.trades.slice().reverse().map(x=>`<tr><td>${esc(x.date)}</td><td>${esc(x.symbol)}</td><td>${esc(x.direction)}</td><td>${esc(x.entry)}</td><td>${esc(x.exit)}</td><td>${fmtUSD(x.pnl)}</td><td class="${x.result==='win'?'pos':x.result==='loss'?'neg':''}">${esc(x.result)}</td><td>${esc(x.note||'')}</td></tr>`).join('');}
function animate(){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(x=>o.observe(x));}
function toggleMenu(){document.querySelector('.links')?.classList.toggle('open')}
document.addEventListener('DOMContentLoaded',async()=>{animate();document.querySelector('[data-menu]')?.addEventListener('click',toggleMenu); if(document.querySelector('[data-balance]')){try{await renderHome()}catch(e){console.error('Data load failed',e)}}});
