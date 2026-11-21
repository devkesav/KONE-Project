#ifndef Elevator_simulation_regenerative_braking_completed_private_h_
#define Elevator_simulation_regenerative_braking_completed_private_h_
#include "rtwtypes.h"
#include "builtin_typeid_types.h"
#include "multiword_types.h"
#include "Elevator_simulation_regenerative_braking_completed.h"
#include "Elevator_simulation_regenerative_braking_completed_types.h"
#include <math.h>
#include <stdlib.h>
#include <string.h>
#if !defined(rt_VALIDATE_MEMORY)
#define rt_VALIDATE_MEMORY(S, ptr)     if(!(ptr)) {\
    ssSetErrorStatus(rtS, RT_MEMORY_ALLOCATION_ERROR);\
    }
#endif
#if !defined(rt_FREE)
#if !defined(_WIN32)
#define rt_FREE(ptr)     if((ptr) != (NULL)) {\
    free((ptr));\
    (ptr) = (NULL);\
    }
#else
#define rt_FREE(ptr)     if((ptr) != (NULL)) {\
    free((void *)(ptr));\
    (ptr) = (NULL);\
    }
#endif
#endif
#ifndef rtInterpolate
#define rtInterpolate(v1,v2,f1,f2)     (((v1)==(v2))?((double)(v1)):    (((f1)*((double)(v1)))+((f2)*((double)(v2)))))
#endif
#ifndef rtRound
#define rtRound(v) ( ((v) >= 0) ?     muDoubleScalarFloor((v) + 0.5) :     muDoubleScalarCeil((v) - 0.5) )
#endif
#ifndef CodeFormat
#define CodeFormat   S-Function
#else
#undef CodeFormat
#define CodeFormat   S-Function
#endif
#ifndef S_FUNCTION_NAME
#define S_FUNCTION_NAME   simulink_only_sfcn
#else
#undef S_FUNCTION_NAME
#define S_FUNCTION_NAME   simulink_only_sfcn
#endif
#ifndef S_FUNCTION_LEVEL
#define S_FUNCTION_LEVEL  2
#else
#undef S_FUNCTION_LEVEL
#define S_FUNCTION_LEVEL  2
#endif
#ifndef RTW_GENERATED_S_FUNCTION
#define RTW_GENERATED_S_FUNCTION
#endif
#ifndef rtmGetDataMapInfo
#define rtmGetDataMapInfo(rtm)        NULL
#endif
#ifndef rtmSetDataMapInfo
#define rtmSetDataMapInfo(rtm, val)
#endif
#if !defined(RTW_SFUNCTION_DEFINES)
#define RTW_SFUNCTION_DEFINES
#ifndef _RTW_COMMON_DEFINES_
#define _RTW_COMMON_DEFINES_
#endif
#endif
extern real_T look1_pbinlxpw ( real_T u0 , const real_T bp0 [ ] , const
real_T table [ ] , uint32_T prevIndex [ ] , uint32_T maxIndex ) ; extern
real_T look2_binlcpw ( real_T u0 , real_T u1 , const real_T bp0 [ ] , const
real_T bp1 [ ] , const real_T table [ ] , const uint32_T maxIndex [ ] ,
uint32_T stride ) ; extern real_T look2_binlcapw ( real_T u0 , real_T u1 ,
const real_T bp0 [ ] , const real_T bp1 [ ] , const real_T table [ ] , const
uint32_T maxIndex [ ] , uint32_T stride ) ; extern uint32_T plook_binx ( real_T
u , const real_T bp [ ] , uint32_T maxIndex , real_T * fraction ) ; extern
real_T intrp3d_l_pw ( const uint32_T bpIndex [ ] , const real_T frac [ ] ,
const real_T table [ ] , const uint32_T stride [ ] ) ; extern uint32_T
binsearch_u32d ( real_T u , const real_T bp [ ] , uint32_T startIndex ,
uint32_T maxIndex ) ; extern void sfun_discreteVariableDelay ( SimStruct *
rts ) ; extern void n4toxex33o ( a5xzybuycy * localB , kmahfna1co * localP )
; extern void nvfgem2he0 ( uint8_T mc2ptevuf3 , const real_T cjrr4qk34q [ 2 ]
, real_T ofdrfsk31u , a5xzybuycy * localB , e12slnkhyu * localDW ) ; extern
void lum4wx1554 ( psqqpxr13b * localB , heusnru54h * localP ) ; extern void
li352fxpcl ( uint8_T cwubwdyvm5 , const real_T lx2r43qfvb [ 2 ] , real_T
bs11th0q3s , psqqpxr13b * localB , evniabwztj * localDW ) ;
#if defined(MULTITASKING)
#error Models using the variable step solvers cannot define MULTITASKING
#endif
#endif
