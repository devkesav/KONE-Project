# Conference Paper Technical Specification

**Project:** Safe Reinforcement Learning and Quantile Demand Forecasting for Regenerative Elevator Energy Management with Hybrid Supercapacitor Storage

**Target domain:** IEEE power electronics, industrial electronics, and building-energy automation
**Document type:** Technical manuscript reference

## 1. Abstract

Commercial buildings can devote a substantial portion of electricity use to elevator transportation. During overhauling trips, the PMSM acts as a generator and regenerative power is normally dissipated through dynamic brake resistors to prevent DC-link overvoltage.

This project combines a 15 F, 100-200 V supercapacitor bank with a bidirectional DC-DC converter and a 560 V elevator DC bus. A safe reinforcement-learning controller selects supercapacitor charging or discharge commands, while a deterministic safety supervisor enforces voltage, current, thermal, and duty-cycle limits. A LightGBM quantile forecaster provides P10, P50, and P90 traffic and demand horizons.

## 2. Physical Plant

### Mechanical system

The traction model includes cabin mass, passenger load, counterweight, rope and rotational inertia, gravity, acceleration, and friction.

```text
Sigma_m =
  m_car + m_load + m_cw + m_ropes
  + (J_motor + J_sheave) / r_sheave^2

F_rope =
  (m_car + m_load - m_cw) * g
  + Sigma_m * a
  + F_friction * sign(v)

P_mech = F_rope * v
```

- P_mech > 0: motoring
- P_mech < 0: regenerative braking
- Rated passenger capacity: 1000 kg
- Nominal passenger load: 800 kg
- Counterweight ratio: approximately 0.45-0.50
- Maximum speed: 2.0 m/s
- Maximum acceleration: 1.0 m/s^2

### PMSM traction drive

The PMSM uses field-oriented control. A non-salient surface PMSM simplifies torque production to:

```text
T_e = 1.5 * p * lambda_pm * i_q
with i_d = 0
```

Key parameters:

- Pole pairs: 12
- Sheave radius: 0.30 m
- Stator resistance: 0.5 ohm
- Direct and quadrature inductance: 0.02 H
- PMSM and inverter efficiency assumptions are defined in `config/params.yaml`

### DC link and braking

The three-phase diode rectifier converts a 400 V RMS utility supply to an approximately 540 V DC no-load bus. Because it is not a bidirectional active-front-end converter, grid export is assumed to be unavailable.

```text
C_dc * dV_dc/dt =
  I_rect - I_inv + I_dcdc_bus - I_brake

I_brake = V_dc / R_brake  if V_dc >= 600 V
I_brake = 0                if V_dc < 590 V

R_brake = 20 ohms
```

## 3. Supercapacitor and DC-DC converter

The project models the supercapacitor as a capacitance and ESR energy-storage system.

```text
V_sc_term = V_sc_oc - I_sc * ESR
dV_sc_oc/dt = -I_sc / C_sc

C_sc = 15 F
V_max = 200 V
V_min = 100 V
ESR = 35 milliohm
DC-DC efficiency = 97%
DC-DC current limit = 100 A
DC-DC power limit = 20 kW
```

State of charge and usable energy:

```text
SoC =
  (V_sc^2 - V_min^2)
  / (V_max^2 - V_min^2)

E_usable =
  0.5 * C_sc * (V_max^2 - V_min^2)

E_usable = 225,000 joules = 62.5 Wh
```

Converter modes:

- Buck mode: P_dcdc is positive and energy is transferred from the DC bus into the supercapacitor.
- Boost mode: P_dcdc is negative and energy is delivered from the supercapacitor to the DC bus.

## 4. Traffic and demand forecasting

The synthetic traffic generator represents distinct 24-hour regimes:

1. Morning up-peak
2. Lunch peak
3. Evening down-peak
4. Inter-floor off-peak
5. Night and standby

The forecaster predicts P10, P50, and P90 demand horizons. Input features include cyclic time, weekday, lagged demand, and rolling demand statistics.

```text
Temporal resolution: 1 second
Physics integration timestep: 250 microseconds
Quantile levels: 0.10, 0.50, 0.90
```

## 5. Reinforcement-learning formulation

The controller uses a continuous Markov decision process:

- State: 22 normalized elevator, electrical, tariff, forecast, and storage features
- Action: scalar command from -1.0 to +1.0
- Policy: SAC or TD3-style actor-critic implementation
- Reward: grid cost, demand peak penalty, brake loss penalty, action slew penalty, aging penalty, violation penalty, and stored-energy value

```text
P_sc_raw = action * P_dcdc_max
P_dcdc_max = 20 kW
```

Positive actions request supercapacitor charging. Negative actions request discharge to assist motoring and reduce grid demand.

## 6. Hard safety supervisor

The learned policy proposes an unconstrained command, then the deterministic safety supervisor projects it to a safe operating region:

```text
[RL Policy] -> P_sc_raw -> [Safety Supervisor] -> P_sc_approved -> [DC-DC PWM]
```

Safety constraints include:

- V_sc must remain between 100 V and 200 V.
- Absolute I_sc must not exceed 100 A.
- DC-bus voltage must remain in the configured operating range.
- Supercapacitor temperature must remain below 65 degrees Celsius.
- Converter duty cycle must remain within the configured limits.
- Invalid, NaN, infinite, or timed-out policy outputs fall back to the B1 rule-based controller.

```text
I_sc = P_sc / V_sc
abs(I_sc) <= 100 A
```

## 7. Controller benchmark framework

The evaluator compares conventional operation, rule-based control, perfect-knowledge MPC, and safe-RL control under identical traffic profiles.

| Metric | B0 Conventional | B1 Rule-based | B2 MPC | Proposed Safe RL |
| :--- | ---: | ---: | ---: | ---: |
| Grid energy | Baseline | Lower | Lower | Lowest |
| Regenerative capture | 0% | Intermediate | High | Highest |
| Brake dissipation | High | Reduced | Reduced | Minimal |
| Peak demand | Baseline | Reduced | Reduced | Lowest |
| Safety violations | Not supervised | 0 in tested trials | 0 in tested trials | 0 with supervisor |

The final manuscript should report measured and statistically validated results rather than relying solely on simulated or assumed values.

## 8. Quick specification

- Motor: three-phase PMSM gearless elevator drive
- Grid: 400 V RMS three-phase supply
- Nominal DC bus: 560 V
- DC-link capacitance: 4.7 mF
- Storage: 15 F supercapacitor, 100-200 V
- ESR: 35 milliohm
- Converter: bidirectional buck-boost DC-DC, 20 kW, +/-100 A
- Brake threshold: 600 V
- Maximum supercapacitor temperature: 65 degrees Celsius
- Software: Python, PyTorch, LightGBM, Gymnasium, FastAPI, React, and TypeScript
