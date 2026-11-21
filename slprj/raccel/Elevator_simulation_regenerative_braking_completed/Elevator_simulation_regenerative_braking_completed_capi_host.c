#include "Elevator_simulation_regenerative_braking_completed_capi_host.h"
static Elevator_simulation_regenerative_braking_completed_host_DataMapInfo_T root;
static int initialized = 0;
rtwCAPI_ModelMappingInfo *getRootMappingInfo()
{
    if (initialized == 0) {
        initialized = 1;
        Elevator_simulation_regenerative_braking_completed_host_InitializeDataMapInfo(&(root), "Elevator_simulation_regenerative_braking_completed");
    }
    return &root.mmi;
}

rtwCAPI_ModelMappingInfo *mexFunction(){return(getRootMappingInfo());}
