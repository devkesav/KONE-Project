import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Play, 
  Pause, 
  FastForward, 
  Sun, 
  Moon, 
  Download,
  AlertTriangle,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  activeLift?: string;
  liftId?: string;
  availableLifts: string[];
  onSelectLift: (id: string) => void;
  controllerMode: string;
  onSelectController?: (mode: string) => void;
  onChangeController?: (mode: string) => void;
  simMode: string;
  simSpeed: number;
  onSelectSimMode?: (mode: string, speed: number) => void;
  onChangeSimMode?: (mode: string, speed: number) => void;
  isWsConnected?: boolean;
  wsConnected?: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onExportPdf: () => void;
  onExportCsv?: () => void;
  hasWarning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeLift,
  liftId,
  availableLifts,
  onSelectLift,
  controllerMode,
  onSelectController,
  onChangeController,
  simMode,
  simSpeed,
  onSelectSimMode,
  onChangeSimMode,
  isWsConnected,
  wsConnected,
  theme,
  onToggleTheme,
  onExportPdf,
  onExportCsv,
  hasWarning
}) => {
  const currentLiftId = activeLift || liftId || 'LIFT-01';
  const handleControllerChange = onSelectController || onChangeController || (() => {});
  const handleSimModeChange = onSelectSimMode || onChangeSimMode || (() => {});
  const connected = isWsConnected ?? wsConnected ?? false;
  return (
    <header className="header-container">
      {/* Brand & Lift Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'var(--color-motoring)',
            padding: '7px 9px',
            borderRadius: 'var(--radius-sm)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.85rem',
            letterSpacing: '0.05em'
          }}>
            KONE
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
              ELEVATOR ENERGY MANAGEMENT SYSTEM
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              PMSM Drive & Supercapacitor Storage Management
            </p>
          </div>
        </div>

        {/* Lift Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px' }}>
          <Layers size={15} color="var(--text-muted)" />
          <select 
            value={currentLiftId} 
            onChange={(e) => onSelectLift(e.target.value)}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '5px 10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {availableLifts.map((id) => (
              <option key={id} value={id}>{id} (Passenger 1000kg · 2.0 m/s)</option>
            ))}
          </select>
          <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>Substation: Main Shaft</span>
        </div>
      </div>

      {/* Control Actions & Simulation Modes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        
        {/* Active Controller Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Policy:</span>
          <select
            value={controllerMode}
            onChange={(e) => handleControllerChange(e.target.value)}
            style={{
              background: 'var(--bg-card)',
              color: controllerMode.includes('RL') ? 'var(--color-purple)' : 'var(--color-grid)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '5px 10px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <option value="B1_RULE_BASED">B1: Rule-Based Droop (Default)</option>
            <option value="RL_SAC">RL: Safe SAC Actor-Critic</option>
            <option value="B2_MPC">B2: MPC Benchmark Bound</option>
            <option value="B0_CONVENTIONAL">B0: Conventional (No Supercap)</option>
          </select>
        </div>

        {/* Simulation Mode Toggle (Live / Accelerated Demo / Paused) */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden'
        }}>
          <button
            onClick={() => handleSimModeChange('LIVE', 1.0)}
            style={{
              padding: '5px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: simMode === 'LIVE' ? 'var(--color-motoring)' : 'transparent',
              color: simMode === 'LIVE' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Activity size={13} /> Live (1x)
          </button>
          <button
            onClick={() => handleSimModeChange('DEMO_ACCELERATED', 20.0)}
            style={{
              padding: '5px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: simMode === 'DEMO_ACCELERATED' ? 'var(--color-regen)' : 'transparent',
              color: simMode === 'DEMO_ACCELERATED' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FastForward size={13} /> Demo (20x)
          </button>
          <button
            onClick={() => handleSimModeChange('PAUSED', 0.0)}
            style={{
              padding: '5px 8px',
              fontSize: '0.78rem',
              background: simMode === 'PAUSED' ? 'var(--color-warning)' : 'transparent',
              color: simMode === 'PAUSED' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Pause size={13} />
          </button>
        </div>

        {/* WebSocket Heartbeat & Data Quality Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: connected ? 'var(--color-regen)' : 'var(--color-brake)',
            fontWeight: 600
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: connected ? 'var(--color-regen)' : 'var(--color-brake)'
            }} />
            {connected ? '1 Hz Live' : 'Reconnecting...'}
          </div>

          {hasWarning && (
            <span className="badge badge-rose" title="Data quality warning: bus balance residual exceeded 1.5%">
              <AlertTriangle size={12} /> Residual &gt; 1.5%
            </span>
          )}
        </div>

        {/* PDF Export Button */}
        <button
          onClick={onExportPdf}
          className="has-tooltip"
          data-tooltip="Generate and download monthly executive PDF report"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(37, 99, 235, 0.15)',
            color: 'var(--color-grid)',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Download size={14} /> Report PDF
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex'
          }}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};
