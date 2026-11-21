# KONE Elevator Regenerative Energy Project

This repository contains my work on a regenerative elevator energy-management system. The project combines:

- MATLAB/Simulink elevator and regenerative-braking models
- A full-stack Python and React lift-energy management dashboard
- Physics-based elevator, PMSM, DC-link, braking, and supercapacitor models
- Safe reinforcement-learning controllers and rule-based baseline controllers
- A separate hardware/electrical workbench with browser-to-ESP32 telemetry support
- Supercapacitor health, energy accounting, tariffs, forecasting, and reporting

The goal is to study and demonstrate how regenerative braking energy can be captured in a supercapacitor bank, controlled safely, used during motoring, and evaluated through live telemetry and energy-balance metrics.

## What Is Implemented

### 1. Elevator and PMSM simulations

The repository includes two MATLAB/Simulink model folders:

- [simulation 1](simulation%201/) — completed regenerative-braking elevator simulation and backup model.
- [simulation 2](simulation%202/) — three-phase elevator model work.
- [phase6_regerative.slx](RL%20DASHBOARD/phase6_regerative.slx) — later phase of the regenerative system inside the RL dashboard project.

These models provide the mechanical and electrical basis for the workbench and the Python simulation.

### 2. RL and energy-management dashboard

The main application is in [RL DASHBOARD](RL%20DASHBOARD/).

It provides:

- A 1-second FastAPI simulation and controller loop
- Live WebSocket telemetry
- REST API and Swagger documentation
- A React, TypeScript, and Vite management dashboard
- PMSM elevator traction and counterweight mechanics
- Bidirectional DC-DC supercapacitor control
- Dynamic brake-chopper modeling
- Energy, cost, and CO2 savings calculations
- Trip logs and daily/monthly summary data
- Supercapacitor capacitance, ESR, temperature, and health indicators
- Passenger-traffic and forward-demand forecasting
- SAC/TD3-style policy support, rule-based control, and baseline comparison
- A safety supervisor that projects unsafe actions into physical limits
- PDF and CSV report generation

The dashboard includes tabs for live operation, energy waterfall, savings and payback, statistics, supercapacitor health, forecasts, trip logs, tariff configuration, and alerts.

### 3. Hardware and electrical schematic workbench

The application in [hardware_dashboard](hardware_dashboard/) is a separate React-based electrical workbench.

It visualizes:

- 230 V AC input and 230 V to 12 V transformer behavior
- Fuse, switches, and precharge protection
- A bridge rectifier and DC link
- A bidirectional DC-DC converter
- A 6-cell supercapacitor bank model
- Dynamic braking resistor and chopper
- PMSM or DC-motor motion
- Live oscilloscope traces
- Elevator floor, payload, and motion controls
- Fault injection such as a blown fuse or open switch
- Emergency stop and system reset controls

The workbench also supports Web Serial API connections in browsers such as Chrome, Edge, and Opera. It is intended to receive JSON telemetry from an ESP32 or other microcontroller at 115200 baud. The supported JSON fields include `vac`, `iac`, `vsec`, `vdc`, `idc`, `vsc`, `isc`, `rpm`, `torque`, and `floor`.

### 4. Control strategy

The project compares multiple controller modes:

| Controller | Purpose |
|---|---|
| `B0_CONVENTIONAL` | Conventional operation without regenerative supercapacitor assistance |
| `B1_RULE_BASED` | Deterministic, physically bounded rule-based control |
| `B2_MPC` | Baseline model-predictive optimization |
| `RL_SAC` | Reinforcement-learning policy inference or training workflow |

The safety layer remains separate from the learned policy. Before a command reaches the model adapter, it is checked against supercapacitor voltage, current, temperature, duty-cycle, and other physical limits.

## Repository Structure

```text
KONE-Project/
├── RL DASHBOARD/
│   ├── adapters/                 Adapter interface, replay, surrogate, and Simulink/FMUs
│   ├── backend/                  FastAPI, SQLite, REST, WebSocket, and reports
│   ├── config/                   Elevator, motor, grid, storage, tariff parameters
│   ├── core/                     Mechanics, electrical, supercap, accounting, tariffs
│   ├── docs/                     Architecture, formulas, reports, and graphs
│   ├── forecasting/              Traffic generation and demand forecasting
│   ├── frontend/                 React management dashboard
│   ├── rl/                       Safety, environment, baselines, training, evaluation
│   ├── scripts/                  Analysis and sample-trip utilities
│   ├── surrogate/                Fast numerical elevator surrogate
│   ├── tests/                    Physics, safety, backend, health, and RL tests
│   ├── phase6_regerative.slx     Simulink regenerative model
│   ├── elevator_energy.db        Local SQLite database
│   ├── run.py                    Unified backend and frontend launcher
│   └── start.bat                 Windows launcher
├── hardware_dashboard/           Standalone electrical/hardware workbench
├── simulation 1/                 Primary completed Simulink simulation
├── simulation 2/                 Three-phase elevator simulation
└── research papers/              Elevator and regenerative-braking references
```

## Main Features

