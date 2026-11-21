#ifndef Elevator_simulation_regenerative_braking_completed_types_h_
#define Elevator_simulation_regenerative_braking_completed_types_h_
#include "rtwtypes.h"
#ifndef DEFINED_TYPEDEF_FOR_struct_3rWjUg4qh0LaBgA7jvy4ZG_
#define DEFINED_TYPEDEF_FOR_struct_3rWjUg4qh0LaBgA7jvy4ZG_
typedef struct { real_T Fmin ; real_T Kp ; real_T Ki ; real_T Kd ; real_T TcD
; real_T Phase_Init ; real_T Finit ; real_T MaxRateChangeFreq ; real_T
FilterCutOffFreq ; real_T AGC ; } struct_3rWjUg4qh0LaBgA7jvy4ZG ;
#endif
#ifndef DEFINED_TYPEDEF_FOR_struct_DQdQbIkMWeV34kyS80SufH_
#define DEFINED_TYPEDEF_FOR_struct_DQdQbIkMWeV34kyS80SufH_
typedef struct { real_T Finit ; real_T Fmin ; real_T Real_Init ; real_T
Imag_Init ; } struct_DQdQbIkMWeV34kyS80SufH ;
#endif
#ifndef DEFINED_TYPEDEF_FOR_struct_HoP8yLzcyPntsMzdhyBscD_
#define DEFINED_TYPEDEF_FOR_struct_HoP8yLzcyPntsMzdhyBscD_
typedef struct { real_T Finit ; real_T Fmin ; real_T Vinit ; }
struct_HoP8yLzcyPntsMzdhyBscD ;
#endif
#ifndef DEFINED_TYPEDEF_FOR_struct_oelS3oJRN3v85ZyO6rQa7G_
#define DEFINED_TYPEDEF_FOR_struct_oelS3oJRN3v85ZyO6rQa7G_
typedef struct { real_T Phase ; real_T Freq ; real_T Period ; real_T time [ 4
] ; real_T Out [ 4 ] ; real_T Delay ; real_T TimeStepZ [ 2 ] ; }
struct_oelS3oJRN3v85ZyO6rQa7G ;
#endif
#ifndef DEFINED_TYPEDEF_FOR_struct_mXZe21Gy1Pfzl9UNCoQAHD_
#define DEFINED_TYPEDEF_FOR_struct_mXZe21Gy1Pfzl9UNCoQAHD_
typedef struct { real_T SwitchResistance [ 12 ] ; real_T SwitchVf [ 24 ] ;
real_T SwitchType [ 12 ] ; real_T SwitchGateInitialValue [ 12 ] ; real_T
EnableUseOfTLC ; real_T OutputsToResetToZero [ 12 ] ; real_T
NoErrorOnMaxIteration ; real_T Ts ; real_T Interpolate ; real_T SaveMatrices
; real_T BufferSize ; boolean_T TBEON ; uint8_T sl_padding0 [ 7 ] ; real_T A
[ 64 ] ; real_T B [ 144 ] ; real_T C [ 280 ] ; real_T D [ 630 ] ; real_T x0 [
8 ] ; } struct_mXZe21Gy1Pfzl9UNCoQAHD ;
#endif
#ifndef SS_UINT64
#define SS_UINT64 22
#endif
#ifndef SS_INT64
#define SS_INT64 23
#endif
typedef struct kmahfna1co_ kmahfna1co ; typedef struct heusnru54h_ heusnru54h
; typedef struct P_ P ;
#endif
