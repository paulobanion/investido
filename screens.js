// screens.js — Login + Entrada, super fiéis aos prints do Sicoob (ambiente de estudo)
// Valores fixos. Na Entrada só "Investimentos" abre o app; sair volta ao Login.

// ─── Paleta dos prints ─────────────────────────────────────────
const SC = {
  ink:      '#06302E',   // topo bem escuro / barra de status
  ink2:     '#0A3B39',
  teal:     '#0F6E6A',   // teal base
  tealLite: '#137E79',
  circle:   '#0C8F87',   // círculos da grade
  line:     'rgba(255,255,255,0.10)',
  txt:      '#FFFFFF',
  txtSoft:  'rgba(220,240,238,0.80)',
  txtMute:  'rgba(220,240,238,0.55)',
  lime:     '#A6CE39',
  green:    '#4CB749',
  cyan:     '#00A99D',
};

// Malha de triângulos (3 conjuntos de linhas a 0/60/120°)
const triMesh = {
  position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.55,
  backgroundImage:
    'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 34px),' +
    'repeating-linear-gradient(60deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 34px),' +
    'repeating-linear-gradient(120deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 34px)',
};

// Marca Sicoob — logo oficial (triângulo colorido + wordmark branco)
function SicoobMark({ h = 22 }) {
  return (
    <img src="sicoob-white.png" alt="Sicoob" style={{ height: h, width: 'auto', display: 'block' }}/>
  );
}


// Glyph Pix — diamante oficial (recolorido em branco)
function PixGlyph({ s = 26, color = '#fff' }) {
  return (
    <img src="pix-white.png" alt="Pix" style={{ width: s, height: s, display: 'block' }}/>
  );
}

