// screens.js — Login + Entrada, fiéis aos prints do Sicoob (ambiente de estudo)
// Valores fixos. Na Entrada, só "Investimentos" abre o app; sair volta ao Login.

// ─── Paleta dos prints ─────────────────────────────────────────
const SC = {
  ink:       '#04302F',   // topo bem escuro
  teal:      '#0E6E6B',   // teal base
  tealLite:  '#13827E',
  circle:    '#0C8F88',   // círculos dos ícones
  line:      'rgba(255,255,255,0.08)',
  txt:       '#FFFFFF',
  txtSoft:   'rgba(223,242,240,0.78)',
  txtMute:   'rgba(223,242,240,0.55)',
  lime:      '#A6CE39',
  green:     '#3DA935',
  cyan:      '#00AE9D',
};

// Malha de triângulos sutil
const scMesh = {
  position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
  backgroundImage:
    'repeating-linear-gradient(60deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 30px),' +
    'repeating-linear-gradient(-60deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 30px)',
};

// Marca Sicoob (triângulo + wordmark branco)
function SicoobMark({ h = 26, wordmark = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: h * 0.34 }}>
      <svg width={h * 0.95} height={h} viewBox="0 0 40 40" fill="none" style={{ display: 'block' }}>
        <path d="M2 4 L19 4 L10.5 20 Z" fill={SC.green}/>
        <path d="M21 4 L38 4 L29.5 20 Z" fill={SC.cyan}/>
        <path d="M11 22 L29 22 L20 38 Z" fill={SC.lime}/>
      </svg>
      {wordmark && (
        <span style={{
          color: '#fff', fontWeight: 800, fontSize: h * 0.82,
          letterSpacing: h * 0.04, fontFamily: "'Inter', system-ui, sans-serif",
        }}>SICOOB</span>
      )}
    </div>
  );
}

// ─── TELA 1 · LOGIN ────────────────────────────────────────────
function LoginScreen({ onEnter }) {
  const Shortcut = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 56 }}>
      <div style={{
        width: 46, height: 46, borderRadius: 11, background: 'rgba(3,38,38,0.55)',
        border: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
      <div style={{ fontSize: 9.5, color: SC.txtSoft, textAlign: 'center', lineHeight: 1.15 }}>{label}</div>
    </div>
  );
  const st = { stroke: '#EAF6F4', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <div style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(180deg, ${SC.ink} 0%, ${SC.teal} 30%, ${SC.tealLite} 70%, ${SC.teal} 100%)`,
      color: SC.txt, fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0px)',
    }}>
      <div style={scMesh}/>

      {/* Logo topo */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
        <SicoobMark h={26}/>
      </div>

      {/* Avatar + nome (clicável) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 46 }}>
        <button onClick={onEnter} aria-label="Entrar como Paulo" style={{
          background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit', padding: 0,
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              border: '2px solid rgba(150,210,206,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8.6" r="3.7" stroke="rgba(220,240,238,0.92)" strokeWidth="1.5"/>
                <path d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" stroke="rgba(220,240,238,0.92)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{
              position: 'absolute', left: '50%', bottom: -11, transform: 'translateX(-50%)',
              background: '#04302F', color: '#EAF6F4', fontSize: 9.5, fontWeight: 700,
              letterSpacing: 0.8, padding: '4px 13px', borderRadius: 999,
            }}>ENTRAR</span>
          </div>
          <div style={{ fontSize: 25, fontWeight: 500, marginTop: 24 }}>Paulo</div>
          <div style={{ fontSize: 13.5, color: SC.txtSoft, marginTop: 6 }}>1º Titular | 4355 | 23.214-9</div>
        </button>

        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.95)' }}/>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }}/>
        </div>
      </div>

      {/* Atalhos */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between',
        gap: 4, padding: '34px 22px 0',
      }}>
        <Shortcut label="SicoobPAY">
          <span style={{ fontSize: 7, fontWeight: 800, color: '#EAF6F4', textAlign: 'center', lineHeight: 1 }}>SICOOB<br/>PAY</span>
        </Shortcut>
        <Shortcut label="Internet banking">
          <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="1.5" {...st}/><path d="M9 21h6M12 17v4" {...st}/></svg>
        </Shortcut>
        <Shortcut label="Pix">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3l3.2 3.2a3 3 0 004.2 0M12 21l-3.2-3.2a3 3 0 00-4.2 0M3 12l3.2-3.2a3 3 0 000-4.2M21 12l-3.2 3.2a3 3 0 000 4.2" {...st}/><rect x="8.8" y="8.8" width="6.4" height="6.4" rx="1" transform="rotate(45 12 12)" {...st}/></svg>
        </Shortcut>
        <Shortcut label="Saque Digital">
          <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" {...st}/><circle cx="12" cy="12" r="2.5" {...st}/></svg>
        </Shortcut>
        <Shortcut label="Efetivação 2 passos">
          <svg width="20" height="20" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" {...st}/><path d="M9 11l2 2 4-4" {...st}/></svg>
        </Shortcut>
      </div>

      <div style={{ position: 'relative', textAlign: 'center', marginTop: 34, fontSize: 15, color: '#EAF6F4' }}>
        Esqueceu sua senha?
      </div>

      <div style={{ flex: 1 }}/>

      {/* Gerenciar / Abrir conta */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center', gap: 40,
        padding: '0 20px 18px', borderBottom: `1px solid ${SC.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 20l4-1 9-9-3-3-9 9-1 4zM14 6l3 3" {...st}/></svg>
          Gerenciar<br/>contas
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.3" {...st}/><path d="M3.5 19c0-2.8 2.5-4.6 5.5-4.6M17 12v6M14 15h6" {...st}/></svg>
          Abrir nova<br/>conta
        </div>
      </div>

      {/* Rodapé */}
      <div style={{
        position: 'relative', display: 'flex',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)', paddingTop: 14,
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="17" height="17" viewBox="0 0 24 24"><path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" {...st}/></svg>
          Fale conosco
        </div>
        <div style={{ width: 1, background: SC.line }}/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 13.5, color: '#EAF6F4' }}>
          <svg width="17" height="17" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" {...st}/><path d="M20 20l-4-4" {...st}/></svg>
          Localize o Sicoob
        </div>
      </div>
    </div>
  );
}

