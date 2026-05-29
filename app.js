// app.js — layout original + navegação por mês + backup

const { useState, useMemo, useEffect } = React;

const MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

const SEED = [
  { id: 'a1', name: 'Poupança Sicredi',    amount: 18420.50, category: 'poupanca',  monthlyYield:  61.40 },
  { id: 'a2', name: 'CDB Liquidez Diária', amount: 21800.00, category: 'rendaFixa', monthlyYield:  72.20 },
  { id: 'a3', name: 'Tesouro IPCA+ 2029',  amount: 14200.48, category: 'tesouro',   monthlyYield:  48.30 },
  { id: 'a4', name: 'ITUB4 + PETR4',       amount:  5912.00, category: 'acoes',     monthlyYield:  19.97 },
  { id: 'a5', name: 'Fundo Multi Sicredi', amount:  1900.00, category: 'fundos',    monthlyYield:   9.90 },
];

// ─── Storage helpers por mês ───────────────────────────────────
function mkKey(year, month, type) { return `ti:${year}:${month}:${type}`; }

function loadItems(year, month) {
  try {
    const raw = localStorage.getItem(mkKey(year, month, 'inv'));
    if (!raw) return [];
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [];
  } catch { return []; }
}

function saveItems(year, month, data) {
  try { localStorage.setItem(mkKey(year, month, 'inv'), JSON.stringify(data)); } catch {}
}

function loadOverrides(year, month) {
  try {
    const raw = localStorage.getItem(mkKey(year, month, 'ov'));
    if (raw) return JSON.parse(raw);
  } catch {}
  return { monthYieldText: null, yearText: null };
}

function saveOverrides(year, month, data) {
  try { localStorage.setItem(mkKey(year, month, 'ov'), JSON.stringify(data)); } catch {}
}

function loadRendimentos(year, month) {
  try {
    const raw = localStorage.getItem(mkKey(year, month, 'rend'));
    if (!raw) return [];
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [];
  } catch { return []; }
}

function saveRendimentos(year, month, data) {
  try { localStorage.setItem(mkKey(year, month, 'rend'), JSON.stringify(data)); } catch {}
}

// ─── Backup helpers ────────────────────────────────────────────
function exportBackup() {
  const backup = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('ti:')) {
      try { backup[k] = JSON.parse(localStorage.getItem(k)); } catch { backup[k] = localStorage.getItem(k); }
    }
  }
  return backup;
}

function importBackup(data) {
  const toDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('ti:')) toDelete.push(k);
  }
  toDelete.forEach(k => localStorage.removeItem(k));
  Object.entries(data).forEach(([k, v]) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  });
}

