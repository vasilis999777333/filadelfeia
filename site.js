
// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Load latest items on home
const latestEl = document.getElementById('latest');
if (latestEl) {
  fetch('/data/announcements.json')
    .then(r=>r.json()).then(items=>{
      const last3 = items.slice(0,3);
      latestEl.innerHTML = last3.map(renderCard).join('');
    }).catch(()=>{
      latestEl.innerHTML = '<p class="text-slate-600">Δεν υπάρχουν διαθέσιμες ανακοινώσεις.</p>';
    });
}

// Render list on news page
const listEl = document.getElementById('news-list');
if (listEl) {
  fetch('/data/announcements.json').then(r=>r.json()).then(items=>{
    listEl.innerHTML = items.map(renderCard).join('');
  }).catch(()=>{
    listEl.innerHTML = '<p class="text-slate-600">Δεν υπάρχουν διαθέσιμες ανακοινώσεις.</p>';
  });
}

function renderCard(item){
  const d = new Date(item.date);
  const ds = d.toLocaleDateString('el-GR', { year:'numeric', month:'long', day:'numeric' });
  return `
  <article class="rounded-xl border border-slate-200 p-5 hover:shadow-sm transition">
    <div class="text-xs uppercase tracking-wide text-slate-500">${ds}</div>
    <h3 class="mt-1 text-lg font-bold">${escapeHTML(item.title)}</h3>
    <p class="mt-2 text-slate-700">${escapeHTML(item.summary || '')}</p>
  </article>`;
}
function escapeHTML(s){ return (s||'').replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#039;" }[m])); }