// ─── TELA 2 · ENTRADA ──────────────────────────────────────────
function EntradaScreen({ onInvest, onLogout }) {
  const st = { stroke: '#fff', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  // Ícone circular da grade
  const GridItem = ({ label, onClick, children }) => (
    <button onClick={onClick} disabled={!onClick} style={{
      background: 'transparent', border: 'none', cursor: onClick ? 'pointer' : 'default',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      fontFamily: 'inherit', padding: 0,
    }}>
      <span style={{
        width: 58, height: 58, borderRadius: '50%', background: SC.circle,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: onClick ? '0 0 0 3px rgba(166,206,57,0.55)' : 'none',
      }}>{children}</span>
      <span style={{ fontSize: 12, color: '#EAF6F4', textAlign: 'center' }}>{label}</span>
    </button>
  );

  const NavItem = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
      <svg width="22" height="22" viewBox="0 0 24 24">{children}</svg>
      <span style={{ fontSize: 10.5, color: '#3A4A44' }}>{label}</span>
    </div>
  );
  const stD = { stroke: '#5B6B62', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <div style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: SC.teal, color: SC.txt,
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>
      {/* Top bar escura */}
      <div style={{
        background: SC.ink, paddingTop: 'calc(env(safe-area-inset-top, 0px) + 10px)',
        padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <SicoobMark h={20}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="21" height="21" viewBox="0 0 24 24"><path d="M4 12a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-5h3M4 13v-1h3v5H6a2 2 0 01-2-2z" {...st}/></svg>
          <svg width="21" height="21" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0" {...st}/></svg>
          <button onClick={onLogout} aria-label="Sair" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <svg width="21" height="21" viewBox="0 0 24 24"><path d="M14 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M9 8l-4 4 4 4M5 12h10" {...st}/></svg>
          </button>
        </div>
      </div>

      {/* Sub-barra titular */}
      <div style={{
        background: SC.tealLite, padding: '9px 16px',
        display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5,
      }}>
        <span style={{ color: SC.lime, fontWeight: 600 }}>1º Titular</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>Paulo Roberto D...</span>
        <span style={{ color: SC.txtSoft }}>4355 | 23.214-9</span>
        <div style={{ flex: 1 }}/>
        <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2" {...st}/><circle cx="17" cy="6" r="2" {...st}/><circle cx="17" cy="18" r="2" {...st}/><path d="M8 11l7-4M8 13l7 4" {...st}/></svg>
        <svg width="19" height="19" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" {...st}/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" {...st}/></svg>
      </div>

      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <div style={scMesh}/>

        {/* chevron up */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 14l6-6 6 6" {...st}/></svg>
        </div>

        {/* Saldo */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, padding: '6px 18px 0' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.3" {...st}/><path d="M5 20c0-3.3 3.1-5.2 7-5.2s7 1.9 7 5.2" {...st}/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: SC.txtSoft }}>Saldo em conta</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
              <span style={{ fontSize: 27, fontWeight: 700, letterSpacing: -0.5 }}>R$ 281,15</span>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 3l18 18M10.5 10.7a2 2 0 002.8 2.8M6.5 6.7C4.4 8 3 10 3 12c0 0 3.5 5 9 5 1.4 0 2.7-.3 3.8-.8M9.8 5.2A9 9 0 0112 5c5.5 0 9 5 9 5a15 15 0 01-2.2 2.7" {...st}/></svg>
            </div>
          </div>
        </div>

        {/* pontos Coopera */}
        <div style={{ position: 'relative', padding: '12px 18px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(3,38,38,0.45)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '5px 12px',
          }}>
            <span style={{ display: 'flex', gap: 1 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${SC.lime}` }}/>
              <span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${SC.cyan}`, marginLeft: -3 }}/>
              <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid #fff', marginLeft: -3 }}/>
            </span>
            <span style={{ fontSize: 12.5, color: '#EAF6F4' }}>pontos Coopera</span>
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" {...st}/></svg>
          </div>
        </div>

        {/* Grade de ícones */}
        <div style={{
          position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: 20, padding: '22px 14px 0',
        }}>
          <GridItem label="Extrato"><svg width="26" height="26" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" {...st}/><path d="M8 8h8M8 12h8M8 16h5" {...st}/></svg></GridItem>
          <GridItem label="Pagamentos"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6zM15 3v4h4" {...st}/><path d="M9 13h6M9 16h4" {...st}/></svg></GridItem>
          <GridItem label="Pix"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3l3.2 3.2a3 3 0 004.2 0M12 21l-3.2-3.2a3 3 0 00-4.2 0M3 12l3.2-3.2a3 3 0 000-4.2M21 12l-3.2 3.2a3 3 0 000 4.2" {...st}/><rect x="8.8" y="8.8" width="6.4" height="6.4" rx="1" transform="rotate(45 12 12)" {...st}/></svg></GridItem>
          <GridItem label="Cartões"><svg width="26" height="26" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" {...st}/><path d="M3 10h18" {...st}/></svg></GridItem>

          <GridItem label="Crédito"><svg width="26" height="26" viewBox="0 0 24 24"><circle cx="9" cy="12" r="6" {...st}/><path d="M15 7a6 6 0 010 10" {...st}/></svg></GridItem>
          <GridItem label="Investimentos" onClick={onInvest}><svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" {...st}/><path d="M16 8h4v4" {...st}/></svg></GridItem>
          <GridItem label="Transferências"><svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="9" r="3" {...st}/><path d="M5 20c0-3 3-5 7-5s7 2 7 5" {...st}/></svg></GridItem>
          <GridItem label="Personalize"><svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" {...st}/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" {...st}/></svg></GridItem>
        </div>

        {/* Ver mais */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 22 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.95)',
            borderRadius: 999, padding: '7px 16px', color: '#3A4A44', fontSize: 13, fontWeight: 500,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#3A4A44" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Ver mais
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={{
        position: 'relative', margin: '0 12px', background: '#fff', borderRadius: '14px 14px 0 0',
        padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0E6E6B', lineHeight: 1.05 }}>Tudo o que<br/>você precisa</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <span style={{ fontSize: 10, border: '1px solid #0E6E6B', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px' }}>Cartões</span>
            <span style={{ fontSize: 10, border: '1px solid #0E6E6B', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px' }}>Pix</span>
            <span style={{ fontSize: 10, border: '1px solid #0E6E6B', color: '#0E6E6B', borderRadius: 999, padding: '2px 9px' }}>Seguros</span>
          </div>
        </div>
        <div style={{ width: 84, height: 64, borderRadius: 10, background: 'linear-gradient(135deg,#0E6E6B,#0C8F88)', flexShrink: 0 }}/>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'relative', background: '#fff', display: 'flex', alignItems: 'flex-end',
        padding: '8px 10px', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
        borderTop: '1px solid #EEF2F0',
      }}>
        <NavItem label="Extrato"><rect x="5" y="3" width="14" height="18" rx="2" {...stD}/><path d="M8 8h8M8 12h8M8 16h5" {...stD}/></NavItem>
        <NavItem label="Pagament..."><path d="M6 3h9l4 4v14H6zM15 3v4h4" {...stD}/></NavItem>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: SC.tealLite, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -22, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 3l3.2 3.2a3 3 0 004.2 0M12 21l-3.2-3.2a3 3 0 00-4.2 0M3 12l3.2-3.2a3 3 0 000-4.2M21 12l-3.2 3.2a3 3 0 000 4.2" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><rect x="8.8" y="8.8" width="6.4" height="6.4" rx="1" transform="rotate(45 12 12)" stroke="#fff" strokeWidth="1.7" fill="none"/></svg>
          </div>
          <span style={{ fontSize: 10.5, color: '#3A4A44' }}>Pix</span>
        </div>
        <NavItem label="Cartões"><rect x="3" y="6" width="18" height="12" rx="2" {...stD}/><path d="M3 10h18" {...stD}/></NavItem>
        <NavItem label="Menu"><path d="M4 6h16M4 12h16M4 18h16" {...stD}/></NavItem>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, EntradaScreen });