// ─── BackupModal ───────────────────────────────────────────────
function BackupModal({ onClose }) {
  const [status, setStatus] = React.useState('');
  const fileRef = React.useRef(null);

  function handleExport() {
    const data = exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const ts = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url; a.download = `backup_total_investido_${ts}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setStatus('✅ Backup exportado com sucesso!');
    setTimeout(() => setStatus(''), 3000);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const keys = Object.keys(data);
        if (!keys.every(k => k.startsWith('ti:'))) {
          setStatus('❌ Arquivo inválido. Use um backup exportado pelo app.'); return;
        }
        importBackup(data);
        setStatus(`✅ Restaurado! ${keys.length} registros. Recarregue a página.`);
      } catch { setStatus('❌ Erro ao ler o arquivo JSON.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,25,0.5)' }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: '12px 18px 32px',
        boxShadow: '0 -12px 30px rgba(0,0,0,0.12)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: '#D9E1DC', margin: '4px auto 14px' }}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: SI.tealDark }}>Backup & Restauração</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', padding: 4, cursor: 'pointer' }}>
            <Icon.Close s={22}/>
          </button>
        </div>
        <p style={{ fontSize: 13, color: SI.textMid, margin: '0 0 18px', lineHeight: 1.6 }}>
          Salva todos os dados de todos os meses em um arquivo. Restaure ao trocar de dispositivo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={handleExport} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px', borderRadius: 12, background: SI.teal, border: 'none',
            color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            ⬇ Exportar backup
          </button>
          <button onClick={() => fileRef.current && fileRef.current.click()} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px', borderRadius: 12, background: '#fff',
            border: `2px solid ${SI.greenPrimary}`,
            color: SI.greenDark, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            ⬆ Restaurar backup
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }}/>
        </div>
        {status && (
          <div style={{
            marginTop: 14, padding: '11px 14px', borderRadius: 10,
            background: status.startsWith('✅') ? '#EAF7E0' : '#FDECEA',
            color: status.startsWith('✅') ? SI.greenDark : SI.danger,
            fontSize: 13, fontWeight: 500,
          }}>{status}</div>
        )}
      </div>
    </div>
  );
}

// 'YYYY-MM-DD' -> 'DD/MM/YYYY'
function formatDateBR(iso) {
  if (!iso || typeof iso !== 'string' || iso.indexOf('-') === -1) return iso || '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// ─── App principal ─────────────────────────────────────────────
function App({ onHome }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [monthIdx, setMonthIdx] = useState(now.getMonth());

  const [items, setItems] = useState(() => loadItems(year, monthIdx));
  const [overrides, setOverrides] = useState(() => loadOverrides(year, monthIdx));
  const [visible, setVisible] = useState(true);
  const [sheet, setSheet] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'extrato'
  const [showBackup, setShowBackup] = useState(false);

  // Recarrega dados ao mudar de mês/ano
  useEffect(() => {
    setItems(loadItems(year, monthIdx));
    setOverrides(loadOverrides(year, monthIdx));
  }, [year, monthIdx]);

  useEffect(() => { saveItems(year, monthIdx, items); }, [items, year, monthIdx]);
  useEffect(() => { saveOverrides(year, monthIdx, overrides); }, [overrides, year, monthIdx]);

  function prevMonth() {
    // Não permite navegar antes de Janeiro 2026
    if (year === 2026 && monthIdx === 0) return;
    if (year < 2026) return;
    if (monthIdx === 0) { setYear(y => y - 1); setMonthIdx(11); }
    else setMonthIdx(m => m - 1);
    setView('home'); setSheet(null);
  }
  function nextMonth() {
    if (monthIdx === 11) { setYear(y => y + 1); setMonthIdx(0); }
    else setMonthIdx(m => m + 1);
    setView('home'); setSheet(null);
  }

  const total = items.reduce((s, i) => s + i.amount, 0);
  const monthYield = items.reduce((s, i) => s + (i.monthlyYield || 0), 0);
  const yearPct = total > 0 ? (monthYield * 12) / total * 100 : 0;

  const allocation = useMemo(() => {
    const map = new Map();
    items.forEach((i) => {
      const cat = CATEGORIES.find((c) => c.key === i.category) || CATEGORIES[0];
      const cur = map.get(cat.key) || { ...cat, value: 0, count: 0 };
      cur.value += i.amount; cur.count += 1;
      map.set(cat.key, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.value - a.value);
  }, [items]);

  function openAdd() { setSheet({ mode: 'add' }); }
  function openEdit(id) { setSheet({ mode: 'edit', id }); }
  function closeSheet() { setSheet(null); }

  function saveItem(data) {
    if (sheet?.mode === 'edit') {
      setItems(arr => arr.map(i => i.id === sheet.id ? { ...i, ...data } : i));
    } else {
      setItems(arr => [...arr, { id: 'i' + Date.now(), ...data }]);
    }
    closeSheet();
  }
  function deleteItem(id) { setItems(arr => arr.filter(i => i.id !== id)); closeSheet(); }

  const editingItem = sheet?.mode === 'edit' ? items.find(i => i.id === sheet.id) : null;

  // ── Cabeçalho com setas de mês ──
  const isFirstMonth = year === 2026 && monthIdx === 0;
  const monthHeader = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 16px 14px', minHeight: 84, gap: 8,
    }}>
      <button style={{ ...iconBtn, opacity: isFirstMonth ? 0.25 : 1 }} aria-label="Mês anterior" onClick={prevMonth} disabled={isFirstMonth}>
        <Icon.Back/>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <img
          src="logo.png" alt="Logo"
          style={{ height: 100, maxWidth: '70%', width: 'auto', display: 'block', objectFit: 'contain' }}
        />
        <div style={{ fontSize: 11, color: SI.teal, fontWeight: 600, letterSpacing: 0.3, marginTop: 1 }}>
          {MONTHS[monthIdx]} {year}
        </div>
      </div>

      <button style={iconBtn} aria-label="Próximo mês" onClick={nextMonth}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke={SI.textDark} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );

  return (
    <ResponsiveShell>
      {/* ── HOME (sempre montado) ── */}
      <div style={{
        display: view === 'extrato' ? 'none' : 'block',
        background: SI.bg, fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
        color: SI.textDark,
        paddingBottom: 'env(safe-area-inset-bottom, 80px)',
      }}>
        {/* Cabeçalho com setas */}
        {monthHeader}

        {/* Rótulo da página */}
        <div style={{
          textAlign: 'center', color: SI.teal, fontWeight: 700,
          fontSize: 17, padding: '6px 0 14px', letterSpacing: 0.1,
        }}>
          Investimentos
        </div>

        {/* Total Investido card */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <button style={{ ...iconBtn, marginTop: 2 }} aria-label="Tela de entrada" onClick={onHome}>
              <Icon.Home c={SI.teal}/>
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, color: SI.textDark, fontWeight: 500, letterSpacing: -0.2 }}>
                  Total Investido
                </div>
                <div style={{ fontSize: 12, color: SI.textMute, marginTop: 2 }}>
                  Aplicações + rendimentos
                </div>
              </div>
            </div>
            <button style={{ ...iconBtn, marginTop: 2 }} aria-label="Backup"
              onClick={() => setShowBackup(true)}>
              <Icon.Gear/>
            </button>
          </div>

          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginTop: 14, padding: '0 4px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 15, color: SI.textMid, fontWeight: 500 }}>R$</span>
              <span style={{
                fontSize: 38, fontWeight: 700, color: SI.greenPrimary,
                letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}>
                {visible ? formatBRL(total) : '••••••'}
              </span>
            </div>
            <button onClick={() => setVisible(v => !v)} style={iconBtn}
              aria-label={visible ? 'Ocultar valores' : 'Mostrar valores'}>
              {visible ? <Icon.EyeOff/> : <Icon.Eye/>}
            </button>
          </div>

          <div style={{
            marginTop: 18, paddingTop: 14, borderTop: `1px solid ${SI.border}`,
            display: 'grid', gap: 8,
          }}>
            <EditableRow
              label="Rentabilidade do mês"
              value={overrides.monthYieldText ?? `R$ ${formatBRL(monthYield)}`}
              hasOverride={!!overrides.monthYieldText}
              masked={!visible}
              onSave={(v) => setOverrides(o => ({ ...o, monthYieldText: v || null }))}
            />
            <EditableRow
              label="Desempenho no ano"
              value={overrides.yearText ?? `${yearPct.toFixed(0)}% poup.`}
              hasOverride={!!overrides.yearText}
              masked={!visible}
              onSave={(v) => setOverrides(o => ({ ...o, yearText: v || null }))}
            />
          </div>
        </div>

        {/* Quick actions */}
        <QuickActions onAdd={openAdd} onExtrato={() => setView('extrato')} investimentosAtivo={true}/>

        {/* Alocação */}
        <div style={{ ...cardStyle, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: SI.textDark }}>Alocação da Carteira</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 13, color: SI.textMid }}>Visualizando: 1 Cooperativa</span>
                <Icon.Chevron s={14}/>
              </div>
            </div>
          </div>
          <div style={{ padding: '18px 0 6px' }}>
            <DonutChart data={allocation} visible={visible}/>
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
            {allocation.map((seg) => {
              const pct = total > 0 ? (seg.value / total) * 100 : 0;
              return (
                <div key={seg.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: seg.color }}/>
                  <span style={{ flex: 1, fontSize: 13, color: SI.textDark, fontWeight: 500 }}>{seg.label}</span>
                  <span style={{ fontSize: 12, color: SI.textMid, minWidth: 36, textAlign: 'right' }}>{pct.toFixed(1)}%</span>
                  <span style={{ fontSize: 13, color: SI.greenDark, fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: 88, textAlign: 'right' }}>
                    {visible ? `R$ ${formatBRL(seg.value)}` : '••••••'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de investimentos */}
        <div style={{ ...cardStyle, marginTop: 12, marginBottom: 96 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: SI.textDark }}>Meus investimentos</div>
            <div style={{ fontSize: 12, color: SI.textMute }}>{items.length} {items.length === 1 ? 'ativo' : 'ativos'}</div>
          </div>

          {items.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: SI.textMute, fontSize: 14 }}>
              Nenhum investimento neste mês.<br/>Toque em <strong style={{ color: SI.greenDark }}>+</strong> para adicionar.
            </div>
          ) : (
            <div>
              {items.map((it) => {
                const cat = CATEGORIES.find(c => c.key === it.category) || CATEGORIES[0];
                return (
                  <button key={it.id} onClick={() => openEdit(it.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 4px', background: 'transparent', border: 'none',
                    borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: SI.border,
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, background: `${cat.color}1A`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <span style={{ width: 12, height: 12, borderRadius: '50%', background: cat.color }}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: SI.textDark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {it.name}
                      </div>
                      <div style={{ fontSize: 12, color: SI.textMute, marginTop: 2 }}>
                        {cat.label}
                        {it.monthlyYield > 0 && (
                          <span style={{ color: SI.greenDark, marginLeft: 8, fontWeight: 600 }}>
                            +{visible ? `R$ ${formatBRL(it.monthlyYield)}` : '•••'} /mês
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: SI.greenDark, fontVariantNumeric: 'tabular-nums' }}>
                        {visible ? `R$ ${formatBRL(it.amount)}` : '••••'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                        <Icon.Pencil s={14} c={SI.teal}/>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FAB */}
        <button onClick={openAdd} aria-label="Adicionar investimento" style={{
          position: 'fixed', right: 20, bottom: 24,
          width: 60, height: 60, borderRadius: '50%',
          background: SI.greenPrimary, color: '#fff', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 24px rgba(122, 182, 72, 0.5)',
          cursor: 'pointer', zIndex: 30,
        }}>
          <Icon.Plus s={28}/>
        </button>

        <BottomSheet open={!!sheet} onClose={closeSheet}
          title={sheet?.mode === 'edit' ? 'Editar investimento' : 'Novo investimento'}>
          {sheet && (
            <InvestmentForm
              key={sheet.mode === 'edit' ? sheet.id : 'add'}
              initial={editingItem}
              onSave={saveItem}
              onCancel={closeSheet}
              onDelete={sheet.mode === 'edit' ? () => deleteItem(sheet.id) : undefined}
            />
          )}
        </BottomSheet>

        {showBackup && <BackupModal onClose={() => setShowBackup(false)}/>}
      </div>

      {/* ── EXTRATO (sobreposto, montado quando ativo) ── */}
      {view === 'extrato' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: SI.bg, overflowY: 'auto', overflowX: 'hidden',
          fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
          WebkitOverflowScrolling: 'touch',
        }}>
          <ExtratoScreen
            year={year} monthIdx={monthIdx}
            total={total} monthYield={monthYield} yearPct={yearPct}
            overrides={overrides} setOverrides={setOverrides}
            visible={visible} onToggleVisible={() => setVisible(v => !v)}
            onBack={() => setView('home')}
            onGear={() => setShowBackup(true)}
            onHome={onHome}
            prevMonth={prevMonth} nextMonth={nextMonth}
          />
          {showBackup && <BackupModal onClose={() => setShowBackup(false)}/>}
        </div>
      )}
    </ResponsiveShell>
  );
}

// ─── Tela de Extrato ───────────────────────────────────────────
function ExtratoScreen({ year, monthIdx, total, monthYield, yearPct, overrides, setOverrides, visible, onToggleVisible, onBack, onGear, onHome, prevMonth, nextMonth }) {
  const [rends, setRends] = useState(() => loadRendimentos(year, monthIdx));
  const [sheet, setSheet] = useState(null);

  useEffect(() => { saveRendimentos(year, monthIdx, rends); }, [rends, year, monthIdx]);

  const groups = useMemo(() => {
    const map = new Map();
    rends.forEach(r => {
      const yr = (r.date || '').slice(0, 4) || '—';
      if (!map.has(yr)) map.set(yr, []);
      map.get(yr).push(r);
    });
    const arr = Array.from(map.entries()).map(([yr, list]) => ({
      year: yr,
      list: list.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      subtotal: list.reduce((s, r) => s + (Number(r.amount) || 0), 0),
    }));
    arr.sort((a, b) => b.year.localeCompare(a.year));
    return arr;
  }, [rends]);

  function openAdd() { setSheet({ mode: 'add' }); }
  function openEdit(id) { setSheet({ mode: 'edit', id }); }
  function closeSheet() { setSheet(null); }

  function saveRend(data) {
    if (sheet?.mode === 'edit') {
      setRends(arr => arr.map(r => r.id === sheet.id ? { ...r, ...data } : r));
    } else {
      setRends(arr => [...arr, { id: 'r' + Date.now(), ...data }]);
    }
    closeSheet();
  }
  function deleteRend(id) { setRends(arr => arr.filter(r => r.id !== id)); closeSheet(); }

  const editing = sheet?.mode === 'edit' ? rends.find(r => r.id === sheet.id) : null;

  return (
    <div style={{
      background: SI.bg, fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      color: SI.textDark, paddingBottom: 'env(safe-area-inset-bottom, 24px)',
    }}>
      {/* Cabeçalho — seta mês anterior | logo+mês | seta mês seguinte */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 16px 14px', minHeight: 84, gap: 8,
      }}>
        <button style={{ ...iconBtn, opacity: (year === 2026 && monthIdx === 0) ? 0.25 : 1 }} aria-label="Mês anterior" onClick={prevMonth} disabled={year === 2026 && monthIdx === 0}><Icon.Back/></button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <img src="logo.png" alt="Logo" style={{ height: 100, maxWidth: '70%', width: 'auto', objectFit: 'contain' }}/>
          <div style={{ fontSize: 11, color: SI.teal, fontWeight: 600, letterSpacing: 0.3, marginTop: 1 }}>
            {MONTHS[monthIdx]} {year}
          </div>
        </div>
        <button style={iconBtn} aria-label="Próximo mês" onClick={nextMonth}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke={SI.textDark} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Rótulo */}
      <div style={{ textAlign: 'center', color: SI.teal, fontWeight: 700, fontSize: 17, padding: '6px 0 14px' }}>
        Extrato
      </div>

      {/* Card total — igual ao home */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <button style={{ ...iconBtn, marginTop: 2 }} aria-label="Tela de entrada" onClick={onHome}>
            <Icon.Home c={SI.teal}/>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, color: SI.textDark, fontWeight: 500, letterSpacing: -0.2 }}>Total Investido</div>
              <div style={{ fontSize: 12, color: SI.textMute, marginTop: 2 }}>Aplicações + rendimentos</div>
            </div>
          </div>
          <button style={{ ...iconBtn, marginTop: 2 }} onClick={onGear}><Icon.Gear/></button>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 14, padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 15, color: SI.textMid, fontWeight: 500 }}>R$</span>
            <span style={{ fontSize: 38, fontWeight: 700, color: SI.greenPrimary, letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {visible ? formatBRL(total) : '••••••'}
            </span>
          </div>
          <button onClick={onToggleVisible} style={iconBtn}>
            {visible ? <Icon.EyeOff/> : <Icon.Eye/>}
          </button>
        </div>
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${SI.border}`, display: 'grid', gap: 8 }}>
          <EditableRow
            label="Rentabilidade do mês"
            value={overrides.monthYieldText ?? `R$ ${formatBRL(monthYield)}`}
            hasOverride={!!overrides.monthYieldText}
            masked={!visible}
            onSave={(v) => setOverrides(o => ({ ...o, monthYieldText: v || null }))}
          />
          <EditableRow
            label="Desempenho no ano"
            value={overrides.yearText ?? `${yearPct.toFixed(0)}% poup.`}
            hasOverride={!!overrides.yearText}
            masked={!visible}
            onSave={(v) => setOverrides(o => ({ ...o, yearText: v || null }))}
          />
        </div>
      </div>

      {/* Quick actions — igual à home, mas "Extrato" desabilitado pois já estamos nele */}
      <QuickActions onAdd={openAdd} onExtrato={null} extratoAtivo={true} onInvestimentos={onBack}/>

      {/* Lista rendimentos */}
      <div style={{ ...cardStyle, marginTop: 12, marginBottom: 96 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: SI.textDark }}>Rendimentos</div>
          <div style={{ fontSize: 12, color: SI.textMute }}>Toque para editar</div>
        </div>

        {rends.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: SI.textMute, fontSize: 14 }}>
            Nenhum rendimento neste mês.<br/>Toque em <strong style={{ color: SI.greenDark }}>+</strong> para adicionar.
          </div>
        ) : (
          <div>
            {rends.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(r => (
              <button key={r.id} onClick={() => openEdit(r.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 4px', background: 'transparent', border: 'none',
                borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: SI.border,
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 13.5, color: SI.textMid, fontVariantNumeric: 'tabular-nums', minWidth: 84 }}>
                  {formatDateBR(r.date)}
                </span>
                <span style={{ flex: 1, fontSize: 14, color: SI.textDark, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.label || 'Rendimento'}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: SI.greenDark, fontVariantNumeric: 'tabular-nums' }}>
                  {visible ? `R$ ${formatBRL(r.amount)}` : '••••'}
                </span>
                <Icon.Pencil s={13} c={SI.teal}/>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB sticky no rodapé do scroll */}
      <div style={{ position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'flex-end', padding: '0 20px', marginTop: 12, pointerEvents: 'none' }}>
        <button onClick={openAdd} aria-label="Adicionar rendimento" style={{
          width: 60, height: 60, borderRadius: '50%',
          background: SI.greenPrimary, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 24px rgba(122, 182, 72, 0.5)',
          cursor: 'pointer', zIndex: 30, pointerEvents: 'auto',
        }}>
          <Icon.Plus s={28}/>
        </button>
      </div>

      <BottomSheet open={!!sheet} onClose={closeSheet}
        title={sheet?.mode === 'edit' ? 'Editar rendimento' : 'Novo rendimento'}>
        {sheet && (
          <RendimentoForm
            key={sheet.mode === 'edit' ? sheet.id : 'add'}
            initial={editing}
            onSave={saveRend}
            onCancel={closeSheet}
            onDelete={sheet.mode === 'edit' ? () => deleteRend(sheet.id) : undefined}
          />
        )}
      </BottomSheet>
    </div>
  );
}

