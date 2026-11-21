#ifndef Elevator_simulation_regenerative_braking_completed_h_
#define Elevator_simulation_regenerative_braking_completed_h_
#ifndef Elevator_simulation_regenerative_braking_completed_COMMON_INCLUDES_
#define Elevator_simulation_regenerative_braking_completed_COMMON_INCLUDES_
#include <stdlib.h>
#include "sl_AsyncioQueue/AsyncioQueueCAPI.h"
#include "rtwtypes.h"
#include "sigstream_rtw.h"
#include "simtarget/slSimTgtSigstreamRTW.h"
#include "simtarget/slSimTgtSlioCoreRTW.h"
#include "simtarget/slSimTgtSlioClientsRTW.h"
#include "simtarget/slSimTgtSlioSdiRTW.h"
#include "simstruc.h"
#include "fixedpoint.h"
#include "raccel.h"
#include "slsv_diagnostic_codegen_c_api.h"
#include "rt_logging_simtarget.h"
#include "rt_nonfinite.h"
#include "math.h"
#include "dt_info.h"
#include "ext_work.h"
#endif
#include "Elevator_simulation_regenerative_braking_completed_types.h"
#include "mwmathutil.h"
#include <stddef.h>
#include <string.h>
#include "rtw_modelmap_simtarget.h"
#include "rt_defines.h"
#include "rtGetInf.h"
#define MODEL_NAME Elevator_simulation_regenerative_braking_completed
#define NSAMPLE_TIMES (7) 
#define NINPUTS (0)       
#define NOUTPUTS (0)     
#define NBLOCKIO (174) 
#define NUM_ZC_EVENTS (0) 
#ifndef NCSTATES
#define NCSTATES (6)   
#elif NCSTATES != 6
#error Invalid specification of NCSTATES defined in compiler command
#endif
#ifndef rtmGetDataMapInfo
#define rtmGetDataMapInfo(rtm) (*rt_dataMapInfoPtr)
#endif
#ifndef rtmSetDataMapInfo
#define rtmSetDataMapInfo(rtm, val) (rt_dataMapInfoPtr = &val)
#endif
#ifndef IN_RACCEL_MAIN
#endif
typedef struct { real_T joejsm2kpt ; real_T d5ishk4lv4 ; } a5xzybuycy ;
typedef struct { int8_T l5bm5alxeg ; } e12slnkhyu ; typedef struct { real_T
ptjmq55jv0 ; real_T kbig2w2qac ; } psqqpxr13b ; typedef struct { int8_T
h3l41vmwcb ; } evniabwztj ; typedef struct { real_T gd1gfgj223 ; real_T
i2u55pdqf5 ; real_T j2wwau2vey ; real_T enrcaral0g ; real_T jqzrzvkzt2 ;
real_T eojjnu5s1b ; real_T mii0ikgqvt ; real_T ipmh1rxedp ; real_T bc5pfi0m51
; real_T nuw33nkxim ; real_T c5z0smyorf ; real_T iodai0sry3 ; real_T
b1gbc3g2ms ; real_T bd2pwt0zpm ; real_T dnmus53j0s ; real_T bj2hkloiiz ;
real_T n5cebzmqks ; real_T of4hoxdn1h ; real_T oljr3i5puy ; real_T dgjpqpaxpk
; real_T fl05xvf3yo ; real_T dsspvq3jdb ; real_T cms4on2eop ; real_T
ogqpb1d0pz ; real_T bzgwc2ta4e [ 3 ] ; real_T gidsxgrxvd ; real_T lchjoqexyv
; real_T noe15wrovy ; real_T fazj3ndmel ; real_T njchl14s1m ; real_T
efvpyzqwlb [ 35 ] ; real_T jlustkt3y3 [ 12 ] ; real_T dre2ckv2w3 ; real_T
bjkgrwjwqg ; real_T owdp2mb51n ; real_T i0ownzwuqu ; real_T og3igfr2fd [ 2 ]
; real_T pgrvf2xo3i [ 3 ] ; real_T grabky4xn0 [ 3 ] ; real_T m3cfwp1w24 ;
real_T ise20nezbf ; real_T peqwexkl5s [ 6 ] ; real_T bctx0ao4in ; real_T
j24ffi12oq ; real_T ge1yyds1vz ; real_T jyge54thmy ; real_T blrzsw5oto ;
real_T iija5q5xnc ; real_T exwu3ja3i4 [ 2 ] ; real_T dtcqvn1xs3 ; real_T
nvudvzcoyt ; real_T hrdriqb31a [ 3 ] ; real_T fdurbf5mi5 ; real_T mnmze1rbog
; real_T pziuobkcex ; real_T jkwn3cbtkm ; real_T fgorpktnxo [ 6 ] ; real_T
gkozpxevvq ; real_T ic0e4c1l4y ; real_T ml2sefegu2 ; real_T kaertic4vs ;
real_T nala1h3js1 ; real_T iceoppiebj ; real_T evb43tm4m1 ; real_T ejokhjwmed
; real_T axllzbkagp ; real_T cnge3yy5s3 ; real_T n4adxrvkfh ; real_T
fgzysnydst [ 6 ] ; real_T pao12cuzf2 ; real_T ol51wefaan ; real_T n2vsmjdxe2
; real_T pqsgd03wj2 ; real_T myqs2aik3n ; real_T n04u5qo1tm ; real_T
h3icrspvtr ; real_T mnghhdy5l0 ; real_T bykod0qu4f ; real_T e3eynypbko ;
real_T dtktgkrsze ; real_T lnidmsxuul ; real_T gdtqueucbx [ 2 ] ; real_T
ioc1syepte ; real_T f5snq0zyfb ; real_T lvvzxmaemb ; real_T hym0300qin ;
real_T g5va0ac1ol ; real_T ov0qirsdb2 ; real_T l3xvdmibgs ; real_T mmoqbgu13u
; real_T exta2fsaw0 ; real_T cpehl32sa3 ; real_T bb3eubvp4q ; real_T
djupxofhiz ; real_T nps0lwxvun ; real_T mm5erx32aq ; real_T pleidnllwk ;
real_T l000g2k1gs ; real_T ezx3bu4uvd ; real_T brmrtfeblf [ 3 ] ; real_T
bjfhztuafe [ 3 ] ; real_T kmfrvhzvbz ; real_T b2rlc3rhwb [ 6 ] ; real_T
fod101tebi ; real_T alab1keotz ; real_T pi3kmz41z0 ; real_T pjtynvcy22 ;
real_T gvpmls0ma1 ; real_T bnniy4me5c ; real_T j23lusay23 ; real_T bbzcafnddd
; real_T hpta0eitwr ; real_T evj5opibec ; real_T dnjkouop22 ; real_T
ni1lan1d44 ; real_T oa0jrjx000 [ 3 ] ; real_T gc2vziiwy3 [ 3 ] ; real_T
isazzfg0kd [ 3 ] ; real_T h4teqcuq50 [ 3 ] ; real_T j4tvbl4ieb ; real_T
nuykb4mbgh ; real_T cjyda1bfaq ; real_T j31sus5xqz ; real_T lue0a43mx3 ;
real_T i55hn5n1na ; real_T mefjiqxq2f ; real_T hn4d2u4cp1 ; real_T ovwclkcs2i
; real_T ifknoklefb ; real_T c05ngd5nou ; real_T g13szyzts1 ; real_T
ijxrykftkf [ 3 ] ; real_T m3gw0w4wwt [ 3 ] ; real_T ojdbh5sy1v [ 2 ] ; real_T
atb4035mez ; real_T papaznze2l ; real_T mf4wbumfgn ; real_T fwx1lxpao5 ;
real_T hywf1ncafp ; real_T l4kff3kwap ; real_T eim1ahimjk ; real_T a3azhi0byn
; real_T lwxhjjne3y ; real_T bi0j5ecyxs ; uint8_T camcwjwx5q ; uint8_T
f2qin0etd5 ; uint8_T mevbyb1sbj ; uint8_T fpqyxrpked ; uint8_T hklbihivc4 ;
uint8_T jnyxx5xrmx ; uint8_T cuaeuazkql ; uint8_T l2xmqajqh2 ; boolean_T
g1bg5y5c3u ; boolean_T e3grkf4opz ; boolean_T nvjzgycbxq [ 3 ] ; boolean_T
hvtwtii2yq ; boolean_T lzgujnt0u4 ; psqqpxr13b fczgughbiq ; a5xzybuycy
dfo2acc2c4 ; psqqpxr13b hd1xjtd4en ; a5xzybuycy mlgccg0kpg ; psqqpxr13b
li352fxpclf ; a5xzybuycy nvfgem2he0e ; } B ; typedef struct { real_T
czkrjsrqu2 ; real_T oxhk0qisel [ 2 ] ; real_T frvxza54w5 ; real_T mtv4xpwrce
; real_T osbryca5sh ; real_T gnflsizfgu [ 8 ] ; real_T g13snvfeoz ; real_T
iyiqu2mmdx ; real_T nctqs1xe4w [ 6 ] ; real_T fgu0pq1vvt ; real_T httsmjxz5q
; real_T o0i11mq33c ; real_T kdnofag0fj ; real_T nlij45njqc [ 6 ] ; real_T
f32dtil55r ; real_T ac4iux0dv2 ; real_T dkyi5zefqy ; real_T iyccx1krg1 ;
real_T lm1td153qi ; real_T mcbadezzwk ; real_T l3hp1zdnos ; real_T csftnsrhha
; real_T erazndiepj ; real_T ll10fivaqy ; real_T c30pktuq3i ; real_T
na2vjy0kek ; real_T ctgvdw0gij ; real_T m1ymsrrb22 ; real_T pv4y3oq2f0 ;
real_T jhvqtkhitv ; real_T hakqjnq5wi ; real_T jog1sylu4k ; real_T blgeiu2szl
; real_T i2hdbbcss5 ; real_T pplj0ur1i5 ; real_T dzw4ciekkn ; real_T
ols3d1ne4l ; real_T dsood53gdp ; real_T jznek0nyfd ; real_T lsiw4qoapx ;
real_T dln4wxq2lo ; real_T lk1m1g5em3 ; real_T bi2ugbg5y1 ; real_T pkheuytbjk
; real_T ayxs44uns4 [ 3 ] ; real_T m2lfbnmo3h [ 3 ] ; real_T ihe4rhg2xz ;
real_T kksqi0t4ru ; real_T cq1u0wmbih ; real_T bzaeauh02y ; struct { void *
AS ; void * BS ; void * CS ; void * DS ; void * DX_COL ; void * BD_COL ; void
* TMP1 ; void * TMP2 ; void * XTMP ; void * SWITCH_STATUS ; void *
SWITCH_STATUS_INIT ; void * SW_CHG ; void * G_STATE ; void * USWLAST ; void *
XKM12 ; void * XKP12 ; void * XLAST ; void * ULAST ; void * IDX_SW_CHG ; void
* Y_SWITCH ; void * SWITCH_TYPES ; void * IDX_OUT_SW ; void *
SWITCH_TOPO_SAVED_IDX ; void * SWITCH_MAP ; } botoszhepv ; struct { void * AS
; void * BS ; void * CS ; void * DS ; void * DX_COL ; void * BD_COL ; void *
TMP1 ; void * TMP2 ; void * XTMP ; void * SWITCH_STATUS ; void *
SWITCH_STATUS_INIT ; void * SW_CHG ; void * G_STATE ; void * USWLAST ; void *
XKM12 ; void * XKP12 ; void * XLAST ; void * ULAST ; void * IDX_SW_CHG ; void
* Y_SWITCH ; void * SWITCH_TYPES ; void * IDX_OUT_SW ; void *
SWITCH_TOPO_SAVED_IDX ; void * SWITCH_MAP ; } lgrw01kbbe ; struct { void *
LoggedData [ 2 ] ; } phtrkpphea ; struct { void * LoggedData ; } ad0cslu3w5 ;
struct { void * LoggedData ; } m4gz1bhjc3 ; struct { void * LoggedData [ 2 ]
; } bpxfa21us1 ; struct { void * LoggedData [ 5 ] ; } fjydvu3n54 ; struct {
void * LoggedData [ 5 ] ; } mcazbdfc2s ; struct { void * LoggedData [ 3 ] ; }
j22kygelq4 ; struct { void * LoggedData [ 2 ] ; } bb5knzxqym ; struct { void
* LoggedData [ 2 ] ; } jmzd0oy25y ; struct { void * AQHandles ; } ng5fksfjhb
; struct { void * AQHandles ; } hnsibxfmf0 ; struct { void * AQHandles ; }
h5fpzmcuwa ; struct { void * AQHandles ; } baclat3gdp ; struct { void *
AQHandles ; } cv3v30xvnp ; struct { void * AQHandles ; } dyi2osc10n ; struct
{ void * AQHandles ; } kwecrm4qsw ; struct { void * AQHandles ; } pkhp1je4fa
; struct { void * AQHandles ; } fc0lo13bog ; struct { void * AQHandles ; }
bidewd4wfz ; struct { void * AQHandles ; } ikrlcf1i5d ; struct { void *
AQHandles ; } na0apmjb2h ; struct { void * AQHandles ; } fsp2omfjvq ; struct
{ void * TimePtr ; void * DataPtr ; void * RSimInfoPtr ; } g4hd1bhdft ;
struct { void * AQHandles ; } i5mlytso40 ; struct { void * AQHandles ; }
azwfxt2qsv ; struct { void * AQHandles ; } ozahlhcekt ; struct { void *
AQHandles ; } ixa2q1154j ; struct { void * AQHandles ; } pveu0skkj0 ; struct
{ void * LoggedData [ 2 ] ; } ljprsnu3c1 ; struct { void * LoggedData [ 2 ] ;
} lmzbwbiuwr ; void * nrwvgxxmlf [ 2 ] ; struct { void * AQHandles ; }
kqbzefrrpk ; struct { void * AQHandles ; } mzvkuto3g1 ; struct { void *
AQHandles ; } izxn0am4wi ; struct { void * LoggedData [ 2 ] ; } bmaiw0snuq ;
struct { void * AQHandles ; } khuwzyzzwl ; struct { void * LoggedData [ 2 ] ;
} fbo2ypeh3b ; struct { void * LoggedData [ 2 ] ; } oa4tmpeavp ; void *
az24ws0ypm [ 2 ] ; void * muxtlhdswz [ 2 ] ; int32_T ho4fdvjvds ; int32_T
oy5lfujju0 ; int32_T n1uub1dlym ; int32_T aaxrqyikoo ; uint32_T d0p4mc2fkl ;
int_T djrnopdiyh [ 11 ] ; int_T oqm5cfbsf3 [ 11 ] ; struct { int_T PrevIndex
; } lnrsd34ui5 ; int_T in41mmafbd ; int_T h5nc14oryl ; int_T jprqbw3ryk ;
int_T hs5omzyzkw ; int_T fqugso0ii3 ; int8_T ioxt5tho3g ; int8_T jpopyetejp ;
int8_T jj4xceo33d ; int8_T kpxv5ipdov ; int8_T cvvxfhpwpw ; int8_T epfojukybg
; int8_T dpkw4xjlk2 ; int8_T nbpgjp4uuz ; int8_T al44xipz0f ; uint8_T
l2i2i2rtxk ; uint8_T lan2ffu431 ; uint8_T hxuu15plqq ; uint8_T mfnpsazirl ;
uint8_T fksok2owwe ; uint8_T b2gxkppbtq ; uint8_T alwpt4g5bj ; uint8_T
ch3tvis0kr ; uint8_T ci0d02vzwn ; uint8_T e3ivsxtixs ; uint8_T ffzcxdr11r ;
uint8_T goyqb3kdb4 ; boolean_T pgenmwnern ; boolean_T jjtyaikdlj ; boolean_T
fchn1gsn0w ; boolean_T bjh0ac3l2z [ 3 ] ; boolean_T p4iqbk2dai ; boolean_T
dfazwkfflc ; boolean_T ilyqwm1ap1 ; evniabwztj fczgughbiq ; e12slnkhyu
dfo2acc2c4 ; evniabwztj hd1xjtd4en ; e12slnkhyu mlgccg0kpg ; evniabwztj
li352fxpclf ; e12slnkhyu nvfgem2he0e ; } DW ; typedef struct { real_T
l4j31u3fnr ; real_T npmu24oflk ; real_T nkn2qwhy4e ; real_T gqxknreyr2 ;
real_T k44mwz0nbm ; real_T dvr4r5k5wx ; } X ; typedef struct { real_T
l4j31u3fnr ; real_T npmu24oflk ; real_T nkn2qwhy4e ; real_T gqxknreyr2 ;
real_T k44mwz0nbm ; real_T dvr4r5k5wx ; } XDot ; typedef struct { boolean_T
l4j31u3fnr ; boolean_T npmu24oflk ; boolean_T nkn2qwhy4e ; boolean_T
gqxknreyr2 ; boolean_T k44mwz0nbm ; boolean_T dvr4r5k5wx ; } XDis ; typedef
struct { real_T l4j31u3fnr ; real_T npmu24oflk ; real_T nkn2qwhy4e ; real_T
gqxknreyr2 ; real_T k44mwz0nbm ; real_T dvr4r5k5wx ; } CStateAbsTol ; typedef
struct { real_T l4j31u3fnr ; real_T npmu24oflk ; real_T nkn2qwhy4e ; real_T
gqxknreyr2 ; real_T k44mwz0nbm ; real_T dvr4r5k5wx ; } CXPtMin ; typedef
struct { real_T l4j31u3fnr ; real_T npmu24oflk ; real_T nkn2qwhy4e ; real_T
gqxknreyr2 ; real_T k44mwz0nbm ; real_T dvr4r5k5wx ; } CXPtMax ; typedef
struct { real_T jp0aukpo3m ; real_T jn0dw0mac1 ; real_T mncw1gnyli ; real_T
owg5xhn3ot ; real_T ecjtct1o3z ; real_T ppalf3f4l0 ; real_T kty2o3kgsh ;
real_T bcu3ctdl5z ; real_T jh2j5awxo2 ; real_T lznvwljarg ; real_T l2obgorgal
[ 3 ] ; } ZCV ; typedef struct { rtwCAPI_ModelMappingInfo mmi ; } DataMapInfo
; struct kmahfna1co_ { real_T dq_Y0 [ 2 ] ; } ; struct heusnru54h_ { real_T
dq_Y0 [ 2 ] ; } ; struct P_ { real_T G ; real_T Tgravity ; real_T eta ;
real_T r ; real_T sc_Pdead ; real_T sc_Plimit ; real_T sc_Vinit ; real_T
sc_Vmax ; real_T sc_Vmin ; real_T sc_dV ; real_T sc_enable ; real_T sc_kdis ;
real_T sc_tauV ; real_T PMSMCurrentControllerwithPreControl_ActFF ; real_T
AlphaBetaZerotodq0_Alignment ; real_T AlphaBetaZerotodq0_Alignment_i1kl5ispqb
; real_T AlphaBetaZerotodq0_Alignment_mzvaawi2s1 ; real_T
dq0toAlphaBetaZero_Alignment ; real_T dqVoltageLimiter_AxisPrio ; real_T
PMSMFieldOrientedControl_CtrlMode ; real_T VelocityController_CtrlType ;
real_T ThreePhaseSource_Frequency ; real_T DiscretePIDController_I ; real_T
DiscretePIDController1_I ; real_T DiscretePIDController2_I ; real_T
Discrete_Init ; real_T DiscretePIDController_InitialConditionForIntegrator ;
real_T DiscretePIDController2_InitialConditionForIntegrator ; real_T
DiscretePIDController1_InitialConditionForIntegrator ; real_T
LowPassFilterDiscreteorContinuous_K ; real_T PMSMFieldOrientedControl_Kaw_id
; real_T PMSMFieldOrientedControl_Kaw_iq ; real_T
PMSMFieldOrientedControl_Kaw_w ; real_T Discrete_Kd ; real_T
PMSMFieldOrientedControl_Ki_id ; real_T PMSMFieldOrientedControl_Ki_iq ;
real_T PMSMFieldOrientedControl_Ki_w ; real_T Discrete_Kp ; real_T
PMSMFieldOrientedControl_Kp_id ; real_T PMSMFieldOrientedControl_Kp_iq ;
real_T PMSMFieldOrientedControl_Kp_w ; real_T
PMSMCurrentControllerwithPreControl_LdMatrix [ 4 ] ; real_T
DiscretePIDController_LowerSaturationLimit ; real_T
DiscretePIDController2_LowerSaturationLimit ; real_T
DiscretePIDController1_LowerSaturationLimit ; real_T
PMSMCurrentControllerwithPreControl_LqMatrix [ 4 ] ; real_T
PWMGenerator2Level_MinMax [ 2 ] ; real_T DiscretePIDController_P ; real_T
DiscretePIDController2_P ; real_T DiscretePIDController1_P ; real_T
Discrete_Par_Limits [ 2 ] ; real_T BidirectionalDCDC_Plimit ; real_T
PMSMFieldOrientedControl_Pmax ; real_T LowPassFilterDiscreteorContinuous_T ;
real_T BidirectionalDCDC_Tc ; real_T PMSMFieldOrientedControl_Tmax ; real_T
PLL3ph_Ts ; real_T DiscretePIDController_UpperSaturationLimit ; real_T
DiscretePIDController2_UpperSaturationLimit ; real_T
DiscretePIDController1_UpperSaturationLimit ; real_T
PMSMFieldOrientedControl_Vdc_on ; real_T BidirectionalDCDC_Vinit ; real_T
PMSMFieldOrientedControl_Vnom ; real_T CompareToConstant_const ; real_T
CompareToConstant1_const ; real_T CompareToConstant_const_l05kh4e3vl ; real_T
CompareToConstant_const_no4lglbgui ; real_T
CompareToConstant1_const_mljgcv2nfv ; real_T
CompareToConstant_const_eejfefgp3g ; real_T
CompareToConstant_const_nako5zk1kh ; real_T
CompareToConstant_const_cnpx3vty3i ; real_T
CompareToConstant_const_a41xxjinl1 ; real_T
CompareToConstant1_const_kbqfk2g4xh ; real_T
CompareToConstant_const_itg5dh432d ; real_T
CompareToConstant1_const_obt2ptzkaq ; real_T BidirectionalDCDC_eff ; real_T
CoulombViscousFriction_gain ; real_T
PMSMCurrentControllerwithPreControl_idVect [ 2 ] ; real_T
LowPassFilterDiscreteorContinuous_init_option ; real_T
PMSMCurrentControllerwithPreControl_iqVect [ 2 ] ; real_T
CoulombViscousFriction_offset ; real_T PMSMFieldOrientedControl_p ; real_T
PMSMFieldOrientedControl_psim ; real_T
PMSMCurrentControllerwithPreControl_psimMatrix [ 4 ] ; real_T
div0protectabspoly_thresh ; real_T div0protectpoly_thresh ; real_T PIid_x0 ;
real_T PIiq_x0 ; real_T DiscretePIController_x0 ; real_T Switch1_Threshold ;
real_T Gain1_Gain ; real_T Gain1_Gain_e1kcccjcrx ; real_T Gain_Y0 ; real_T
Gain3_Gain [ 9 ] ; real_T Gain1_Gain_pgw40d0dpu ; real_T Integ4_gainval ;
real_T Integ4_IC ; real_T Toavoiddivisionbyzero_UpperSat ; real_T
Toavoiddivisionbyzero_LowerSat ; real_T SFunction_P1_Size [ 2 ] ; real_T
SFunction_P1 ; real_T SFunction_P2_Size [ 2 ] ; real_T SFunction_P2 ; real_T
SFunction_P3_Size [ 2 ] ; real_T SFunction_P3 ; real_T SFunction_P4_Size [ 2
] ; real_T SFunction_P4 ; real_T UnitDelay_InitialCondition ; real_T
UnitDelay1_InitialCondition ; real_T Integ4_gainval_i2uq4gh4z5 ; real_T
Integ4_IC_n5uwxcm1zx ; real_T Toavoiddivisionbyzero_UpperSat_h2clyjjzam ;
real_T Toavoiddivisionbyzero_LowerSat_gq3wudid0s ; real_T
SFunction_P1_Size_dikxdawu34 [ 2 ] ; real_T SFunction_P1_bwvdnlufrr ; real_T
SFunction_P2_Size_hhlecnb2p1 [ 2 ] ; real_T SFunction_P2_fdfqtmeqi1 ; real_T
SFunction_P3_Size_auvb2orkvf [ 2 ] ; real_T SFunction_P3_jrfahet5gz ; real_T
SFunction_P4_Size_oel0ktdubl [ 2 ] ; real_T SFunction_P4_lfwpx3vbig ; real_T
UnitDelay_InitialCondition_dyv3utjwtp ; real_T
UnitDelay1_InitialCondition_gyl235ydfl ; real_T Saturation_UpperSat ; real_T
Saturation_LowerSat ; real_T Constant_Value ; real_T
Constant_Value_ksu21vurxi ; real_T Gain1_Gain_ckg2xxoznp ; real_T
SignChange_Gain ; real_T SignChange_Gain_m4u0ykivqv ; real_T Gain_Gain ;
real_T Gain1_Gain_jd3a1vlyqd ; real_T radsrpm_Gain ; real_T
LookupTableidreference_tableData [ 12 ] ; real_T
LookupTableidreference_bp01Data [ 2 ] ; real_T
LookupTableidreference_bp02Data [ 3 ] ; real_T
LookupTableidreference_bp03Data [ 2 ] ; real_T
LookupTableiqreference_tableData [ 12 ] ; real_T
LookupTableiqreference_bp01Data [ 2 ] ; real_T
LookupTableiqreference_bp02Data [ 3 ] ; real_T
LookupTableiqreference_bp03Data [ 2 ] ; real_T SignChange_Gain_lrztv4fo3f ;
real_T Kv_w_Gain ; real_T SwitchingTimeCalculation_PWM ; real_T
SwitchingTimeCalculation_fsw ; real_T alpha_beta_Y0 [ 2 ] ; real_T
alpha_beta_Y0_fshoe22rdp [ 2 ] ; real_T Constant1_Value ; real_T
Constant1_Value_newat1yfrg ; real_T Constant1_Value_hjrbnfsssq ; real_T
Constant_Value_kbosulpz5x ; real_T DiscreteTimeIntegrator_gainval ; real_T
DiscreteTimeIntegrator_IC ; real_T Pmech_f_A ; real_T Pmech_f_C ; real_T
P_pos_sat_LowerSat ; real_T V_lo_guard_UpperSat ; real_T V_lo_guard_LowerSat
; real_T P_avail_sat_LowerSat ; real_T V_guard_UpperSat ; real_T
V_guard_LowerSat ; real_T Vdc_f_A ; real_T Vdc_f_C ; real_T Vdc_den_UpperSat
; real_T Vdc_den_LowerSat ; real_T Sign_Gain ; real_T Switch_Threshold ;
real_T StateSpace_AS_param [ 4 ] ; real_T StateSpace_BS_param [ 4 ] ; real_T
StateSpace_CS_param [ 6 ] ; real_T StateSpace_DS_param [ 6 ] ; real_T
StateSpace_X0_param [ 2 ] ; real_T DiscreteTimeIntegrator1_gainval ; real_T
DiscreteTimeIntegrator1_IC ; real_T DiscreteTimeIntegrator_gainval_piau0rtfar
; real_T DiscreteTimeIntegrator_IC_idry4mgxam ; real_T
DiscreteTimeIntegrator_gainval_n5evfd1nbt ; real_T
DiscreteTimeIntegrator_IC_aisehi35vg ; real_T SineWaveA_Amp ; real_T
SineWaveA_Bias ; real_T SineWaveA_Phase ; real_T SineWaveA_Hsin ; real_T
SineWaveA_HCos ; real_T SineWaveA_PSin ; real_T SineWaveA_PCos ; real_T
SineWaveB_Amp ; real_T SineWaveB_Bias ; real_T SineWaveB_Phase ; real_T
SineWaveB_Hsin ; real_T SineWaveB_HCos ; real_T SineWaveB_PSin ; real_T
SineWaveB_PCos ; real_T SineWaveC_Amp ; real_T SineWaveC_Bias ; real_T
SineWaveC_Phase ; real_T SineWaveC_Hsin ; real_T SineWaveC_HCos ; real_T
SineWaveC_PSin ; real_T SineWaveC_PCos ; real_T
StateSpace_AS_param_lvxy4dvlob [ 64 ] ; real_T StateSpace_BS_param_n5u50kw4hm
[ 144 ] ; real_T StateSpace_CS_param_he2ewuuumq [ 280 ] ; real_T
StateSpace_DS_param_bxzwdlnjgc [ 630 ] ; real_T
StateSpace_X0_param_doitlicmoe [ 8 ] ; real_T
DiscreteTimeIntegrator_gainval_gvwfrhfbsd ; real_T
DiscreteTimeIntegrator_IC_irqnbogikc ; real_T donotdeletethisgain_Gain ;
real_T donotdeletethisgain_Gain_k21rmynxy2 ; real_T
donotdeletethisgain_Gain_f5d5ptyytq ; real_T
donotdeletethisgain_Gain_gqkydrl2k5 ; real_T Kv1_Gain ; real_T
donotdeletethisgain_Gain_b4qri5doln ; real_T
donotdeletethisgain_Gain_p2exd1hiza ; real_T
donotdeletethisgain_Gain_djfsencc5r ; real_T Kv_Gain ; real_T
Integrator_gainval ; real_T Integrator_UpperSat ; real_T Integrator_LowerSat
; real_T Saturation_UpperSat_mltsd24vqu ; real_T
Saturation_LowerSat_korbspl4jx ; real_T u4_Value ; real_T uRon_Gain ; real_T
Switch_Threshold_ixldncj5y0 ; real_T Saturation_UpperSat_nkp5oqihte ; real_T
Saturation_LowerSat_cl51vvxw3f ; real_T UnitDelay_InitialCondition_g03hcxpgv4
; real_T Relay_YOn ; real_T Relay_YOff ; real_T Integrator_gainval_cjmgxsx12u
; real_T Saturation1_UpperSat ; real_T Saturation1_LowerSat ; real_T
Gain3_Gain_i03i3itukx [ 9 ] ; real_T Gain1_Gain_pnreo1akno ; real_T
Constant4_Value ; real_T Initial_Value ; real_T
DiscreteTimeIntegrator_gainval_blyysc5dpe ; real_T
Integrator_gainval_dl0oytay5v ; real_T Integrator_gainval_l42bmnx0vo ; real_T
Gain3_Gain_mxezdc4fd5 [ 9 ] ; real_T Gain3_Gain_efdgxgupsy ; real_T
Saturation2_UpperSat ; real_T Saturation2_LowerSat ; real_T Constant3_Value ;
real_T Constant4_Value_bdj5kxrq12 ; real_T uib1_Gain ; real_T
uDLookupTable_tableData [ 3 ] ; real_T uDLookupTable_bp01Data [ 3 ] ; real_T
Constant2_Value ; real_T Pgrid_kW_Gain ; real_T Pmech_signed_kW_Gain ; real_T
RT_Pmech_smooth_A ; real_T RT_Pmech_smooth_C ; real_T RT_Pgrid_kW_Gain ;
real_T donotdeletethisgain_Gain_gbvqyjpzyd ; real_T RT_E_stored_IC ; real_T
donotdeletethisgain_Gain_iudhp1jrww ; real_T u4_Value_hmscqxlm1h ; real_T
uRon_Gain_fs3aq1cqgp ; real_T Switch_Threshold_ps2c3gqdjk ; real_T
Saturation_UpperSat_e3jjwhi1nx ; real_T Saturation_LowerSat_cxzshjfmyy ;
real_T UnitDelay_InitialCondition_kounly3gb4 ; real_T ElevatorLoad_2wm_Gain ;
real_T ElevatorLoad_CoulombSat_UpperSat ; real_T
ElevatorLoad_CoulombSat_LowerSat ; real_T ElevatorLoad_Coulomb_Gain ; real_T
ElevatorLoad_Viscous_Gain ; real_T ElevatorLoad_Switch_Threshold ; real_T
ElevatorSpeedProfile_Time0 [ 9 ] ; real_T ElevatorSpeedProfile_Data0 [ 9 ] ;
real_T SpeedRefRPMtorad_s_Gain ; real_T Switch_Threshold_gkntebraj1 ; real_T
UnitDelay_InitialCondition_emhh5ahwsc ; real_T Constant1_Value_cymondigcf ;
real_T Gain3_Gain_dq32hmgrq3 [ 9 ] ; real_T Gain1_Gain_nivhgiblbq ; real_T
Integ4_gainval_nfrrgdllgu ; real_T Integ4_IC_p0gdlghm1t ; real_T
Toavoiddivisionbyzero_UpperSat_irrobg0jvv ; real_T
Toavoiddivisionbyzero_LowerSat_nfx5ygwzx1 ; real_T
SFunction_P1_Size_cvgznbgehk [ 2 ] ; real_T SFunction_P1_i0ssspx4rl ; real_T
SFunction_P2_Size_br2p121aua [ 2 ] ; real_T SFunction_P2_iwg5nujsd5 ; real_T
SFunction_P3_Size_en5w14nyw5 [ 2 ] ; real_T SFunction_P3_a4a1lpzrd1 ; real_T
SFunction_P4_Size_nkc1imq5ka [ 2 ] ; real_T SFunction_P4_hgmzfb1iqh ; real_T
UnitDelay_InitialCondition_gmaavq0rzj ; real_T
UnitDelay1_InitialCondition_gqgzb4uhqd ; real_T DiscreteDerivative_DenCoef [
2 ] ; real_T DiscreteDerivative_InitialStates ; real_T
DiscreteTimeIntegrator_gainval_cgh1q05vnj ; real_T Gain10_Gain ; real_T
RateLimiter_RisingLim ; real_T RateLimiter_FallingLim ; real_T RateLimiter_IC
; real_T Delay_x1_InitialCondition ; real_T A11_Gain ; real_T
Delay_x2_InitialCondition ; real_T A12_Gain ; real_T A21_Gain ; real_T
A22_Gain ; real_T B11_Gain ; real_T B21_Gain ; real_T Duk_Gain ; real_T
C11_Gain ; real_T C12_Gain ; real_T upi_Value ; real_T Bias_Bias ; real_T
Constant_Value_c3vai5jsqj ; real_T Gain_Gain_akwbynhusw ; real_T idRef_Value
; real_T Saturation_UpperSat_hbwiybs0oo ; real_T
Zerocancellationomega_NumCoef ; real_T Zerocancellationomega_DenCoef ; real_T
Zerocancellationomega_InitialStates ; real_T
UnitDelay_InitialCondition_dfkae35qah ; real_T Constant_Value_bws0wfty3c ;
real_T Integrator_gainval_atj55rlttr ; real_T Integrator_UpperSat_aulekngxgt
; real_T Integrator_LowerSat_fdhyvwyxp1 ; real_T
Saturation_UpperSat_noyio4lrzt ; real_T Saturation_LowerSat_ia2dniekrc ;
real_T Switch_Threshold_krmt5bjjxx ; real_T Constant_Value_pmvvd3y2wy ;
real_T Switch_Threshold_drmfdrea15 ; real_T Zerocancellationid_NumCoef ;
real_T Zerocancellationid_DenCoef ; real_T Zerocancellationid_InitialStates ;
real_T Zerocancellationiq_NumCoef ; real_T Zerocancellationiq_DenCoef ;
real_T Zerocancellationiq_InitialStates ; real_T Zerovector_Value [ 2 ] ;
real_T Switch_Threshold_jg11ctcrkl ; real_T
UnitDelay_InitialCondition_l1eidbidp5 ; real_T Gain1_Gain_kpjrjjp3uh ; real_T
Integrator_gainval_ftjzyerrmh ; real_T Integrator_UpperSat_n42tihopxy ;
real_T Integrator_LowerSat_ljuxqxdaek ; real_T Saturation_UpperSat_gcvdrys55i
; real_T Saturation_LowerSat_dgyaeurq5r ; real_T
UnitDelay_InitialCondition_jcfzfvtnfm ; real_T Integrator_gainval_nksu5hhq2u
; real_T Integrator_UpperSat_a2endia25z ; real_T
Integrator_LowerSat_apqpahzewb ; real_T Saturation_UpperSat_dscw0rkrkm ;
real_T Saturation_LowerSat_ninhm1l2ps ; real_T Switch_Threshold_cojtdpwno4 ;
real_T Constant_Value_o1s5jol0sw ; real_T Gain1_Gain_itu5qbzzfu ; real_T
Initial_Value_g0morfp1je ; real_T DiscreteTimeIntegrator1_gainval_am2wtibabj
; real_T RateTransition_InitialCondition ; real_T
RateTransition1_InitialCondition ; real_T avoiddivisionby0_UpperSat ; real_T
avoiddivisionby0_LowerSat ; real_T RateTransition_InitialCondition_j4drwcia2s
; real_T Zerovector_Value_cgcqawijlq [ 6 ] ; real_T
Switch1_Threshold_fyhozkfkgx ; real_T UnitDelay_InitialCondition_gywqnnfmg0 ;
real_T uLd_Gain ; real_T Gain_Gain_i4wffd0t3a ; real_T LqLd_Gain ; real_T
RLd_Gain ; real_T uLq_Gain ; real_T LdLq_Gain ; real_T RLq_Gain ; real_T
lamLq_Gain ; real_T Gain2_Gain ; real_T RT_Pmech_kW_Gain ; real_T
RT_Psc_neg_kJ_Gain ; real_T Saturation_UpperSat_kgsauyxmr4 ; real_T
Saturation_LowerSat_dn3kql4ars ; real_T Gain1_Gain_azukdr5hyn ; real_T
Bias_Bias_l4jcgss0ip ; real_T donotdeletethisgain_Gain_jgrjhd4p0g ; real_T
donotdeletethisgain_Gain_n0i4leeeo2 ; real_T
donotdeletethisgain_Gain_gxbmu0w1w4 ; real_T
donotdeletethisgain_Gain_ioatcbnkag ; real_T
donotdeletethisgain_Gain_i1bz1pverl ; real_T
donotdeletethisgain_Gain_nbtnq2szrl ; real_T Kv1_Gain_a43nfqtr4y ; real_T
donotdeletethisgain_Gain_o3gsdhx5lc ; real_T
donotdeletethisgain_Gain_ncnnenb3f1 ; real_T
donotdeletethisgain_Gain_mfucidj2vp ; real_T Kv_Gain_njz1rsp3ke ; real_T
donotdeletethisgain_Gain_hvwjxmpgps ; real_T
donotdeletethisgain_Gain_e3aknl5vf1 ; real_T
donotdeletethisgain_Gain_hrqk42gvcp ; real_T Kv1_Gain_lmcteohw1y ; real_T
donotdeletethisgain_Gain_cbhc11x1wf ; real_T
donotdeletethisgain_Gain_nmfipmfqqh ; real_T
donotdeletethisgain_Gain_br2oiwwjcb ; real_T Kv_Gain_pry2unj2wl ; real_T
Constant_Value_l14ka0p31e ; real_T Constant_Value_cvd4wfu0cc ; real_T
Constant1_Value_k2xborxzay ; real_T Constant2_Value_p2fok1eut5 ; real_T
Constant1_Value_eh2zrr2jtp ; real_T Constant2_Value_if5wakvw33 ; real_T
Constant3_Value_pwsvvqm1ni ; real_T Constant4_Value_mhqy0c2chs ; real_T
Constant5_Value ; real_T Constant6_Value ; real_T Clamping_zero_Value ;
real_T Clamping_zero_Value_b520hs0g1c ; real_T Clamping_zero_Value_lg254ir0ab
; real_T Constant_Value_hcmhr1dgax ; real_T Constant1_Value_flfbts4xoq ;
real_T Constant2_Value_gzxkqo01ms ; real_T Constant3_Value_ap4whyny1j ;
real_T Gain1_Gain_f1zs40ibct ; uint32_T uDLookupTableLq_maxIndex [ 2 ] ;
uint32_T uDLookupTablePsim_maxIndex [ 2 ] ; uint32_T uDLookupTableLd_maxIndex
[ 2 ] ; uint32_T LookupTableidreference_maxIndex [ 3 ] ; uint32_T
LookupTableidreference_dimSizes [ 3 ] ; uint32_T
LookupTableiqreference_maxIndex [ 3 ] ; uint32_T
LookupTableiqreference_dimSizes [ 3 ] ; int8_T Constant_Value_iqyjzvo1m5 ;
int8_T Constant2_Value_ep0kaiviu2 ; int8_T Constant3_Value_jcxceri4f2 ;
int8_T Constant4_Value_la0q011rux ; int8_T Constant_Value_hp4xiqdi5o ; int8_T
Constant2_Value_dfp4a0fwww ; int8_T Constant3_Value_hktvo1ncsa ; int8_T
Constant4_Value_e53t4va44q ; int8_T Constant_Value_nqubhwd0zb ; int8_T
Constant2_Value_o3v1xwmzit ; int8_T Constant3_Value_f0bg5eu1qy ; int8_T
Constant4_Value_bncirhpahy ; uint8_T ManualSwitch_CurrentSetting ; heusnru54h
fczgughbiq ; kmahfna1co dfo2acc2c4 ; heusnru54h hd1xjtd4en ; kmahfna1co
mlgccg0kpg ; heusnru54h li352fxpclf ; kmahfna1co nvfgem2he0e ; } ; extern
const real_T Elevator_simulation_regenerative_braking_completed_RGND ; extern
const char_T * RT_MEMORY_ALLOCATION_ERROR ; extern B rtB ; extern X rtX ;
extern DW rtDW ; extern P rtP ; extern mxArray *
mr_Elevator_simulation_regenerative_braking_completed_GetDWork ( ) ; extern
void mr_Elevator_simulation_regenerative_braking_completed_SetDWork ( const
mxArray * ssDW ) ; extern mxArray *
 mr_Elevator_simulation_regenerative_braking_completed_GetSimStateDisallowedBlocks
( ) ; extern const rtwCAPI_ModelMappingStaticInfo *
Elevator_simulation_regenerative_braking_completed_GetCAPIStaticMap ( void )
; extern SimStruct * const rtS ; extern DataMapInfo * rt_dataMapInfoPtr ;
extern rtwCAPI_ModelMappingInfo * rt_modelMapInfoPtr ; void MdlOutputs ( int_T
tid ) ; void MdlOutputsParameterSampleTime ( int_T tid ) ; void MdlUpdate ( int_T tid ) ; void MdlTerminate ( void ) ; void MdlInitializeSizes ( void ) ; void MdlInitializeSampleTimes ( void ) ; SimStruct * raccel_register_model ( ssExecutionInfo * executionInfo ) ;
#endif
