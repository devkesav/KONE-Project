import React from 'react';
import { TelemetryState } from '../types';
import { 
  Activity, 
  BatteryCharging, 
  Gauge, 
  Flame, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  ShieldCheck, 
  ShieldAlert,
  Cpu
} from 'lucide-react';

interface LiveKpiCardsProps {
  state: TelemetryState;
}

export const LiveKpiCards: React.FC<LiveKpiCardsProps> = ({ state }) => {
  const socNum = Number.isFinite(state.soc)
    ? state.soc * 100
    : Math.max(0, Math.min(100, ((state.Vsc**2 - 100**2) / (200**2 - 100**2)) * 100));
  const socPct = socNum.toFixed(1);
  const isRegen = state.P_inv_dc < -50;
  const isMotoring = state.P_inv_dc > 50;

  return (
    <div className="kpi-cards-grid">
      {/* 1. DC Link Voltage */}
      <div className="glass-card has-tooltip" data-tooltip="Formula: Vdc from 3-phase diode rectifier (nom 540V) regulated by DC-DC droop (560V setpoint). Chopper turns ON at 600V." style={{ padding: '16px 18px', borderLeft: '3px solid var(--color-grid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>DC LINK BUS VOLTAGE</span>
          <Gauge size={16} color="var(--color-grid)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: state.Vdc > 595 ? 'var(--color-brake)' : 'var(--text-primary)' }}>
            {state.Vdc.toFixed(1)}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>V DC</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          <span>Nominal 540V (Setpoint 560V)</span>
          <span className="badge badge-blue">Cdc = 4.7 mF</span>
        </div>
      </div>

      {/* 2. Supercapacitor Bank Voltage & SoC */}
      <div className="glass-card has-tooltip" data-tooltip="Formula: SoC = (Vsc² - Vmin²) / (Vmax² - Vmin²). Usable energy = 0.5 * C * (200² - 100²) = 62.5 Wh (15 F)." style={{ padding: '16px 18px', borderLeft: '3px solid var(--color-sc)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>SUPERCAPACITOR BANK</span>
          <BatteryCharging size={16} color="var(--color-regen)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-regen)' }}>
            {socPct}%
          </span>
          <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            ({state.Vsc.toFixed(1)} V)
          </span>
        </div>
        {/* Visual SoC Bar */}
        <div style={{ width: '100%', height: '5px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.min(100, Math.max(0, state.soc * 100))}%`,
            height: '100%',
            background: state.soc > 0.85 ? 'var(--color-regen)' : (state.soc > 0.2 ? 'var(--color-grid)' : 'var(--color-warning)'),
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
          <span>Working: 100 - 200 V</span>
          <span>Max: 62.5 Wh (15 F)</span>
        </div>
      </div>

      {/* 3. Grid Power Drawn */}
      <div className="glass-card has-tooltip" data-tooltip="Grid Power: Rectifier input drawn from 400V 3-phase line (always >= 0 kW). Computed in real-time." style={{ padding: '16px 18px', borderLeft: '3px solid var(--color-motoring)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>GRID POWER DRAWN</span>
          <Activity size={16} color="var(--color-grid)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: state.P_grid > 500 ? 'var(--color-grid)' : 'var(--text-muted)' }}>
            {(state.P_grid / 1000).toFixed(2)}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>kW</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          <span>Session: {state.cumulative?.grid_kWh.toFixed(2) || '0.00'} kWh</span>
          <span className="font-mono">Cost: ₹{state.cumulative?.cost_INR.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      {/* 4. Inverter DC Power (Motoring / Regen) */}
      <div className="glass-card has-tooltip" data-tooltip="Formula: P_inv_dc = P_mech / (eta_m * eta_inv) if motoring, else P_mech * eta_m * eta_inv. Negative indicates active regeneration." style={{ padding: '16px 18px', borderLeft: isRegen ? '3px solid var(--color-regen)' : '3px solid var(--color-motoring)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>INVERTER DC POWER</span>
          {isRegen ? (
            <span className="badge badge-green">REGEN</span>
          ) : isMotoring ? (
            <span className="badge badge-blue">MOTORING</span>
          ) : (
            <span className="badge badge-purple">STANDBY</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: isRegen ? 'var(--color-regen)' : (isMotoring ? 'var(--color-motoring)' : 'var(--text-primary)')
          }}>
            {(state.P_inv_dc / 1000).toFixed(2)}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>kW</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          Speed: {state.velocity.toFixed(2)} m/s | F_rope: {(state.Te / 0.3 / 1000).toFixed(2)} kN
        </div>
      </div>

      {/* 5. Supercapacitor Power Flow */}
      <div className="glass-card has-tooltip" data-tooltip="Formula: P_sc_bus = DC-DC power into DC bus (+ discharge into bus, - charge from bus). Current limit 100 A." style={{ padding: '16px 18px', borderLeft: '3px solid var(--color-sc)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>SUPERCAP BUS POWER</span>
          <span className="badge badge-green">{state.dcdc_mode.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-sc)' }}>
            {(state.P_sc_bus / 1000).toFixed(2)}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>kW</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          <span>I_sc: {state.Isc.toFixed(1)} A</span>
          <span>Captured: {state.cumulative?.captured_kWh.toFixed(2) || '0.00'} kWh</span>
        </div>
      </div>

      {/* 6. Brake Chopper Dissipation */}
      <div className="glass-card has-tooltip" data-tooltip="Formula: P_brake = (Vdc² / 20 Ω) * duty. Activates when Vdc > 600V to protect DC link capacitor." style={{ padding: '16px 18px', borderLeft: state.brake_chopper_on ? '3px solid var(--color-brake)' : '3px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>BRAKE CHOPPER</span>
          <Flame size={16} color={state.brake_chopper_on ? 'var(--color-brake)' : 'var(--text-muted)'} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: state.P_brake > 10 ? 'var(--color-brake)' : 'var(--text-primary)'
          }}>
            {(state.P_brake / 1000).toFixed(2)}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>kW</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          <span>{state.brake_chopper_on ? 'CHOPPER ACTIVE' : 'Chopper Standby'}</span>
          <span>Burnt: {state.cumulative?.brake_kWh.toFixed(2) || '0.00'} kWh</span>
        </div>
      </div>

      {/* 7. Elevator Kinematics & Shaft State */}
      <div className="glass-card has-tooltip" data-tooltip="Elevator Kinematics: Mass balance F = (m_car + m_load - m_cw)*g + (m_car + m_load + m_cw)*a + F_friction." style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ELEVATOR SHAFT</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {state.direction > 0 ? (
              <span className="badge badge-blue"><ArrowUp size={12} /> UP</span>
            ) : state.direction < 0 ? (
              <span className="badge badge-green"><ArrowDown size={12} /> DOWN</span>
            ) : (
              <span className="badge badge-purple"><Minus size={12} /> IDLE</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Floor {state.floor}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ({state.position.toFixed(1)} m)
          </span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          Cabin Load: {state.car_load_kg.toFixed(0)} kg (Counterweight: 1400 kg)
        </div>
      </div>

      {/* 8. Active Controller & Hard Safety Supervisor */}
      <div className="glass-card has-tooltip" data-tooltip="Section 8 Hard Safety Supervisor: Non-learned deterministic projection guaranteeing Vsc, Isc, Vdc, and temp limits. Zero constraint violations." style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SAFETY SUPERVISOR</span>
          {state.safety_clipped ? (
            <ShieldAlert size={16} color="var(--color-warning)" />
          ) : (
            <ShieldCheck size={16} color="var(--color-regen)" />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
          <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-purple)' }}>
            {(state.approved_action_W / 1000).toFixed(1)} kW
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ref Approved</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: state.safety_clipped ? 'var(--color-warning)' : 'var(--color-regen)' }}>
          {state.safety_clipped ? (state.clip_reason || 'Clipped by safety supervisor') : '100% Constraints Safe'}
        </div>
      </div>
    </div>
  );
};