// ─── TELA 1 · LOGIN ────────────────────────────────────────────
function LoginScreen({ onEnter }) {
  const st = { stroke: '#EAF6F4', strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  const Shortcut = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 60 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12, background: 'rgba(4,34,33,0.55)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
      <div style={{ fontSize: 9.5, color: SC.txtSoft, textAlign: 'center', lineHeight: 1.2 }}>{label}</div>
    </div>
  );

  return (
    <div style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(178deg, ${SC.ink} 0%, ${SC.ink} 7%, ${SC.teal} 34%, ${SC.tealLite} 72%, ${SC.teal} 100%)`,
      color: SC.txt, fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
    }}>
      <div style={triMesh}/>

      {/* Logo topo */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
        <SicoobMark h={22}/>
      </div>

      {/* Avatar + nome (clicável) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <button onClick={onEnter} aria-label="Entrar como Paulo" style={{
          background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit', padding: 0,
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 92, height: 92, borderRadius: '50%',
              border: '2px solid rgba(120,190,185,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="9" r="3.6" stroke="rgba(200,230,227,0.9)" strokeWidth="1.4"/>
                <path d="M5.5 19c0-3.1 2.9-5.2 6.5-5.2s6.5 2.1 6.5 5.2" stroke="rgba(200,230,227,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{
              position: 'absolute', left: '50%', bottom: -10, transform: 'translateX(-50%)',
              background: '#04302F', color: '#EAF6F4', fontSize: 9, fontWeight: 700,
              letterSpacing: 0.9, padding: '4px 12px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.10)',
            }}>ENTRAR</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 500, marginTop: 22 }}>Paulo</div>
          <div style={{ fontSize: 13, color: SC.txtSoft, marginTop: 5, letterSpacing: 0.2 }}>1º Titular | 4355 | 23.214-9</div>
        </button>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.95)' }}/>
          <span style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.55)' }}/>
        </div>
      </div>

      {/* Atalhos */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between',
        gap: 2, padding: '32px 18px 0',
      }}>
        <Shortcut label="SicoobPay">
          <div style={{ textAlign: 'center', lineHeight: 1 }}>
            <div style={{ fontSize: 6.5, fontWeight: 800, color: '#EAF6F4', letterSpacing: 0.3 }}>SICOOB</div>
            <div style={{ fontSize: 8, fontWeight: 800, color: SC.lime, letterSpacing: 1 }}>PAY</div>
          </div>
        </Shortcut>
        <Shortcut label="Internet banking">
          <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="11" rx="1.5" {...st}/><path d="M8 20h8M12 16v4" {...st}/></svg>
        </Shortcut>
        <Shortcut label="Pix">
          <PixGlyph s={20} color="#EAF6F4"/>
        </Shortcut>
        <Shortcut label="Saque Digital">
          <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" {...st}/><circle cx="12" cy="12" r="2.4" {...st}/><path d="M6 9v6M18 9v6" {...st}/></svg>
        </Shortcut>
        <Shortcut label="Efetivação 2 passos">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V6l7-3z" {...st}/><path d="M9 11.5l2 2 4-4" {...st}/></svg>
        </Shortcut>
      </div>

      <div style={{ position: 'relative', textAlign: 'center', marginTop: 32, fontSize: 15, color: '#EAF6F4', fontWeight: 400 }}>
        Esqueceu sua senha?
      </div>

      <div style={{ flex: 1 }}/>

      {/* Gerenciar / Abrir conta */}
      <div style={{
        position: 'relative', display: 'flex', padding: '0 28px 16px',
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#EAF6F4', lineHeight: 1.15 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M4 20l1-4 9.5-9.5 3 3L8 19l-4 1z" {...st}/><path d="M13.5 6.5l3 3" {...st}/></svg>
          <span>Gerenciar<br/>contas</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#EAF6F4', lineHeight: 1.15 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><circle cx="9" cy="8" r="3.3" {...st}/><path d="M3.5 19c0-3 2.6-4.8 5.5-4.8M16.5 11v6M13.5 14h6" {...st}/></svg>
          <span>Abrir nova<br/>conta</span>
        </div>
      </div>

      {/* Rodapé */}
      <div style={{
        position: 'relative', display: 'flex', borderTop: `1px solid ${SC.line}`,
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)', paddingTop: 13,
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="17" height="17" viewBox="0 0 24 24"><path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" {...st}/></svg>
          Fale conosco
        </div>
        <div style={{ width: 1, background: SC.line }}/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="17" height="17" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" {...st}/><path d="M20 20l-4.3-4.3" {...st}/></svg>
          Localize o Sicoob
        </div>
      </div>
    </div>
  );
}

// ─── TELA 2 · ENTRADA ──────────────────────────────────────────
function EntradaScreen({ onInvest, onLogout }) {
  const st  = { stroke: '#fff', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const stD = { stroke: '#54655C', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  const GridItem = ({ label, onClick, children }) => (
    <button onClick={onClick} disabled={!onClick} style={{
      background: 'transparent', border: 'none', cursor: onClick ? 'pointer' : 'default',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
      fontFamily: 'inherit', padding: 0,
    }}>
      <span style={{
        width: 60, height: 60, borderRadius: '50%', background: SC.circle,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</span>
      <span style={{ fontSize: 12, color: '#EAF6F4', textAlign: 'center' }}>{label}</span>
    </button>
  );

  const NavItem = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1 }}>
      <svg width="22" height="22" viewBox="0 0 24 24">{children}</svg>
      <span style={{ fontSize: 10.5, color: '#54655C' }}>{label}</span>
    </div>
  );

  return (
    <div style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: SC.teal, color: SC.txt,
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>

      {/* Top bar escura: logo + ícones */}
      <div style={{
        background: SC.ink, padding: '8px 16px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <SicoobMark h={19}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="21" height="21" viewBox="0 0 24 24"><path d="M4 12a8 8 0 0116 0v3a3 3 0 01-3 3h-2M4 14v-2a8 8 0 011-3" {...st}/><circle cx="9" cy="13" r="0.6" fill="#fff"/><circle cx="12" cy="13" r="0.6" fill="#fff"/><circle cx="15" cy="13" r="0.6" fill="#fff"/></svg>
          <svg width="21" height="21" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6zM9.5 20a2.5 2.5 0 005 0" {...st}/></svg>
          <button onClick={onLogout} aria-label="Sair" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <svg width="21" height="21" viewBox="0 0 24 24"><path d="M14 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M9 8l-4 4 4 4M5 12h10" {...st}/></svg>
          </button>
        </div>
      </div>

      {/* Sub-barra titular */}
      <div style={{
        background: SC.tealLite, padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5,
      }}>
        <span style={{ color: SC.lime, fontWeight: 600 }}>1º Titular</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>Paulo Roberto D...</span>
        <span style={{ color: SC.txtMute, fontSize: 11.5 }}>4355 | 23.214 9</span>
        <div style={{ flex: 1 }}/>
        <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2" {...st}/><circle cx="17" cy="6" r="2" {...st}/><circle cx="17" cy="18" r="2" {...st}/><path d="M8 11l7-4M8 13l7 4" {...st}/></svg>
        <svg width="19" height="19" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" {...st}/><path d="M12 3.5v2.5M12 18v2.5M4 12H1.5M22.5 12H20M6 6l1.8 1.8M16.2 16.2L18 18M18 6l-1.8 1.8M7.8 16.2L6 18" {...st}/></svg>
      </div>

      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <div style={triMesh}/>

        {/* chevron up */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 14l6-6 6 6" {...st}/></svg>
        </div>

        {/* Saldo */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 13, padding: '4px 18px 0' }}>
          <div style={{
            width: 50, height: 50, borderRadius: '50%', background: '#1C8A82', flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" style={{ marginBottom: -2 }}><circle cx="12" cy="9" r="3.5" fill="#BFE6E1"/><path d="M5 21c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" fill="#BFE6E1"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: SC.txtSoft }}>Saldo em conta</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 1 }}>
              <span style={{ fontSize: 27, fontWeight: 700, letterSpacing: -0.5 }}>R$ 281,15</span>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.8M6.5 6.7C4.3 8 3 10 3 12c0 0 3.5 5 9 5 1.3 0 2.6-.3 3.7-.8M9.8 5.2A9 9 0 0112 5c5.5 0 9 5 9 5a15 15 0 01-2.2 2.7" {...st}/></svg>
            </div>
          </div>
        </div>

        {/* pontos Coopera — alinhado à esquerda da tela */}
        <div style={{ position: 'relative', padding: '12px 18px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(4,34,33,0.5)', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 999, padding: '5px 12px',
          }}>
            <svg width="26" height="13" viewBox="0 0 40 20"><circle cx="11" cy="10" r="7" fill="none" stroke={SC.lime} strokeWidth="2.4"/><circle cx="20" cy="10" r="7" fill="none" stroke={SC.cyan} strokeWidth="2.4"/><circle cx="29" cy="10" r="7" fill="none" stroke="#fff" strokeWidth="2.4"/></svg>
            <span style={{ fontSize: 12.5, color: '#EAF6F4' }}>pontos Coopera</span>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" {...st}/></svg>
          </div>
        </div>


        {/* Grade */}
        <div style={{
          position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: 18, padding: '20px 14px 0',
        }}>
          <GridItem label="Extrato"><svg width="27" height="27" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" {...st}/><path d="M8 8h8M8 12h8M8 16h5" {...st}/></svg></GridItem>
          <GridItem label="Pagamentos"><svg width="27" height="27" viewBox="0 0 24 24"><path d="M4 5v14M7 5v14M9.5 5v14M12.5 5v14M15 5v14M17.5 5v14M20 5v14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg></GridItem>
          <GridItem label="Pix"><PixGlyph s={26} color="#fff"/></GridItem>
          <GridItem label="Cartões"><svg width="27" height="27" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" {...st}/><path d="M3 10h18" {...st}/></svg></GridItem>

          <GridItem label="Crédito"><svg width="27" height="27" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" {...st}/><path d="M12 7v10M14.3 9.2c-.5-.8-1.4-1.1-2.3-1.1-1.2 0-2.3.7-2.3 1.9 0 2.6 4.8 1.3 4.8 4 0 1.3-1.2 2-2.5 2-1 0-1.9-.4-2.4-1.2" {...st}/></svg></GridItem>
          <GridItem label="Investimentos" onClick={onInvest}><svg width="27" height="27" viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" {...st}/><path d="M16 8h4v4" {...st}/></svg></GridItem>
          <GridItem label="Transferências"><svg width="27" height="27" viewBox="0 0 24 24"><path d="M4 9h14M14 5l4 4-4 4M20 15H6M10 11l-4 4 4 4" {...st}/></svg></GridItem>
          <GridItem label="Personalize"><svg width="27" height="27" viewBox="0 0 24 24"><path d="M4 8h4M14 8h6M4 16h10M18 16h2" {...st}/><circle cx="11" cy="8" r="2.4" {...st}/><circle cx="16" cy="16" r="2.4" {...st}/></svg></GridItem>
        </div>

        {/* Ver mais */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff',
            borderRadius: 999, padding: '7px 18px', color: '#3A4A44', fontSize: 13,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#3A4A44" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Ver mais
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={{
        position: 'relative', margin: '14px 10px 0', background: '#fff', borderRadius: '16px 16px 0 0',
        padding: '16px 0 16px 18px', display: 'flex', alignItems: 'center', overflow: 'hidden', minHeight: 92,
      }}>
        <div style={{ flex: 1, zIndex: 1 }}>
          <div style={{ fontSize: 21, fontWeight: 800, color: '#0E6E6B', lineHeight: 1.04 }}>Tudo o que<br/>você precisa</div>
        </div>
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%',
          background: 'linear-gradient(120deg, #1A8C7E 0%, #3DA935 60%, #A6CE39 100%)',
        }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <svg width="70" height="80" viewBox="0 0 24 28"><circle cx="12" cy="8" r="5" fill="rgba(255,255,255,0.92)"/><path d="M3 28c0-5 4-9 9-9s9 4 9 9z" fill="rgba(255,255,255,0.92)"/></svg>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 10, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.95)', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px', fontWeight: 600 }}>Cartões</span>
            <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.95)', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px', fontWeight: 600 }}>Pix</span>
            <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.95)', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px', fontWeight: 600 }}>Seguros</span>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'relative', background: '#fff', display: 'flex', alignItems: 'flex-end',
        padding: '8px 8px', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
        borderTop: '1px solid #EEF2F0',
      }}>
        <NavItem label="Extrato"><rect x="5" y="3" width="14" height="18" rx="2" {...stD}/><path d="M8 8h8M8 12h8M8 16h5" {...stD}/></NavItem>
        <NavItem label="Pagament..."><path d="M7 3h7l4 4v14H7zM14 3v4h4" {...stD}/></NavItem>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: SC.tealLite, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -24, boxShadow: '0 4px 12px rgba(0,0,0,0.22)' }}>
            <PixGlyph s={26} color="#fff"/>
          </div>
          <span style={{ fontSize: 10.5, color: '#54655C' }}>Pix</span>
        </div>
        <NavItem label="Cartões"><rect x="3" y="6" width="18" height="12" rx="2" {...stD}/><path d="M3 10h18" {...stD}/></NavItem>
        <NavItem label="Menu"><path d="M4 6h16M4 12h16M4 18h16" {...stD}/></NavItem>
      </div>
    </div>
  );
}

// ─── Folha de autenticação por digital ─────────────────────────
function FingerprintSheet() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      background: 'rgba(2,14,14,0.55)', animation: 'scFade 0.25s ease',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>
      <div style={{
        background: 'rgba(28,40,40,0.97)', borderRadius: '22px 22px 0 0',
        padding: '26px 24px calc(env(safe-area-inset-bottom, 0px) + 34px)',
        color: '#fff', textAlign: 'center', animation: 'scSheetUp 0.32s cubic-bezier(0.22,0.61,0.36,1)',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontSize: 21, fontWeight: 600 }}>Sicoob</div>
        <div style={{ fontSize: 13.5, color: 'rgba(220,235,233,0.78)', marginTop: 8 }}>
          Faça a autenticação para entrar
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 26 }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EAF6F4" strokeWidth="1.3" strokeLinecap="round">
            <path d="M12 11v3.5"/>
            <path d="M8.5 8.2a5 5 0 017 0"/>
            <path d="M6.6 10.4a7.6 7.6 0 0110.8 0"/>
            <path d="M9.2 13a3 3 0 015.6 0v3"/>
            <path d="M9.4 17.6a4.5 4.5 0 00.5-2.4"/>
            <path d="M14.6 17.8a6 6 0 00.4-2.6"/>
            <path d="M7.6 16.5a8 8 0 00.6-3"/>
          </svg>
          <span style={{ fontSize: 16, color: '#fff' }}>Use sua impressão digital.</span>
        </div>

        <div style={{ marginTop: 26, fontSize: 15, fontWeight: 600, color: '#3DA0E8', letterSpacing: 0.4 }}>
          DIGITAR SENHA
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, EntradaScreen, FingerprintSheet });
