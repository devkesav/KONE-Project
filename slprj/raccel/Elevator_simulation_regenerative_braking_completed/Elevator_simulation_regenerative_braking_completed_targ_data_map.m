    function targMap = targDataMap(),

    ;%***********************
    ;% Create Parameter Map *
    ;%***********************
    
        nTotData      = 0; %add to this count as we go
        nTotSects     = 10;
        sectIdxOffset = 0;

        ;%
        ;% Define dummy sections & preallocate arrays
        ;%
        dumSection.nData = -1;
        dumSection.data  = [];

        dumData.logicalSrcIdx = -1;
        dumData.dtTransOffset = -1;

        ;%
        ;% Init/prealloc paramMap
        ;%
        paramMap.nSections           = nTotSects;
        paramMap.sectIdxOffset       = sectIdxOffset;
            paramMap.sections(nTotSects) = dumSection; %prealloc
        paramMap.nTotData            = -1;

        ;%
        ;% Auto data (rtP)
        ;%
            section.nData     = 413;
            section.data(413)  = dumData; %prealloc

                    ;% rtP.G
                    section.data(1).logicalSrcIdx = 0;
                    section.data(1).dtTransOffset = 0;

                    ;% rtP.Tgravity
                    section.data(2).logicalSrcIdx = 1;
                    section.data(2).dtTransOffset = 1;

                    ;% rtP.eta
                    section.data(3).logicalSrcIdx = 2;
                    section.data(3).dtTransOffset = 2;

                    ;% rtP.r
                    section.data(4).logicalSrcIdx = 3;
                    section.data(4).dtTransOffset = 3;

                    ;% rtP.sc_Pdead
                    section.data(5).logicalSrcIdx = 4;
                    section.data(5).dtTransOffset = 4;

                    ;% rtP.sc_Plimit
                    section.data(6).logicalSrcIdx = 5;
                    section.data(6).dtTransOffset = 5;

                    ;% rtP.sc_Vinit
                    section.data(7).logicalSrcIdx = 6;
                    section.data(7).dtTransOffset = 6;

                    ;% rtP.sc_Vmax
                    section.data(8).logicalSrcIdx = 7;
                    section.data(8).dtTransOffset = 7;

                    ;% rtP.sc_Vmin
                    section.data(9).logicalSrcIdx = 8;
                    section.data(9).dtTransOffset = 8;

                    ;% rtP.sc_dV
                    section.data(10).logicalSrcIdx = 9;
                    section.data(10).dtTransOffset = 9;

                    ;% rtP.sc_enable
                    section.data(11).logicalSrcIdx = 10;
                    section.data(11).dtTransOffset = 10;

                    ;% rtP.sc_kdis
                    section.data(12).logicalSrcIdx = 11;
                    section.data(12).dtTransOffset = 11;

                    ;% rtP.sc_tauV
                    section.data(13).logicalSrcIdx = 12;
                    section.data(13).dtTransOffset = 12;

                    ;% rtP.PMSMCurrentControllerwithPreControl_ActFF
                    section.data(14).logicalSrcIdx = 13;
                    section.data(14).dtTransOffset = 13;

                    ;% rtP.AlphaBetaZerotodq0_Alignment
                    section.data(15).logicalSrcIdx = 14;
                    section.data(15).dtTransOffset = 14;

                    ;% rtP.AlphaBetaZerotodq0_Alignment_i1kl5ispqb
                    section.data(16).logicalSrcIdx = 15;
                    section.data(16).dtTransOffset = 15;

                    ;% rtP.AlphaBetaZerotodq0_Alignment_mzvaawi2s1
                    section.data(17).logicalSrcIdx = 16;
                    section.data(17).dtTransOffset = 16;

                    ;% rtP.dq0toAlphaBetaZero_Alignment
                    section.data(18).logicalSrcIdx = 17;
                    section.data(18).dtTransOffset = 17;

                    ;% rtP.dqVoltageLimiter_AxisPrio
                    section.data(19).logicalSrcIdx = 18;
                    section.data(19).dtTransOffset = 18;

                    ;% rtP.PMSMFieldOrientedControl_CtrlMode
                    section.data(20).logicalSrcIdx = 19;
                    section.data(20).dtTransOffset = 19;

                    ;% rtP.VelocityController_CtrlType
                    section.data(21).logicalSrcIdx = 20;
                    section.data(21).dtTransOffset = 20;

                    ;% rtP.ThreePhaseSource_Frequency
                    section.data(22).logicalSrcIdx = 21;
                    section.data(22).dtTransOffset = 21;

                    ;% rtP.DiscretePIDController_I
                    section.data(23).logicalSrcIdx = 22;
                    section.data(23).dtTransOffset = 22;

                    ;% rtP.DiscretePIDController1_I
                    section.data(24).logicalSrcIdx = 23;
                    section.data(24).dtTransOffset = 23;

                    ;% rtP.DiscretePIDController2_I
                    section.data(25).logicalSrcIdx = 24;
                    section.data(25).dtTransOffset = 24;

                    ;% rtP.Discrete_Init
                    section.data(26).logicalSrcIdx = 25;
                    section.data(26).dtTransOffset = 25;

                    ;% rtP.DiscretePIDController_InitialConditionForIntegrator
                    section.data(27).logicalSrcIdx = 26;
                    section.data(27).dtTransOffset = 26;

                    ;% rtP.DiscretePIDController2_InitialConditionForIntegrator
                    section.data(28).logicalSrcIdx = 27;
                    section.data(28).dtTransOffset = 27;

                    ;% rtP.DiscretePIDController1_InitialConditionForIntegrator
                    section.data(29).logicalSrcIdx = 28;
                    section.data(29).dtTransOffset = 28;

                    ;% rtP.LowPassFilterDiscreteorContinuous_K
                    section.data(30).logicalSrcIdx = 29;
                    section.data(30).dtTransOffset = 29;

                    ;% rtP.PMSMFieldOrientedControl_Kaw_id
                    section.data(31).logicalSrcIdx = 30;
                    section.data(31).dtTransOffset = 30;

                    ;% rtP.PMSMFieldOrientedControl_Kaw_iq
                    section.data(32).logicalSrcIdx = 31;
                    section.data(32).dtTransOffset = 31;

                    ;% rtP.PMSMFieldOrientedControl_Kaw_w
                    section.data(33).logicalSrcIdx = 32;
                    section.data(33).dtTransOffset = 32;

                    ;% rtP.Discrete_Kd
                    section.data(34).logicalSrcIdx = 33;
                    section.data(34).dtTransOffset = 33;

                    ;% rtP.PMSMFieldOrientedControl_Ki_id
                    section.data(35).logicalSrcIdx = 34;
                    section.data(35).dtTransOffset = 34;

                    ;% rtP.PMSMFieldOrientedControl_Ki_iq
                    section.data(36).logicalSrcIdx = 35;
                    section.data(36).dtTransOffset = 35;

                    ;% rtP.PMSMFieldOrientedControl_Ki_w
                    section.data(37).logicalSrcIdx = 36;
                    section.data(37).dtTransOffset = 36;

                    ;% rtP.Discrete_Kp
                    section.data(38).logicalSrcIdx = 37;
                    section.data(38).dtTransOffset = 37;

                    ;% rtP.PMSMFieldOrientedControl_Kp_id
                    section.data(39).logicalSrcIdx = 38;
                    section.data(39).dtTransOffset = 38;

                    ;% rtP.PMSMFieldOrientedControl_Kp_iq
                    section.data(40).logicalSrcIdx = 39;
                    section.data(40).dtTransOffset = 39;

                    ;% rtP.PMSMFieldOrientedControl_Kp_w
                    section.data(41).logicalSrcIdx = 40;
                    section.data(41).dtTransOffset = 40;

                    ;% rtP.PMSMCurrentControllerwithPreControl_LdMatrix
                    section.data(42).logicalSrcIdx = 41;
                    section.data(42).dtTransOffset = 41;

                    ;% rtP.DiscretePIDController_LowerSaturationLimit
                    section.data(43).logicalSrcIdx = 42;
                    section.data(43).dtTransOffset = 45;

                    ;% rtP.DiscretePIDController2_LowerSaturationLimit
                    section.data(44).logicalSrcIdx = 43;
                    section.data(44).dtTransOffset = 46;

                    ;% rtP.DiscretePIDController1_LowerSaturationLimit
                    section.data(45).logicalSrcIdx = 44;
                    section.data(45).dtTransOffset = 47;

                    ;% rtP.PMSMCurrentControllerwithPreControl_LqMatrix
                    section.data(46).logicalSrcIdx = 45;
                    section.data(46).dtTransOffset = 48;

                    ;% rtP.PWMGenerator2Level_MinMax
                    section.data(47).logicalSrcIdx = 46;
                    section.data(47).dtTransOffset = 52;

                    ;% rtP.DiscretePIDController_P
                    section.data(48).logicalSrcIdx = 47;
                    section.data(48).dtTransOffset = 54;

                    ;% rtP.DiscretePIDController2_P
                    section.data(49).logicalSrcIdx = 48;
                    section.data(49).dtTransOffset = 55;

                    ;% rtP.DiscretePIDController1_P
                    section.data(50).logicalSrcIdx = 49;
                    section.data(50).dtTransOffset = 56;

                    ;% rtP.Discrete_Par_Limits
                    section.data(51).logicalSrcIdx = 50;
                    section.data(51).dtTransOffset = 57;

                    ;% rtP.BidirectionalDCDC_Plimit
                    section.data(52).logicalSrcIdx = 51;
                    section.data(52).dtTransOffset = 59;

                    ;% rtP.PMSMFieldOrientedControl_Pmax
                    section.data(53).logicalSrcIdx = 52;
                    section.data(53).dtTransOffset = 60;

                    ;% rtP.LowPassFilterDiscreteorContinuous_T
                    section.data(54).logicalSrcIdx = 53;
                    section.data(54).dtTransOffset = 61;

                    ;% rtP.BidirectionalDCDC_Tc
                    section.data(55).logicalSrcIdx = 54;
                    section.data(55).dtTransOffset = 62;

                    ;% rtP.PMSMFieldOrientedControl_Tmax
                    section.data(56).logicalSrcIdx = 55;
                    section.data(56).dtTransOffset = 63;

                    ;% rtP.PLL3ph_Ts
                    section.data(57).logicalSrcIdx = 56;
                    section.data(57).dtTransOffset = 64;

                    ;% rtP.DiscretePIDController_UpperSaturationLimit
                    section.data(58).logicalSrcIdx = 57;
                    section.data(58).dtTransOffset = 65;

                    ;% rtP.DiscretePIDController2_UpperSaturationLimit
                    section.data(59).logicalSrcIdx = 58;
                    section.data(59).dtTransOffset = 66;

                    ;% rtP.DiscretePIDController1_UpperSaturationLimit
                    section.data(60).logicalSrcIdx = 59;
                    section.data(60).dtTransOffset = 67;

                    ;% rtP.PMSMFieldOrientedControl_Vdc_on
                    section.data(61).logicalSrcIdx = 60;
                    section.data(61).dtTransOffset = 68;

                    ;% rtP.BidirectionalDCDC_Vinit
                    section.data(62).logicalSrcIdx = 61;
                    section.data(62).dtTransOffset = 69;

                    ;% rtP.PMSMFieldOrientedControl_Vnom
                    section.data(63).logicalSrcIdx = 62;
                    section.data(63).dtTransOffset = 70;

                    ;% rtP.CompareToConstant_const
                    section.data(64).logicalSrcIdx = 63;
                    section.data(64).dtTransOffset = 71;

                    ;% rtP.CompareToConstant1_const
                    section.data(65).logicalSrcIdx = 64;
                    section.data(65).dtTransOffset = 72;

                    ;% rtP.CompareToConstant_const_l05kh4e3vl
                    section.data(66).logicalSrcIdx = 65;
                    section.data(66).dtTransOffset = 73;

                    ;% rtP.CompareToConstant_const_no4lglbgui
                    section.data(67).logicalSrcIdx = 66;
                    section.data(67).dtTransOffset = 74;

                    ;% rtP.CompareToConstant1_const_mljgcv2nfv
                    section.data(68).logicalSrcIdx = 67;
                    section.data(68).dtTransOffset = 75;

                    ;% rtP.CompareToConstant_const_eejfefgp3g
                    section.data(69).logicalSrcIdx = 68;
                    section.data(69).dtTransOffset = 76;

                    ;% rtP.CompareToConstant_const_nako5zk1kh
                    section.data(70).logicalSrcIdx = 69;
                    section.data(70).dtTransOffset = 77;

                    ;% rtP.CompareToConstant_const_cnpx3vty3i
                    section.data(71).logicalSrcIdx = 70;
                    section.data(71).dtTransOffset = 78;

                    ;% rtP.CompareToConstant_const_a41xxjinl1
                    section.data(72).logicalSrcIdx = 71;
                    section.data(72).dtTransOffset = 79;

                    ;% rtP.CompareToConstant1_const_kbqfk2g4xh
                    section.data(73).logicalSrcIdx = 72;
                    section.data(73).dtTransOffset = 80;

                    ;% rtP.CompareToConstant_const_itg5dh432d
                    section.data(74).logicalSrcIdx = 73;
                    section.data(74).dtTransOffset = 81;

                    ;% rtP.CompareToConstant1_const_obt2ptzkaq
                    section.data(75).logicalSrcIdx = 74;
                    section.data(75).dtTransOffset = 82;

                    ;% rtP.BidirectionalDCDC_eff
                    section.data(76).logicalSrcIdx = 75;
                    section.data(76).dtTransOffset = 83;

                    ;% rtP.CoulombViscousFriction_gain
                    section.data(77).logicalSrcIdx = 76;
                    section.data(77).dtTransOffset = 84;

                    ;% rtP.PMSMCurrentControllerwithPreControl_idVect
                    section.data(78).logicalSrcIdx = 77;
                    section.data(78).dtTransOffset = 85;

                    ;% rtP.LowPassFilterDiscreteorContinuous_init_option
                    section.data(79).logicalSrcIdx = 78;
                    section.data(79).dtTransOffset = 87;

                    ;% rtP.PMSMCurrentControllerwithPreControl_iqVect
                    section.data(80).logicalSrcIdx = 79;
                    section.data(80).dtTransOffset = 88;

                    ;% rtP.CoulombViscousFriction_offset
                    section.data(81).logicalSrcIdx = 80;
                    section.data(81).dtTransOffset = 90;

                    ;% rtP.PMSMFieldOrientedControl_p
                    section.data(82).logicalSrcIdx = 81;
                    section.data(82).dtTransOffset = 91;

                    ;% rtP.PMSMFieldOrientedControl_psim
                    section.data(83).logicalSrcIdx = 82;
                    section.data(83).dtTransOffset = 92;

                    ;% rtP.PMSMCurrentControllerwithPreControl_psimMatrix
                    section.data(84).logicalSrcIdx = 83;
                    section.data(84).dtTransOffset = 93;

                    ;% rtP.div0protectabspoly_thresh
                    section.data(85).logicalSrcIdx = 84;
                    section.data(85).dtTransOffset = 97;

                    ;% rtP.div0protectpoly_thresh
                    section.data(86).logicalSrcIdx = 85;
                    section.data(86).dtTransOffset = 98;

                    ;% rtP.PIid_x0
                    section.data(87).logicalSrcIdx = 86;
                    section.data(87).dtTransOffset = 99;

                    ;% rtP.PIiq_x0
                    section.data(88).logicalSrcIdx = 87;
                    section.data(88).dtTransOffset = 100;

                    ;% rtP.DiscretePIController_x0
                    section.data(89).logicalSrcIdx = 88;
                    section.data(89).dtTransOffset = 101;

                    ;% rtP.Switch1_Threshold
                    section.data(90).logicalSrcIdx = 89;
                    section.data(90).dtTransOffset = 102;

                    ;% rtP.Gain1_Gain
                    section.data(91).logicalSrcIdx = 90;
                    section.data(91).dtTransOffset = 103;

                    ;% rtP.Gain1_Gain_e1kcccjcrx
                    section.data(92).logicalSrcIdx = 91;
                    section.data(92).dtTransOffset = 104;

                    ;% rtP.Gain_Y0
                    section.data(93).logicalSrcIdx = 92;
                    section.data(93).dtTransOffset = 105;

                    ;% rtP.Gain3_Gain
                    section.data(94).logicalSrcIdx = 93;
                    section.data(94).dtTransOffset = 106;

                    ;% rtP.Gain1_Gain_pgw40d0dpu
                    section.data(95).logicalSrcIdx = 94;
                    section.data(95).dtTransOffset = 115;

                    ;% rtP.Integ4_gainval
                    section.data(96).logicalSrcIdx = 95;
                    section.data(96).dtTransOffset = 116;

                    ;% rtP.Integ4_IC
                    section.data(97).logicalSrcIdx = 96;
                    section.data(97).dtTransOffset = 117;

                    ;% rtP.Toavoiddivisionbyzero_UpperSat
                    section.data(98).logicalSrcIdx = 97;
                    section.data(98).dtTransOffset = 118;

                    ;% rtP.Toavoiddivisionbyzero_LowerSat
                    section.data(99).logicalSrcIdx = 98;
                    section.data(99).dtTransOffset = 119;

                    ;% rtP.SFunction_P1_Size
                    section.data(100).logicalSrcIdx = 99;
                    section.data(100).dtTransOffset = 120;

                    ;% rtP.SFunction_P1
                    section.data(101).logicalSrcIdx = 100;
                    section.data(101).dtTransOffset = 122;

                    ;% rtP.SFunction_P2_Size
                    section.data(102).logicalSrcIdx = 101;
                    section.data(102).dtTransOffset = 123;

                    ;% rtP.SFunction_P2
                    section.data(103).logicalSrcIdx = 102;
                    section.data(103).dtTransOffset = 125;

                    ;% rtP.SFunction_P3_Size
                    section.data(104).logicalSrcIdx = 103;
                    section.data(104).dtTransOffset = 126;

                    ;% rtP.SFunction_P3
                    section.data(105).logicalSrcIdx = 104;
                    section.data(105).dtTransOffset = 128;

                    ;% rtP.SFunction_P4_Size
                    section.data(106).logicalSrcIdx = 105;
                    section.data(106).dtTransOffset = 129;

                    ;% rtP.SFunction_P4
                    section.data(107).logicalSrcIdx = 106;
                    section.data(107).dtTransOffset = 131;

                    ;% rtP.UnitDelay_InitialCondition
                    section.data(108).logicalSrcIdx = 107;
                    section.data(108).dtTransOffset = 132;

                    ;% rtP.UnitDelay1_InitialCondition
                    section.data(109).logicalSrcIdx = 108;
                    section.data(109).dtTransOffset = 133;

                    ;% rtP.Integ4_gainval_i2uq4gh4z5
                    section.data(110).logicalSrcIdx = 109;
                    section.data(110).dtTransOffset = 134;

                    ;% rtP.Integ4_IC_n5uwxcm1zx
                    section.data(111).logicalSrcIdx = 110;
                    section.data(111).dtTransOffset = 135;

                    ;% rtP.Toavoiddivisionbyzero_UpperSat_h2clyjjzam
                    section.data(112).logicalSrcIdx = 111;
                    section.data(112).dtTransOffset = 136;

                    ;% rtP.Toavoiddivisionbyzero_LowerSat_gq3wudid0s
                    section.data(113).logicalSrcIdx = 112;
                    section.data(113).dtTransOffset = 137;

                    ;% rtP.SFunction_P1_Size_dikxdawu34
                    section.data(114).logicalSrcIdx = 113;
                    section.data(114).dtTransOffset = 138;

                    ;% rtP.SFunction_P1_bwvdnlufrr
                    section.data(115).logicalSrcIdx = 114;
                    section.data(115).dtTransOffset = 140;

                    ;% rtP.SFunction_P2_Size_hhlecnb2p1
                    section.data(116).logicalSrcIdx = 115;
                    section.data(116).dtTransOffset = 141;

                    ;% rtP.SFunction_P2_fdfqtmeqi1
                    section.data(117).logicalSrcIdx = 116;
                    section.data(117).dtTransOffset = 143;

                    ;% rtP.SFunction_P3_Size_auvb2orkvf
                    section.data(118).logicalSrcIdx = 117;
                    section.data(118).dtTransOffset = 144;

                    ;% rtP.SFunction_P3_jrfahet5gz
                    section.data(119).logicalSrcIdx = 118;
                    section.data(119).dtTransOffset = 146;

                    ;% rtP.SFunction_P4_Size_oel0ktdubl
                    section.data(120).logicalSrcIdx = 119;
                    section.data(120).dtTransOffset = 147;

                    ;% rtP.SFunction_P4_lfwpx3vbig
                    section.data(121).logicalSrcIdx = 120;
                    section.data(121).dtTransOffset = 149;

                    ;% rtP.UnitDelay_InitialCondition_dyv3utjwtp
                    section.data(122).logicalSrcIdx = 121;
                    section.data(122).dtTransOffset = 150;

                    ;% rtP.UnitDelay1_InitialCondition_gyl235ydfl
                    section.data(123).logicalSrcIdx = 122;
                    section.data(123).dtTransOffset = 151;

                    ;% rtP.Saturation_UpperSat
                    section.data(124).logicalSrcIdx = 123;
                    section.data(124).dtTransOffset = 152;

                    ;% rtP.Saturation_LowerSat
                    section.data(125).logicalSrcIdx = 124;
                    section.data(125).dtTransOffset = 153;

                    ;% rtP.Constant_Value
                    section.data(126).logicalSrcIdx = 125;
                    section.data(126).dtTransOffset = 154;

                    ;% rtP.Constant_Value_ksu21vurxi
                    section.data(127).logicalSrcIdx = 126;
                    section.data(127).dtTransOffset = 155;

                    ;% rtP.Gain1_Gain_ckg2xxoznp
                    section.data(128).logicalSrcIdx = 127;
                    section.data(128).dtTransOffset = 156;

                    ;% rtP.SignChange_Gain
                    section.data(129).logicalSrcIdx = 128;
                    section.data(129).dtTransOffset = 157;

                    ;% rtP.SignChange_Gain_m4u0ykivqv
                    section.data(130).logicalSrcIdx = 129;
                    section.data(130).dtTransOffset = 158;

                    ;% rtP.Gain_Gain
                    section.data(131).logicalSrcIdx = 130;
                    section.data(131).dtTransOffset = 159;

                    ;% rtP.Gain1_Gain_jd3a1vlyqd
                    section.data(132).logicalSrcIdx = 131;
                    section.data(132).dtTransOffset = 160;

                    ;% rtP.radsrpm_Gain
                    section.data(133).logicalSrcIdx = 132;
                    section.data(133).dtTransOffset = 161;

                    ;% rtP.LookupTableidreference_tableData
                    section.data(134).logicalSrcIdx = 133;
                    section.data(134).dtTransOffset = 162;

                    ;% rtP.LookupTableidreference_bp01Data
                    section.data(135).logicalSrcIdx = 134;
                    section.data(135).dtTransOffset = 174;

                    ;% rtP.LookupTableidreference_bp02Data
                    section.data(136).logicalSrcIdx = 135;
                    section.data(136).dtTransOffset = 176;

                    ;% rtP.LookupTableidreference_bp03Data
                    section.data(137).logicalSrcIdx = 136;
                    section.data(137).dtTransOffset = 179;

                    ;% rtP.LookupTableiqreference_tableData
                    section.data(138).logicalSrcIdx = 137;
                    section.data(138).dtTransOffset = 181;

                    ;% rtP.LookupTableiqreference_bp01Data
                    section.data(139).logicalSrcIdx = 138;
                    section.data(139).dtTransOffset = 193;

                    ;% rtP.LookupTableiqreference_bp02Data
                    section.data(140).logicalSrcIdx = 139;
                    section.data(140).dtTransOffset = 195;

                    ;% rtP.LookupTableiqreference_bp03Data
                    section.data(141).logicalSrcIdx = 140;
                    section.data(141).dtTransOffset = 198;

                    ;% rtP.SignChange_Gain_lrztv4fo3f
                    section.data(142).logicalSrcIdx = 141;
                    section.data(142).dtTransOffset = 200;

                    ;% rtP.Kv_w_Gain
                    section.data(143).logicalSrcIdx = 142;
                    section.data(143).dtTransOffset = 201;

                    ;% rtP.SwitchingTimeCalculation_PWM
                    section.data(144).logicalSrcIdx = 143;
                    section.data(144).dtTransOffset = 202;

                    ;% rtP.SwitchingTimeCalculation_fsw
                    section.data(145).logicalSrcIdx = 144;
                    section.data(145).dtTransOffset = 203;

                    ;% rtP.alpha_beta_Y0
                    section.data(146).logicalSrcIdx = 145;
                    section.data(146).dtTransOffset = 204;

                    ;% rtP.alpha_beta_Y0_fshoe22rdp
                    section.data(147).logicalSrcIdx = 146;
                    section.data(147).dtTransOffset = 206;

                    ;% rtP.Constant1_Value
                    section.data(148).logicalSrcIdx = 147;
                    section.data(148).dtTransOffset = 208;

                    ;% rtP.Constant1_Value_newat1yfrg
                    section.data(149).logicalSrcIdx = 148;
                    section.data(149).dtTransOffset = 209;

                    ;% rtP.Constant1_Value_hjrbnfsssq
                    section.data(150).logicalSrcIdx = 149;
                    section.data(150).dtTransOffset = 210;

                    ;% rtP.Constant_Value_kbosulpz5x
                    section.data(151).logicalSrcIdx = 150;
                    section.data(151).dtTransOffset = 211;

                    ;% rtP.DiscreteTimeIntegrator_gainval
                    section.data(152).logicalSrcIdx = 151;
                    section.data(152).dtTransOffset = 212;

                    ;% rtP.DiscreteTimeIntegrator_IC
                    section.data(153).logicalSrcIdx = 152;
                    section.data(153).dtTransOffset = 213;

                    ;% rtP.Pmech_f_A
                    section.data(154).logicalSrcIdx = 153;
                    section.data(154).dtTransOffset = 214;

                    ;% rtP.Pmech_f_C
                    section.data(155).logicalSrcIdx = 154;
                    section.data(155).dtTransOffset = 215;

                    ;% rtP.P_pos_sat_LowerSat
                    section.data(156).logicalSrcIdx = 155;
                    section.data(156).dtTransOffset = 216;

                    ;% rtP.V_lo_guard_UpperSat
                    section.data(157).logicalSrcIdx = 156;
                    section.data(157).dtTransOffset = 217;

                    ;% rtP.V_lo_guard_LowerSat
                    section.data(158).logicalSrcIdx = 157;
                    section.data(158).dtTransOffset = 218;

                    ;% rtP.P_avail_sat_LowerSat
                    section.data(159).logicalSrcIdx = 158;
                    section.data(159).dtTransOffset = 219;

                    ;% rtP.V_guard_UpperSat
                    section.data(160).logicalSrcIdx = 159;
                    section.data(160).dtTransOffset = 220;

                    ;% rtP.V_guard_LowerSat
                    section.data(161).logicalSrcIdx = 160;
                    section.data(161).dtTransOffset = 221;

                    ;% rtP.Vdc_f_A
                    section.data(162).logicalSrcIdx = 161;
                    section.data(162).dtTransOffset = 222;

                    ;% rtP.Vdc_f_C
                    section.data(163).logicalSrcIdx = 162;
                    section.data(163).dtTransOffset = 223;

                    ;% rtP.Vdc_den_UpperSat
                    section.data(164).logicalSrcIdx = 163;
                    section.data(164).dtTransOffset = 224;

                    ;% rtP.Vdc_den_LowerSat
                    section.data(165).logicalSrcIdx = 164;
                    section.data(165).dtTransOffset = 225;

                    ;% rtP.Sign_Gain
                    section.data(166).logicalSrcIdx = 165;
                    section.data(166).dtTransOffset = 226;

                    ;% rtP.Switch_Threshold
                    section.data(167).logicalSrcIdx = 166;
                    section.data(167).dtTransOffset = 227;

                    ;% rtP.StateSpace_AS_param
                    section.data(168).logicalSrcIdx = 167;
                    section.data(168).dtTransOffset = 228;

                    ;% rtP.StateSpace_BS_param
                    section.data(169).logicalSrcIdx = 168;
                    section.data(169).dtTransOffset = 232;

                    ;% rtP.StateSpace_CS_param
                    section.data(170).logicalSrcIdx = 169;
                    section.data(170).dtTransOffset = 236;

                    ;% rtP.StateSpace_DS_param
                    section.data(171).logicalSrcIdx = 170;
                    section.data(171).dtTransOffset = 242;

                    ;% rtP.StateSpace_X0_param
                    section.data(172).logicalSrcIdx = 171;
                    section.data(172).dtTransOffset = 248;

                    ;% rtP.DiscreteTimeIntegrator1_gainval
                    section.data(173).logicalSrcIdx = 172;
                    section.data(173).dtTransOffset = 250;

                    ;% rtP.DiscreteTimeIntegrator1_IC
                    section.data(174).logicalSrcIdx = 173;
                    section.data(174).dtTransOffset = 251;

                    ;% rtP.DiscreteTimeIntegrator_gainval_piau0rtfar
                    section.data(175).logicalSrcIdx = 174;
                    section.data(175).dtTransOffset = 252;

                    ;% rtP.DiscreteTimeIntegrator_IC_idry4mgxam
                    section.data(176).logicalSrcIdx = 175;
                    section.data(176).dtTransOffset = 253;

                    ;% rtP.DiscreteTimeIntegrator_gainval_n5evfd1nbt
                    section.data(177).logicalSrcIdx = 176;
                    section.data(177).dtTransOffset = 254;

                    ;% rtP.DiscreteTimeIntegrator_IC_aisehi35vg
                    section.data(178).logicalSrcIdx = 177;
                    section.data(178).dtTransOffset = 255;

                    ;% rtP.SineWaveA_Amp
                    section.data(179).logicalSrcIdx = 178;
                    section.data(179).dtTransOffset = 256;

                    ;% rtP.SineWaveA_Bias
                    section.data(180).logicalSrcIdx = 179;
                    section.data(180).dtTransOffset = 257;

                    ;% rtP.SineWaveA_Phase
                    section.data(181).logicalSrcIdx = 180;
                    section.data(181).dtTransOffset = 258;

                    ;% rtP.SineWaveA_Hsin
                    section.data(182).logicalSrcIdx = 181;
                    section.data(182).dtTransOffset = 259;

                    ;% rtP.SineWaveA_HCos
                    section.data(183).logicalSrcIdx = 182;
                    section.data(183).dtTransOffset = 260;

                    ;% rtP.SineWaveA_PSin
                    section.data(184).logicalSrcIdx = 183;
                    section.data(184).dtTransOffset = 261;

                    ;% rtP.SineWaveA_PCos
                    section.data(185).logicalSrcIdx = 184;
                    section.data(185).dtTransOffset = 262;

                    ;% rtP.SineWaveB_Amp
                    section.data(186).logicalSrcIdx = 185;
                    section.data(186).dtTransOffset = 263;

                    ;% rtP.SineWaveB_Bias
                    section.data(187).logicalSrcIdx = 186;
                    section.data(187).dtTransOffset = 264;

                    ;% rtP.SineWaveB_Phase
                    section.data(188).logicalSrcIdx = 187;
                    section.data(188).dtTransOffset = 265;

                    ;% rtP.SineWaveB_Hsin
                    section.data(189).logicalSrcIdx = 188;
                    section.data(189).dtTransOffset = 266;

                    ;% rtP.SineWaveB_HCos
                    section.data(190).logicalSrcIdx = 189;
                    section.data(190).dtTransOffset = 267;

                    ;% rtP.SineWaveB_PSin
                    section.data(191).logicalSrcIdx = 190;
                    section.data(191).dtTransOffset = 268;

                    ;% rtP.SineWaveB_PCos
                    section.data(192).logicalSrcIdx = 191;
                    section.data(192).dtTransOffset = 269;

                    ;% rtP.SineWaveC_Amp
                    section.data(193).logicalSrcIdx = 192;
                    section.data(193).dtTransOffset = 270;

                    ;% rtP.SineWaveC_Bias
                    section.data(194).logicalSrcIdx = 193;
                    section.data(194).dtTransOffset = 271;

                    ;% rtP.SineWaveC_Phase
                    section.data(195).logicalSrcIdx = 194;
                    section.data(195).dtTransOffset = 272;

                    ;% rtP.SineWaveC_Hsin
                    section.data(196).logicalSrcIdx = 195;
                    section.data(196).dtTransOffset = 273;

                    ;% rtP.SineWaveC_HCos
                    section.data(197).logicalSrcIdx = 196;
                    section.data(197).dtTransOffset = 274;

                    ;% rtP.SineWaveC_PSin
                    section.data(198).logicalSrcIdx = 197;
                    section.data(198).dtTransOffset = 275;

                    ;% rtP.SineWaveC_PCos
                    section.data(199).logicalSrcIdx = 198;
                    section.data(199).dtTransOffset = 276;

                    ;% rtP.StateSpace_AS_param_lvxy4dvlob
                    section.data(200).logicalSrcIdx = 199;
                    section.data(200).dtTransOffset = 277;

                    ;% rtP.StateSpace_BS_param_n5u50kw4hm
                    section.data(201).logicalSrcIdx = 200;
                    section.data(201).dtTransOffset = 341;

                    ;% rtP.StateSpace_CS_param_he2ewuuumq
                    section.data(202).logicalSrcIdx = 201;
                    section.data(202).dtTransOffset = 485;

                    ;% rtP.StateSpace_DS_param_bxzwdlnjgc
                    section.data(203).logicalSrcIdx = 202;
                    section.data(203).dtTransOffset = 765;

                    ;% rtP.StateSpace_X0_param_doitlicmoe
                    section.data(204).logicalSrcIdx = 203;
                    section.data(204).dtTransOffset = 1395;

                    ;% rtP.DiscreteTimeIntegrator_gainval_gvwfrhfbsd
                    section.data(205).logicalSrcIdx = 204;
                    section.data(205).dtTransOffset = 1403;

                    ;% rtP.DiscreteTimeIntegrator_IC_irqnbogikc
                    section.data(206).logicalSrcIdx = 205;
                    section.data(206).dtTransOffset = 1404;

                    ;% rtP.donotdeletethisgain_Gain
                    section.data(207).logicalSrcIdx = 206;
                    section.data(207).dtTransOffset = 1405;

                    ;% rtP.donotdeletethisgain_Gain_k21rmynxy2
                    section.data(208).logicalSrcIdx = 207;
                    section.data(208).dtTransOffset = 1406;

                    ;% rtP.donotdeletethisgain_Gain_f5d5ptyytq
                    section.data(209).logicalSrcIdx = 208;
                    section.data(209).dtTransOffset = 1407;

                    ;% rtP.donotdeletethisgain_Gain_gqkydrl2k5
                    section.data(210).logicalSrcIdx = 209;
                    section.data(210).dtTransOffset = 1408;

                    ;% rtP.Kv1_Gain
                    section.data(211).logicalSrcIdx = 210;
                    section.data(211).dtTransOffset = 1409;

                    ;% rtP.donotdeletethisgain_Gain_b4qri5doln
                    section.data(212).logicalSrcIdx = 211;
                    section.data(212).dtTransOffset = 1410;

                    ;% rtP.donotdeletethisgain_Gain_p2exd1hiza
                    section.data(213).logicalSrcIdx = 212;
                    section.data(213).dtTransOffset = 1411;

                    ;% rtP.donotdeletethisgain_Gain_djfsencc5r
                    section.data(214).logicalSrcIdx = 213;
                    section.data(214).dtTransOffset = 1412;

                    ;% rtP.Kv_Gain
                    section.data(215).logicalSrcIdx = 214;
                    section.data(215).dtTransOffset = 1413;

                    ;% rtP.Integrator_gainval
                    section.data(216).logicalSrcIdx = 215;
                    section.data(216).dtTransOffset = 1414;

                    ;% rtP.Integrator_UpperSat
                    section.data(217).logicalSrcIdx = 216;
                    section.data(217).dtTransOffset = 1415;

                    ;% rtP.Integrator_LowerSat
                    section.data(218).logicalSrcIdx = 217;
                    section.data(218).dtTransOffset = 1416;

                    ;% rtP.Saturation_UpperSat_mltsd24vqu
                    section.data(219).logicalSrcIdx = 218;
                    section.data(219).dtTransOffset = 1417;

                    ;% rtP.Saturation_LowerSat_korbspl4jx
                    section.data(220).logicalSrcIdx = 219;
                    section.data(220).dtTransOffset = 1418;

                    ;% rtP.u4_Value
                    section.data(221).logicalSrcIdx = 220;
                    section.data(221).dtTransOffset = 1419;

                    ;% rtP.uRon_Gain
                    section.data(222).logicalSrcIdx = 221;
                    section.data(222).dtTransOffset = 1420;

                    ;% rtP.Switch_Threshold_ixldncj5y0
                    section.data(223).logicalSrcIdx = 222;
                    section.data(223).dtTransOffset = 1421;

                    ;% rtP.Saturation_UpperSat_nkp5oqihte
                    section.data(224).logicalSrcIdx = 223;
                    section.data(224).dtTransOffset = 1422;

                    ;% rtP.Saturation_LowerSat_cl51vvxw3f
                    section.data(225).logicalSrcIdx = 224;
                    section.data(225).dtTransOffset = 1423;

                    ;% rtP.UnitDelay_InitialCondition_g03hcxpgv4
                    section.data(226).logicalSrcIdx = 225;
                    section.data(226).dtTransOffset = 1424;

                    ;% rtP.Relay_YOn
                    section.data(227).logicalSrcIdx = 226;
                    section.data(227).dtTransOffset = 1425;

                    ;% rtP.Relay_YOff
                    section.data(228).logicalSrcIdx = 227;
                    section.data(228).dtTransOffset = 1426;

                    ;% rtP.Integrator_gainval_cjmgxsx12u
                    section.data(229).logicalSrcIdx = 228;
                    section.data(229).dtTransOffset = 1427;

                    ;% rtP.Saturation1_UpperSat
                    section.data(230).logicalSrcIdx = 229;
                    section.data(230).dtTransOffset = 1428;

                    ;% rtP.Saturation1_LowerSat
                    section.data(231).logicalSrcIdx = 230;
                    section.data(231).dtTransOffset = 1429;

                    ;% rtP.Gain3_Gain_i03i3itukx
                    section.data(232).logicalSrcIdx = 231;
                    section.data(232).dtTransOffset = 1430;

                    ;% rtP.Gain1_Gain_pnreo1akno
                    section.data(233).logicalSrcIdx = 232;
                    section.data(233).dtTransOffset = 1439;

                    ;% rtP.Constant4_Value
                    section.data(234).logicalSrcIdx = 233;
                    section.data(234).dtTransOffset = 1440;

                    ;% rtP.Initial_Value
                    section.data(235).logicalSrcIdx = 234;
                    section.data(235).dtTransOffset = 1441;

                    ;% rtP.DiscreteTimeIntegrator_gainval_blyysc5dpe
                    section.data(236).logicalSrcIdx = 235;
                    section.data(236).dtTransOffset = 1442;

                    ;% rtP.Integrator_gainval_dl0oytay5v
                    section.data(237).logicalSrcIdx = 236;
                    section.data(237).dtTransOffset = 1443;

                    ;% rtP.Integrator_gainval_l42bmnx0vo
                    section.data(238).logicalSrcIdx = 237;
                    section.data(238).dtTransOffset = 1444;

                    ;% rtP.Gain3_Gain_mxezdc4fd5
                    section.data(239).logicalSrcIdx = 238;
                    section.data(239).dtTransOffset = 1445;

                    ;% rtP.Gain3_Gain_efdgxgupsy
                    section.data(240).logicalSrcIdx = 239;
                    section.data(240).dtTransOffset = 1454;

                    ;% rtP.Saturation2_UpperSat
                    section.data(241).logicalSrcIdx = 240;
                    section.data(241).dtTransOffset = 1455;

                    ;% rtP.Saturation2_LowerSat
                    section.data(242).logicalSrcIdx = 241;
                    section.data(242).dtTransOffset = 1456;

                    ;% rtP.Constant3_Value
                    section.data(243).logicalSrcIdx = 242;
                    section.data(243).dtTransOffset = 1457;

                    ;% rtP.Constant4_Value_bdj5kxrq12
                    section.data(244).logicalSrcIdx = 243;
                    section.data(244).dtTransOffset = 1458;

                    ;% rtP.uib1_Gain
                    section.data(245).logicalSrcIdx = 244;
                    section.data(245).dtTransOffset = 1459;

                    ;% rtP.uDLookupTable_tableData
                    section.data(246).logicalSrcIdx = 245;
                    section.data(246).dtTransOffset = 1460;

                    ;% rtP.uDLookupTable_bp01Data
                    section.data(247).logicalSrcIdx = 246;
                    section.data(247).dtTransOffset = 1463;

                    ;% rtP.Constant2_Value
                    section.data(248).logicalSrcIdx = 247;
                    section.data(248).dtTransOffset = 1466;

                    ;% rtP.Pgrid_kW_Gain
                    section.data(249).logicalSrcIdx = 248;
                    section.data(249).dtTransOffset = 1467;

                    ;% rtP.Pmech_signed_kW_Gain
                    section.data(250).logicalSrcIdx = 249;
                    section.data(250).dtTransOffset = 1468;

                    ;% rtP.RT_Pmech_smooth_A
                    section.data(251).logicalSrcIdx = 250;
                    section.data(251).dtTransOffset = 1469;

                    ;% rtP.RT_Pmech_smooth_C
                    section.data(252).logicalSrcIdx = 251;
                    section.data(252).dtTransOffset = 1470;

                    ;% rtP.RT_Pgrid_kW_Gain
                    section.data(253).logicalSrcIdx = 252;
                    section.data(253).dtTransOffset = 1471;

                    ;% rtP.donotdeletethisgain_Gain_gbvqyjpzyd
                    section.data(254).logicalSrcIdx = 253;
                    section.data(254).dtTransOffset = 1472;

                    ;% rtP.RT_E_stored_IC
                    section.data(255).logicalSrcIdx = 254;
                    section.data(255).dtTransOffset = 1473;

                    ;% rtP.donotdeletethisgain_Gain_iudhp1jrww
                    section.data(256).logicalSrcIdx = 255;
                    section.data(256).dtTransOffset = 1474;

                    ;% rtP.u4_Value_hmscqxlm1h
                    section.data(257).logicalSrcIdx = 256;
                    section.data(257).dtTransOffset = 1475;

                    ;% rtP.uRon_Gain_fs3aq1cqgp
                    section.data(258).logicalSrcIdx = 257;
                    section.data(258).dtTransOffset = 1476;

                    ;% rtP.Switch_Threshold_ps2c3gqdjk
                    section.data(259).logicalSrcIdx = 258;
                    section.data(259).dtTransOffset = 1477;

                    ;% rtP.Saturation_UpperSat_e3jjwhi1nx
                    section.data(260).logicalSrcIdx = 259;
                    section.data(260).dtTransOffset = 1478;

                    ;% rtP.Saturation_LowerSat_cxzshjfmyy
                    section.data(261).logicalSrcIdx = 260;
                    section.data(261).dtTransOffset = 1479;

                    ;% rtP.UnitDelay_InitialCondition_kounly3gb4
                    section.data(262).logicalSrcIdx = 261;
                    section.data(262).dtTransOffset = 1480;

                    ;% rtP.ElevatorLoad_2wm_Gain
                    section.data(263).logicalSrcIdx = 262;
                    section.data(263).dtTransOffset = 1481;

                    ;% rtP.ElevatorLoad_CoulombSat_UpperSat
                    section.data(264).logicalSrcIdx = 263;
                    section.data(264).dtTransOffset = 1482;

                    ;% rtP.ElevatorLoad_CoulombSat_LowerSat
                    section.data(265).logicalSrcIdx = 264;
                    section.data(265).dtTransOffset = 1483;

                    ;% rtP.ElevatorLoad_Coulomb_Gain
                    section.data(266).logicalSrcIdx = 265;
                    section.data(266).dtTransOffset = 1484;

                    ;% rtP.ElevatorLoad_Viscous_Gain
                    section.data(267).logicalSrcIdx = 266;
                    section.data(267).dtTransOffset = 1485;

                    ;% rtP.ElevatorLoad_Switch_Threshold
                    section.data(268).logicalSrcIdx = 267;
                    section.data(268).dtTransOffset = 1486;

                    ;% rtP.ElevatorSpeedProfile_Time0
                    section.data(269).logicalSrcIdx = 268;
                    section.data(269).dtTransOffset = 1487;

                    ;% rtP.ElevatorSpeedProfile_Data0
                    section.data(270).logicalSrcIdx = 269;
                    section.data(270).dtTransOffset = 1496;

                    ;% rtP.SpeedRefRPMtorad_s_Gain
                    section.data(271).logicalSrcIdx = 270;
                    section.data(271).dtTransOffset = 1505;

                    ;% rtP.Switch_Threshold_gkntebraj1
                    section.data(272).logicalSrcIdx = 271;
                    section.data(272).dtTransOffset = 1506;

                    ;% rtP.UnitDelay_InitialCondition_emhh5ahwsc
                    section.data(273).logicalSrcIdx = 272;
                    section.data(273).dtTransOffset = 1507;

                    ;% rtP.Constant1_Value_cymondigcf
                    section.data(274).logicalSrcIdx = 273;
                    section.data(274).dtTransOffset = 1508;

                    ;% rtP.Gain3_Gain_dq32hmgrq3
                    section.data(275).logicalSrcIdx = 274;
                    section.data(275).dtTransOffset = 1509;

                    ;% rtP.Gain1_Gain_nivhgiblbq
                    section.data(276).logicalSrcIdx = 275;
                    section.data(276).dtTransOffset = 1518;

                    ;% rtP.Integ4_gainval_nfrrgdllgu
                    section.data(277).logicalSrcIdx = 276;
                    section.data(277).dtTransOffset = 1519;

                    ;% rtP.Integ4_IC_p0gdlghm1t
                    section.data(278).logicalSrcIdx = 277;
                    section.data(278).dtTransOffset = 1520;

                    ;% rtP.Toavoiddivisionbyzero_UpperSat_irrobg0jvv
                    section.data(279).logicalSrcIdx = 278;
                    section.data(279).dtTransOffset = 1521;

                    ;% rtP.Toavoiddivisionbyzero_LowerSat_nfx5ygwzx1
                    section.data(280).logicalSrcIdx = 279;
                    section.data(280).dtTransOffset = 1522;

                    ;% rtP.SFunction_P1_Size_cvgznbgehk
                    section.data(281).logicalSrcIdx = 280;
                    section.data(281).dtTransOffset = 1523;

                    ;% rtP.SFunction_P1_i0ssspx4rl
                    section.data(282).logicalSrcIdx = 281;
                    section.data(282).dtTransOffset = 1525;

                    ;% rtP.SFunction_P2_Size_br2p121aua
                    section.data(283).logicalSrcIdx = 282;
                    section.data(283).dtTransOffset = 1526;

                    ;% rtP.SFunction_P2_iwg5nujsd5
                    section.data(284).logicalSrcIdx = 283;
                    section.data(284).dtTransOffset = 1528;

                    ;% rtP.SFunction_P3_Size_en5w14nyw5
                    section.data(285).logicalSrcIdx = 284;
                    section.data(285).dtTransOffset = 1529;

                    ;% rtP.SFunction_P3_a4a1lpzrd1
                    section.data(286).logicalSrcIdx = 285;
                    section.data(286).dtTransOffset = 1531;

                    ;% rtP.SFunction_P4_Size_nkc1imq5ka
                    section.data(287).logicalSrcIdx = 286;
                    section.data(287).dtTransOffset = 1532;

                    ;% rtP.SFunction_P4_hgmzfb1iqh
                    section.data(288).logicalSrcIdx = 287;
                    section.data(288).dtTransOffset = 1534;

                    ;% rtP.UnitDelay_InitialCondition_gmaavq0rzj
                    section.data(289).logicalSrcIdx = 288;
                    section.data(289).dtTransOffset = 1535;

                    ;% rtP.UnitDelay1_InitialCondition_gqgzb4uhqd
                    section.data(290).logicalSrcIdx = 289;
                    section.data(290).dtTransOffset = 1536;

                    ;% rtP.DiscreteDerivative_DenCoef
                    section.data(291).logicalSrcIdx = 290;
                    section.data(291).dtTransOffset = 1537;

                    ;% rtP.DiscreteDerivative_InitialStates
                    section.data(292).logicalSrcIdx = 291;
                    section.data(292).dtTransOffset = 1539;

                    ;% rtP.DiscreteTimeIntegrator_gainval_cgh1q05vnj
                    section.data(293).logicalSrcIdx = 292;
                    section.data(293).dtTransOffset = 1540;

                    ;% rtP.Gain10_Gain
                    section.data(294).logicalSrcIdx = 293;
                    section.data(294).dtTransOffset = 1541;

                    ;% rtP.RateLimiter_RisingLim
                    section.data(295).logicalSrcIdx = 294;
                    section.data(295).dtTransOffset = 1542;

                    ;% rtP.RateLimiter_FallingLim
                    section.data(296).logicalSrcIdx = 295;
                    section.data(296).dtTransOffset = 1543;

                    ;% rtP.RateLimiter_IC
                    section.data(297).logicalSrcIdx = 296;
                    section.data(297).dtTransOffset = 1544;

                    ;% rtP.Delay_x1_InitialCondition
                    section.data(298).logicalSrcIdx = 297;
                    section.data(298).dtTransOffset = 1545;

                    ;% rtP.A11_Gain
                    section.data(299).logicalSrcIdx = 298;
                    section.data(299).dtTransOffset = 1546;

                    ;% rtP.Delay_x2_InitialCondition
                    section.data(300).logicalSrcIdx = 299;
                    section.data(300).dtTransOffset = 1547;

                    ;% rtP.A12_Gain
                    section.data(301).logicalSrcIdx = 300;
                    section.data(301).dtTransOffset = 1548;

                    ;% rtP.A21_Gain
                    section.data(302).logicalSrcIdx = 301;
                    section.data(302).dtTransOffset = 1549;

                    ;% rtP.A22_Gain
                    section.data(303).logicalSrcIdx = 302;
                    section.data(303).dtTransOffset = 1550;

                    ;% rtP.B11_Gain
                    section.data(304).logicalSrcIdx = 303;
                    section.data(304).dtTransOffset = 1551;

                    ;% rtP.B21_Gain
                    section.data(305).logicalSrcIdx = 304;
                    section.data(305).dtTransOffset = 1552;

                    ;% rtP.Duk_Gain
                    section.data(306).logicalSrcIdx = 305;
                    section.data(306).dtTransOffset = 1553;

                    ;% rtP.C11_Gain
                    section.data(307).logicalSrcIdx = 306;
                    section.data(307).dtTransOffset = 1554;

                    ;% rtP.C12_Gain
                    section.data(308).logicalSrcIdx = 307;
                    section.data(308).dtTransOffset = 1555;

                    ;% rtP.upi_Value
                    section.data(309).logicalSrcIdx = 308;
                    section.data(309).dtTransOffset = 1556;

                    ;% rtP.Bias_Bias
                    section.data(310).logicalSrcIdx = 309;
                    section.data(310).dtTransOffset = 1557;

                    ;% rtP.Constant_Value_c3vai5jsqj
                    section.data(311).logicalSrcIdx = 310;
                    section.data(311).dtTransOffset = 1558;

                    ;% rtP.Gain_Gain_akwbynhusw
                    section.data(312).logicalSrcIdx = 311;
                    section.data(312).dtTransOffset = 1559;

                    ;% rtP.idRef_Value
                    section.data(313).logicalSrcIdx = 312;
                    section.data(313).dtTransOffset = 1560;

                    ;% rtP.Saturation_UpperSat_hbwiybs0oo
                    section.data(314).logicalSrcIdx = 313;
                    section.data(314).dtTransOffset = 1561;

                    ;% rtP.Zerocancellationomega_NumCoef
                    section.data(315).logicalSrcIdx = 314;
                    section.data(315).dtTransOffset = 1562;

                    ;% rtP.Zerocancellationomega_DenCoef
                    section.data(316).logicalSrcIdx = 315;
                    section.data(316).dtTransOffset = 1563;

                    ;% rtP.Zerocancellationomega_InitialStates
                    section.data(317).logicalSrcIdx = 316;
                    section.data(317).dtTransOffset = 1564;

                    ;% rtP.UnitDelay_InitialCondition_dfkae35qah
                    section.data(318).logicalSrcIdx = 317;
                    section.data(318).dtTransOffset = 1565;

                    ;% rtP.Constant_Value_bws0wfty3c
                    section.data(319).logicalSrcIdx = 318;
                    section.data(319).dtTransOffset = 1566;

                    ;% rtP.Integrator_gainval_atj55rlttr
                    section.data(320).logicalSrcIdx = 319;
                    section.data(320).dtTransOffset = 1567;

                    ;% rtP.Integrator_UpperSat_aulekngxgt
                    section.data(321).logicalSrcIdx = 320;
                    section.data(321).dtTransOffset = 1568;

                    ;% rtP.Integrator_LowerSat_fdhyvwyxp1
                    section.data(322).logicalSrcIdx = 321;
                    section.data(322).dtTransOffset = 1569;

                    ;% rtP.Saturation_UpperSat_noyio4lrzt
                    section.data(323).logicalSrcIdx = 322;
                    section.data(323).dtTransOffset = 1570;

                    ;% rtP.Saturation_LowerSat_ia2dniekrc
                    section.data(324).logicalSrcIdx = 323;
                    section.data(324).dtTransOffset = 1571;

                    ;% rtP.Switch_Threshold_krmt5bjjxx
                    section.data(325).logicalSrcIdx = 324;
                    section.data(325).dtTransOffset = 1572;

                    ;% rtP.Constant_Value_pmvvd3y2wy
                    section.data(326).logicalSrcIdx = 325;
                    section.data(326).dtTransOffset = 1573;

                    ;% rtP.Switch_Threshold_drmfdrea15
                    section.data(327).logicalSrcIdx = 326;
                    section.data(327).dtTransOffset = 1574;

                    ;% rtP.Zerocancellationid_NumCoef
                    section.data(328).logicalSrcIdx = 327;
                    section.data(328).dtTransOffset = 1575;

                    ;% rtP.Zerocancellationid_DenCoef
                    section.data(329).logicalSrcIdx = 328;
                    section.data(329).dtTransOffset = 1576;

                    ;% rtP.Zerocancellationid_InitialStates
                    section.data(330).logicalSrcIdx = 329;
                    section.data(330).dtTransOffset = 1577;

                    ;% rtP.Zerocancellationiq_NumCoef
                    section.data(331).logicalSrcIdx = 330;
                    section.data(331).dtTransOffset = 1578;

                    ;% rtP.Zerocancellationiq_DenCoef
                    section.data(332).logicalSrcIdx = 331;
                    section.data(332).dtTransOffset = 1579;

                    ;% rtP.Zerocancellationiq_InitialStates
                    section.data(333).logicalSrcIdx = 332;
                    section.data(333).dtTransOffset = 1580;

                    ;% rtP.Zerovector_Value
                    section.data(334).logicalSrcIdx = 333;
                    section.data(334).dtTransOffset = 1581;

                    ;% rtP.Switch_Threshold_jg11ctcrkl
                    section.data(335).logicalSrcIdx = 334;
                    section.data(335).dtTransOffset = 1583;

                    ;% rtP.UnitDelay_InitialCondition_l1eidbidp5
                    section.data(336).logicalSrcIdx = 335;
                    section.data(336).dtTransOffset = 1584;

                    ;% rtP.Gain1_Gain_kpjrjjp3uh
                    section.data(337).logicalSrcIdx = 336;
                    section.data(337).dtTransOffset = 1585;

                    ;% rtP.Integrator_gainval_ftjzyerrmh
                    section.data(338).logicalSrcIdx = 337;
                    section.data(338).dtTransOffset = 1586;

                    ;% rtP.Integrator_UpperSat_n42tihopxy
                    section.data(339).logicalSrcIdx = 338;
                    section.data(339).dtTransOffset = 1587;

                    ;% rtP.Integrator_LowerSat_ljuxqxdaek
                    section.data(340).logicalSrcIdx = 339;
                    section.data(340).dtTransOffset = 1588;

                    ;% rtP.Saturation_UpperSat_gcvdrys55i
                    section.data(341).logicalSrcIdx = 340;
                    section.data(341).dtTransOffset = 1589;

                    ;% rtP.Saturation_LowerSat_dgyaeurq5r
                    section.data(342).logicalSrcIdx = 341;
                    section.data(342).dtTransOffset = 1590;

                    ;% rtP.UnitDelay_InitialCondition_jcfzfvtnfm
                    section.data(343).logicalSrcIdx = 342;
                    section.data(343).dtTransOffset = 1591;

                    ;% rtP.Integrator_gainval_nksu5hhq2u
                    section.data(344).logicalSrcIdx = 343;
                    section.data(344).dtTransOffset = 1592;

                    ;% rtP.Integrator_UpperSat_a2endia25z
                    section.data(345).logicalSrcIdx = 344;
                    section.data(345).dtTransOffset = 1593;

                    ;% rtP.Integrator_LowerSat_apqpahzewb
                    section.data(346).logicalSrcIdx = 345;
                    section.data(346).dtTransOffset = 1594;

                    ;% rtP.Saturation_UpperSat_dscw0rkrkm
                    section.data(347).logicalSrcIdx = 346;
                    section.data(347).dtTransOffset = 1595;

                    ;% rtP.Saturation_LowerSat_ninhm1l2ps
                    section.data(348).logicalSrcIdx = 347;
                    section.data(348).dtTransOffset = 1596;

                    ;% rtP.Switch_Threshold_cojtdpwno4
                    section.data(349).logicalSrcIdx = 348;
                    section.data(349).dtTransOffset = 1597;

                    ;% rtP.Constant_Value_o1s5jol0sw
                    section.data(350).logicalSrcIdx = 349;
                    section.data(350).dtTransOffset = 1598;

                    ;% rtP.Gain1_Gain_itu5qbzzfu
                    section.data(351).logicalSrcIdx = 350;
                    section.data(351).dtTransOffset = 1599;

                    ;% rtP.Initial_Value_g0morfp1je
                    section.data(352).logicalSrcIdx = 351;
                    section.data(352).dtTransOffset = 1600;

                    ;% rtP.DiscreteTimeIntegrator1_gainval_am2wtibabj
                    section.data(353).logicalSrcIdx = 352;
                    section.data(353).dtTransOffset = 1601;

                    ;% rtP.RateTransition_InitialCondition
                    section.data(354).logicalSrcIdx = 353;
                    section.data(354).dtTransOffset = 1602;

                    ;% rtP.RateTransition1_InitialCondition
                    section.data(355).logicalSrcIdx = 354;
                    section.data(355).dtTransOffset = 1603;

                    ;% rtP.avoiddivisionby0_UpperSat
                    section.data(356).logicalSrcIdx = 355;
                    section.data(356).dtTransOffset = 1604;

                    ;% rtP.avoiddivisionby0_LowerSat
                    section.data(357).logicalSrcIdx = 356;
                    section.data(357).dtTransOffset = 1605;

                    ;% rtP.RateTransition_InitialCondition_j4drwcia2s
                    section.data(358).logicalSrcIdx = 357;
                    section.data(358).dtTransOffset = 1606;

                    ;% rtP.Zerovector_Value_cgcqawijlq
                    section.data(359).logicalSrcIdx = 358;
                    section.data(359).dtTransOffset = 1607;

                    ;% rtP.Switch1_Threshold_fyhozkfkgx
                    section.data(360).logicalSrcIdx = 359;
                    section.data(360).dtTransOffset = 1613;

                    ;% rtP.UnitDelay_InitialCondition_gywqnnfmg0
                    section.data(361).logicalSrcIdx = 360;
                    section.data(361).dtTransOffset = 1614;

                    ;% rtP.uLd_Gain
                    section.data(362).logicalSrcIdx = 361;
                    section.data(362).dtTransOffset = 1615;

                    ;% rtP.Gain_Gain_i4wffd0t3a
                    section.data(363).logicalSrcIdx = 362;
                    section.data(363).dtTransOffset = 1616;

                    ;% rtP.LqLd_Gain
                    section.data(364).logicalSrcIdx = 363;
                    section.data(364).dtTransOffset = 1617;

                    ;% rtP.RLd_Gain
                    section.data(365).logicalSrcIdx = 364;
                    section.data(365).dtTransOffset = 1618;

                    ;% rtP.uLq_Gain
                    section.data(366).logicalSrcIdx = 365;
                    section.data(366).dtTransOffset = 1619;

                    ;% rtP.LdLq_Gain
                    section.data(367).logicalSrcIdx = 366;
                    section.data(367).dtTransOffset = 1620;

                    ;% rtP.RLq_Gain
                    section.data(368).logicalSrcIdx = 367;
                    section.data(368).dtTransOffset = 1621;

                    ;% rtP.lamLq_Gain
                    section.data(369).logicalSrcIdx = 368;
                    section.data(369).dtTransOffset = 1622;

                    ;% rtP.Gain2_Gain
                    section.data(370).logicalSrcIdx = 369;
                    section.data(370).dtTransOffset = 1623;

                    ;% rtP.RT_Pmech_kW_Gain
                    section.data(371).logicalSrcIdx = 370;
                    section.data(371).dtTransOffset = 1624;

                    ;% rtP.RT_Psc_neg_kJ_Gain
                    section.data(372).logicalSrcIdx = 371;
                    section.data(372).dtTransOffset = 1625;

                    ;% rtP.Saturation_UpperSat_kgsauyxmr4
                    section.data(373).logicalSrcIdx = 372;
                    section.data(373).dtTransOffset = 1626;

                    ;% rtP.Saturation_LowerSat_dn3kql4ars
                    section.data(374).logicalSrcIdx = 373;
                    section.data(374).dtTransOffset = 1627;

                    ;% rtP.Gain1_Gain_azukdr5hyn
                    section.data(375).logicalSrcIdx = 374;
                    section.data(375).dtTransOffset = 1628;

                    ;% rtP.Bias_Bias_l4jcgss0ip
                    section.data(376).logicalSrcIdx = 375;
                    section.data(376).dtTransOffset = 1629;

                    ;% rtP.donotdeletethisgain_Gain_jgrjhd4p0g
                    section.data(377).logicalSrcIdx = 376;
                    section.data(377).dtTransOffset = 1630;

                    ;% rtP.donotdeletethisgain_Gain_n0i4leeeo2
                    section.data(378).logicalSrcIdx = 377;
                    section.data(378).dtTransOffset = 1631;

                    ;% rtP.donotdeletethisgain_Gain_gxbmu0w1w4
                    section.data(379).logicalSrcIdx = 378;
                    section.data(379).dtTransOffset = 1632;

                    ;% rtP.donotdeletethisgain_Gain_ioatcbnkag
                    section.data(380).logicalSrcIdx = 379;
                    section.data(380).dtTransOffset = 1633;

                    ;% rtP.donotdeletethisgain_Gain_i1bz1pverl
                    section.data(381).logicalSrcIdx = 380;
                    section.data(381).dtTransOffset = 1634;

                    ;% rtP.donotdeletethisgain_Gain_nbtnq2szrl
                    section.data(382).logicalSrcIdx = 381;
                    section.data(382).dtTransOffset = 1635;

                    ;% rtP.Kv1_Gain_a43nfqtr4y
                    section.data(383).logicalSrcIdx = 382;
                    section.data(383).dtTransOffset = 1636;

                    ;% rtP.donotdeletethisgain_Gain_o3gsdhx5lc
                    section.data(384).logicalSrcIdx = 383;
                    section.data(384).dtTransOffset = 1637;

                    ;% rtP.donotdeletethisgain_Gain_ncnnenb3f1
                    section.data(385).logicalSrcIdx = 384;
                    section.data(385).dtTransOffset = 1638;

                    ;% rtP.donotdeletethisgain_Gain_mfucidj2vp
                    section.data(386).logicalSrcIdx = 385;
                    section.data(386).dtTransOffset = 1639;

                    ;% rtP.Kv_Gain_njz1rsp3ke
                    section.data(387).logicalSrcIdx = 386;
                    section.data(387).dtTransOffset = 1640;

                    ;% rtP.donotdeletethisgain_Gain_hvwjxmpgps
                    section.data(388).logicalSrcIdx = 387;
                    section.data(388).dtTransOffset = 1641;

                    ;% rtP.donotdeletethisgain_Gain_e3aknl5vf1
                    section.data(389).logicalSrcIdx = 388;
                    section.data(389).dtTransOffset = 1642;

                    ;% rtP.donotdeletethisgain_Gain_hrqk42gvcp
                    section.data(390).logicalSrcIdx = 389;
                    section.data(390).dtTransOffset = 1643;

                    ;% rtP.Kv1_Gain_lmcteohw1y
                    section.data(391).logicalSrcIdx = 390;
                    section.data(391).dtTransOffset = 1644;

                    ;% rtP.donotdeletethisgain_Gain_cbhc11x1wf
                    section.data(392).logicalSrcIdx = 391;
                    section.data(392).dtTransOffset = 1645;

                    ;% rtP.donotdeletethisgain_Gain_nmfipmfqqh
                    section.data(393).logicalSrcIdx = 392;
                    section.data(393).dtTransOffset = 1646;

                    ;% rtP.donotdeletethisgain_Gain_br2oiwwjcb
                    section.data(394).logicalSrcIdx = 393;
                    section.data(394).dtTransOffset = 1647;

                    ;% rtP.Kv_Gain_pry2unj2wl
                    section.data(395).logicalSrcIdx = 394;
                    section.data(395).dtTransOffset = 1648;

                    ;% rtP.Constant_Value_l14ka0p31e
                    section.data(396).logicalSrcIdx = 395;
                    section.data(396).dtTransOffset = 1649;

                    ;% rtP.Constant_Value_cvd4wfu0cc
                    section.data(397).logicalSrcIdx = 396;
                    section.data(397).dtTransOffset = 1650;

                    ;% rtP.Constant1_Value_k2xborxzay
                    section.data(398).logicalSrcIdx = 397;
                    section.data(398).dtTransOffset = 1651;

                    ;% rtP.Constant2_Value_p2fok1eut5
                    section.data(399).logicalSrcIdx = 398;
                    section.data(399).dtTransOffset = 1652;

                    ;% rtP.Constant1_Value_eh2zrr2jtp
                    section.data(400).logicalSrcIdx = 399;
                    section.data(400).dtTransOffset = 1653;

                    ;% rtP.Constant2_Value_if5wakvw33
                    section.data(401).logicalSrcIdx = 400;
                    section.data(401).dtTransOffset = 1654;

                    ;% rtP.Constant3_Value_pwsvvqm1ni
                    section.data(402).logicalSrcIdx = 401;
                    section.data(402).dtTransOffset = 1655;

                    ;% rtP.Constant4_Value_mhqy0c2chs
                    section.data(403).logicalSrcIdx = 402;
                    section.data(403).dtTransOffset = 1656;

                    ;% rtP.Constant5_Value
                    section.data(404).logicalSrcIdx = 403;
                    section.data(404).dtTransOffset = 1657;

                    ;% rtP.Constant6_Value
                    section.data(405).logicalSrcIdx = 404;
                    section.data(405).dtTransOffset = 1658;

                    ;% rtP.Clamping_zero_Value
                    section.data(406).logicalSrcIdx = 405;
                    section.data(406).dtTransOffset = 1659;

                    ;% rtP.Clamping_zero_Value_b520hs0g1c
                    section.data(407).logicalSrcIdx = 406;
                    section.data(407).dtTransOffset = 1660;

                    ;% rtP.Clamping_zero_Value_lg254ir0ab
                    section.data(408).logicalSrcIdx = 407;
                    section.data(408).dtTransOffset = 1661;

                    ;% rtP.Constant_Value_hcmhr1dgax
                    section.data(409).logicalSrcIdx = 408;
                    section.data(409).dtTransOffset = 1662;

                    ;% rtP.Constant1_Value_flfbts4xoq
                    section.data(410).logicalSrcIdx = 409;
                    section.data(410).dtTransOffset = 1663;

                    ;% rtP.Constant2_Value_gzxkqo01ms
                    section.data(411).logicalSrcIdx = 410;
                    section.data(411).dtTransOffset = 1664;

                    ;% rtP.Constant3_Value_ap4whyny1j
                    section.data(412).logicalSrcIdx = 411;
                    section.data(412).dtTransOffset = 1665;

                    ;% rtP.Gain1_Gain_f1zs40ibct
                    section.data(413).logicalSrcIdx = 412;
                    section.data(413).dtTransOffset = 1666;

            nTotData = nTotData + section.nData;
            paramMap.sections(1) = section;
            clear section

            section.nData     = 7;
            section.data(7)  = dumData; %prealloc

                    ;% rtP.uDLookupTableLq_maxIndex
                    section.data(1).logicalSrcIdx = 413;
                    section.data(1).dtTransOffset = 0;

                    ;% rtP.uDLookupTablePsim_maxIndex
                    section.data(2).logicalSrcIdx = 414;
                    section.data(2).dtTransOffset = 2;

                    ;% rtP.uDLookupTableLd_maxIndex
                    section.data(3).logicalSrcIdx = 415;
                    section.data(3).dtTransOffset = 4;

                    ;% rtP.LookupTableidreference_maxIndex
                    section.data(4).logicalSrcIdx = 416;
                    section.data(4).dtTransOffset = 6;

                    ;% rtP.LookupTableidreference_dimSizes
                    section.data(5).logicalSrcIdx = 417;
                    section.data(5).dtTransOffset = 9;

                    ;% rtP.LookupTableiqreference_maxIndex
                    section.data(6).logicalSrcIdx = 418;
                    section.data(6).dtTransOffset = 12;

                    ;% rtP.LookupTableiqreference_dimSizes
                    section.data(7).logicalSrcIdx = 419;
                    section.data(7).dtTransOffset = 15;

            nTotData = nTotData + section.nData;
            paramMap.sections(2) = section;
            clear section

            section.nData     = 12;
            section.data(12)  = dumData; %prealloc

                    ;% rtP.Constant_Value_iqyjzvo1m5
                    section.data(1).logicalSrcIdx = 420;
                    section.data(1).dtTransOffset = 0;

                    ;% rtP.Constant2_Value_ep0kaiviu2
                    section.data(2).logicalSrcIdx = 421;
                    section.data(2).dtTransOffset = 1;

                    ;% rtP.Constant3_Value_jcxceri4f2
                    section.data(3).logicalSrcIdx = 422;
                    section.data(3).dtTransOffset = 2;

                    ;% rtP.Constant4_Value_la0q011rux
                    section.data(4).logicalSrcIdx = 423;
                    section.data(4).dtTransOffset = 3;

                    ;% rtP.Constant_Value_hp4xiqdi5o
                    section.data(5).logicalSrcIdx = 424;
                    section.data(5).dtTransOffset = 4;

                    ;% rtP.Constant2_Value_dfp4a0fwww
                    section.data(6).logicalSrcIdx = 425;
                    section.data(6).dtTransOffset = 5;

                    ;% rtP.Constant3_Value_hktvo1ncsa
                    section.data(7).logicalSrcIdx = 426;
                    section.data(7).dtTransOffset = 6;

                    ;% rtP.Constant4_Value_e53t4va44q
                    section.data(8).logicalSrcIdx = 427;
                    section.data(8).dtTransOffset = 7;

                    ;% rtP.Constant_Value_nqubhwd0zb
                    section.data(9).logicalSrcIdx = 428;
                    section.data(9).dtTransOffset = 8;

                    ;% rtP.Constant2_Value_o3v1xwmzit
                    section.data(10).logicalSrcIdx = 429;
                    section.data(10).dtTransOffset = 9;

                    ;% rtP.Constant3_Value_f0bg5eu1qy
                    section.data(11).logicalSrcIdx = 430;
                    section.data(11).dtTransOffset = 10;

                    ;% rtP.Constant4_Value_bncirhpahy
                    section.data(12).logicalSrcIdx = 431;
                    section.data(12).dtTransOffset = 11;

            nTotData = nTotData + section.nData;
            paramMap.sections(3) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.ManualSwitch_CurrentSetting
                    section.data(1).logicalSrcIdx = 432;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(4) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.fczgughbiq.dq_Y0
                    section.data(1).logicalSrcIdx = 433;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(5) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.dfo2acc2c4.dq_Y0
                    section.data(1).logicalSrcIdx = 434;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(6) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.hd1xjtd4en.dq_Y0
                    section.data(1).logicalSrcIdx = 435;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(7) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.mlgccg0kpg.dq_Y0
                    section.data(1).logicalSrcIdx = 436;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(8) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.li352fxpclf.dq_Y0
                    section.data(1).logicalSrcIdx = 437;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(9) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtP.nvfgem2he0e.dq_Y0
                    section.data(1).logicalSrcIdx = 438;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            paramMap.sections(10) = section;
            clear section


            ;%
            ;% Non-auto Data (parameter)
            ;%


        ;%
        ;% Add final counts to struct.
        ;%
        paramMap.nTotData = nTotData;



    ;%**************************
    ;% Create Block Output Map *
    ;%**************************
    
        nTotData      = 0; %add to this count as we go
        nTotSects     = 9;
        sectIdxOffset = 0;

        ;%
        ;% Define dummy sections & preallocate arrays
        ;%
        dumSection.nData = -1;
        dumSection.data  = [];

        dumData.logicalSrcIdx = -1;
        dumData.dtTransOffset = -1;

        ;%
        ;% Init/prealloc sigMap
        ;%
        sigMap.nSections           = nTotSects;
        sigMap.sectIdxOffset       = sectIdxOffset;
            sigMap.sections(nTotSects) = dumSection; %prealloc
        sigMap.nTotData            = -1;

        ;%
        ;% Auto data (rtB)
        ;%
            section.nData     = 144;
            section.data(144)  = dumData; %prealloc

                    ;% rtB.gd1gfgj223
                    section.data(1).logicalSrcIdx = 0;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.i2u55pdqf5
                    section.data(2).logicalSrcIdx = 1;
                    section.data(2).dtTransOffset = 1;

                    ;% rtB.j2wwau2vey
                    section.data(3).logicalSrcIdx = 2;
                    section.data(3).dtTransOffset = 2;

                    ;% rtB.enrcaral0g
                    section.data(4).logicalSrcIdx = 3;
                    section.data(4).dtTransOffset = 3;

                    ;% rtB.jqzrzvkzt2
                    section.data(5).logicalSrcIdx = 4;
                    section.data(5).dtTransOffset = 4;

                    ;% rtB.eojjnu5s1b
                    section.data(6).logicalSrcIdx = 5;
                    section.data(6).dtTransOffset = 5;

                    ;% rtB.mii0ikgqvt
                    section.data(7).logicalSrcIdx = 6;
                    section.data(7).dtTransOffset = 6;

                    ;% rtB.ipmh1rxedp
                    section.data(8).logicalSrcIdx = 7;
                    section.data(8).dtTransOffset = 7;

                    ;% rtB.bc5pfi0m51
                    section.data(9).logicalSrcIdx = 8;
                    section.data(9).dtTransOffset = 8;

                    ;% rtB.nuw33nkxim
                    section.data(10).logicalSrcIdx = 9;
                    section.data(10).dtTransOffset = 9;

                    ;% rtB.c5z0smyorf
                    section.data(11).logicalSrcIdx = 10;
                    section.data(11).dtTransOffset = 10;

                    ;% rtB.iodai0sry3
                    section.data(12).logicalSrcIdx = 11;
                    section.data(12).dtTransOffset = 11;

                    ;% rtB.b1gbc3g2ms
                    section.data(13).logicalSrcIdx = 12;
                    section.data(13).dtTransOffset = 12;

                    ;% rtB.bd2pwt0zpm
                    section.data(14).logicalSrcIdx = 13;
                    section.data(14).dtTransOffset = 13;

                    ;% rtB.dnmus53j0s
                    section.data(15).logicalSrcIdx = 14;
                    section.data(15).dtTransOffset = 14;

                    ;% rtB.bj2hkloiiz
                    section.data(16).logicalSrcIdx = 15;
                    section.data(16).dtTransOffset = 15;

                    ;% rtB.n5cebzmqks
                    section.data(17).logicalSrcIdx = 16;
                    section.data(17).dtTransOffset = 16;

                    ;% rtB.of4hoxdn1h
                    section.data(18).logicalSrcIdx = 17;
                    section.data(18).dtTransOffset = 17;

                    ;% rtB.oljr3i5puy
                    section.data(19).logicalSrcIdx = 18;
                    section.data(19).dtTransOffset = 18;

                    ;% rtB.dgjpqpaxpk
                    section.data(20).logicalSrcIdx = 19;
                    section.data(20).dtTransOffset = 19;

                    ;% rtB.fl05xvf3yo
                    section.data(21).logicalSrcIdx = 20;
                    section.data(21).dtTransOffset = 20;

                    ;% rtB.dsspvq3jdb
                    section.data(22).logicalSrcIdx = 21;
                    section.data(22).dtTransOffset = 21;

                    ;% rtB.cms4on2eop
                    section.data(23).logicalSrcIdx = 22;
                    section.data(23).dtTransOffset = 22;

                    ;% rtB.ogqpb1d0pz
                    section.data(24).logicalSrcIdx = 23;
                    section.data(24).dtTransOffset = 23;

                    ;% rtB.bzgwc2ta4e
                    section.data(25).logicalSrcIdx = 24;
                    section.data(25).dtTransOffset = 24;

                    ;% rtB.gidsxgrxvd
                    section.data(26).logicalSrcIdx = 25;
                    section.data(26).dtTransOffset = 27;

                    ;% rtB.lchjoqexyv
                    section.data(27).logicalSrcIdx = 26;
                    section.data(27).dtTransOffset = 28;

                    ;% rtB.noe15wrovy
                    section.data(28).logicalSrcIdx = 27;
                    section.data(28).dtTransOffset = 29;

                    ;% rtB.fazj3ndmel
                    section.data(29).logicalSrcIdx = 28;
                    section.data(29).dtTransOffset = 30;

                    ;% rtB.njchl14s1m
                    section.data(30).logicalSrcIdx = 29;
                    section.data(30).dtTransOffset = 31;

                    ;% rtB.efvpyzqwlb
                    section.data(31).logicalSrcIdx = 30;
                    section.data(31).dtTransOffset = 32;

                    ;% rtB.jlustkt3y3
                    section.data(32).logicalSrcIdx = 31;
                    section.data(32).dtTransOffset = 67;

                    ;% rtB.dre2ckv2w3
                    section.data(33).logicalSrcIdx = 32;
                    section.data(33).dtTransOffset = 79;

                    ;% rtB.bjkgrwjwqg
                    section.data(34).logicalSrcIdx = 33;
                    section.data(34).dtTransOffset = 80;

                    ;% rtB.owdp2mb51n
                    section.data(35).logicalSrcIdx = 34;
                    section.data(35).dtTransOffset = 81;

                    ;% rtB.i0ownzwuqu
                    section.data(36).logicalSrcIdx = 35;
                    section.data(36).dtTransOffset = 82;

                    ;% rtB.og3igfr2fd
                    section.data(37).logicalSrcIdx = 36;
                    section.data(37).dtTransOffset = 83;

                    ;% rtB.pgrvf2xo3i
                    section.data(38).logicalSrcIdx = 37;
                    section.data(38).dtTransOffset = 85;

                    ;% rtB.grabky4xn0
                    section.data(39).logicalSrcIdx = 38;
                    section.data(39).dtTransOffset = 88;

                    ;% rtB.m3cfwp1w24
                    section.data(40).logicalSrcIdx = 39;
                    section.data(40).dtTransOffset = 91;

                    ;% rtB.ise20nezbf
                    section.data(41).logicalSrcIdx = 40;
                    section.data(41).dtTransOffset = 92;

                    ;% rtB.peqwexkl5s
                    section.data(42).logicalSrcIdx = 41;
                    section.data(42).dtTransOffset = 93;

                    ;% rtB.bctx0ao4in
                    section.data(43).logicalSrcIdx = 42;
                    section.data(43).dtTransOffset = 99;

                    ;% rtB.j24ffi12oq
                    section.data(44).logicalSrcIdx = 43;
                    section.data(44).dtTransOffset = 100;

                    ;% rtB.ge1yyds1vz
                    section.data(45).logicalSrcIdx = 44;
                    section.data(45).dtTransOffset = 101;

                    ;% rtB.jyge54thmy
                    section.data(46).logicalSrcIdx = 45;
                    section.data(46).dtTransOffset = 102;

                    ;% rtB.blrzsw5oto
                    section.data(47).logicalSrcIdx = 46;
                    section.data(47).dtTransOffset = 103;

                    ;% rtB.iija5q5xnc
                    section.data(48).logicalSrcIdx = 47;
                    section.data(48).dtTransOffset = 104;

                    ;% rtB.exwu3ja3i4
                    section.data(49).logicalSrcIdx = 48;
                    section.data(49).dtTransOffset = 105;

                    ;% rtB.dtcqvn1xs3
                    section.data(50).logicalSrcIdx = 49;
                    section.data(50).dtTransOffset = 107;

                    ;% rtB.nvudvzcoyt
                    section.data(51).logicalSrcIdx = 50;
                    section.data(51).dtTransOffset = 108;

                    ;% rtB.hrdriqb31a
                    section.data(52).logicalSrcIdx = 51;
                    section.data(52).dtTransOffset = 109;

                    ;% rtB.fdurbf5mi5
                    section.data(53).logicalSrcIdx = 52;
                    section.data(53).dtTransOffset = 112;

                    ;% rtB.mnmze1rbog
                    section.data(54).logicalSrcIdx = 53;
                    section.data(54).dtTransOffset = 113;

                    ;% rtB.pziuobkcex
                    section.data(55).logicalSrcIdx = 54;
                    section.data(55).dtTransOffset = 114;

                    ;% rtB.jkwn3cbtkm
                    section.data(56).logicalSrcIdx = 55;
                    section.data(56).dtTransOffset = 115;

                    ;% rtB.fgorpktnxo
                    section.data(57).logicalSrcIdx = 56;
                    section.data(57).dtTransOffset = 116;

                    ;% rtB.gkozpxevvq
                    section.data(58).logicalSrcIdx = 57;
                    section.data(58).dtTransOffset = 122;

                    ;% rtB.ic0e4c1l4y
                    section.data(59).logicalSrcIdx = 58;
                    section.data(59).dtTransOffset = 123;

                    ;% rtB.ml2sefegu2
                    section.data(60).logicalSrcIdx = 59;
                    section.data(60).dtTransOffset = 124;

                    ;% rtB.kaertic4vs
                    section.data(61).logicalSrcIdx = 60;
                    section.data(61).dtTransOffset = 125;

                    ;% rtB.nala1h3js1
                    section.data(62).logicalSrcIdx = 61;
                    section.data(62).dtTransOffset = 126;

                    ;% rtB.iceoppiebj
                    section.data(63).logicalSrcIdx = 62;
                    section.data(63).dtTransOffset = 127;

                    ;% rtB.evb43tm4m1
                    section.data(64).logicalSrcIdx = 63;
                    section.data(64).dtTransOffset = 128;

                    ;% rtB.ejokhjwmed
                    section.data(65).logicalSrcIdx = 64;
                    section.data(65).dtTransOffset = 129;

                    ;% rtB.axllzbkagp
                    section.data(66).logicalSrcIdx = 65;
                    section.data(66).dtTransOffset = 130;

                    ;% rtB.cnge3yy5s3
                    section.data(67).logicalSrcIdx = 66;
                    section.data(67).dtTransOffset = 131;

                    ;% rtB.n4adxrvkfh
                    section.data(68).logicalSrcIdx = 67;
                    section.data(68).dtTransOffset = 132;

                    ;% rtB.fgzysnydst
                    section.data(69).logicalSrcIdx = 68;
                    section.data(69).dtTransOffset = 133;

                    ;% rtB.pao12cuzf2
                    section.data(70).logicalSrcIdx = 69;
                    section.data(70).dtTransOffset = 139;

                    ;% rtB.ol51wefaan
                    section.data(71).logicalSrcIdx = 70;
                    section.data(71).dtTransOffset = 140;

                    ;% rtB.n2vsmjdxe2
                    section.data(72).logicalSrcIdx = 71;
                    section.data(72).dtTransOffset = 141;

                    ;% rtB.pqsgd03wj2
                    section.data(73).logicalSrcIdx = 72;
                    section.data(73).dtTransOffset = 142;

                    ;% rtB.myqs2aik3n
                    section.data(74).logicalSrcIdx = 73;
                    section.data(74).dtTransOffset = 143;

                    ;% rtB.n04u5qo1tm
                    section.data(75).logicalSrcIdx = 74;
                    section.data(75).dtTransOffset = 144;

                    ;% rtB.h3icrspvtr
                    section.data(76).logicalSrcIdx = 75;
                    section.data(76).dtTransOffset = 145;

                    ;% rtB.mnghhdy5l0
                    section.data(77).logicalSrcIdx = 76;
                    section.data(77).dtTransOffset = 146;

                    ;% rtB.bykod0qu4f
                    section.data(78).logicalSrcIdx = 77;
                    section.data(78).dtTransOffset = 147;

                    ;% rtB.e3eynypbko
                    section.data(79).logicalSrcIdx = 78;
                    section.data(79).dtTransOffset = 148;

                    ;% rtB.dtktgkrsze
                    section.data(80).logicalSrcIdx = 79;
                    section.data(80).dtTransOffset = 149;

                    ;% rtB.lnidmsxuul
                    section.data(81).logicalSrcIdx = 80;
                    section.data(81).dtTransOffset = 150;

                    ;% rtB.gdtqueucbx
                    section.data(82).logicalSrcIdx = 81;
                    section.data(82).dtTransOffset = 151;

                    ;% rtB.ioc1syepte
                    section.data(83).logicalSrcIdx = 82;
                    section.data(83).dtTransOffset = 153;

                    ;% rtB.f5snq0zyfb
                    section.data(84).logicalSrcIdx = 83;
                    section.data(84).dtTransOffset = 154;

                    ;% rtB.lvvzxmaemb
                    section.data(85).logicalSrcIdx = 84;
                    section.data(85).dtTransOffset = 155;

                    ;% rtB.hym0300qin
                    section.data(86).logicalSrcIdx = 85;
                    section.data(86).dtTransOffset = 156;

                    ;% rtB.g5va0ac1ol
                    section.data(87).logicalSrcIdx = 86;
                    section.data(87).dtTransOffset = 157;

                    ;% rtB.ov0qirsdb2
                    section.data(88).logicalSrcIdx = 87;
                    section.data(88).dtTransOffset = 158;

                    ;% rtB.l3xvdmibgs
                    section.data(89).logicalSrcIdx = 88;
                    section.data(89).dtTransOffset = 159;

                    ;% rtB.mmoqbgu13u
                    section.data(90).logicalSrcIdx = 89;
                    section.data(90).dtTransOffset = 160;

                    ;% rtB.exta2fsaw0
                    section.data(91).logicalSrcIdx = 90;
                    section.data(91).dtTransOffset = 161;

                    ;% rtB.cpehl32sa3
                    section.data(92).logicalSrcIdx = 91;
                    section.data(92).dtTransOffset = 162;

                    ;% rtB.bb3eubvp4q
                    section.data(93).logicalSrcIdx = 93;
                    section.data(93).dtTransOffset = 163;

                    ;% rtB.djupxofhiz
                    section.data(94).logicalSrcIdx = 96;
                    section.data(94).dtTransOffset = 164;

                    ;% rtB.nps0lwxvun
                    section.data(95).logicalSrcIdx = 98;
                    section.data(95).dtTransOffset = 165;

                    ;% rtB.mm5erx32aq
                    section.data(96).logicalSrcIdx = 99;
                    section.data(96).dtTransOffset = 166;

                    ;% rtB.pleidnllwk
                    section.data(97).logicalSrcIdx = 100;
                    section.data(97).dtTransOffset = 167;

                    ;% rtB.l000g2k1gs
                    section.data(98).logicalSrcIdx = 101;
                    section.data(98).dtTransOffset = 168;

                    ;% rtB.ezx3bu4uvd
                    section.data(99).logicalSrcIdx = 102;
                    section.data(99).dtTransOffset = 169;

                    ;% rtB.brmrtfeblf
                    section.data(100).logicalSrcIdx = 103;
                    section.data(100).dtTransOffset = 170;

                    ;% rtB.bjfhztuafe
                    section.data(101).logicalSrcIdx = 104;
                    section.data(101).dtTransOffset = 173;

                    ;% rtB.kmfrvhzvbz
                    section.data(102).logicalSrcIdx = 105;
                    section.data(102).dtTransOffset = 176;

                    ;% rtB.b2rlc3rhwb
                    section.data(103).logicalSrcIdx = 106;
                    section.data(103).dtTransOffset = 177;

                    ;% rtB.fod101tebi
                    section.data(104).logicalSrcIdx = 107;
                    section.data(104).dtTransOffset = 183;

                    ;% rtB.alab1keotz
                    section.data(105).logicalSrcIdx = 108;
                    section.data(105).dtTransOffset = 184;

                    ;% rtB.pi3kmz41z0
                    section.data(106).logicalSrcIdx = 109;
                    section.data(106).dtTransOffset = 185;

                    ;% rtB.pjtynvcy22
                    section.data(107).logicalSrcIdx = 110;
                    section.data(107).dtTransOffset = 186;

                    ;% rtB.gvpmls0ma1
                    section.data(108).logicalSrcIdx = 111;
                    section.data(108).dtTransOffset = 187;

                    ;% rtB.bnniy4me5c
                    section.data(109).logicalSrcIdx = 112;
                    section.data(109).dtTransOffset = 188;

                    ;% rtB.j23lusay23
                    section.data(110).logicalSrcIdx = 113;
                    section.data(110).dtTransOffset = 189;

                    ;% rtB.bbzcafnddd
                    section.data(111).logicalSrcIdx = 114;
                    section.data(111).dtTransOffset = 190;

                    ;% rtB.hpta0eitwr
                    section.data(112).logicalSrcIdx = 115;
                    section.data(112).dtTransOffset = 191;

                    ;% rtB.evj5opibec
                    section.data(113).logicalSrcIdx = 116;
                    section.data(113).dtTransOffset = 192;

                    ;% rtB.dnjkouop22
                    section.data(114).logicalSrcIdx = 117;
                    section.data(114).dtTransOffset = 193;

                    ;% rtB.ni1lan1d44
                    section.data(115).logicalSrcIdx = 118;
                    section.data(115).dtTransOffset = 194;

                    ;% rtB.oa0jrjx000
                    section.data(116).logicalSrcIdx = 119;
                    section.data(116).dtTransOffset = 195;

                    ;% rtB.gc2vziiwy3
                    section.data(117).logicalSrcIdx = 120;
                    section.data(117).dtTransOffset = 198;

                    ;% rtB.isazzfg0kd
                    section.data(118).logicalSrcIdx = 121;
                    section.data(118).dtTransOffset = 201;

                    ;% rtB.h4teqcuq50
                    section.data(119).logicalSrcIdx = 122;
                    section.data(119).dtTransOffset = 204;

                    ;% rtB.j4tvbl4ieb
                    section.data(120).logicalSrcIdx = 123;
                    section.data(120).dtTransOffset = 207;

                    ;% rtB.nuykb4mbgh
                    section.data(121).logicalSrcIdx = 124;
                    section.data(121).dtTransOffset = 208;

                    ;% rtB.cjyda1bfaq
                    section.data(122).logicalSrcIdx = 125;
                    section.data(122).dtTransOffset = 209;

                    ;% rtB.j31sus5xqz
                    section.data(123).logicalSrcIdx = 126;
                    section.data(123).dtTransOffset = 210;

                    ;% rtB.lue0a43mx3
                    section.data(124).logicalSrcIdx = 127;
                    section.data(124).dtTransOffset = 211;

                    ;% rtB.i55hn5n1na
                    section.data(125).logicalSrcIdx = 128;
                    section.data(125).dtTransOffset = 212;

                    ;% rtB.mefjiqxq2f
                    section.data(126).logicalSrcIdx = 129;
                    section.data(126).dtTransOffset = 213;

                    ;% rtB.hn4d2u4cp1
                    section.data(127).logicalSrcIdx = 130;
                    section.data(127).dtTransOffset = 214;

                    ;% rtB.ovwclkcs2i
                    section.data(128).logicalSrcIdx = 131;
                    section.data(128).dtTransOffset = 215;

                    ;% rtB.ifknoklefb
                    section.data(129).logicalSrcIdx = 132;
                    section.data(129).dtTransOffset = 216;

                    ;% rtB.c05ngd5nou
                    section.data(130).logicalSrcIdx = 133;
                    section.data(130).dtTransOffset = 217;

                    ;% rtB.g13szyzts1
                    section.data(131).logicalSrcIdx = 134;
                    section.data(131).dtTransOffset = 218;

                    ;% rtB.ijxrykftkf
                    section.data(132).logicalSrcIdx = 135;
                    section.data(132).dtTransOffset = 219;

                    ;% rtB.m3gw0w4wwt
                    section.data(133).logicalSrcIdx = 136;
                    section.data(133).dtTransOffset = 222;

                    ;% rtB.ojdbh5sy1v
                    section.data(134).logicalSrcIdx = 138;
                    section.data(134).dtTransOffset = 225;

                    ;% rtB.atb4035mez
                    section.data(135).logicalSrcIdx = 139;
                    section.data(135).dtTransOffset = 227;

                    ;% rtB.papaznze2l
                    section.data(136).logicalSrcIdx = 140;
                    section.data(136).dtTransOffset = 228;

                    ;% rtB.mf4wbumfgn
                    section.data(137).logicalSrcIdx = 141;
                    section.data(137).dtTransOffset = 229;

                    ;% rtB.fwx1lxpao5
                    section.data(138).logicalSrcIdx = 142;
                    section.data(138).dtTransOffset = 230;

                    ;% rtB.hywf1ncafp
                    section.data(139).logicalSrcIdx = 143;
                    section.data(139).dtTransOffset = 231;

                    ;% rtB.l4kff3kwap
                    section.data(140).logicalSrcIdx = 144;
                    section.data(140).dtTransOffset = 232;

                    ;% rtB.eim1ahimjk
                    section.data(141).logicalSrcIdx = 145;
                    section.data(141).dtTransOffset = 233;

                    ;% rtB.a3azhi0byn
                    section.data(142).logicalSrcIdx = 146;
                    section.data(142).dtTransOffset = 234;

                    ;% rtB.lwxhjjne3y
                    section.data(143).logicalSrcIdx = 147;
                    section.data(143).dtTransOffset = 235;

                    ;% rtB.bi0j5ecyxs
                    section.data(144).logicalSrcIdx = 148;
                    section.data(144).dtTransOffset = 236;

            nTotData = nTotData + section.nData;
            sigMap.sections(1) = section;
            clear section

            section.nData     = 8;
            section.data(8)  = dumData; %prealloc

                    ;% rtB.camcwjwx5q
                    section.data(1).logicalSrcIdx = 149;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.f2qin0etd5
                    section.data(2).logicalSrcIdx = 150;
                    section.data(2).dtTransOffset = 1;

                    ;% rtB.mevbyb1sbj
                    section.data(3).logicalSrcIdx = 151;
                    section.data(3).dtTransOffset = 2;

                    ;% rtB.fpqyxrpked
                    section.data(4).logicalSrcIdx = 152;
                    section.data(4).dtTransOffset = 3;

                    ;% rtB.hklbihivc4
                    section.data(5).logicalSrcIdx = 153;
                    section.data(5).dtTransOffset = 4;

                    ;% rtB.jnyxx5xrmx
                    section.data(6).logicalSrcIdx = 154;
                    section.data(6).dtTransOffset = 5;

                    ;% rtB.cuaeuazkql
                    section.data(7).logicalSrcIdx = 155;
                    section.data(7).dtTransOffset = 6;

                    ;% rtB.l2xmqajqh2
                    section.data(8).logicalSrcIdx = 156;
                    section.data(8).dtTransOffset = 7;

            nTotData = nTotData + section.nData;
            sigMap.sections(2) = section;
            clear section

            section.nData     = 5;
            section.data(5)  = dumData; %prealloc

                    ;% rtB.g1bg5y5c3u
                    section.data(1).logicalSrcIdx = 157;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.e3grkf4opz
                    section.data(2).logicalSrcIdx = 158;
                    section.data(2).dtTransOffset = 1;

                    ;% rtB.nvjzgycbxq
                    section.data(3).logicalSrcIdx = 159;
                    section.data(3).dtTransOffset = 2;

                    ;% rtB.hvtwtii2yq
                    section.data(4).logicalSrcIdx = 160;
                    section.data(4).dtTransOffset = 5;

                    ;% rtB.lzgujnt0u4
                    section.data(5).logicalSrcIdx = 161;
                    section.data(5).dtTransOffset = 6;

            nTotData = nTotData + section.nData;
            sigMap.sections(3) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.fczgughbiq.ptjmq55jv0
                    section.data(1).logicalSrcIdx = 162;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.fczgughbiq.kbig2w2qac
                    section.data(2).logicalSrcIdx = 163;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(4) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.dfo2acc2c4.joejsm2kpt
                    section.data(1).logicalSrcIdx = 164;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.dfo2acc2c4.d5ishk4lv4
                    section.data(2).logicalSrcIdx = 165;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(5) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.hd1xjtd4en.ptjmq55jv0
                    section.data(1).logicalSrcIdx = 166;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.hd1xjtd4en.kbig2w2qac
                    section.data(2).logicalSrcIdx = 167;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(6) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.mlgccg0kpg.joejsm2kpt
                    section.data(1).logicalSrcIdx = 168;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.mlgccg0kpg.d5ishk4lv4
                    section.data(2).logicalSrcIdx = 169;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(7) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.li352fxpclf.ptjmq55jv0
                    section.data(1).logicalSrcIdx = 170;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.li352fxpclf.kbig2w2qac
                    section.data(2).logicalSrcIdx = 171;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(8) = section;
            clear section

            section.nData     = 2;
            section.data(2)  = dumData; %prealloc

                    ;% rtB.nvfgem2he0e.joejsm2kpt
                    section.data(1).logicalSrcIdx = 172;
                    section.data(1).dtTransOffset = 0;

                    ;% rtB.nvfgem2he0e.d5ishk4lv4
                    section.data(2).logicalSrcIdx = 173;
                    section.data(2).dtTransOffset = 1;

            nTotData = nTotData + section.nData;
            sigMap.sections(9) = section;
            clear section


            ;%
            ;% Non-auto Data (signal)
            ;%


        ;%
        ;% Add final counts to struct.
        ;%
        sigMap.nTotData = nTotData;



    ;%*******************
    ;% Create DWork Map *
    ;%*******************
    
        nTotData      = 0; %add to this count as we go
        nTotSects     = 14;
        sectIdxOffset = 9;

        ;%
        ;% Define dummy sections & preallocate arrays
        ;%
        dumSection.nData = -1;
        dumSection.data  = [];

        dumData.logicalSrcIdx = -1;
        dumData.dtTransOffset = -1;

        ;%
        ;% Init/prealloc dworkMap
        ;%
        dworkMap.nSections           = nTotSects;
        dworkMap.sectIdxOffset       = sectIdxOffset;
            dworkMap.sections(nTotSects) = dumSection; %prealloc
        dworkMap.nTotData            = -1;

        ;%
        ;% Auto data (rtDW)
        ;%
            section.nData     = 50;
            section.data(50)  = dumData; %prealloc

                    ;% rtDW.czkrjsrqu2
                    section.data(1).logicalSrcIdx = 0;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.oxhk0qisel
                    section.data(2).logicalSrcIdx = 1;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.frvxza54w5
                    section.data(3).logicalSrcIdx = 2;
                    section.data(3).dtTransOffset = 3;

                    ;% rtDW.mtv4xpwrce
                    section.data(4).logicalSrcIdx = 3;
                    section.data(4).dtTransOffset = 4;

                    ;% rtDW.osbryca5sh
                    section.data(5).logicalSrcIdx = 4;
                    section.data(5).dtTransOffset = 5;

                    ;% rtDW.gnflsizfgu
                    section.data(6).logicalSrcIdx = 5;
                    section.data(6).dtTransOffset = 6;

                    ;% rtDW.g13snvfeoz
                    section.data(7).logicalSrcIdx = 6;
                    section.data(7).dtTransOffset = 14;

                    ;% rtDW.iyiqu2mmdx
                    section.data(8).logicalSrcIdx = 7;
                    section.data(8).dtTransOffset = 15;

                    ;% rtDW.nctqs1xe4w
                    section.data(9).logicalSrcIdx = 8;
                    section.data(9).dtTransOffset = 16;

                    ;% rtDW.fgu0pq1vvt
                    section.data(10).logicalSrcIdx = 9;
                    section.data(10).dtTransOffset = 22;

                    ;% rtDW.httsmjxz5q
                    section.data(11).logicalSrcIdx = 10;
                    section.data(11).dtTransOffset = 23;

                    ;% rtDW.o0i11mq33c
                    section.data(12).logicalSrcIdx = 11;
                    section.data(12).dtTransOffset = 24;

                    ;% rtDW.kdnofag0fj
                    section.data(13).logicalSrcIdx = 12;
                    section.data(13).dtTransOffset = 25;

                    ;% rtDW.nlij45njqc
                    section.data(14).logicalSrcIdx = 13;
                    section.data(14).dtTransOffset = 26;

                    ;% rtDW.f32dtil55r
                    section.data(15).logicalSrcIdx = 14;
                    section.data(15).dtTransOffset = 32;

                    ;% rtDW.ac4iux0dv2
                    section.data(16).logicalSrcIdx = 15;
                    section.data(16).dtTransOffset = 33;

                    ;% rtDW.dkyi5zefqy
                    section.data(17).logicalSrcIdx = 16;
                    section.data(17).dtTransOffset = 34;

                    ;% rtDW.iyccx1krg1
                    section.data(18).logicalSrcIdx = 17;
                    section.data(18).dtTransOffset = 35;

                    ;% rtDW.lm1td153qi
                    section.data(19).logicalSrcIdx = 18;
                    section.data(19).dtTransOffset = 36;

                    ;% rtDW.mcbadezzwk
                    section.data(20).logicalSrcIdx = 19;
                    section.data(20).dtTransOffset = 37;

                    ;% rtDW.l3hp1zdnos
                    section.data(21).logicalSrcIdx = 20;
                    section.data(21).dtTransOffset = 38;

                    ;% rtDW.csftnsrhha
                    section.data(22).logicalSrcIdx = 21;
                    section.data(22).dtTransOffset = 39;

                    ;% rtDW.erazndiepj
                    section.data(23).logicalSrcIdx = 22;
                    section.data(23).dtTransOffset = 40;

                    ;% rtDW.ll10fivaqy
                    section.data(24).logicalSrcIdx = 23;
                    section.data(24).dtTransOffset = 41;

                    ;% rtDW.c30pktuq3i
                    section.data(25).logicalSrcIdx = 24;
                    section.data(25).dtTransOffset = 42;

                    ;% rtDW.na2vjy0kek
                    section.data(26).logicalSrcIdx = 25;
                    section.data(26).dtTransOffset = 43;

                    ;% rtDW.ctgvdw0gij
                    section.data(27).logicalSrcIdx = 26;
                    section.data(27).dtTransOffset = 44;

                    ;% rtDW.m1ymsrrb22
                    section.data(28).logicalSrcIdx = 27;
                    section.data(28).dtTransOffset = 45;

                    ;% rtDW.pv4y3oq2f0
                    section.data(29).logicalSrcIdx = 28;
                    section.data(29).dtTransOffset = 46;

                    ;% rtDW.jhvqtkhitv
                    section.data(30).logicalSrcIdx = 29;
                    section.data(30).dtTransOffset = 47;

                    ;% rtDW.hakqjnq5wi
                    section.data(31).logicalSrcIdx = 30;
                    section.data(31).dtTransOffset = 48;

                    ;% rtDW.jog1sylu4k
                    section.data(32).logicalSrcIdx = 31;
                    section.data(32).dtTransOffset = 49;

                    ;% rtDW.blgeiu2szl
                    section.data(33).logicalSrcIdx = 32;
                    section.data(33).dtTransOffset = 50;

                    ;% rtDW.i2hdbbcss5
                    section.data(34).logicalSrcIdx = 33;
                    section.data(34).dtTransOffset = 51;

                    ;% rtDW.pplj0ur1i5
                    section.data(35).logicalSrcIdx = 34;
                    section.data(35).dtTransOffset = 52;

                    ;% rtDW.dzw4ciekkn
                    section.data(36).logicalSrcIdx = 35;
                    section.data(36).dtTransOffset = 53;

                    ;% rtDW.ols3d1ne4l
                    section.data(37).logicalSrcIdx = 36;
                    section.data(37).dtTransOffset = 54;

                    ;% rtDW.dsood53gdp
                    section.data(38).logicalSrcIdx = 37;
                    section.data(38).dtTransOffset = 55;

                    ;% rtDW.jznek0nyfd
                    section.data(39).logicalSrcIdx = 38;
                    section.data(39).dtTransOffset = 56;

                    ;% rtDW.lsiw4qoapx
                    section.data(40).logicalSrcIdx = 39;
                    section.data(40).dtTransOffset = 57;

                    ;% rtDW.dln4wxq2lo
                    section.data(41).logicalSrcIdx = 40;
                    section.data(41).dtTransOffset = 58;

                    ;% rtDW.lk1m1g5em3
                    section.data(42).logicalSrcIdx = 41;
                    section.data(42).dtTransOffset = 59;

                    ;% rtDW.bi2ugbg5y1
                    section.data(43).logicalSrcIdx = 42;
                    section.data(43).dtTransOffset = 60;

                    ;% rtDW.pkheuytbjk
                    section.data(44).logicalSrcIdx = 43;
                    section.data(44).dtTransOffset = 61;

                    ;% rtDW.ayxs44uns4
                    section.data(45).logicalSrcIdx = 44;
                    section.data(45).dtTransOffset = 62;

                    ;% rtDW.m2lfbnmo3h
                    section.data(46).logicalSrcIdx = 45;
                    section.data(46).dtTransOffset = 65;

                    ;% rtDW.ihe4rhg2xz
                    section.data(47).logicalSrcIdx = 46;
                    section.data(47).dtTransOffset = 68;

                    ;% rtDW.kksqi0t4ru
                    section.data(48).logicalSrcIdx = 47;
                    section.data(48).dtTransOffset = 69;

                    ;% rtDW.cq1u0wmbih
                    section.data(49).logicalSrcIdx = 48;
                    section.data(49).dtTransOffset = 70;

                    ;% rtDW.bzaeauh02y
                    section.data(50).logicalSrcIdx = 49;
                    section.data(50).dtTransOffset = 71;

            nTotData = nTotData + section.nData;
            dworkMap.sections(1) = section;
            clear section

            section.nData     = 42;
            section.data(42)  = dumData; %prealloc

                    ;% rtDW.botoszhepv.AS
                    section.data(1).logicalSrcIdx = 50;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.lgrw01kbbe.AS
                    section.data(2).logicalSrcIdx = 51;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.phtrkpphea.LoggedData
                    section.data(3).logicalSrcIdx = 52;
                    section.data(3).dtTransOffset = 2;

                    ;% rtDW.ad0cslu3w5.LoggedData
                    section.data(4).logicalSrcIdx = 53;
                    section.data(4).dtTransOffset = 4;

                    ;% rtDW.m4gz1bhjc3.LoggedData
                    section.data(5).logicalSrcIdx = 54;
                    section.data(5).dtTransOffset = 5;

                    ;% rtDW.bpxfa21us1.LoggedData
                    section.data(6).logicalSrcIdx = 55;
                    section.data(6).dtTransOffset = 6;

                    ;% rtDW.fjydvu3n54.LoggedData
                    section.data(7).logicalSrcIdx = 56;
                    section.data(7).dtTransOffset = 8;

                    ;% rtDW.mcazbdfc2s.LoggedData
                    section.data(8).logicalSrcIdx = 57;
                    section.data(8).dtTransOffset = 13;

                    ;% rtDW.j22kygelq4.LoggedData
                    section.data(9).logicalSrcIdx = 58;
                    section.data(9).dtTransOffset = 18;

                    ;% rtDW.bb5knzxqym.LoggedData
                    section.data(10).logicalSrcIdx = 59;
                    section.data(10).dtTransOffset = 21;

                    ;% rtDW.jmzd0oy25y.LoggedData
                    section.data(11).logicalSrcIdx = 60;
                    section.data(11).dtTransOffset = 23;

                    ;% rtDW.ng5fksfjhb.AQHandles
                    section.data(12).logicalSrcIdx = 61;
                    section.data(12).dtTransOffset = 25;

                    ;% rtDW.hnsibxfmf0.AQHandles
                    section.data(13).logicalSrcIdx = 62;
                    section.data(13).dtTransOffset = 26;

                    ;% rtDW.h5fpzmcuwa.AQHandles
                    section.data(14).logicalSrcIdx = 63;
                    section.data(14).dtTransOffset = 27;

                    ;% rtDW.baclat3gdp.AQHandles
                    section.data(15).logicalSrcIdx = 64;
                    section.data(15).dtTransOffset = 28;

                    ;% rtDW.cv3v30xvnp.AQHandles
                    section.data(16).logicalSrcIdx = 65;
                    section.data(16).dtTransOffset = 29;

                    ;% rtDW.dyi2osc10n.AQHandles
                    section.data(17).logicalSrcIdx = 66;
                    section.data(17).dtTransOffset = 30;

                    ;% rtDW.kwecrm4qsw.AQHandles
                    section.data(18).logicalSrcIdx = 67;
                    section.data(18).dtTransOffset = 31;

                    ;% rtDW.pkhp1je4fa.AQHandles
                    section.data(19).logicalSrcIdx = 68;
                    section.data(19).dtTransOffset = 32;

                    ;% rtDW.fc0lo13bog.AQHandles
                    section.data(20).logicalSrcIdx = 69;
                    section.data(20).dtTransOffset = 33;

                    ;% rtDW.bidewd4wfz.AQHandles
                    section.data(21).logicalSrcIdx = 70;
                    section.data(21).dtTransOffset = 34;

                    ;% rtDW.ikrlcf1i5d.AQHandles
                    section.data(22).logicalSrcIdx = 71;
                    section.data(22).dtTransOffset = 35;

                    ;% rtDW.na0apmjb2h.AQHandles
                    section.data(23).logicalSrcIdx = 72;
                    section.data(23).dtTransOffset = 36;

                    ;% rtDW.fsp2omfjvq.AQHandles
                    section.data(24).logicalSrcIdx = 73;
                    section.data(24).dtTransOffset = 37;

                    ;% rtDW.g4hd1bhdft.TimePtr
                    section.data(25).logicalSrcIdx = 74;
                    section.data(25).dtTransOffset = 38;

                    ;% rtDW.i5mlytso40.AQHandles
                    section.data(26).logicalSrcIdx = 75;
                    section.data(26).dtTransOffset = 39;

                    ;% rtDW.azwfxt2qsv.AQHandles
                    section.data(27).logicalSrcIdx = 76;
                    section.data(27).dtTransOffset = 40;

                    ;% rtDW.ozahlhcekt.AQHandles
                    section.data(28).logicalSrcIdx = 77;
                    section.data(28).dtTransOffset = 41;

                    ;% rtDW.ixa2q1154j.AQHandles
                    section.data(29).logicalSrcIdx = 78;
                    section.data(29).dtTransOffset = 42;

                    ;% rtDW.pveu0skkj0.AQHandles
                    section.data(30).logicalSrcIdx = 79;
                    section.data(30).dtTransOffset = 43;

                    ;% rtDW.ljprsnu3c1.LoggedData
                    section.data(31).logicalSrcIdx = 80;
                    section.data(31).dtTransOffset = 44;

                    ;% rtDW.lmzbwbiuwr.LoggedData
                    section.data(32).logicalSrcIdx = 81;
                    section.data(32).dtTransOffset = 46;

                    ;% rtDW.nrwvgxxmlf
                    section.data(33).logicalSrcIdx = 82;
                    section.data(33).dtTransOffset = 48;

                    ;% rtDW.kqbzefrrpk.AQHandles
                    section.data(34).logicalSrcIdx = 83;
                    section.data(34).dtTransOffset = 50;

                    ;% rtDW.mzvkuto3g1.AQHandles
                    section.data(35).logicalSrcIdx = 84;
                    section.data(35).dtTransOffset = 51;

                    ;% rtDW.izxn0am4wi.AQHandles
                    section.data(36).logicalSrcIdx = 85;
                    section.data(36).dtTransOffset = 52;

                    ;% rtDW.bmaiw0snuq.LoggedData
                    section.data(37).logicalSrcIdx = 86;
                    section.data(37).dtTransOffset = 53;

                    ;% rtDW.khuwzyzzwl.AQHandles
                    section.data(38).logicalSrcIdx = 87;
                    section.data(38).dtTransOffset = 55;

                    ;% rtDW.fbo2ypeh3b.LoggedData
                    section.data(39).logicalSrcIdx = 88;
                    section.data(39).dtTransOffset = 56;

                    ;% rtDW.oa4tmpeavp.LoggedData
                    section.data(40).logicalSrcIdx = 89;
                    section.data(40).dtTransOffset = 58;

                    ;% rtDW.az24ws0ypm
                    section.data(41).logicalSrcIdx = 90;
                    section.data(41).dtTransOffset = 60;

                    ;% rtDW.muxtlhdswz
                    section.data(42).logicalSrcIdx = 91;
                    section.data(42).dtTransOffset = 62;

            nTotData = nTotData + section.nData;
            dworkMap.sections(2) = section;
            clear section

            section.nData     = 4;
            section.data(4)  = dumData; %prealloc

                    ;% rtDW.ho4fdvjvds
                    section.data(1).logicalSrcIdx = 92;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.oy5lfujju0
                    section.data(2).logicalSrcIdx = 93;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.n1uub1dlym
                    section.data(3).logicalSrcIdx = 94;
                    section.data(3).dtTransOffset = 2;

                    ;% rtDW.aaxrqyikoo
                    section.data(4).logicalSrcIdx = 95;
                    section.data(4).dtTransOffset = 3;

            nTotData = nTotData + section.nData;
            dworkMap.sections(3) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.d0p4mc2fkl
                    section.data(1).logicalSrcIdx = 96;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(4) = section;
            clear section

            section.nData     = 8;
            section.data(8)  = dumData; %prealloc

                    ;% rtDW.djrnopdiyh
                    section.data(1).logicalSrcIdx = 97;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.oqm5cfbsf3
                    section.data(2).logicalSrcIdx = 98;
                    section.data(2).dtTransOffset = 11;

                    ;% rtDW.lnrsd34ui5.PrevIndex
                    section.data(3).logicalSrcIdx = 99;
                    section.data(3).dtTransOffset = 22;

                    ;% rtDW.in41mmafbd
                    section.data(4).logicalSrcIdx = 100;
                    section.data(4).dtTransOffset = 23;

                    ;% rtDW.h5nc14oryl
                    section.data(5).logicalSrcIdx = 101;
                    section.data(5).dtTransOffset = 24;

                    ;% rtDW.jprqbw3ryk
                    section.data(6).logicalSrcIdx = 102;
                    section.data(6).dtTransOffset = 25;

                    ;% rtDW.hs5omzyzkw
                    section.data(7).logicalSrcIdx = 103;
                    section.data(7).dtTransOffset = 26;

                    ;% rtDW.fqugso0ii3
                    section.data(8).logicalSrcIdx = 104;
                    section.data(8).dtTransOffset = 27;

            nTotData = nTotData + section.nData;
            dworkMap.sections(5) = section;
            clear section

            section.nData     = 9;
            section.data(9)  = dumData; %prealloc

                    ;% rtDW.ioxt5tho3g
                    section.data(1).logicalSrcIdx = 105;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.jpopyetejp
                    section.data(2).logicalSrcIdx = 106;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.jj4xceo33d
                    section.data(3).logicalSrcIdx = 107;
                    section.data(3).dtTransOffset = 2;

                    ;% rtDW.kpxv5ipdov
                    section.data(4).logicalSrcIdx = 108;
                    section.data(4).dtTransOffset = 3;

                    ;% rtDW.cvvxfhpwpw
                    section.data(5).logicalSrcIdx = 109;
                    section.data(5).dtTransOffset = 4;

                    ;% rtDW.epfojukybg
                    section.data(6).logicalSrcIdx = 110;
                    section.data(6).dtTransOffset = 5;

                    ;% rtDW.dpkw4xjlk2
                    section.data(7).logicalSrcIdx = 111;
                    section.data(7).dtTransOffset = 6;

                    ;% rtDW.nbpgjp4uuz
                    section.data(8).logicalSrcIdx = 112;
                    section.data(8).dtTransOffset = 7;

                    ;% rtDW.al44xipz0f
                    section.data(9).logicalSrcIdx = 113;
                    section.data(9).dtTransOffset = 8;

            nTotData = nTotData + section.nData;
            dworkMap.sections(6) = section;
            clear section

            section.nData     = 12;
            section.data(12)  = dumData; %prealloc

                    ;% rtDW.l2i2i2rtxk
                    section.data(1).logicalSrcIdx = 114;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.lan2ffu431
                    section.data(2).logicalSrcIdx = 115;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.hxuu15plqq
                    section.data(3).logicalSrcIdx = 116;
                    section.data(3).dtTransOffset = 2;

                    ;% rtDW.mfnpsazirl
                    section.data(4).logicalSrcIdx = 117;
                    section.data(4).dtTransOffset = 3;

                    ;% rtDW.fksok2owwe
                    section.data(5).logicalSrcIdx = 118;
                    section.data(5).dtTransOffset = 4;

                    ;% rtDW.b2gxkppbtq
                    section.data(6).logicalSrcIdx = 119;
                    section.data(6).dtTransOffset = 5;

                    ;% rtDW.alwpt4g5bj
                    section.data(7).logicalSrcIdx = 120;
                    section.data(7).dtTransOffset = 6;

                    ;% rtDW.ch3tvis0kr
                    section.data(8).logicalSrcIdx = 121;
                    section.data(8).dtTransOffset = 7;

                    ;% rtDW.ci0d02vzwn
                    section.data(9).logicalSrcIdx = 122;
                    section.data(9).dtTransOffset = 8;

                    ;% rtDW.e3ivsxtixs
                    section.data(10).logicalSrcIdx = 123;
                    section.data(10).dtTransOffset = 9;

                    ;% rtDW.ffzcxdr11r
                    section.data(11).logicalSrcIdx = 124;
                    section.data(11).dtTransOffset = 10;

                    ;% rtDW.goyqb3kdb4
                    section.data(12).logicalSrcIdx = 125;
                    section.data(12).dtTransOffset = 11;

            nTotData = nTotData + section.nData;
            dworkMap.sections(7) = section;
            clear section

            section.nData     = 7;
            section.data(7)  = dumData; %prealloc

                    ;% rtDW.pgenmwnern
                    section.data(1).logicalSrcIdx = 126;
                    section.data(1).dtTransOffset = 0;

                    ;% rtDW.jjtyaikdlj
                    section.data(2).logicalSrcIdx = 127;
                    section.data(2).dtTransOffset = 1;

                    ;% rtDW.fchn1gsn0w
                    section.data(3).logicalSrcIdx = 128;
                    section.data(3).dtTransOffset = 2;

                    ;% rtDW.bjh0ac3l2z
                    section.data(4).logicalSrcIdx = 129;
                    section.data(4).dtTransOffset = 3;

                    ;% rtDW.p4iqbk2dai
                    section.data(5).logicalSrcIdx = 130;
                    section.data(5).dtTransOffset = 6;

                    ;% rtDW.dfazwkfflc
                    section.data(6).logicalSrcIdx = 131;
                    section.data(6).dtTransOffset = 7;

                    ;% rtDW.ilyqwm1ap1
                    section.data(7).logicalSrcIdx = 132;
                    section.data(7).dtTransOffset = 8;

            nTotData = nTotData + section.nData;
            dworkMap.sections(8) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.fczgughbiq.h3l41vmwcb
                    section.data(1).logicalSrcIdx = 133;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(9) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.dfo2acc2c4.l5bm5alxeg
                    section.data(1).logicalSrcIdx = 134;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(10) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.hd1xjtd4en.h3l41vmwcb
                    section.data(1).logicalSrcIdx = 135;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(11) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.mlgccg0kpg.l5bm5alxeg
                    section.data(1).logicalSrcIdx = 136;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(12) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.li352fxpclf.h3l41vmwcb
                    section.data(1).logicalSrcIdx = 137;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(13) = section;
            clear section

            section.nData     = 1;
            section.data(1)  = dumData; %prealloc

                    ;% rtDW.nvfgem2he0e.l5bm5alxeg
                    section.data(1).logicalSrcIdx = 138;
                    section.data(1).dtTransOffset = 0;

            nTotData = nTotData + section.nData;
            dworkMap.sections(14) = section;
            clear section


            ;%
            ;% Non-auto Data (dwork)
            ;%


        ;%
        ;% Add final counts to struct.
        ;%
        dworkMap.nTotData = nTotData;



    ;%
    ;% Add individual maps to base struct.
    ;%

    targMap.paramMap  = paramMap;
    targMap.signalMap = sigMap;
    targMap.dworkMap  = dworkMap;

    ;%
    ;% Add checksums to base struct.
    ;%


    targMap.checksum0 = 4165205523;
    targMap.checksum1 = 4065933093;
    targMap.checksum2 = 2322047976;
    targMap.checksum3 = 1562300770;

