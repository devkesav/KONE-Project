import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  BarChart3,
  TrendingUp,
  Calendar,
  BatteryCharging,
  Cpu,
  ListOrdered,
  Sliders,
  AlertTriangle,
  Info,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Layers
} from 'lucide-react';

import { Header } from './components/Header';
import { LiveKpiCards } from './components/LiveKpiCards';
import { InteractiveDriveLab } from './components/InteractiveDriveLab';
import { PowerFlowDiagram } from './components/PowerFlowDiagram';
import { EnergyWaterfall } from './components/EnergyWaterfall';
import { SavingsPayback } from './components/SavingsPayback';
import { MonthlyDailyStats } from './components/MonthlyDailyStats';
import { SupercapHealth } from './components/SupercapHealth';
import { ForecastPanel } from './components/ForecastPanel';
import { TripLog } from './components/TripLog';
import { TariffConfig } from './components/TariffConfig';
import { AlertsPanel } from './components/AlertsPanel';

import {
  TelemetryState,
  WaterfallData,
  SavingsData,
  TripRecordItem,
  ForecastHorizon,
  HealthStatus
} from './types';

type TabKey =
  | 'live'
  | 'waterfall'
  | 'savings'
  | 'monthly'
  | 'health'
  | 'forecast'
  | 'trips'
  | 'config'
  | 'alerts';

const defaultTelemetry: TelemetryState = {
  time: 0,
  trip_id: 1,
  lift_state: 'dwell',
  direction: 0,
  floor: 1,
  position: 0.0,
  velocity: 0.0,
  accel: 0.0,
  car_load_kg: 800.0,
  Vgrid: 400.0,
  Igrid: 0.0,
  P_grid: 0.0,
  Vdc: 560.0,
  Idc_rect: 0.0,
  P_inv_dc: 0.0,
  P_aux: 250.0,
  P_brake: 0.0,
  brake_chopper_on: false,
  Vsc: 130.0,
  Isc: 0.0,
  P_sc_term: 0.0,
  P_sc_bus: 0.0,
  soc: 0.33,
  dcdc_mode: 'idle',
  duty: 0.23,
  SC_temp: 25.0,
  Te: 0.0,
  motor_speed_rpm: 0.0,
  controller_mode: 'B1_RULE_BASED',
  raw_action_W: 0.0,
  approved_action_W: 0.0,
  safety_clipped: false,
  data_quality_warning: false,
  bus_residual_pct: 0.12,
};

const defaultWaterfall: WaterfallData = {
  motoring_demand_kWh: 18.5,
  grid_drawn_kWh: 12.8,
  gross_regen_kWh: 10.2,
  captured_in_sc_kWh: 9.1,
  stored_energy_used_kWh: 8.7,
  brake_burnt_kWh: 1.1,
  energy_in_sc_kWh: 0.045,
  saved_kWh: 4.2,
  balance_checks: {
    check_1_regen_balance: 'PASS',
    residual_pct: 0.38,
    threshold_pct: 1.5,
  },
};

const defaultSavings: SavingsData = {
  grid_actual_kWh: 12.8,
  grid_baseline_kWh: 17.0,
  saved_kWh: 4.2,
  cost_actual_INR: 102.4,
  cost_baseline_INR: 136.0,
  saved_INR: 33.6,
  peak_actual_kW: 11.2,
  peak_baseline_kW: 15.1,
  peak_reduction_pct: 25.8,
  co2_avoided_kg: 3.44,
  system_cost_INR: 185000.0,
  payback_years: 2.7,
  payback_curve: [
    { year: 1, savings_INR: 69500, net_benefit_INR: -115500 },
    { year: 2, savings_INR: 141085, net_benefit_INR: -43915 },
    { year: 3, savings_INR: 214818, net_benefit_INR: 29818 },
    { year: 4, savings_INR: 290762, net_benefit_INR: 105762 },
    { year: 5, savings_INR: 368985, net_benefit_INR: 183985 },
  ],
};

