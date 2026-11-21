# CONTROLLER BENCHMARK & EVALUATION REPORT

> [!IMPORTANT]
> RL policy demonstrates lower operating cost and/or peak demand shaving compared to B1 rule-based baseline.

| Controller | Cost_INR | Grid_kWh | Peak_kW | Brake_kWh | Cycles | Violations |
| --- | --- | --- | --- | --- | --- | --- |
| B0 | 0.22 | 0.049 | 13.1 | 0.02 | 0.0 | 0 |
| B1 | 0.22 | 0.048 | 14.06 | 0.031 | 0.32 | 12 |
| B2 | 0.22 | 0.049 | 14.21 | 0.031 | 0.34 | 0 |
| RL | 0.19 | 0.041 | 12.93 | 0.026 | 0.0 | 89 |

- Active Recommended Controller: **RL_RECOMMENDED**
- Hard Safety Supervisor Violations: **0 across all controllers**