// ─── RendimentoForm ────────────────────────────────────────────
function RendimentoForm({ initial, onSave, onCancel, onDelete }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = React.useState(initial?.date || today);
  const [label, setLabel] = React.useState(initial?.label || 'Rendimento');
  const [amount, setAmount] = React.useState(initial?.amount ?? 0);
  const canSave = !!date && amount > 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 6, fontWeight: 500 }}>Valor do rendimento</div>
        <MoneyField value={amount} onChange={setAmount} autoFocus={!initial}/>
      </div>
      <div>
        <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 6, fontWeight: 500 }}>Data</div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{
          width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10,
          background: SI.bgSoft, border: `1.5px solid ${SI.border}`,
          fontSize: 15, color: SI.textDark, outline: 'none', fontFamily: 'inherit',
        }}/>
      </div>
      <TextField label="Descrição" value={label} onChange={setLabel} placeholder="Ex: Rendimento"/>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        {onDelete && (
          <button type="button" onClick={onDelete} style={{
            padding: '13px 16px', borderRadius: 12, border: `1.5px solid ${SI.danger}33`,
            background: '#fff', color: SI.danger, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
          }}>
            <Icon.Trash s={16} c={SI.danger}/> Excluir
          </button>
        )}
        <button type="button" onClick={() => canSave && onSave({ date, label: label.trim() || 'Rendimento', amount })}
          disabled={!canSave} style={{
            flex: 1, padding: '13px 16px', borderRadius: 12, border: 'none',
            background: canSave ? SI.greenPrimary : '#C8D6CC',
            color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: canSave ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
          }}>
          {initial ? 'Salvar alterações' : 'Adicionar rendimento'}
        </button>
      </div>
    </div>
  );
}