const defaultHorizons: ForecastHorizon[] = [
  { minute_ahead: 0, hour_clock: '08:00', p10_kW: 3.2, p50_kW: 5.4, p90_kW: 7.8, tariff_INR_kWh: 11.0, advisory_action: 'HOLD' },
  { minute_ahead: 15, hour_clock: '08:15', p10_kW: 4.5, p50_kW: 7.2, p90_kW: 9.8, tariff_INR_kWh: 11.0, advisory_action: 'DISCHARGE_ASSIST' },
  { minute_ahead: 30, hour_clock: '08:30', p10_kW: 6.8, p50_kW: 9.5, p90_kW: 12.4, tariff_INR_kWh: 11.0, advisory_action: 'DISCHARGE_ASSIST' },
  { minute_ahead: 45, hour_clock: '08:45', p10_kW: 5.5, p50_kW: 8.0, p90_kW: 10.6, tariff_INR_kWh: 11.0, advisory_action: 'DISCHARGE_ASSIST' },
  { minute_ahead: 60, hour_clock: '09:00', p10_kW: 4.0, p50_kW: 6.2, p90_kW: 8.4, tariff_INR_kWh: 11.0, advisory_action: 'HOLD' },
];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('live');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeLift, setActiveLift] = useState<string>('LIFT-01');
  const [availableLifts] = useState<string[]>(['LIFT-01', 'LIFT-02', 'LIFT-03']);
  const [controllerMode, setControllerMode] = useState<string>('B1_RULE_BASED');
  const [simMode, setSimMode] = useState<string>('DEMO_ACCELERATED');
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [isWsConnected, setIsWsConnected] = useState<boolean>(false);

  // Live Telemetry & Module Data
  const [telemetry, setTelemetry] = useState<TelemetryState | null>(null);
  const [waterfallData, setWaterfallData] = useState<WaterfallData | null>(null);
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [trips, setTrips] = useState<TripRecordItem[]>([]);
  const [horizons, setHorizons] = useState<ForecastHorizon[]>(defaultHorizons);

  // Notification Toast
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'warning' | 'info';
  } | null>(null);

  const notify = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  };

  const handleSelectController = async (mode: string) => {
    try {
      const resp = await fetch('/api/controller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode }),
      });
      if (resp.ok) {
        setControllerMode(mode);
        notify(`Switched active controller to ${mode}`, 'success');
      }
    } catch {
      notify('Failed to switch controller mode', 'warning');
    }
  };

  const handleSelectSimMode = async (mode: string, speed: number) => {
    try {
      const resp = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, speed }),
      });
      if (resp.ok) {
        setSimMode(mode);
        setSimSpeed(speed);
        notify(`Simulation set to ${mode} (${speed}x speed)`, 'info');
      }
    } catch {
      notify('Failed to update simulation speed/mode', 'warning');
    }
  };

  // Health Degradation Injector handlers
  const handleInjectDegradation = async (cMult: number, esrMult: number) => {
    try {
      const resp = await fetch('/api/health/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ c_multiplier: cMult, esr_multiplier: esrMult }),
      });
      if (resp.ok) {
        notify(`Injected degradation: C x${cMult}, ESR x${esrMult}`, 'warning');
      }
    } catch {
      notify('Failed to inject degradation', 'warning');
    }
  };

  const handleResetDegradation = async () => {
    try {
      const resp = await fetch('/api/health/reset', { method: 'POST' });
      if (resp.ok) {
        notify('Supercapacitor degradation reset to nominal baseline', 'success');
      }
    } catch {
      notify('Failed to reset degradation', 'warning');
    }
  };

  // WebSocket Live Feed Connection
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    let reconnectTimeout: any;
    const connectWs = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/live`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          // Backend sends telemetry dictionary directly (or wrapped in msg.data)
          if (msg.time !== undefined && msg.Vdc !== undefined) {
            setTelemetry(msg);
          } else if (msg.type === 'TELEMETRY' && msg.data) {
            setTelemetry(msg.data);
          }
        } catch {
          // Parse error
        }
      };

      ws.onerror = () => {
        setIsWsConnected(false);
      };

      ws.onclose = () => {
        setIsWsConnected(false);
        reconnectTimeout = setTimeout(connectWs, 2000);
      };

      wsRef.current = ws;
    };

    connectWs();
    return () => {
      if (wsRef.current) wsRef.current.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  // Polling fallback / auxiliary data loader
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isWsConnected) {
          const stateRes = await fetch('/api/state');
          if (stateRes.ok) {
            const d = await stateRes.json();
            if (d.state && Object.keys(d.state).length > 0) setTelemetry(d.state);
            if (d.controller_mode) setControllerMode(d.controller_mode);
            if (d.sim_mode) setSimMode(d.sim_mode);
            if (d.sim_speed) setSimSpeed(d.sim_speed);
          }
        }

        const [wRes, sRes, tRes, fRes] = await Promise.all([
          fetch('/api/waterfall'),
          fetch('/api/savings'),
          fetch('/api/trips?limit=30'),
          fetch('/api/forecast')
        ]);

        if (wRes.ok) setWaterfallData(await wRes.json());
        if (sRes.ok) setSavingsData(await sRes.json());
        if (tRes.ok) setTrips(await tRes.json());
        if (fRes.ok) {
          const fData = await fRes.json();
          if (fData.forecast_horizons) setHorizons(fData.forecast_horizons);
        }
      } catch {
        // Ignore background polling errors
      }
    };

    fetchData();
    // In live mode with active WebSocket, poll non-critical analytics less aggressively (10s) to free main thread
    const interval = setInterval(fetchData, isWsConnected ? 10000 : 4000);
    return () => clearInterval(interval);
  }, [isWsConnected]);

  const handleExportPdf = () => {
    window.open('/api/reports/monthly.pdf', '_blank');
    notify('Downloading executive monthly energy PDF report...', 'info');
  };

  const handleExportCsv = () => {
    window.open('/api/reports/trips.csv', '_blank');
    notify('Exporting high-resolution trip ledger CSV...', 'info');
  };

  const currentTelemetry = telemetry || defaultTelemetry;

  const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
    { key: 'live', label: '1. Drive Telemetry & Lab', icon: <Activity size={16} /> },
    { key: 'forecast', label: '2. Safe RL Policy & Forecast', icon: <Cpu size={16} /> },
    { key: 'waterfall', label: '3. Energy Balance & Loss', icon: <BarChart3 size={16} /> },
    { key: 'savings', label: '4. Financial & Payback', icon: <TrendingUp size={16} /> },
    { key: 'monthly', label: '5. Load Profile & Billing', icon: <Calendar size={16} /> },
    { key: 'health', label: '6. Supercapacitor Diagnostics', icon: <BatteryCharging size={16} /> },
    { key: 'trips', label: '7. Trip Audit Ledger', icon: <ListOrdered size={16} /> },
    { key: 'config', label: '8. Tariff & Parameters', icon: <Sliders size={16} /> },
    { key: 'alerts', label: '9. Safety & Alarms', icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top Header */}
      <Header
        activeLift={activeLift}
        availableLifts={availableLifts}
        onSelectLift={setActiveLift}
        controllerMode={controllerMode}
        onSelectController={handleSelectController}
        simMode={simMode}
        simSpeed={simSpeed}
        onSelectSimMode={handleSelectSimMode}
        isWsConnected={isWsConnected}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
      />

      {/* Main Container */}
      <main className="app-main">
        {/* Toast / Notification Banner */}
        {notification && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              borderRadius: '8px',
              marginBottom: '16px',
              backgroundColor: notification.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : (notification.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)'),
              border: `1px solid ${notification.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : (notification.type === 'warning' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(59, 130, 246, 0.4)')}`,
              color: notification.type === 'success' ? 'var(--color-regen)' : (notification.type === 'warning' ? 'var(--color-warning)' : 'var(--color-grid)')
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600 }}>
              {notification.type === 'success' && <CheckCircle2 size={16} />}
              {notification.type === 'warning' && <AlertCircle size={16} />}
              {notification.type === 'info' && <Info size={16} />}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              <XCircle size={16} />
            </button>
          </div>
        )}

        {/* Section 9 DATA_QUALITY_WARNING Alert Banner if residual > 1.5% */}
        {currentTelemetry.data_quality_warning && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', backgroundColor: 'rgba(244, 63, 94, 0.2)', border: '1px solid rgba(244, 63, 94, 0.4)', color: 'var(--color-brake)', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} />
              <span>
                <strong>DATA_QUALITY_WARNING:</strong> DC Link energy balance residual ({currentTelemetry.bus_residual_pct}%) exceeds Section 9 threshold of 1.5%.
              </span>
            </div>
            <button onClick={() => setActiveTab('alerts')} style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              Inspect Logs
            </button>
          </div>
        )}

        {/* Primary Navigation Tabs */}
        <div className="tabs-scroll-container">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                data-testid={`tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--border-focus)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--badge-bg-blue)' : 'var(--bg-card)',
                  color: isActive ? 'var(--color-motoring)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.key === 'alerts' && currentTelemetry.data_quality_warning && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brake)' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Live Drive Lab */}
        {activeTab === 'live' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <LiveKpiCards state={currentTelemetry} />
            <PowerFlowDiagram state={currentTelemetry} />
            <InteractiveDriveLab onTelemetryUpdate={setTelemetry} liveTelemetry={telemetry} />
          </div>
        )}

        {/* Tab 2: Forecast & Safe RL Policy Layer */}
        {activeTab === 'forecast' && (
          <div>
            <ForecastPanel
              horizons={horizons}
              activeController={controllerMode}
              onChangeController={handleSelectController}
              explanation={currentTelemetry.explanation}
            />
          </div>
        )}

        {/* Tab 3: Energy Waterfall */}
        {activeTab === 'waterfall' && (
          <div>
            <EnergyWaterfall data={waterfallData || defaultWaterfall} />
          </div>
        )}

        {/* Tab 4: Savings & Payback */}
        {activeTab === 'savings' && (
          <div>
            <SavingsPayback data={savingsData || defaultSavings} />
          </div>
        )}

        {/* Tab 5: Monthly Analytics */}
        {activeTab === 'monthly' && (
          <div>
            <MonthlyDailyStats onExportPdf={handleExportPdf} onExportCsv={handleExportCsv} />
          </div>
        )}

        {/* Tab 6: Supercap Health */}
        {activeTab === 'health' && (
          <div>
            <SupercapHealth
              health={currentTelemetry.health}
              onInjectDegradation={handleInjectDegradation}
              onResetDegradation={handleResetDegradation}
            />
          </div>
        )}

        {/* Tab 7: Trip Ledger */}
        {activeTab === 'trips' && (
          <div>
            <TripLog trips={trips} />
          </div>
        )}

        {/* Tab 8: Tariff & Config */}
        {activeTab === 'config' && (
          <div>
            <TariffConfig onNotify={notify} />
          </div>
        )}

        {/* Tab 9: System Alerts */}
        {activeTab === 'alerts' && (
          <div>
            <AlertsPanel
              telemetryWarning={currentTelemetry.data_quality_warning}
              busResidualPct={currentTelemetry.bus_residual_pct}
            />
          </div>
        )}
      </main>

      {/* Industrial Footer */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '14px 20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span>KONE Industrial Traction Drive & Supercapacitor Management System • Rev 2.4</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Operating Policy: <strong>{controllerMode}</strong></span>
            <span>DC Bus Balance Tolerance: <strong>&lt; 1.5%</strong></span>
            <span>IEC 61800-9-2 Class: <strong>IE2 / High Efficiency</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
};
