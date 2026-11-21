# Physical Formulas, Schemas, and Accounting Rules
**Regenerative Supercapacitor Elevator Energy Manager**
*Reference Documentation for Engineering and Maintenance Teams*

---

## 1. Sign Conventions & Signal Definitions (Section 3)

| Signal | Units | Sign Convention / Meaning |
| :--- | :--- | :--- |
| P_inv_dc | W | **DC Inverter Power**: positive = motoring (power leaves DC link into motor), negative = regenerating (power feeds from motor back to DC link). |
| P_sc_bus | W | **DC-DC Bus Power**: positive = discharge (power injected into DC bus from supercapacitor), negative = charge (power absorbed from DC bus into supercapacitor). |
| P_sc_term | W | **Supercapacitor Terminal Power**: positive = discharge, negative = charge. Includes converter losses. |
| P_grid | W | **Rectifier Output Power**: strictly greater than or equal to 0 W (diode rectifier prohibits reverse grid feed-in/export). |
| P_brake | W | **Dynamic Braking Chopper Power**: strictly greater than or equal to 0 W (energy dissipated across R_brake as heat). |
| P_aux | W | **Elevator Auxiliary Load**: strictly greater than or equal to 0 W (cabin ventilation, lighting, door actuators, safety controller). |
| v | m/s | **Cabin Velocity**: positive = upward movement, negative = downward movement. |
| x | m | **Cabin Position**: positive = upward, relative to ground landing floor (0 m). |
| F | N | **Mechanical Rope Traction Force**: positive in the direction of cabin acceleration/lift. |

---

## 2. Mechanical Kinematics and Motor Power (Section 4)

### Traction Elevator Dynamics
For a car mass `m_car`, counterweight mass `m_cw = m_car + 0.5 * m_rated`, and passenger car load `m_load`:

```text
F = (m_car + m_load - m_cw) * g
    + (m_car + m_load + m_cw) * a
    + F_friction * sign(v)

P_mech = F * v
```

- When P_mech > 0: **Motoring**
- When P_mech < 0: **Regeneration**
- Balanced Load Check: At m_load = 0.5 * m_rated, m_car + m_load - m_cw = 0. In steady-state cruising (a = 0), F is approximately F_fric, meaning net mechanical regeneration is near zero.

### Electrical DC Bus Drive Coupling
```text
P_inv_dc = P_mech / (eta_motor * eta_inv),  if P_mech >= 0 (motoring)
P_inv_dc = P_mech * eta_motor * eta_inv,    if P_mech < 0  (regeneration)
```

---

## 3. DC Link Instantaneous Balance & Resistor Chopper

### Kirchhoff DC Bus Power Balance:
```text
P_grid + P_sc_bus = P_inv_dc + P_aux + P_brake + d(0.5 * C_dc * V_dc^2) / dt
```

### Chopper Dissipation:
When supercapacitor charging is limited or saturated and V_dc >= V_chop_on = 600 V:

```text
P_brake = V_dc^2 / R_brake
R_brake = 20 ohms
```

---

## 4. Supercapacitor Bank Physics (Section 4)

### Energy & State of Charge (SoC):
```text
E_total = 0.5 * C_sc * V_sc^2
E_usable = 0.5 * C_sc * (V_max^2 - V_min^2)
SoC = ((V_sc^2 - V_min^2) / (V_max^2 - V_min^2)) * 100%
```

*Hand-calculated benchmark check:*
For C_sc = 15 F, V_min = 100 V, and V_max = 200 V:

```text
E_usable = 0.5 * 15 * (200^2 - 100^2)
         = 7.5 * 30,000
         = 225,000 joules

225,000 J / 3,600 s/h = 62.50 Wh
```

### Converter Power & Losses:
```text
I_sc = P_sc_term / V_sc
P_loss_ESR = I_sc^2 * ESR
P_loss_dcdc = abs(P_sc_term) - abs(P_sc_bus)
```

### Ideal Boost Converter Duty Cycle & Current Ripple:
```text
D_boost = 1 - (V_sc / V_dc)
delta_I = V_sc * D_boost / (L * f_sw)
```

### Maximum Theoretical Power at Efficiency eta

```text
P_max = eta * (1 - eta) * V_sc^2 / ESR
```

---

## 5. Energy Accounting & Validation Balance Checks (Section 9)

Energies are computed by integrating 1-second trapezoidal powers:
- **Grid Drawn**: E_grid = integral(P_grid dt)
- **Motoring DC Demand**: E_motoring_dc = integral(max(P_inv_dc, 0) dt)
- **Gross Regeneration**: E_regen_gross = integral(max(-P_inv_dc, 0) dt)
- **Captured into Supercap Path**: E_captured_bus = integral(max(-P_sc_bus, 0) dt)
- **Burned in Dynamic Brake**: E_brake = integral(P_brake dt)
- **Discharged from Supercap**: E_sc_out = integral(max(P_sc_bus, 0) dt)
- **Counterfactual Energy Saved**: E_saved = E_grid_baseline - E_grid_actual

### Automated Audit Check Gate:
Residual check computed per trip and per day:
```text
Residual_regen =
  abs(E_regen_gross - (E_captured_bus + E_brake + delta_E_Cdc))
  / max(E_regen_gross, E_captured_bus + E_brake)
```

> **Section 9 Mandatory Gate:** If Residual > 1.5%, the record is flagged with `DATA_QUALITY_WARNING` and immediately exposed on the UI alerts log.

---

## 6. Supercapacitor Health & Diagnostics (Section 10)

### Online Capacitance Estimation:
Filtered over stable current segments where absolute delta-V >= 1.0 V:

```text
C_est = integral(I_sc dt) / delta_V_sc
```

### Online ESR Estimation:
Computed at current step transients:
```text
ESR_est = delta_V_instant / delta_I_sc
```

### State of Health (SOH):
```text
SOH_C = (C_est / C_0) * 100%
SOH_ESR = (ESR_0 / ESR_est) * 100%
SOH_overall = min(SOH_C, SOH_ESR)
```

- **End-of-Life (EOL) Threshold**: SOH_C <= 80% or ESR_est >= 200% * ESR_0.

### Thermal Model & Arrhenius Aging Acceleration:
```text
T_sc = T_amb + R_th * I_rms^2 * ESR
A_T = 2 ^ ((T_sc - T_ref) / 10)
```
RUL confidence interval is computed based on nominal vs high thermal stress envelopes.