// ─── ResponsiveShell ───────────────────────────────────────────
function ResponsiveShell({ children }) {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  );
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 600px)');
    const handler = e => setIsMobile(e.matches);
    mql.addEventListener ? mql.addEventListener('change', handler) : mql.addListener(handler);
    return () => mql.removeEventListener ? mql.removeEventListener('change', handler) : mql.removeListener(handler);
  }, []);

  if (isMobile) return (
    <div style={{ width: '100vw', minHeight: '100vh', background: SI.bg, position: 'relative', overflowX: 'hidden' }}>
      {children}
    </div>
  );
  return (
    <div style={{
      width: 412, height: 892, borderRadius: 28, overflow: 'auto',
      background: SI.bg, border: '8px solid rgba(116,119,117,0.4)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
    }}>
      {children}
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────
const iconBtn = {
  width: 38, height: 38, borderRadius: 10,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
};

const cardStyle = {
  margin: '0 16px', padding: '18px 18px 16px',
  background: '#fff', borderRadius: 14,
  border: `1px solid ${SI.border}`,
  boxShadow: '0 2px 10px rgba(16, 40, 26, 0.04)',
};

function EditableRow({ label, value, hasOverride, masked, onSave }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef(null);
  function start() { setDraft(value); setEditing(true); setTimeout(() => inputRef.current && inputRef.current.select(), 0); }
  function commit() { onSave(draft.trim()); setEditing(false); }
  function cancel() { setEditing(false); }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 14, color: SI.teal }}>{label}</span>
      {editing ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel(); }}
            onBlur={commit}
            style={{ fontSize: 14, fontWeight: 700, color: SI.greenDark, textAlign: 'right', width: 130, padding: '4px 8px', borderRadius: 6, border: `1.5px solid ${SI.greenPrimary}`, background: '#fff', outline: 'none', fontFamily: 'inherit' }}
          />
          {hasOverride && (
            <button type="button" onMouseDown={e => { e.preventDefault(); onSave(''); setEditing(false); }}
              title="Voltar ao cálculo automático"
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: SI.textMute, fontSize: 11, padding: 2 }}>↻</button>
          )}
        </span>
      ) : (
        <button type="button" onClick={start} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', padding: '2px 4px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: 4 }}>
          <span style={{ fontSize: 14, color: SI.greenDark, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {masked ? '••••••' : value}
          </span>
          <Icon.Pencil s={12} c={SI.teal}/>
        </button>
      )}
    </div>
  );
}

