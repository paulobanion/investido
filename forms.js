// forms.jsx — Add/Edit investment sheet + delete confirmation

const CATEGORIES = [
  { key: 'poupanca',   label: 'Poupança',         color: '#7AB648' },
  { key: 'rendaFixa',  label: 'Renda Fixa',       color: '#4FA37B' },
  { key: 'tesouro',    label: 'Tesouro Direto',   color: '#2F7A6E' },
  { key: 'acoes',      label: 'Ações',            color: '#B5A03B' },
  { key: 'fundos',     label: 'Fundos',           color: '#D89B3F' },
  { key: 'previdencia',label: 'Previdência',      color: '#7E6BBA' },
];

// ─── Numeric BRL input ─────────────────────────────────────────────────────
function MoneyField({ value, onChange, autoFocus }) {
  // store value as cents in state, display formatted
  const display = (Number(value) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 6,
      padding: '10px 14px', borderRadius: 10,
      background: SI.bgSoft, border: `1.5px solid ${SI.border}`,
    }}>
      <span style={{ fontSize: 15, color: SI.textMid, fontWeight: 500 }}>R$</span>
      <input
        autoFocus={autoFocus}
        type="text"
        inputMode="decimal"
        value={display}
        onChange={(e) => {
          // strip everything but digits, treat as cents
          const digits = e.target.value.replace(/\D/g, '');
          const cents = parseInt(digits || '0', 10);
          onChange(cents / 100);
        }}
        style={{
          flex: 1, border: 'none', background: 'transparent', outline: 'none',
          fontSize: 22, fontWeight: 700, color: SI.greenDark,
          fontFamily: 'inherit', padding: 0,
        }}
      />
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 6, fontWeight: 500, letterSpacing: 0.2 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '11px 14px', borderRadius: 10,
          background: SI.bgSoft, border: `1.5px solid ${SI.border}`,
          fontSize: 15, color: SI.textDark, outline: 'none',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

function CategoryPicker({ value, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 8, fontWeight: 500, letterSpacing: 0.2 }}>
        Categoria
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CATEGORIES.map((c) => {
          const active = c.key === value;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange(c.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 12px', borderRadius: 999,
                border: `1.5px solid ${active ? c.color : SI.border}`,
                background: active ? `${c.color}1A` : '#fff',
                color: active ? c.color : SI.textMid,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{
                width: 10, height: 10, borderRadius: '50%', background: c.color, display: 'inline-block',
              }} />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bottom sheet ──────────────────────────────────────────────────────────
function BottomSheet({ open, onClose, children, title }) {
  // Render inside the phone (parent is position: relative); animate slide-up.
  const sheetRef = React.useRef(null);
  React.useEffect(() => {
    if (open) document.activeElement && document.activeElement.blur();
  }, [open]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      pointerEvents: open ? 'auto' : 'none',
    }}>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(20, 30, 25, 0.45)',
          opacity: open ? 1 : 0,
          transition: 'opacity 220ms ease',
        }}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: '#fff',
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: '12px 18px 24px',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 280ms cubic-bezier(.2,.8,.2,1)',
          boxShadow: '0 -12px 30px rgba(0,0,0,0.12)',
          maxHeight: '85%', overflowY: 'auto',
        }}
      >
        <div style={{
          width: 40, height: 4, borderRadius: 4, background: '#D9E1DC',
          margin: '4px auto 14px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{
            margin: 0, fontSize: 19, fontWeight: 700, color: SI.tealDark,
          }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'transparent', padding: 4, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Fechar"
          >
            <Icon.Close s={22}/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Investment form (used by add & edit) ──────────────────────────────────
function InvestmentForm({ initial, onSave, onCancel, onDelete }) {
  const [name, setName] = React.useState(initial?.name || '');
  const [amount, setAmount] = React.useState(initial?.amount ?? 0);
  const [category, setCategory] = React.useState(initial?.category || 'rendaFixa');
  const [monthlyYield, setMonthlyYield] = React.useState(initial?.monthlyYield ?? 0);

  const canSave = name.trim().length > 0 && amount > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 6, fontWeight: 500, letterSpacing: 0.2 }}>
          Valor investido
        </div>
        <MoneyField value={amount} onChange={setAmount} autoFocus={!initial}/>
      </div>

      <TextField
        label="Nome do investimento"
        value={name}
        onChange={setName}
        placeholder="Ex: Tesouro IPCA 2029"
      />

      <CategoryPicker value={category} onChange={setCategory}/>

      <div>
        <div style={{ fontSize: 12, color: SI.textMid, marginBottom: 6, fontWeight: 500, letterSpacing: 0.2 }}>
          Rendimento do mês (R$)
        </div>
        <MoneyField value={monthlyYield} onChange={setMonthlyYield}/>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            style={{
              padding: '13px 16px', borderRadius: 12,
              border: `1.5px solid ${SI.danger}33`, background: '#fff',
              color: SI.danger, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
            }}
          >
            <Icon.Trash s={16} c={SI.danger}/>
            Excluir
          </button>
        )}
        <button
          type="button"
          onClick={() => canSave && onSave({ name: name.trim(), amount, category, monthlyYield })}
          disabled={!canSave}
          style={{
            flex: 1, padding: '13px 16px', borderRadius: 12, border: 'none',
            background: canSave ? SI.greenPrimary : '#C8D6CC',
            color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: canSave ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
            boxShadow: canSave ? '0 6px 16px rgba(122, 182, 72, 0.35)' : 'none',
            transition: 'background 0.2s',
          }}
        >
          {initial ? 'Salvar alterações' : 'Adicionar investimento'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  CATEGORIES, MoneyField, TextField, CategoryPicker, BottomSheet, InvestmentForm,
});
