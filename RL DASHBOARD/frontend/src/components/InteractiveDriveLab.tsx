import React, { useEffect, useRef, useState } from 'react';
import { TelemetryState } from '../types';
import { Volume2, VolumeX, AlertOctagon } from 'lucide-react';

interface InteractiveDriveLabProps {
  onTelemetryUpdate?: (telemetry: any) => void;
  liveTelemetry?: TelemetryState | null;
}

export const InteractiveDriveLab: React.FC<InteractiveDriveLabProps> = ({ onTelemetryUpdate, liveTelemetry }) => {
  // Simulator configuration parameters matching simulator defaults
  const [stage, setStage] = useState<number>(2);
  const [mode, setMode] = useState<string>('manual');
  const [paused, setPaused] = useState<boolean>(false);

  // User interactive floor selector state
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [targetFloor, setTargetFloor] = useState<number | null>(null);
  const [isWaitingUserInput, setIsWaitingUserInput] = useState<boolean>(true);
  const [promptMessage, setPromptMessage] = useState<string>('Lift at Floor 1. Select destination floor:');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [voiceStyle, setVoiceStyle] = useState<'kone-chime' | 'broadcast' | 'warm-chime'>('kone-chime');
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(false);
  const [lastAnnouncedFloor, setLastAnnouncedFloor] = useState<number>(1);
  const voiceEnabledRef = useRef<boolean>(true);
  const voiceStyleRef = useRef<'kone-chime' | 'broadcast' | 'warm-chime'>('kone-chime');
  voiceEnabledRef.current = voiceEnabled;
  voiceStyleRef.current = voiceStyle;

  // Web Audio Elevator Chime Generator (Authentic 2-tone Ding-Dong or Warning Siren)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playElevatorChime = (type: 'arrival' | 'alarm' | 'departure') => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'arrival') {
        // High-low 2-tone harmonic chime (880 Hz -> 587 Hz) common in modern elevators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(880, now); // A5 note
        osc1.frequency.setValueAtTime(587.33, now + 0.22); // D5 note
        osc2.frequency.setValueAtTime(880 * 2, now); // soft 2nd harmonic
        osc2.frequency.setValueAtTime(587.33 * 2, now + 0.22);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.21);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.24);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.0);
        osc2.stop(now + 1.0);
      } else if (type === 'alarm') {
        // European elevator warning two-tone siren (750 Hz / 500 Hz alternating)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(550, now + 0.15);
        osc.frequency.setValueAtTime(800, now + 0.3);
        osc.frequency.setValueAtTime(550, now + 0.45);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.75);
      } else if (type === 'departure') {
        // Single reassuring high chime (659 Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5 note

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    } catch (e) {
      // AudioContext policy
    }
  };

  // High-fidelity Speech Synthesis with tone-shaping and acoustic elevator acoustic profiles
  const speakAnnouncement = (text: string, isPriority: boolean = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!voiceEnabledRef.current && !isPriority) return;

    try {
      if (isPriority) {
        window.speechSynthesis.cancel();
        playElevatorChime('alarm');
      } else if (text.includes('reached')) {
        playElevatorChime('arrival');
      } else if (text.includes('Going')) {
        playElevatorChime('departure');
      }

      // Short delay after chime before vocal announcement begins so they don't overlap awkwardly
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          const style = voiceStyleRef.current;

          // Modulate pitch, rate, and timbre according to elevator industry acoustic standards
          if (isPriority) {
            // Calm, authoritative emergency intercom broadcast
            utterance.rate = 0.88;
            utterance.pitch = 0.95;
            utterance.volume = 1.0;
          } else if (style === 'kone-chime') {
            // Standard KONE British/European airport-style transit voice: measured, crisp, slight lower pitch
            utterance.rate = 0.92;
            utterance.pitch = 0.98;
            utterance.volume = 0.95;
          } else if (style === 'broadcast') {
            // Professional clear public address: steady pacing, neutral pitch
            utterance.rate = 0.86;
            utterance.pitch = 0.92;
            utterance.volume = 1.0;
          } else {
            // Warm hospitality: gently higher pitch, gentle tempo
            utterance.rate = 0.94;
            utterance.pitch = 1.08;
            utterance.volume = 0.9;
          }

          utterance.lang = 'en-GB'; // Default to standard British transit announcer English

          const voices = window.speechSynthesis.getVoices();
          // Filter out robotic default fallback voices; seek high-definition standard system voices
          const preferredVoice =
            voices.find((v) => (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Premium')) && (v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'))) ||
            voices.find((v) => (v.name.includes('Daniel') || v.name.includes('George') || v.name.includes('Arthur') || v.name.includes('Hazel') || v.name.includes('Serena')) && v.lang.startsWith('en')) ||
            voices.find((v) => v.lang === 'en-GB') ||
            voices.find((v) => v.lang.startsWith('en'));

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          // Inner speak error
        }
      }, isPriority ? 350 : 450);
    } catch (e) {
      // SpeechSynthesis policy
    }
  };

  // Sliders state
  const [load, setLoad] = useState<number>(800);
  const [H, setH] = useState<number>(30);
  const [vmax, setVmax] = useState<number>(2.0);
  const [acc, setAcc] = useState<number>(1.0);
  const [rbr, setRbr] = useState<number>(20);
  const [vbr, setVbr] = useState<number>(600);
  const [csc, setCsc] = useState<number>(15);
  const [vscm, setVscm] = useState<number>(200);
  const [ilim, setIlim] = useState<number>(100);
  const [vref, setVref] = useState<number>(560);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);

  // Ref holders for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Simulation physics state stored in ref for high-fps requestAnimationFrame loop
  const simState = useRef({
    fr: 0,
    v: 0,
    s: 0,
    af: 0,
    dir: 1,
    ph: 'dwell',
    tm: 1,
    th: 0,
    ang: 0,
    Vdc: 540,
    Vsc: 0.65 * 200,
    brk: 0,
    a1: 0,
    a2: 0,
    E: { g: 0, m: 0, rg: 0, br: 0, si: 0, so: 0 },
    o: {
      vup: 0,
      F: 0,
      Pm: 0,
      Pe: 0,
      Pi: 0,
      Ir: 0,
      Ii: 0,
      Ib: 0,
      Isd: 0,
      Is: 0,
      Ps: 0,
      iq: 0,
      fe: 0,
      m: 0,
      V: 540,
      vph: 0,
    },
    buffers: {} as Record<string, number[]>,
    flowOffsets: [0, 0, 0, 0, 0, 0, 0, 0],
    lastTs: 0,
    lastTelemetryTs: 0,
    chopperActiveDisplay: false,
    chopperHoldTimer: 0,
    currentFloor: 1,
    targetFloor: null as number | null,
    targetElevation: 0,
    isWaitingInput: true,
  });

  const paramsRef = useRef({
    stage: 2,
    mode: 'manual',
    load: 800,
    H: 30,
    vmax: 2.0,
    acc: 1.0,
    rbr: 20,
    vbr: 600,
    csc: 15,
    vscm: 200,
    ilim: 100,
    vref: 560,
    speed: 1.0,
    paused: false,
  });

  // Keep paramsRef in sync with state
  useEffect(() => {
    paramsRef.current = {
      stage,
      mode,
      load,
      H,
      vmax,
      acc,
      rbr,
      vbr,
      csc,
      vscm,
      ilim,
      vref,
      speed: simSpeed,
      paused,
    };
  }, [stage, mode, load, H, vmax, acc, rbr, vbr, csc, vscm, ilim, vref, simSpeed, paused]);

  // Waveform Scope definitions
  const SCOPES = [
    { title: 'Speed m/s (+up) · rope force kN', series: [{ k: 'v', c: '#60a5fa', l: 'speed' }, { k: 'F', c: '#fbbf24', l: 'force' }], zero: true },
    { title: 'Power kW (+ = toward load / charging)', series: [{ k: 'pm', c: '#60a5fa', l: 'shaft' }, { k: 'pg', c: '#fbbf24', l: 'grid' }, { k: 'pb', c: '#f87171', l: 'brake' }, { k: 'ps', c: '#4ade80', l: 'SC' }], zero: true },
    { title: 'DC-link voltage V', series: [{ k: 'vdc', c: '#60a5fa', l: 'Vdc' }], zero: false },
    { title: 'Supercap: V and I (A, + charging)', series: [{ k: 'vsc', c: '#4ade80', l: 'Vsc' }, { k: 'isc', c: '#fbbf24', l: 'Isc' }], zero: false },
    { title: 'DC-side currents A', series: [{ k: 'ir', c: '#fbbf24', l: 'rectifier' }, { k: 'ii', c: '#60a5fa', l: 'inverter' }, { k: 'ibr', c: '#f87171', l: 'brake' }, { k: 'isd', c: '#4ade80', l: 'to DC-DC' }], zero: true },
    { title: 'Phase currents A (last 0.8 s)', series: [{ k: 'ca', c: '#60a5fa', l: 'ia' }, { k: 'cb', c: '#4ade80', l: 'ib' }, { k: 'cc', c: '#a78bfa', l: 'ic' }], zero: true },
    { title: 'Phase voltages V (last 0.8 s)', series: [{ k: 'wa', c: '#60a5fa', l: 'va' }, { k: 'wb', c: '#4ade80', l: 'vb' }, { k: 'wc', c: '#a78bfa', l: 'vc' }], zero: true },
  ];

  const resetSim = () => {
    const P = paramsRef.current;
    const S = simState.current;
    S.fr = P.mode === 'down' ? 1 : (P.mode === 'manual' ? (S.currentFloor - 1) / 9 : 0);
    S.v = 0;
    S.s = P.mode === 'manual' ? S.fr * P.H : 0;
    S.af = 0;
    S.dir = P.mode === 'down' ? -1 : 1;
    S.ph = 'dwell';
    S.tm = 1;
    S.th = 0;
    S.ang = 0;
    S.Vdc = 540;
    S.Vsc = 0.65 * P.vscm;
    S.brk = 0;
    S.a1 = 0;
    S.a2 = 0;
    S.targetFloor = null;
    S.isWaitingInput = true;
    S.E = { g: 0, m: 0, rg: 0, br: 0, si: 0, so: 0 };
    S.o = { vup: 0, F: 0, Pm: 0, Pe: 0, Pi: 0, Ir: 0, Ii: 0, Ib: 0, Isd: 0, Is: 0, Ps: 0, iq: 0, fe: 0, m: 0, V: 540, vph: 0 };

    // Clear buffers
    const b: Record<string, number[]> = {};
    ['v', 'F', 'pm', 'pg', 'pb', 'ps', 'vdc', 'vsc', 'isc', 'ir', 'ii', 'ibr', 'isd', 'ca', 'cb', 'cc', 'wa', 'wb', 'wc'].forEach((k) => {
      b[k] = [];
    });
    S.buffers = b;
    setTargetFloor(null);
    setIsWaitingUserInput(true);
  };

  const handleSelectFloor = (selectedFloor: number) => {
    if (selectedFloor === currentFloor) return;
    const S = simState.current;
    const P = paramsRef.current;
    
    // Set target state
    S.targetFloor = selectedFloor;
    S.targetElevation = ((selectedFloor - 1) / 9) * P.H;
    S.dir = selectedFloor > S.currentFloor ? 1 : -1;
    S.isWaitingInput = false;
    S.ph = 'move';
    S.tm = 0;

    setTargetFloor(selectedFloor);
    setIsWaitingUserInput(false);
    const dirWord = selectedFloor > currentFloor ? 'Going up' : 'Going down';
    setPromptMessage(`Traveling to Floor ${selectedFloor}...`);
    speakAnnouncement(`${dirWord}, to Floor ${selectedFloor}.`);
  };

  useEffect(() => {
    resetSim();
  }, [mode, stage]);

  useEffect(() => {
    let animId: number;
    const DT = 2.5e-4; // 250 microsecond discrete physics step
    const push = (k: string, v: number) => {
      const a = simState.current.buffers[k];
      if (a) {
        a.push(v);
        if (a.length > 800) a.shift();
      }
    };

    const step = (dt: number) => {
      const S = simState.current;
      const P = paramsRef.current;
      const g = 9.81,
        r = 0.3,
        pp = 12,
        lam = 2.5,
        R = 0.5,
        Ld = 0.02,
        mcw = 1400;
      let aup = 0,
        vup = 0,
        F = 0;

      if (S.ph === 'dwell') {
        if (P.mode === 'manual') {
          // In interactive manual floor dispatch mode, wait until user enters target floor
          if (S.isWaitingInput) {
            S.v = 0;
            S.af = 0;
          } else if (S.targetFloor !== null && S.targetFloor !== S.currentFloor) {
            // User entered a valid destination floor
            S.ph = 'move';
            S.dir = S.targetFloor > S.currentFloor ? 1 : -1;
            S.targetElevation = ((S.targetFloor - 1) / 9) * P.H;
          }
        } else {
          S.tm -= dt;
          if (S.tm <= 0) {
            S.ph = 'move';
            S.s = 0;
            S.fr = S.dir > 0 ? 0 : 1;
          }
        }
      } else {
        if (P.mode === 'manual' && S.targetFloor !== null) {
          // Precise target-floor kinematic decelerating profile
          const currentElev = S.s; // In manual mode, S.s is absolute elevation from ground (0 to H)
          const distToTarget = Math.abs(S.targetElevation - currentElev);
          const vt = Math.max(0.03, Math.min(P.vmax, Math.sqrt(1.6 * P.acc * Math.max(distToTarget, 0))));
          const ar = Math.max(-P.acc, Math.min(P.acc, (vt - S.v) / 0.15));
          S.af += ((ar - S.af) * dt) / 0.25;
          S.v = Math.max(0, S.v + S.af * dt);
          
          S.s += S.dir * S.v * dt;
          S.s = Math.max(0, Math.min(P.H, S.s));
          S.fr = Math.max(0, Math.min(1, S.s / P.H));

          // Dynamically track the active floor passing in real time as the lift travels
          const dynamicFloor = Math.max(1, Math.min(10, Math.round(1 + (S.s / P.H) * 9)));
          if (dynamicFloor !== S.currentFloor) {
            S.currentFloor = dynamicFloor;
            setCurrentFloor(dynamicFloor);
          }

          if (distToTarget <= 0.05 || (S.dir > 0 && S.s >= S.targetElevation) || (S.dir < 0 && S.s <= S.targetElevation)) {
            // Reached destination floor
            const arrivedFloor = S.targetFloor;
            S.ph = 'dwell';
            S.v = 0;
            S.af = 0;
            S.s = S.targetElevation;
            S.fr = S.targetElevation / P.H;
            S.currentFloor = arrivedFloor;
            S.targetFloor = null;
            S.isWaitingInput = true;
            setCurrentFloor(arrivedFloor);
            setTargetFloor(null);
            setIsWaitingUserInput(true);
            setPromptMessage(`Floor ${arrivedFloor} reached. Doors opening.`);

            // Announce destination reached via voice synthesis
            speakAnnouncement(`Floor ${arrivedFloor} reached. Doors opening.`);
          }
        } else {
          const d = P.H - S.s;
          const vt = Math.max(0.03, Math.min(P.vmax, Math.sqrt(1.6 * P.acc * Math.max(d, 0))));
          const ar = Math.max(-P.acc, Math.min(P.acc, (vt - S.v) / 0.15));
          S.af += ((ar - S.af) * dt) / 0.25;
          S.v = Math.max(0, S.v + S.af * dt);
          S.s += S.v * dt;
          if (S.s >= P.H - 0.005) {
            S.ph = 'dwell';
            S.tm = 3;
            S.v = 0;
            S.af = 0;
            S.fr = S.dir > 0 ? 1 : 0;
            const newFloor = S.dir > 0 ? 10 : 1;
            if (P.mode === 'alt') S.dir *= -1;
            S.currentFloor = newFloor;
            setCurrentFloor(newFloor);
            setPromptMessage(`Floor ${newFloor} reached.`);
            speakAnnouncement(`Floor ${newFloor} reached.`);
          } else {
            S.fr = S.dir > 0 ? S.s / P.H : 1 - S.s / P.H;
          }
        }
      }

      if (S.ph === 'move') {
        aup = S.dir * S.af;
        vup = S.dir * S.v;
        const m = 1000 + P.load;
        F = (m - mcw) * g + (m + mcw + 300) * aup + 300 * Math.tanh(vup / 0.05);
      }

      const T = F * r,
        wm = vup / r,
        we = pp * wm;
      const iq = T / (1.5 * pp * lam);
      const vq = R * iq + we * lam;
      const vd = -we * Ld * iq;
      S.th += we * dt;
      S.ang += wm * dt;

      const Pm = F * vup;
      const Pe = 1.5 * vq * iq;
      const Pi = Pe >= 0 ? Pe / 0.97 : Pe * 0.97;
      const V = Math.max(S.Vdc, 50);
      const Ii = Pi / V;
      const Ir = Math.max(0, (540 - S.Vdc) / 0.4);

      // Brake chopper with continuous proportional conduction and smooth visual hysteresis
      if (S.Vdc > P.vbr) {
        S.brk = 1;
        S.chopperHoldTimer = 0.35; // Hold state for minimum 350ms to prevent visual jitter
      } else if (S.Vdc < P.vbr - 10) {
        if (S.chopperHoldTimer <= 0) {
          S.brk = 0;
        } else {
          S.chopperHoldTimer -= dt;
        }
      } else if (S.brk) {
        S.chopperHoldTimer = Math.max(0, S.chopperHoldTimer - dt);
      }
      const Ib = S.Vdc > P.vbr ? ((S.Vdc - P.vbr) * 2.5 + (S.brk ? 2.0 : 0.0)) : (S.brk && S.Vdc > P.vbr - 5 ? 1.0 : 0);

      let Ps = 0,
        Pc = 0,
        Is = 0;
      S.Vsc = Math.min(S.Vsc, P.vscm);

      if (P.stage === 2) {
        const vm = P.vscm,
          Pl = P.ilim * S.Vsc;
        const cl = (x: number) => Math.max(0, Math.min(1, x));
        
        // Realistic Supercapacitor charging acceptance curve:
        // As Vsc approaches threshold (95% of vscm), supercap acceptance sharply decreases,
        // and surplus regenerated energy elevates Vdc to >= 600V triggering brake chopper dissipation.
        let p = 2000 * (S.Vdc - P.vref);
        
        // Supercap current capacity throttling when approaching upper limit (e.g., 200V)
        const headroomFraction = Math.max(0, Math.min(1, (vm - S.Vsc) / (0.15 * vm)));
        p *= p > 0 ? headroomFraction : cl((S.Vsc - 0.5 * vm) / (0.05 * vm));
        
        Pc = p > 0 ? p * 0.97 : p / 0.97;
        Pc = Math.max(-Pl, Math.min(Pl, Pc));
        Ps = Pc > 0 ? Pc / 0.97 : Pc * 0.97;
        S.Vsc = Math.sqrt(Math.max(1, S.Vsc * S.Vsc + (2 * Pc * dt) / P.csc));
        Is = Pc / S.Vsc;
      }

      const Isd = Ps / V;
      S.Vdc += (dt * (Ir - Ii - Ib - Isd)) / 4.7e-3;

      const E = S.E;
      E.g += Ir * V * dt;
      E.m += Math.max(Pi, 0) * dt;
      E.rg += Math.max(-Pi, 0) * dt;
      E.br += Ib * V * dt;
      E.si += Math.max(Ps, 0) * dt;
      E.so += Math.max(-Ps, 0) * dt;

      const q = 2.0944,
        th = S.th,
        pv = (a: number) => vq * Math.sin(a) + vd * Math.cos(a);
      S.o = {
        vup,
        F,
        Pm,
        Pe,
        Pi,
        Ir,
        Ii,
        Ib,
        Isd,
        Is,
        Ps,
        iq,
        fe: we / 6.2832,
        m: Math.hypot(vq, vd) / (V / 1.732),
        V,
        vph: Math.hypot(vq, vd),
      };

      // Scope buffer sampling
      S.a1 += dt;
      if (S.a1 >= 0.001) {
        S.a1 -= 0.001;
        push('ca', iq * Math.sin(th));
        push('cb', iq * Math.sin(th - q));
        push('cc', iq * Math.sin(th + q));
        push('wa', pv(th));
        push('wb', pv(th - q));
        push('wc', pv(th + q));
      }

      S.a2 += dt;
      if (S.a2 >= 0.05) {
        S.a2 -= 0.05;
        push('v', vup);
        push('F', F / 1000);
        push('pm', Pm / 1000);
        push('pg', (Ir * V) / 1000);
        push('pb', (Ib * V) / 1000);
        push('ps', Ps / 1000);
        push('vdc', S.Vdc);
        push('vsc', S.Vsc);
        push('isc', Is);
        push('ir', Ir);
        push('ii', Ii);
        push('ibr', Ib);
        push('isd', Isd);
      }
    };

    // Canvas Oscilloscope Renderer
    const renderScope = (
      cv: HTMLCanvasElement,
      series: { k: string; c: string; l: string }[],
      title: string,
      zero: boolean,
      lines: { y: number; c: string }[] = []
    ) => {
      const x = cv.getContext('2d');
      if (!x) return;
      const W = cv.width,
        H = cv.height;
      x.clearRect(0, 0, W, H);

      let lo = 1e9,
        hi = -1e9;
      series.forEach((s) => {
        const buf = simState.current.buffers[s.k] || [];
        buf.forEach((v) => {
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        });
      });

      if (zero) {
        lo = Math.min(lo, 0);
        hi = Math.max(hi, 0);
      }
      lines.forEach((l) => {
        lo = Math.min(lo, l.y);
        hi = Math.max(hi, l.y);
      });

      if (!isFinite(lo)) {
        lo = 0;
        hi = 1;
      }
      if (hi - lo < 1e-6) {
        hi += 1;
        lo -= 1;
      }
      const pd = (hi - lo) * 0.08;
      lo -= pd;
      hi += pd;

      const ml = 46,
        mt = 34,
        mb = 6,
        pw = W - ml - 8,
        ph = H - mt - mb;
      const Y = (v: number) => mt + ph * (1 - (v - lo) / (hi - lo));

      x.font = '11px -apple-system, system-ui, sans-serif';
      x.lineWidth = 1;

      const isLight = document.body.classList.contains('theme-light');
      const gridColor = isLight ? '#cbd5e1' : '#272b35';
      const textColor = isLight ? '#475569' : '#6b7280';
      const titleColor = isLight ? '#0f172a' : '#f3f4f6';
      const zeroColor = isLight ? '#94a3b8' : '#4b5563';

      // Grid lines
      for (let i = 0; i <= 4; i++) {
        const v = lo + ((hi - lo) * i) / 4;
        const y = Y(v);
        x.strokeStyle = gridColor;
        x.beginPath();
        x.moveTo(ml, y);
        x.lineTo(W - 8, y);
        x.stroke();
        x.fillStyle = textColor;
        x.fillText(v.toFixed(hi - lo < 10 ? 1 : 0), 4, y + 4);
      }

      // Zero axis line
      if (lo < 0 && hi > 0) {
        x.strokeStyle = zeroColor;
        x.beginPath();
        x.moveTo(ml, Y(0));
        x.lineTo(W - 8, Y(0));
        x.stroke();
      }

      // Threshold lines
      lines.forEach((l) => {
        x.strokeStyle = l.c;
        x.setLineDash([5, 4]);
        x.beginPath();
        x.moveTo(ml, Y(l.y));
        x.lineTo(W - 8, Y(l.y));
        x.stroke();
        x.setLineDash([]);
      });

      // Scope Title
      x.fillStyle = titleColor;
      x.font = 'bold 12px -apple-system, system-ui, sans-serif';
      x.fillText(title, 8, 15);

      // Data series
      x.font = '11px -apple-system, system-ui, sans-serif';
      let lx = 8;
      series.forEach((s) => {
        const d = simState.current.buffers[s.k] || [];
        x.strokeStyle = s.c;
        x.lineWidth = 1.6;
        x.beginPath();
        d.forEach((v, i) => {
          const px = ml + (pw * (i + 800 - d.length)) / 799;
          i ? x.lineTo(px, Y(v)) : x.moveTo(px, Y(v));
        });
        x.stroke();

        const latestVal = d.length ? d[d.length - 1].toFixed(1) : '0.0';
        const legendText = `${s.l} ${latestVal}`;
        x.fillStyle = s.c;
        x.fillText(legendText, lx, 28);
        lx += x.measureText(legendText).width + 14;
      });
    };

    // Helper for fast text updating
    const f1 = (v: number, n: number = 1) => (typeof v === 'number' && isFinite(v) ? v.toFixed(n) : '0.0');
    const setTxt = (id: string, text: string) => {
      const el = containerRef.current?.querySelector<HTMLElement | SVGElement>(`#${id}`);
      if (el) el.textContent = text;
    };

    // Master Render Loop
    const render = () => {
      const S = simState.current;
      const P = paramsRef.current;
      const o = S.o;
      const V = S.Vdc;
      const E = S.E;
      const w = (j: number) => f1(j / 3600, 1) + ' Wh';
      const vm = P.vscm;

      const displayVdc = liveTelemetry ? liveTelemetry.Vdc : V;

      // 1. Animate Power Flow Paths (Synchronized with live server telemetry if connected)
      const currentIr = liveTelemetry ? liveTelemetry.Idc_rect : o.Ir;
      const currentIi = liveTelemetry ? (liveTelemetry.P_inv_dc / Math.max(liveTelemetry.Vdc, 1.0)) : o.Ii;
      const currentIb = liveTelemetry ? (liveTelemetry.P_brake / Math.max(liveTelemetry.Vdc, 1.0)) : o.Ib;
      const currentIsd = liveTelemetry ? (liveTelemetry.P_sc_bus / Math.max(liveTelemetry.Vdc, 1.0)) : o.Isd;
      const currentIs = liveTelemetry ? liveTelemetry.Isc : o.Is;
      const currentPe = liveTelemetry ? liveTelemetry.P_inv_dc : o.Pe;
      const currentPm = liveTelemetry ? liveTelemetry.P_inv_dc : o.Pm;

      const flows = [
        { v: currentIr, fwdColor: '#3b82f6', revColor: '#10b981' },
        { v: currentIr, fwdColor: '#3b82f6', revColor: '#10b981' },
        { v: currentIi, fwdColor: '#3b82f6', revColor: '#10b981' },
        { v: currentIb, fwdColor: '#ef4444', revColor: '#ef4444' },
        { v: currentIsd, fwdColor: '#10b981', revColor: '#3b82f6' },
        { v: currentIs, fwdColor: '#10b981', revColor: '#3b82f6' },
        { v: currentPe / Math.max(displayVdc, 1), fwdColor: '#3b82f6', revColor: '#10b981' },
        { v: currentPm / 200, fwdColor: '#3b82f6', revColor: '#10b981' },
      ];

      const svg = svgRef.current;
      if (svg) {
        const flowPaths = svg.querySelectorAll<SVGPathElement>('.fl-path');
        flows.forEach((fl, idx) => {
          const el = flowPaths[idx];
          if (!el) return;
          const a = Math.abs(fl.v);
          el.style.stroke = fl.v >= 0 ? fl.fwdColor : fl.revColor;
          el.style.strokeWidth = `${2 + Math.min(5, a / 12)}px`;
          el.style.opacity = a < 0.3 ? '0.1' : '1';
          S.flowOffsets[idx] -= Math.sign(fl.v) * (1 + Math.min(a, 60) / 8);
          el.setAttribute('stroke-dashoffset', S.flowOffsets[idx].toString());
        });

        // 2. Animate Elevator Cabin, Counterweight & Spinning Sheave
        if (liveTelemetry && typeof liveTelemetry.position === 'number' && isFinite(liveTelemetry.position)) {
          // Smooth exponential low-pass filter (lerp) toward target position for fluid 60 FPS rendering
          const targetFr = Math.max(0, Math.min(1, liveTelemetry.position / P.H));
          S.fr += (targetFr - S.fr) * 0.25;
          S.s += (liveTelemetry.position - S.s) * 0.25;
          if (liveTelemetry.floor) S.currentFloor = liveTelemetry.floor;
        }

        const positionFraction = S.fr;
        const ct = 70 + (1 - positionFraction) * 190;
        const cab = svg.querySelector('#cab');
        const cabm = svg.querySelector('#cabm');
        const cw = svg.querySelector('#cw');
        const r1 = svg.querySelector('#r1');
        const r2 = svg.querySelector('#r2');
        const tcw = svg.querySelector('#tcw');
        const sh = svg.querySelector('#sh');

        if (cab) cab.setAttribute('y', ct.toString());
        if (cw) cw.setAttribute('y', (70 + positionFraction * 190).toString());
        if (r1) r1.setAttribute('y2', ct.toString());
        if (r2) r2.setAttribute('y2', (70 + positionFraction * 190).toString());
        if (tcw) tcw.setAttribute('y', (96 + positionFraction * 190).toString());

        const currentCarLoad = liveTelemetry ? liveTelemetry.car_load_kg : P.load;
        const mh = (38 * currentCarLoad) / 1000;
        if (cabm) {
          cabm.setAttribute('y', (ct + 37 - mh).toString());
          cabm.setAttribute('height', mh.toString());
        }

        if (sh) {
          const rotationAngle = liveTelemetry ? (liveTelemetry.position / 0.3) * (180 / Math.PI) : (S.ang * 57.3);
          sh.setAttribute('transform', `rotate(${rotationAngle.toFixed(1)} 735 40)`);
        }

        // Brake chopper highlight
        const bk = svg.querySelector('#bk') as SVGElement;
        const chopperActive = liveTelemetry ? liveTelemetry.brake_chopper_on : Boolean(S.brk);
        if (bk) {
          bk.style.stroke = chopperActive ? 'var(--color-brake)' : 'var(--border-block)';
          bk.style.strokeWidth = chopperActive ? '2.5px' : '1.5px';
        }

        // Opacity for stage 2 supercapacitor components
        const op = P.stage === 2 ? '1' : '0.25';
        const scg = svg.querySelector('#scg') as SVGElement;
        const scl = svg.querySelector('#scl') as SVGElement;
        const scx = svg.querySelector('#scx') as SVGElement;
        if (scg) scg.style.opacity = op;
        if (scl) scl.style.opacity = op;
        if (scx) scx.style.opacity = op;
      }

      // 3. Update SVG Engineering Text Measurements in Real-Time (Synchronized with Live Server Telemetry when available)
      const displayIr = liveTelemetry ? liveTelemetry.Idc_rect : o.Ir;
      const displayPg = liveTelemetry ? liveTelemetry.P_grid / 1000 : (o.Ir * o.V) / 1000;
      const displayIi = liveTelemetry ? (liveTelemetry.P_inv_dc / Math.max(liveTelemetry.Vdc, 1.0)) : o.Ii;
      const displayPi = liveTelemetry ? liveTelemetry.P_inv_dc / 1000 : o.Pi / 1000;
      const displayIb = liveTelemetry ? (liveTelemetry.P_brake / Math.max(liveTelemetry.Vdc, 1.0)) : o.Ib;
      const displayPb = liveTelemetry ? liveTelemetry.P_brake / 1000 : (o.Ib * o.V) / 1000;
      const displayVsc = liveTelemetry ? liveTelemetry.Vsc : S.Vsc;
      const displayIsc = liveTelemetry ? liveTelemetry.Isc : o.Is;
      const displayPsc = liveTelemetry ? liveTelemetry.P_sc_bus / 1000 : (o.Is * S.Vsc) / 1000;
      const isChopperActive = liveTelemetry ? liveTelemetry.brake_chopper_on : Boolean(S.brk);

      setTxt('tIr', `Irect ${f1(displayIr)} A`);
      setTxt('tPg', `Pgrid ${f1(displayPg)} kW`);
      setTxt('tVdc', `Vdc ${f1(displayVdc)} V`);
      setTxt('tIi', `Iinv ${f1(displayIi)} A`);
      setTxt('tPi', `Pinv ${f1(displayPi)} kW`);
      setTxt('tIb', `Ibr ${f1(displayIb)} A · ${f1(displayPb)} kW`);
      setTxt('tBs', isChopperActive ? 'CHOPPER ACTIVE' : 'Chopper Standby');
      const tBsEl = containerRef.current?.querySelector<SVGElement>('#tBs');
      if (tBsEl) {
        tBsEl.style.fill = isChopperActive ? '#f87171' : '#6b7280';
        tBsEl.style.fontWeight = isChopperActive ? '700' : '400';
      }

      setTxt('tIs', `Idc ${f1(displayIsc)} A`);
      setTxt('tD', `duty D≈${f1(displayVsc / Math.max(displayVdc, 1), 2)}  ${displayPsc < -0.05 ? 'BUCK: Charging' : displayPsc > 0.05 ? 'BOOST: Discharging' : 'Idle'}`);
      setTxt('tVs', `Vsc ${f1(displayVsc)} V`);
      setTxt('tIc', `Isc ${f1(displayIsc)} A (${f1(displayPsc)} kW)`);

      setTxt('tIq', `iq ${f1(o.iq)} A pk`);
      setTxt('tFe', `fe ${f1(Math.abs(o.fe))} Hz · Vph ${f1(o.vph, 0)} V`);
      setTxt('tM', `mod. index ${f1(o.m, 2)}${o.m > 1 ? ' >1 !' : ''}`);
      const tMEl = containerRef.current?.querySelector<SVGElement>('#tM');
      if (tMEl) tMEl.style.fill = o.m > 1 ? '#ef4444' : '#94a3b8';

      const displayV = liveTelemetry ? liveTelemetry.velocity : o.vup;
      const displayF = liveTelemetry ? (liveTelemetry.Te / 0.3) / 1000 : o.F / 1000;
      const displayPm = liveTelemetry ? liveTelemetry.P_inv_dc / 1000 : o.Pm / 1000;
      setTxt('tV', `v ${f1(displayV, 2)} m/s`);
      setTxt('tF', `F ${f1(displayF, 2)} kN`);
      setTxt('tPm', `Pshaft ${f1(displayPm)} kW`);
      const statusText = displayPm > 0.05 ? 'MOTORING' : displayPm < -0.05 ? 'REGENERATING' : (liveTelemetry ? (liveTelemetry.lift_state === 'dwell' ? 'DWELL / STANDSTILL' : 'COASTING') : (S.ph === 'dwell' ? 'standstill' : 'coasting'));
      setTxt('tL', statusText);
      const tLEl = containerRef.current?.querySelector<SVGElement>('#tL');
      if (tLEl) tLEl.style.fill = displayPm > 0.05 ? '#60a5fa' : displayPm < -0.05 ? '#4ade80' : '#94a3b8';

      // 4. Update Real-Time Energy Counters (Wh) - Consistent with server session telemetry
      if (liveTelemetry?.cumulative) {
        setTxt('kg', f1(liveTelemetry.cumulative.grid_kWh * 1000, 1) + ' Wh');
        setTxt('km', f1(liveTelemetry.cumulative.motoring_kWh * 1000, 1) + ' Wh');
        setTxt('kr', f1(liveTelemetry.cumulative.regen_kWh * 1000, 1) + ' Wh');
        setTxt('kb', f1(liveTelemetry.cumulative.brake_kWh * 1000, 1) + ' Wh');
        setTxt('ks', f1(liveTelemetry.cumulative.captured_kWh * 1000, 1) + ' Wh');
        setTxt('ko', f1(liveTelemetry.cumulative.sc_out_kWh * 1000, 1) + ' Wh');
        const regenWasted = liveTelemetry.cumulative.regen_kWh > 0.001 
          ? f1((liveTelemetry.cumulative.brake_kWh / liveTelemetry.cumulative.regen_kWh) * 100, 1) + ' %'
          : '0.0 %';
        setTxt('kw', regenWasted);
        setTxt('kq', f1(liveTelemetry.soc * 100, 1) + ' %');
      } else {
        setTxt('kg', w(E.g));
        setTxt('km', w(E.m));
        setTxt('kr', w(E.rg));
        setTxt('kb', w(E.br));
        setTxt('ks', w(E.si));
        setTxt('ko', w(E.so));
        setTxt('kw', E.rg > 1 ? f1((E.br / E.rg) * 100, 0) + ' %' : '0 %');
        const socVal =
          P.stage === 2
            ? f1(Math.max(0, Math.min(100, ((S.Vsc ** 2 - (0.5 * vm) ** 2) / (vm ** 2 - (0.5 * vm) ** 2)) * 100)), 0) + ' %'
            : '-';
        setTxt('kq', socVal);
      }

      // 5. Render 7 Canvas Oscilloscopes
      const thresholdLines = [
        [],
        [],
        [{ y: P.vbr, c: '#ef4444' }, { y: P.vref, c: '#10b981' }, { y: 540, c: '#6b7280' }],
        [{ y: P.vscm, c: '#ef4444' }, { y: 0.5 * P.vscm, c: '#ef4444' }],
        [],
        [],
        [],
      ];

      SCOPES.forEach((sc, i) => {
        const cv = canvasRefs.current[i];
        if (cv) {
          renderScope(cv, sc.series, sc.title, sc.zero, thresholdLines[i]);
        }
      });

      // 6. Throttled Callback to Parent (150ms) to sync top header / KPI cards (only when not connected to live server)
      const now = performance.now();
      if (onTelemetryUpdate && !liveTelemetry && now - simState.current.lastTelemetryTs > 150) {
        simState.current.lastTelemetryTs = now;
        const currentElev = P.mode === 'manual' ? S.s : (S.dir > 0 ? S.s : Math.max(0, P.H - S.s));
        const currentFloor = P.mode === 'manual' ? S.currentFloor : Math.max(1, Math.min(10, Math.round(1 + (currentElev / P.H) * 9)));
        onTelemetryUpdate({
          time: Date.now(),
          trip_id: 1,
          lift_state: S.ph,
          direction: S.ph === 'move' ? S.dir : 0,
          floor: currentFloor,
          position: currentElev,
          velocity: o.vup,
          accel: S.af,
          car_load_kg: P.load,
          Vgrid: 400.0,
          Igrid: o.Ir,
          P_grid: o.Ir * o.V,
          Vdc: S.Vdc,
          Idc_rect: o.Ir,
          P_inv_dc: o.Pi,
          P_aux: 250.0,
          P_brake: o.Ib * o.V,
          brake_chopper_on: Boolean(S.brk),
          Vsc: S.Vsc,
          Isc: o.Is,
          P_sc_term: o.Ps,
          P_sc_bus: o.Ps,
          soc: Math.max(0, Math.min(1, (S.Vsc - 0.5 * P.vscm) / (0.5 * P.vscm))),
          dcdc_mode: o.Ps > 50 ? 'buck_charging' : o.Ps < -50 ? 'boost_discharging' : 'idle',
          duty: S.Vsc / o.V,
          SC_temp: 28.5,
          Te: (o.F * 0.3) / 12,
          motor_speed_rpm: (o.vup / 0.3) * (60 / (2 * Math.PI)),
          controller_mode: P.stage === 2 ? 'SUPERCAP_OPTIMIZED' : 'CONVENTIONAL_BRAKE_R',
          raw_action_W: o.Ps,
          approved_action_W: o.Ps,
          safety_clipped: false,
          data_quality_warning: false,
          bus_residual_pct: 0.15,
          cumulative: {
            grid_kWh: E.g / 3.6e6,
            motoring_kWh: E.m / 3.6e6,
            regen_kWh: E.rg / 3.6e6,
            captured_kWh: E.si / 3.6e6,
            sc_out_kWh: E.so / 3.6e6,
            brake_kWh: E.br / 3.6e6,
            saved_kWh: Math.max(0, (E.si - E.so * 0.05) / 3.6e6),
            cost_INR: (E.g / 3.6e6) * 8.5,
            saved_INR: Math.max(0, (E.si - E.so * 0.05) / 3.6e6) * 8.5,
            peak_kW: Math.max(o.Ir * o.V, o.Pi) / 1000,
            co2_avoided_kg: Math.max(0, (E.si - E.so * 0.05) / 3.6e6) * 0.82,
          },
        });
      }
    };

    const frame = (ts: number) => {
      const fd = Math.min(0.033, (ts - simState.current.lastTs) / 1000 || 0.016);
      simState.current.lastTs = ts;

      if (!paramsRef.current.paused) {
        const n = Math.round((fd * paramsRef.current.speed) / DT);
        for (let i = 0; i < n; i++) {
          step(DT);
        }
      }

      render();
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Real-time RL Model & Safety Supervisor Live Strip */}
      {liveTelemetry && (
        <div
          className="glass-card"
          style={{
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            borderLeft: '4px solid var(--color-purple)',
            background: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-purple" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
              RL DISPATCH LAYER
            </span>
            <div style={{ fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Policy: </span>
              <strong style={{ color: 'var(--color-purple)' }}>{liveTelemetry.controller_mode || 'RL_SAC Actor'}</strong>
              <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>•</span>
              <span style={{ color: 'var(--text-muted)' }}>SAC Raw Action: </span>
              <strong className="font-mono" style={{ color: 'var(--text-primary)' }}>
                {((liveTelemetry.raw_action_W || 0) / 1000).toFixed(2)} kW
              </strong>
              <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>➔</span>
              <span style={{ color: 'var(--text-muted)' }}>Safety Approved: </span>
              <strong className="font-mono" style={{ color: 'var(--color-sc)' }}>
                {((liveTelemetry.approved_action_W || 0) / 1000).toFixed(2)} kW
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {liveTelemetry.safety_clipped ? (
              <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertOctagon size={12} />
                <span>SUPERVISOR CLIPPED ({liveTelemetry.clip_reason || 'Boundary Enforcement'})</span>
              </span>
            ) : (
              <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>✓ 100% HARD SAFETY COMPLIANT</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Top Simulator Control Bar */}
      <div
        className="glass-card"
        style={{
          padding: '12px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'space-between',
          borderLeft: '3px solid var(--color-brand)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStage(1)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: stage === 1 ? '1px solid var(--badge-border-blue)' : '1px solid var(--border-color)',
              backgroundColor: stage === 1 ? 'var(--badge-bg-blue)' : 'var(--bg-secondary)',
              color: stage === 1 ? 'var(--color-motoring)' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Stage 1 · Conventional (Brake Resistor Only)
          </button>
          <button
            onClick={() => setStage(2)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: stage === 2 ? '1px solid var(--badge-border-green)' : '1px solid var(--border-color)',
              backgroundColor: stage === 2 ? 'var(--badge-bg-green)' : 'var(--bg-secondary)',
              color: stage === 2 ? 'var(--color-regen)' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Stage 2 · Regenerative (DC-DC + Supercapacitor)
          </button>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="manual">Manual: Interactive Floor Call</option>
            <option value="alt">Auto: Up / Down Alternate</option>
            <option value="up">Dispatch: Upward Only</option>
            <option value="down">Dispatch: Downward Only</option>
          </select>

          <button
            onClick={() => setPaused(!paused)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {paused ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={resetSim}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reset
          </button>

          {/* Voice Announcement Toggle Button */}
          <button
            onClick={() => {
              const nextState = !voiceEnabled;
              setVoiceEnabled(nextState);
              if (nextState) {
                speakAnnouncement('Elevator voice announcement system enabled.');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: voiceEnabled ? '1px solid var(--badge-border-blue)' : '1px solid var(--border-color)',
              backgroundColor: voiceEnabled ? 'var(--badge-bg-blue)' : 'var(--bg-card)',
              color: voiceEnabled ? 'var(--color-grid)' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={voiceEnabled ? 'Mute Elevator Voice Announcements' : 'Unmute Elevator Voice Announcements'}
          >
            {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>Voice {voiceEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Voice Modulation Style Selector */}
          {voiceEnabled && (
            <select
              value={voiceStyle}
              onChange={(e) => {
                const s = e.target.value as 'kone-chime' | 'broadcast' | 'warm-chime';
                setVoiceStyle(s);
                voiceStyleRef.current = s;
                if (s === 'kone-chime') speakAnnouncement('KONE standard chime tone selected.');
                if (s === 'broadcast') speakAnnouncement('Transit station public address modulation selected.');
                if (s === 'warm-chime') speakAnnouncement('Warm acoustic modulation selected.');
              }}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Select Voice & Chime Modulation Profile"
            >
              <option value="kone-chime">Tone: KONE Dual Chime (880/587 Hz)</option>
              <option value="broadcast">Tone: Transit PA Station Broadcast</option>
              <option value="warm-chime">Tone: Warm Hospitality Acoustic</option>
            </select>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ fontWeight: 600 }}>Operating Regime:</span>
          <span className="badge badge-blue">Motoring</span>
          <span className="badge badge-green">Supercap Regen</span>
          <span className="badge badge-rose">Brake Chopper</span>
        </div>
      </div>

      {/* Interactive Sliders Bar (Exact responsive layout) */}
      <div className="glass-card sliders-grid" style={{ padding: '12px 16px' }}>
        {[
          { key: 'load', label: 'Car load', min: 0, max: 1000, step: 50, val: load, set: setLoad, unit: 'kg' },
          { key: 'H', label: 'Travel height', min: 10, max: 60, step: 5, val: H, set: setH, unit: 'm' },
          { key: 'vmax', label: 'Max speed', min: 0.5, max: 4, step: 0.1, val: vmax, set: setVmax, unit: 'm/s' },
          { key: 'acc', label: 'Accel limit', min: 0.3, max: 1.5, step: 0.1, val: acc, set: setAcc, unit: 'm/s²' },
          { key: 'rbr', label: 'Brake resistor', min: 8, max: 80, step: 2, val: rbr, set: setRbr, unit: 'Ω' },
          { key: 'vbr', label: 'Chopper ON level', min: 580, max: 680, step: 5, val: vbr, set: setVbr, unit: 'V' },
          { key: 'csc', label: 'Supercap C', min: 2, max: 40, step: 1, val: csc, set: setCsc, unit: 'F' },
          { key: 'vscm', label: 'Supercap max V', min: 100, max: 300, step: 10, val: vscm, set: setVscm, unit: 'V' },
          { key: 'ilim', label: 'DC-DC current limit', min: 10, max: 200, step: 5, val: ilim, set: setIlim, unit: 'A' },
          { key: 'vref', label: 'DC-link set-point', min: 545, max: 590, step: 1, val: vref, set: setVref, unit: 'V' },
          { key: 'speed', label: 'Sim speed', min: 0.5, max: 10, step: 0.5, val: simSpeed, set: setSimSpeed, unit: '×' },
        ].map((s) => (
          <label key={s.key} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>{s.label}:</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {s.val} {s.unit}
              </strong>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.val}
              onChange={(e) => s.set(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', height: '4px' }}
            />
          </label>
        ))}
      </div>

      {/* Interactive Animated SVG Schematic & Realistic COP Lift Controller */}
      <div className="schematic-split-container">
        <div className="schematic-wrapper glass-card" style={{ padding: '12px' }}>
        <svg ref={svgRef} id="sch" viewBox="0 0 900 340" className="schematic-svg">
          {/* Static Wires */}
          <g>
            <path className="wire" d="M100,135 H130" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M210,135 H240" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M300,135 H350" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M270,70 V50" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M270,210 V232" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M270,272 V294" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M440,135 H482" stroke="#334155" strokeWidth="3" fill="none" />
            <path className="wire" d="M558,135 H640 V40 H711" stroke="#334155" strokeWidth="3" fill="none" />
          </g>

          {/* Animated Power Flow Dashed Lines */}
          <g>
            <path className="fl-path" d="M100,135 H130" stroke="#60a5fa" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M210,135 H240" stroke="#60a5fa" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M300,135 H350" stroke="#60a5fa" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M270,70 V50" stroke="#f87171" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M270,210 V232" stroke="#4ade80" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M270,272 V294" stroke="#4ade80" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M440,135 H482" stroke="#60a5fa" strokeWidth="3" strokeDasharray="9 7" fill="none" />
            <path className="fl-path" d="M558,135 H640 V40 H711" stroke="#60a5fa" strokeWidth="3" strokeDasharray="9 7" fill="none" />
          </g>

          {/* Component Blocks */}
          <g>
            <rect x="10" y="110" width="90" height="50" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            <rect x="130" y="110" width="80" height="50" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            <rect x="240" y="70" width="60" height="140" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            <rect id="bk" x="215" y="10" width="110" height="40" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            <rect x="350" y="105" width="90" height="60" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            <circle cx="520" cy="135" r="38" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />

            <g id="scg">
              <rect x="215" y="232" width="110" height="40" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
              <rect x="215" y="294" width="110" height="38" rx="6" fill="var(--bg-block)" stroke="var(--border-block)" strokeWidth="1.5" />
            </g>
          </g>

          {/* Block Labels */}
          <g textAnchor="middle" fill="var(--text-diagram-title)" style={{ font: '12px -apple-system, system-ui, sans-serif' }}>
            <text x="55" y="131" fontWeight="600">3φ GRID</text>
            <text x="55" y="148" fill="var(--text-muted)" fontSize="11px">400 V</text>
            <text x="170" y="131" fontWeight="600">DIODE</text>
            <text x="170" y="148" fill="var(--text-muted)" fontSize="11px">RECTIFIER</text>

            <text x="270" y="118" fontWeight="600">DC LINK</text>
            <text x="270" y="136">C_dc</text>
            <text x="270" y="152" fill="var(--text-muted)" fontSize="11px">4.7 mF</text>

            <text x="270" y="27" fontWeight="600">BRAKE CHOPPER</text>
            <text x="270" y="43" fill="var(--text-muted)" fontSize="11px">+ R_brake</text>

            <text x="395" y="131" fontWeight="600">INVERTER</text>
            <text x="395" y="148" fill="var(--text-muted)" fontSize="11px">3φ VSI</text>

            <text x="520" y="131" fontWeight="600">PMSM</text>
            <text x="520" y="148" fill="var(--text-muted)" fontSize="11px">gearless</text>

            <g id="scl">
              <text x="270" y="248" fontWeight="600">BIDIR DC-DC</text>
              <text x="270" y="264" fill="var(--text-muted)" fontSize="11px">buck / boost</text>
              <text x="270" y="311" fontWeight="600">SUPERCAP</text>
              <text x="270" y="326" fill="var(--text-muted)" fontSize="11px">bank</text>
            </g>
          </g>

          {/* Real-Time Live Measurement Annotations (Dynamically updated via IDs) */}
          <g fill="var(--text-diagram-title)" style={{ font: '11px -apple-system, system-ui, sans-serif' }}>
            <text id="tIr" x="100" y="190" fill="var(--text-muted)">Irect 0.0 A</text>
            <text id="tPg" x="100" y="206" fill="var(--text-muted)">Pgrid 0.0 kW</text>

            <text id="tVdc" x="306" y="96" fontWeight="700" fill="var(--color-grid)" fontSize="13px">Vdc 560.0 V</text>
            <text id="tIi" x="355" y="190" fill="var(--text-muted)">Iinv 0.0 A</text>
            <text id="tPi" x="355" y="206" fill="var(--text-muted)">Pinv 0.0 kW</text>

            <text id="tIb" x="332" y="24" fill="var(--text-muted)">Ibr 0.0 A · 0.0 kW</text>
            <text id="tBs" x="332" y="40" fill="var(--text-muted)" fontWeight="400">
              chopper off
            </text>

            <g id="scx">
              <text id="tIs" x="332" y="248" fill="var(--text-muted)">Idc 0.0 A</text>
              <text id="tD" x="332" y="264" fill="var(--text-muted)">duty D≈0.23 idle</text>
              <text id="tVs" x="332" y="308" fill="var(--color-sc)" fontWeight="600">Vsc 130.0 V</text>
              <text id="tIc" x="332" y="324" fill="var(--text-muted)">Isc 0.0 A (0.0 kW)</text>
            </g>

            <text id="tIq" x="468" y="190" fill="var(--text-muted)">iq 0.0 A pk</text>
            <text id="tFe" x="468" y="206" fill="var(--text-muted)">fe 0.0 Hz · Vph 0 V</text>
            <text id="tM" x="468" y="222" fill="var(--text-muted)">mod. index 0.00</text>

            {/* Shaft motion readouts */}
            <text id="tV" x="800" y="110" fontWeight="600" fill="var(--color-motoring)">v 0.00 m/s</text>
            <text id="tF" x="800" y="128" fill="var(--color-warning)">F 0.00 kN</text>
            <text id="tPm" x="800" y="146" fill="var(--text-muted)">Pshaft 0.0 kW</text>
            <text id="tL" x="800" y="164" fontWeight="700" fill="var(--text-muted)">
              standstill
            </text>
          </g>

          {/* Elevator Shaft Guide Lines */}
          <line x1="670" y1="70" x2="795" y2="70" stroke="#334155" strokeDasharray="3 3" />
          <line x1="670" y1="300" x2="795" y2="300" stroke="#334155" strokeDasharray="3 3" />
          <text x="640" y="74" fill="#6b7280" fontSize="11px">top</text>
          <text x="620" y="304" fill="#6b7280" fontSize="11px">bottom</text>

          {/* Elevator Cabin & Counterweight */}
          <line id="r1" x1="711" y1="40" x2="711" y2="70" stroke="#94a3b8" strokeWidth="2" />
          <line id="r2" x1="759" y1="40" x2="759" y2="70" stroke="#94a3b8" strokeWidth="2" />

          {/* Moving Elevator Cabin with passenger load box inside */}
          <rect id="cab" x="690" y="70" width="44" height="40" rx="4" fill="var(--bg-block)" stroke="#3b82f6" strokeWidth="2" />
          <rect id="cabm" x="693" y="100" width="38" height="0" fill="#d97706" opacity="0.65" />

          {/* Moving Counterweight */}
          <rect id="cw" x="737" y="70" width="44" height="52" rx="4" fill="var(--bg-block)" stroke="#64748b" strokeWidth="2" />
          <text id="tcw" x="745" y="96" fill="var(--text-muted)" fontSize="11px" fontWeight="600">CW</text>

          {/* Rotating Sheave */}
          <g id="sh">
            <circle cx="735" cy="40" r="24" fill="var(--bg-block)" stroke="var(--text-diagram-title)" strokeWidth="2" />
            <line x1="735" y1="18" x2="735" y2="62" stroke="var(--text-diagram-title)" strokeWidth="1.5" />
            <line x1="713" y1="40" x2="757" y2="40" stroke="var(--text-diagram-title)" strokeWidth="1.5" />
          </g>
        </svg>
        </div>

        {/* Authentic Car Operating Panel (COP) Elevator Controller Fixture */}
        <div className="elevator-cop-fixture">
          <div className="cop-header">
            <span className="cop-brand">KONE CONTROLLER</span>
          </div>

          {/* LED Digital Floor Indicator Display */}
          <div className="cop-led-display">
            <div className="cop-floor-number">
              {currentFloor < 10 ? `0${currentFloor}` : currentFloor}
            </div>
            <div className="cop-status-column">
              <div
                className={`cop-direction-indicator ${
                  targetFloor !== null && targetFloor > currentFloor
                    ? 'moving-up'
                    : targetFloor !== null && targetFloor < currentFloor
                    ? 'moving-down'
                    : 'idle'
                }`}
              >
                {targetFloor !== null && targetFloor > currentFloor
                  ? '▲'
                  : targetFloor !== null && targetFloor < currentFloor
                  ? '▼'
                  : '●'}
              </div>
              <span className="cop-subtext">
                {isWaitingUserInput ? 'STANDBY' : targetFloor ? `TO F${targetFloor}` : 'MOVE'}
              </span>
            </div>
          </div>

          {/* Real 2-Column Push-Button Keypad (Floors 10 down to 1) */}
          <div className="cop-keypad">
            {[
              [9, 10],
              [7, 8],
              [5, 6],
              [3, 4],
              [1, 2],
            ].map(([fLeft, fRight]) => (
              <React.Fragment key={fLeft}>
                <button
                  className={`cop-round-btn ${fLeft === currentFloor ? 'active-current' : ''} ${fLeft === targetFloor ? 'active-target' : ''}`}
                  onClick={() => handleSelectFloor(fLeft)}
                  disabled={!isWaitingUserInput && fLeft !== targetFloor}
                  title={`Call Floor ${fLeft}`}
                >
                  {fLeft}
                </button>
                <button
                  className={`cop-round-btn ${fRight === currentFloor ? 'active-current' : ''} ${fRight === targetFloor ? 'active-target' : ''}`}
                  onClick={() => handleSelectFloor(fRight)}
                  disabled={!isWaitingUserInput && fRight !== targetFloor}
                  title={`Call Floor ${fRight}`}
                >
                  {fRight}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Elevator Door / Alarm auxiliary buttons with interactive feedback */}
          <div className="cop-actions">
            <button
              className="cop-action-btn"
              onClick={() => {
                if (isWaitingUserInput) {
                  setPromptMessage(`Floor ${currentFloor}: Doors OPENED for boarding.`);
                  speakAnnouncement('Doors opening.');
                }
              }}
              title="Open Elevator Doors"
            >
              ◄► OPEN
            </button>
            <button
              className="cop-action-btn"
              onClick={() => {
                if (isWaitingUserInput) {
                  setPromptMessage(`Floor ${currentFloor}: Doors CLOSED. Select destination floor.`);
                  speakAnnouncement('Doors closing.');
                }
              }}
              title="Close Elevator Doors"
            >
              ►◄ CLOSE
            </button>
            <button
              className={`cop-action-btn ${isAlarmActive ? 'cop-alarm-active' : ''}`}
              style={{
                color: '#ef4444',
                fontWeight: 800,
                borderColor: isAlarmActive ? '#ef4444' : undefined,
                backgroundColor: isAlarmActive ? 'rgba(239, 68, 68, 0.2)' : undefined,
                animation: isAlarmActive ? 'pulse-alarm 0.8s infinite' : undefined,
              }}
              onClick={() => {
                setIsAlarmActive(true);
                setPromptMessage(`🚨 EMERGENCY ALARM ACTIVE: Please remain calm. Intercom connected.`);
                const S = simState.current;
                S.v = 0;
                S.af = 0;
                S.ph = 'dwell';
                S.targetFloor = null;
                S.isWaitingInput = true;
                setTargetFloor(null);
                setIsWaitingUserInput(true);

                // Priority emergency voice broadcast as requested
                speakAnnouncement(
                  'Emergency alarm activated. Please do not panic. Call for help through the intercom or press the alarm button. Assistance is on the way.',
                  true
                );

                setTimeout(() => setIsAlarmActive(false), 8000);
              }}
              title="Emergency Alarm / Assistance Broadcast"
            >
              🔔 ALARM
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Energy Counters Row (Exact Wh metrics with IDs) */}
      <div className="kpi-counters-grid">
        {[
          { id: 'kg', label: 'Grid energy drawn', color: '#60a5fa' },
          { id: 'km', label: 'Motoring (DC side)', color: '#3b82f6' },
          { id: 'kr', label: 'Regen into DC link', color: '#10b981' },
          { id: 'kb', label: 'Burnt in brake R', color: '#ef4444' },
          { id: 'ks', label: 'Into supercap', color: '#4ade80' },
          { id: 'ko', label: 'Out of supercap', color: '#38bdf8' },
          { id: 'kw', label: 'Regen wasted', color: '#f59e0b' },
          { id: 'kq', label: 'Supercap usable SOC', color: '#a855f7' },
        ].map((kp) => (
          <div
            key={kp.id}
            className="glass-card"
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{kp.label}</div>
            <strong
              id={kp.id}
              style={{
                display: 'block',
                fontSize: '1.05rem',
                color: kp.color,
                marginTop: '2px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              0.0 Wh
            </strong>
          </div>
        ))}
      </div>

      {/* 7 Real-Time Rolling Waveform Oscilloscopes (Responsive Grid) */}
      <div className="oscilloscope-grid">
        {SCOPES.map((sc, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              backgroundColor: 'var(--bg-scope)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
            }}
          >
            <canvas
              ref={(el) => {
                canvasRefs.current[i] = el;
              }}
              width={600}
              height={190}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