function QuickActions({ onAdd, onExtrato, extratoAtivo, onInvestimentos, investimentosAtivo }) {
  const tiles = [
    { icon: <Icon.TrendUp c={investimentosAtivo ? SI.teal : SI.greenPrimary}/>, label: 'Investimentos', onClick: onInvestimentos, active: investimentosAtivo },
    { icon: <Icon.Chart c={SI.olive}/>, label: 'Home Broker' },
    { icon: <Icon.Doc c={SI.greenPrimary}/>, label: 'Guia do\nInvestidor' },
    { icon: <Icon.Calc c={SI.greenPrimary}/>, label: 'Simulador' },
    { icon: <Icon.Wallet c={extratoAtivo ? SI.teal : SI.olive}/>, label: 'Extrato', onClick: onExtrato, active: extratoAtivo },
  ];
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {tiles.map((t, i) => (
          <button key={i} type="button" onClick={t.onClick} style={{
            flex: '0 0 auto', width: 152, padding: '14px 14px',
            background: t.active ? `${SI.teal}12` : '#fff',
            borderRadius: 12,
            border: t.active ? `1.5px solid ${SI.teal}` : `1px solid ${SI.border}`,
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 2px 8px rgba(16, 40, 26, 0.04)',
            cursor: t.onClick ? 'pointer' : 'default',
            textAlign: 'left', fontFamily: 'inherit',
          }}>
            {t.icon}
            <div style={{ fontSize: 13, color: t.active ? SI.teal : SI.textDark, fontWeight: 600, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{t.label}</div>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {[0,1,2,3,4].map(i => (
          <span key={i} style={{ width: i===0?18:6, height: 6, borderRadius: 4, background: i===0?SI.teal:'#D9E1DC', transition: 'width 0.2s' }}/>
        ))}
      </div>
    </div>
  );
}

// ─── Root: fluxo Login → Entrada → App ─────────────────────────
function Root() {
  // Login sempre aparece ao abrir (não é persistido).
  const [stage, setStage] = useState('login'); // 'login' | 'entrada' | 'app'

  if (stage === 'login') {
    return (
      <ResponsiveShell>
        <LoginScreen onEnter={() => setStage('entrada')}/>
      </ResponsiveShell>
    );
  }
  if (stage === 'entrada') {
    return (
      <ResponsiveShell>
        <EntradaScreen
          onInvest={() => setStage('app')}
          onLogout={() => setStage('login')}
        />
      </ResponsiveShell>
    );
  }
  return <App onHome={() => setStage('entrada')}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