- Elevator kinematics with payload, counterweight, friction, acceleration, and deceleration
- Supercapacitor terminal voltage and ESR loss calculations
- DC-link and brake-chopper energy paths
- Gross regeneration, captured energy, brake losses, and stored energy accounting
- Rule-based and learned control modes
- Quantized P10/P50/P90 demand forecast displays
- Tariff and rolling peak-demand calculations
- C-fade and ESR-growth degradation injection
- SQLite persistence for telemetry, trips, health, alerts, and configuration
- CSV and PDF report exports
- Architecture and detailed schematic views
- Fault and emergency-stop controls
- Browser-based serial hardware telemetry

## Running the Main RL Dashboard

### Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- A browser for the React dashboard

The checked-in project currently does not include a root Python dependency manifest. The existing environment can be used directly, or the required packages can be installed separately. The application uses packages including FastAPI, Uvicorn, NumPy, Pandas, PyYAML, SQLAlchemy, PyTorch, Gymnasium, scikit-learn, LightGBM, ReportLab, and Matplotlib.

### Windows

From the repository root:

```bat
cd "RL DASHBOARD"
python run.py
```

Or run [start.bat](RL%20DASHBOARD/start.bat).

### Linux or macOS

```bash
cd "RL DASHBOARD"

python -m venv .venv
source .venv/bin/activate

python -m pip install fastapi uvicorn numpy pandas pyyaml sqlalchemy torch gymnasium
python -m pip install scikit-learn lightgbm reportlab matplotlib scipy

npm install --prefix frontend
python run.py
```

The launcher builds `frontend/dist` when needed and starts the FastAPI application on port `8000`.

Open:

- Dashboard: <http://localhost:8000>
- API documentation: <http://localhost:8000/docs>
- WebSocket telemetry: `ws://localhost:8000/ws/live`

For frontend-only development:

```bash
cd "RL DASHBOARD/frontend"
npm install
npm run dev
```

Vite normally serves the development frontend on port `5173`. The production launch serves the built application through FastAPI.

## Running the Hardware Workbench

```bash
cd hardware_dashboard
npm install
npm run dev
```

Vite normally opens the workbench at <http://localhost:5173>. The exact port is shown in the terminal.

To build it for deployment:

```bash
cd hardware_dashboard
npm run build
npm run preview
```

To connect hardware:

1. Open the workbench in Chrome, Edge, or Opera.
2. Connect an ESP32 or compatible serial device.
3. Select **Connect Hardware** in the dashboard.
4. Choose the serial port and a baud rate of `115200`.
5. Send one JSON telemetry object per line.

The browser serial bridge is a prototype interface and does not imply that the external controller is safety-certified or synchronized with the Python backend.

## Tests

Run the Python test suite from the main project directory:

```bash
cd "RL DASHBOARD"
python -m pytest -v
```

The tests cover:

- PMSM, rectifier, brake-chopper, and DC-link calculations
- Elevator mechanics and kinematics
- Supercapacitor energy and health calculations
- Safety clipping and invalid-input handling
- Baseline controllers and savings
- Demand forecasting and traffic generation
- Surrogate model behavior
- FastAPI endpoints

The hardware workbench has separate npm scripts:

```bash
cd hardware_dashboard
npm run lint
npm run build
```

## Important Technical Conventions

The simulation uses explicit power signs:

| Value | Positive | Negative |
|---|---|---|
| `P_inv_dc` | Motor power into the PMSM | PMSM returning power to the DC link |
| `P_sc_bus` | Supercapacitor discharging | Supercapacitor charging |
| `P_grid` | Grid draws | Export is not assumed |
| `P_brake` | Energy dumped in the brake resistor | Not applicable |

The energy-balance check compares regenerated energy with captured supercapacitor energy and brake losses. A residual above `1.5%` is reported as a data-quality warning.

## Current Scope and Limitations

This project is primarily a research and prototyping platform. It is not validated as an elevator safety controller and must not control a real lift without:

- Appropriate SIL/HIL safety validation
- Certified elevator hardware and emergency controls
- Drive, motor, battery-management, and DC-converter protection
- Real sensor calibration and fault-tolerant communication
- Industrial CAN, Ethernet/IP, OPC UA, Modbus, or approved control integration
- Independent machine safety and standards compliance

Some parameters are placeholders or assumptions, including auxiliary loads, supercapacitor ESR, thermal resistance, tariffs, and financial assumptions. MATLAB/FMU adapter files expose integration interfaces, but physical hardware, MATLAB Engine, and FMI co-simulation are not substitutes for a complete tested industrial integration.

The main dashboard is also the most developed Python application; the hardware workbench is a separate browser simulation and serial visualization prototype.

## Configuration

The primary parameter file is [params.yaml](RL%20DASHBOARD/config/params.yaml). It contains lift, motor, grid, brake, supercapacitor, DC-DC converter, tariff, and RL reward settings.

Additional technical documentation is available in [RL DASHBOARD/docs](RL%20DASHBOARD/docs/):

- [architecture.md](RL%20DASHBOARD/docs/architecture.md)
- [formulas_and_physics.md](RL%20DASHBOARD/docs/formulas_and_physics.md)
- [evaluation_report.md](RL%20DASHBOARD/docs/evaluation_report.md)
- [surrogate_validation_report.md](RL%20DASHBOARD/docs/surrogate_validation_report.md)

## License

See [RL DASHBOARD/LICENSE](RL%20DASHBOARD/LICENSE) for the license covering the RL dashboard project.
