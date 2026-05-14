import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function InfoTooltip({ text }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const TOOLTIP_W = 240;

  const show = () => {
    if (!iconRef.current) return;
    const r = iconRef.current.getBoundingClientRect();
    const rawLeft = r.left + r.width / 2;
    // clamp so tooltip never clips outside viewport
    const left = Math.max(TOOLTIP_W / 2 + 10, Math.min(window.innerWidth - TOOLTIP_W / 2 - 10, rawLeft));
    setCoords({ top: r.bottom + 9, left });
    setVisible(true);
  };

  const tooltip = visible && createPortal(
    <div
      style={{
        position: 'fixed',
        top: coords.top,
        left: coords.left,
        transform: 'translateX(-50%)',
        width: TOOLTIP_W,
        background: '#1a2236',
        border: '1px solid rgba(148,163,184,0.18)',
        borderRadius: 10,
        padding: '10px 13px',
        fontSize: 12,
        color: '#94a3b8',
        lineHeight: 1.6,
        zIndex: 99999,
        boxShadow: '0 8px 28px rgba(0,0,0,0.55)',
        pointerEvents: 'none',
      }}
    >
      {/* caret */}
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '5px solid rgba(148,163,184,0.18)',
        marginBottom: -1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: '4px solid #1a2236',
      }} />
      {text}
    </div>,
    document.body
  );

  return (
    <>
      <span
        ref={iconRef}
        onMouseEnter={show}
        onMouseLeave={() => setVisible(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 5,
          cursor: 'help',
          flexShrink: 0,
          opacity: 0.45,
          transition: 'opacity 0.15s',
        }}
        onMouseOver={e => { e.currentTarget.style.opacity = '1'; }}
        onMouseOut={e => { e.currentTarget.style.opacity = '0.45'; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#94a3b8" strokeWidth="2"/>
          <path d="M12 8v1M12 12v4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      {tooltip}
    </>
  );
}
