"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const S  = "rgba(180,230,245,0.82)";
const SW = 1.8;
const F  = "rgba(255,255,255,0.08)";

// ─── 1. Rocket ────────────────────────────────────────────────────────────────
function RocketIll() {
  const stars = [[18,22],[162,38],[28,148],[155,132],[98,14],[44,92],[158,82],[80,162],[130,18],[14,70]];
  return (
    <div style={{ position: "relative", width: 200, height: 200, margin: "auto" }}>
      <svg viewBox="0 0 200 200" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {stars.map(([x,y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="rgba(180,230,245,0.7)"
            animate={{ opacity:[0.2,1,0.2] }} transition={{ duration:1.4+i*0.3, repeat:Infinity, delay:i*0.18, ease:"easeInOut" }} />
        ))}
      </svg>
      <motion.div animate={{ rotate:[0,360] }} transition={{ duration:10, repeat:Infinity, ease:"linear" }}
        style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg viewBox="0 0 80 110" fill="none" style={{ width:120, height:150 }}>
          <ellipse cx="40" cy="54" rx="14" ry="28" fill={F} stroke={S} strokeWidth={SW} />
          <path d="M26 36 Q40 8 54 36" fill="rgba(255,255,255,0.13)" stroke={S} strokeWidth={SW} />
          <circle cx="40" cy="50" r="8" fill={F} stroke={S} strokeWidth={SW} />
          <circle cx="40" cy="50" r="4" fill="rgba(180,230,245,0.25)" stroke={S} strokeWidth={1} />
          <path d="M26 68 L13 86 L26 80" fill={F} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M54 68 L67 86 L54 80" fill={F} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          <motion.g animate={{ scaleY:[0.7,1.4,0.7], opacity:[0.5,1,0.5] }}
            transition={{ duration:0.45, repeat:Infinity, ease:"easeInOut" }}
            style={{ transformOrigin:"40px 82px" }}>
            <path d="M30 80 Q40 100 50 80" fill="rgba(255,130,20,0.4)" stroke="rgba(255,130,20,0.75)" strokeWidth={1.5} />
            <path d="M34 80 Q40 92 46 80" fill="rgba(255,215,50,0.55)" stroke="rgba(255,215,50,0.85)" strokeWidth={1} />
          </motion.g>
          <motion.g animate={{ opacity:[0,0.65,0] }} transition={{ duration:1.1, repeat:Infinity, ease:"easeInOut" }}>
            <line x1="17" y1="54" x2="26" y2="54" stroke={S} strokeWidth={1} strokeLinecap="round" />
            <line x1="13" y1="61" x2="24" y2="61" stroke={S} strokeWidth={1} strokeLinecap="round" />
            <line x1="54" y1="54" x2="63" y2="54" stroke={S} strokeWidth={1} strokeLinecap="round" />
            <line x1="56" y1="61" x2="67" y2="61" stroke={S} strokeWidth={1} strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 2. Race Car ──────────────────────────────────────────────────────────────
function RaceCarIll() {
  return (
    <div style={{ width:220, height:160, margin:"auto", overflow:"hidden" }}>
      <motion.div animate={{ y:[0,-3,0,-2,0] }} transition={{ duration:0.38, repeat:Infinity, ease:"easeInOut" }}>
        <svg viewBox="0 0 200 110" fill="none" style={{ width:"100%", height:"auto" }} overflow="hidden">
          <defs><clipPath id="road"><rect x="0" y="95" width="200" height="15"/></clipPath></defs>
          <g clipPath="url(#road)">
            <motion.g animate={{ x:[0,-50] }} transition={{ duration:0.45, repeat:Infinity, ease:"linear" }}>
              {[0,50,100,150,200,250].map(x=>(
                <line key={x} x1={x} y1="103" x2={x+30} y2="103" stroke="rgba(180,230,245,0.35)" strokeWidth="2" strokeLinecap="round" />
              ))}
            </motion.g>
          </g>
          <path d="M18 76 L18 62 Q20 52 38 48 L78 42 Q104 38 120 42 L156 54 Q165 57 167 64 L167 76 Z" fill={F} stroke={S} strokeWidth={SW} />
          <path d="M68 48 L82 36 Q93 32 110 36 L132 48" fill={F} stroke={S} strokeWidth={SW} />
          <path d="M78 48 L88 38 Q97 34 109 38 L122 48" fill="rgba(180,230,245,0.12)" stroke={S} strokeWidth={1} />
          <line x1="93" y1="38" x2="93" y2="48" stroke={S} strokeWidth={1} opacity="0.4" />
          {/* Front wheel */}
          <motion.g animate={{ rotate:[0,360] }} transition={{ duration:0.35, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"48px 80px" }}>
            <circle cx="48" cy="80" r="16" fill={F} stroke={S} strokeWidth={SW} />
            <line x1="48" y1="65" x2="48" y2="95" stroke={S} strokeWidth={1.5} />
            <line x1="33" y1="80" x2="63" y2="80" stroke={S} strokeWidth={1.5} />
            <circle cx="48" cy="80" r="4" fill="rgba(180,230,245,0.35)" stroke={S} strokeWidth={1} />
          </motion.g>
          {/* Rear wheel */}
          <motion.g animate={{ rotate:[0,360] }} transition={{ duration:0.35, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"138px 80px" }}>
            <circle cx="138" cy="80" r="16" fill={F} stroke={S} strokeWidth={SW} />
            <line x1="138" y1="65" x2="138" y2="95" stroke={S} strokeWidth={1.5} />
            <line x1="123" y1="80" x2="153" y2="80" stroke={S} strokeWidth={1.5} />
            <circle cx="138" cy="80" r="4" fill="rgba(180,230,245,0.35)" stroke={S} strokeWidth={1} />
          </motion.g>
          {[42,52,62,72].map((y,i)=>(
            <motion.line key={y} x1={18} y1={y} x2={6} y2={y} stroke={S} strokeWidth={1} strokeLinecap="round"
              animate={{ opacity:[0,0.7,0], x:[0,-10,-20] }}
              transition={{ duration:0.45, repeat:Infinity, delay:i*0.04, ease:"linear" }} />
          ))}
          <motion.g animate={{ x:[-4,-14,-24], opacity:[0.7,0.35,0] }} transition={{ duration:0.35, repeat:Infinity, ease:"linear" }}>
            <circle cx="10" cy="68" r="5" fill="rgba(180,230,245,0.12)" stroke="rgba(180,230,245,0.25)" strokeWidth={1} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 3. Satellite ─────────────────────────────────────────────────────────────
function SatelliteIll() {
  return (
    <div style={{ width:200, height:200, margin:"auto", position:"relative" }}>
      {[1,2,3].map(i=>(
        <motion.div key={i}
          animate={{ scale:[0.2,2.8], opacity:[0.65,0] }}
          transition={{ duration:2.8, repeat:Infinity, delay:i*0.9, ease:"easeOut" }}
          style={{ position:"absolute", top:"50%", left:"50%", width:40, height:40,
            marginTop:-20, marginLeft:-20, borderRadius:"50%",
            border:"1.5px solid rgba(180,230,245,0.75)", pointerEvents:"none" }} />
      ))}
      <motion.div animate={{ rotate:[0,360] }} transition={{ duration:14, repeat:Infinity, ease:"linear" }}
        style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg viewBox="0 0 120 80" fill="none" style={{ width:180, height:120 }}>
          <rect x="4" y="28" width="38" height="24" rx="3" fill={F} stroke={S} strokeWidth={SW} />
          {[13,24].map(x=><line key={x} x1={x} y1="28" x2={x} y2="52" stroke={S} strokeWidth={1} key={x}/>)}
          <line x1="4" y1="40" x2="42" y2="40" stroke={S} strokeWidth={1} />
          <rect x="78" y="28" width="38" height="24" rx="3" fill={F} stroke={S} strokeWidth={SW} />
          {[91,102].map(x=><line key={x} x1={x} y1="28" x2={x} y2="52" stroke={S} strokeWidth={1}/>)}
          <line x1="78" y1="40" x2="116" y2="40" stroke={S} strokeWidth={1} />
          <line x1="42" y1="40" x2="50" y2="40" stroke={S} strokeWidth={SW} />
          <line x1="70" y1="40" x2="78" y2="40" stroke={S} strokeWidth={SW} />
          <rect x="50" y="22" width="20" height="36" rx="4" fill={F} stroke={S} strokeWidth={SW} />
          <line x1="60" y1="22" x2="60" y2="8" stroke={S} strokeWidth={SW} strokeLinecap="round" />
          <circle cx="60" cy="7" r="3" fill={F} stroke={S} strokeWidth={SW} />
          <motion.circle cx="60" cy="40" r="5" fill="rgba(180,230,245,0.2)" stroke={S} strokeWidth={1}
            animate={{ r:[5,7,5], opacity:[0.5,1,0.5] }} transition={{ duration:1.4, repeat:Infinity, ease:"easeInOut" }} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 4. Paper Plane ───────────────────────────────────────────────────────────
function PaperPlaneIll() {
  const pts = [
    { x:10,  y:90,  r:-18 },
    { x:70,  y:30,  r:8   },
    { x:155, y:60,  r:14  },
    { x:125, y:130, r:-4  },
    { x:40,  y:148, r:-22 },
    { x:10,  y:90,  r:-18 },
  ];
  return (
    <div style={{ width:200, height:200, margin:"auto", position:"relative" }}>
      <svg viewBox="0 0 200 200" fill="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
        <path d="M10 90 C50 10 140 18 158 62 C174 100 126 158 40 150 C16 146 4 116 10 90"
          fill="none" stroke="rgba(180,230,245,0.28)" strokeWidth="1.5" strokeDasharray="4 6" />
      </svg>
      <motion.div style={{ position:"absolute", top:0, left:0 }}
        animate={{ x:pts.map(p=>p.x), y:pts.map(p=>p.y), rotate:pts.map(p=>p.r) }}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut", times:[0,0.2,0.4,0.6,0.8,1] }}>
        <svg viewBox="0 0 40 28" fill="none" style={{ width:40, height:28 }}>
          <path d="M2 14 L38 3 L28 14 L38 25 Z" fill="rgba(255,255,255,0.13)" stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M2 14 L28 14 L22 25" fill={F} stroke={S} strokeWidth={1} strokeLinejoin="round" />
          <line x1="28" y1="14" x2="15" y2="9" stroke={S} strokeWidth={1} opacity="0.45" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 5. Submarine ─────────────────────────────────────────────────────────────
function SubmarineIll() {
  const bubbles = [25,55,90,130,175].map((x,i)=>({ x, delay:i*0.65, size:5+i%3*2 }));
  return (
    <div style={{ width:220, height:190, margin:"auto", position:"relative", overflow:"hidden" }}>
      {bubbles.map((b,i)=>(
        <motion.div key={i} animate={{ y:[185,-15], opacity:[0,0.7,0.7,0] }}
          transition={{ duration:3+i*0.4, repeat:Infinity, delay:b.delay, ease:"easeInOut" }}
          style={{ position:"absolute", left:b.x, top:0, width:b.size, height:b.size,
            borderRadius:"50%", border:"1.5px solid rgba(180,230,245,0.6)" }} />
      ))}
      {[1,2].map(i=>(
        <motion.div key={i} animate={{ scale:[0.1,3.5], opacity:[0.7,0] }}
          transition={{ duration:3, repeat:Infinity, delay:i*1.4, ease:"easeOut" }}
          style={{ position:"absolute", top:"38%", right:"8%", width:28, height:28,
            marginTop:-14, marginRight:-14, borderRadius:"50%",
            border:"1.5px solid rgba(180,230,245,0.6)" }} />
      ))}
      <motion.div animate={{ x:[0,8,0,-6,0], y:[0,-4,0,3,0] }}
        transition={{ duration:5.5, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"28%", left:"5%", width:"88%" }}>
        <svg viewBox="0 0 160 68" fill="none" style={{ width:"100%", height:"auto" }}>
          <ellipse cx="78" cy="42" rx="68" ry="22" fill={F} stroke={S} strokeWidth={SW} />
          <rect x="60" y="20" width="30" height="22" rx="6" fill={F} stroke={S} strokeWidth={SW} />
          <line x1="70" y1="20" x2="70" y2="5" stroke={S} strokeWidth={SW} strokeLinecap="round" />
          <line x1="70" y1="5" x2="84" y2="5" stroke={S} strokeWidth={SW} strokeLinecap="round" />
          <circle cx="85" cy="5" r="2.5" fill={F} stroke={S} strokeWidth={1} />
          <circle cx="58" cy="44" r="8" fill={F} stroke={S} strokeWidth={SW} />
          <circle cx="58" cy="44" r="4" fill="rgba(180,230,245,0.18)" stroke={S} strokeWidth={1} />
          <circle cx="88" cy="44" r="6" fill={F} stroke={S} strokeWidth={SW} />
          <circle cx="112" cy="46" r="5" fill={F} stroke={S} strokeWidth={SW} />
          <motion.g animate={{ rotate:[0,360] }} transition={{ duration:0.9, repeat:Infinity, ease:"linear" }}
            style={{ transformOrigin:"148px 42px" }}>
            <ellipse cx="148" cy="34" rx="3" ry="8" fill={F} stroke={S} strokeWidth={1.5} />
            <ellipse cx="148" cy="50" rx="3" ry="8" fill={F} stroke={S} strokeWidth={1.5} />
            <circle cx="148" cy="42" r="3" fill="rgba(180,230,245,0.3)" stroke={S} strokeWidth={1} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 6. Pinball ───────────────────────────────────────────────────────────────
function PinballIll() {
  const ball = [
    { cx:95, cy:155 },{ cx:95, cy:46 },{ cx:52, cy:78 },
    { cx:132, cy:88 },{ cx:80, cy:118 },{ cx:95, cy:155 },
  ];
  const bumpers = [{ cx:52,cy:78 },{ cx:132,cy:88 },{ cx:80,cy:118 }];
  return (
    <div style={{ width:190, height:215, margin:"auto" }}>
      <svg viewBox="0 0 190 215" fill="none" style={{ width:"100%", height:"100%" }}>
        <path d="M20 10 L170 10 L170 182 Q170 200 150 200 L40 200 Q20 200 20 182 Z" fill={F} stroke={S} strokeWidth={SW} />
        <line x1="146" y1="100" x2="146" y2="196" stroke={S} strokeWidth={1} strokeDasharray="3 4" opacity="0.4" />
        <path d="M34 190 L74 178" stroke={S} strokeWidth={3} strokeLinecap="round" />
        <path d="M116 178 L142 190" stroke={S} strokeWidth={3} strokeLinecap="round" />
        {bumpers.map(({cx,cy},i)=>(
          <g key={i}>
            <motion.circle cx={cx} cy={cy} r="17" fill={F} stroke={S} strokeWidth={SW}
              animate={{ fill:[F,"rgba(180,230,245,0.32)",F] }}
              transition={{ duration:1.8, repeat:Infinity, delay:i*0.65, ease:"easeInOut" }} />
            <circle cx={cx} cy={cy} r="10" fill={F} stroke={S} strokeWidth={1} />
            <circle cx={cx} cy={cy} r="5" fill="rgba(180,230,245,0.2)" />
          </g>
        ))}
        <motion.circle r="6" fill="rgba(255,255,255,0.88)" stroke={S} strokeWidth={1}
          animate={{ cx:ball.map(b=>b.cx), cy:ball.map(b=>b.cy) }}
          transition={{ duration:2.4, repeat:Infinity, ease:"easeInOut", times:[0,0.18,0.38,0.58,0.78,1] }} />
        {[38,78,118].map((x,i)=>(
          <motion.circle key={x} cx={x} cy={28} r={3} fill="rgba(180,230,245,0.5)"
            animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:0.9, repeat:Infinity, delay:i*0.28 }} />
        ))}
      </svg>
    </div>
  );
}

// ─── 7. Circuit Board ─────────────────────────────────────────────────────────
function CircuitIll() {
  const traces: { pts: [number,number][], times: number[], delay: number }[] = [
    { pts:[[18,58],[58,58],[58,38],[122,38],[122,58],[162,58]], times:[0,.2,.35,.65,.8,1], delay:0 },
    { pts:[[58,38],[58,18],[100,18]], times:[0,.5,1], delay:0.5 },
    { pts:[[122,58],[122,82],[80,82],[80,108],[140,108]], times:[0,.25,.45,.65,1], delay:1.0 },
    { pts:[[18,98],[48,98],[48,78]], times:[0,.6,1], delay:1.5 },
    { pts:[[140,108],[162,108],[162,80]], times:[0,.6,1], delay:0.8 },
  ];
  return (
    <div style={{ width:200, height:190, margin:"auto" }}>
      <svg viewBox="0 0 180 155" fill="none" style={{ width:"100%", height:"100%" }}>
        {traces.map(({pts},i)=>(
          <polyline key={i} points={pts.map(p=>p.join(",")).join(" ")}
            fill="none" stroke="rgba(180,230,245,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {traces.map(({pts,times,delay},i)=>(
          <motion.circle key={i} r="3.5" fill="rgba(180,230,245,0.92)"
            animate={{ cx:pts.map(p=>p[0]), cy:pts.map(p=>p[1]), opacity:[0,1,1,1,1,0] }}
            transition={{ duration:1.8, repeat:Infinity, delay, ease:"linear", times }} />
        ))}
        <rect x="48" y="28" width="84" height="84" rx="6" fill={F} stroke={S} strokeWidth={SW} />
        <rect x="56" y="36" width="68" height="68" rx="4" fill="rgba(180,230,245,0.04)" stroke={S} strokeWidth={1} />
        {[0,1,2,3].map(i=>(
          <g key={i}>
            <line x1={62+i*18} y1="28" x2={62+i*18} y2="20" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
            <line x1={62+i*18} y1="112" x2={62+i*18} y2="120" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
            <line x1="48" y1={40+i*18} x2="38" y2={40+i*18} stroke={S} strokeWidth={1.5} strokeLinecap="round" />
            <line x1="132" y1={40+i*18} x2="142" y2={40+i*18} stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          </g>
        ))}
        <text x="90" y="74" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(180,230,245,0.65)">CPU</text>
        <motion.circle cx="90" cy="70" r="9" fill="rgba(180,230,245,0.08)" stroke={S} strokeWidth={1}
          animate={{ r:[9,13,9], opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }} />
      </svg>
    </div>
  );
}

// ─── 8. Hot Air Balloon ───────────────────────────────────────────────────────
function BalloonIll() {
  return (
    <div style={{ width:160, height:220, margin:"auto" }}>
      <motion.div animate={{ y:[0,-16,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}>
        <svg viewBox="0 0 110 205" fill="none" style={{ width:"100%", height:"auto" }}>
          <ellipse cx="55" cy="84" rx="48" ry="56" fill={F} stroke={S} strokeWidth={SW} />
          <path d="M55 28 Q37 84 55 140" fill="none" stroke={S} strokeWidth={1} opacity="0.45" />
          <path d="M55 28 Q73 84 55 140" fill="none" stroke={S} strokeWidth={1} opacity="0.45" />
          <path d="M55 28 Q20 72 22 128" fill="none" stroke={S} strokeWidth={1} opacity="0.32" />
          <path d="M55 28 Q90 72 88 128" fill="none" stroke={S} strokeWidth={1} opacity="0.32" />
          <path d="M8 88 Q55 102 102 88" fill="none" stroke={S} strokeWidth={1} opacity="0.38" />
          <path d="M14 66 Q55 76 96 66" fill="none" stroke={S} strokeWidth={1} opacity="0.28" />
          <circle cx="55" cy="28" r="5" fill={F} stroke={S} strokeWidth={SW} />
          <line x1="38" y1="140" x2="34" y2="162" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          <line x1="55" y1="140" x2="55" y2="162" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          <line x1="72" y1="140" x2="76" y2="162" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          <rect x="30" y="161" width="50" height="30" rx="5" fill={F} stroke={S} strokeWidth={SW} />
          <line x1="30" y1="171" x2="80" y2="171" stroke={S} strokeWidth={1} />
          <line x1="47" y1="161" x2="47" y2="191" stroke={S} strokeWidth={1} />
          <line x1="63" y1="161" x2="63" y2="191" stroke={S} strokeWidth={1} />
          <motion.g animate={{ scaleY:[0.7,1.4,0.7], opacity:[0.55,1,0.55] }}
            transition={{ duration:0.38, repeat:Infinity, ease:"easeInOut" }}
            style={{ transformOrigin:"55px 164px" }}>
            <path d="M46 162 Q55 146 64 162" fill="rgba(255,135,20,0.5)" stroke="rgba(255,135,20,0.8)" strokeWidth={1.5} />
            <path d="M49 162 Q55 152 61 162" fill="rgba(255,215,55,0.6)" stroke="rgba(255,215,55,0.9)" strokeWidth={1} />
          </motion.g>
          <ellipse cx="55" cy="178" rx="6" ry="6" fill={F} stroke={S} strokeWidth={1} />
          <rect x="51" y="182" width="8" height="8" rx="2" fill={F} stroke={S} strokeWidth={1} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── 9. Snow Globe ────────────────────────────────────────────────────────────
const FLAKES = [
  {x:48,delay:0,s:2},{x:68,delay:0.55,s:3},{x:88,delay:1.1,s:2},{x:108,delay:1.65,s:3},
  {x:58,delay:0.28,s:2},{x:78,delay:0.82,s:2},{x:98,delay:1.4,s:3},{x:118,delay:0.95,s:2},
  {x:52,delay:1.8,s:2},{x:72,delay:0.18,s:3},{x:92,delay:1.05,s:2},{x:112,delay:0.7,s:2},
];

function SnowGlobeIll() {
  return (
    <div style={{ width:180, height:215, margin:"auto", position:"relative" }}>
      <svg viewBox="0 0 160 200" fill="none" style={{ width:"100%", height:"auto" }}>
        <defs>
          <clipPath id="globe-clip">
            <circle cx="80" cy="88" r="66" />
          </clipPath>
        </defs>
        <ellipse cx="80" cy="177" rx="50" ry="13" fill={F} stroke={S} strokeWidth={SW} />
        <rect x="56" y="167" width="48" height="14" rx="2" fill={F} stroke={S} strokeWidth={SW} />
        <circle cx="80" cy="88" r="66" fill="rgba(180,230,245,0.04)" stroke={S} strokeWidth={SW} />
        <path d="M30 66 Q42 30 80 24 Q118 30 130 66" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g clipPath="url(#globe-clip)">
          {FLAKES.map((f,i)=>(
            <motion.circle key={i} cx={f.x} cy={f.delay*8+30} r={f.s}
              fill="rgba(180,230,245,0.75)"
              animate={{ cy:[f.delay*8+30, 148], opacity:[0,0.9,0.9,0] }}
              transition={{ duration:3+f.delay%1.5, repeat:Infinity, delay:f.delay, ease:"easeIn" }} />
          ))}
          <path d="M26 150 Q80 142 134 150" fill="rgba(255,255,255,0.09)" stroke={S} strokeWidth={1} />
          <ellipse cx="80" cy="116" rx="13" ry="14" fill={F} stroke={S} strokeWidth={1.5} />
          <ellipse cx="80" cy="106" rx="13" ry="7" fill={F} stroke={S} strokeWidth={1.5} />
          <rect x="70" y="128" width="20" height="20" rx="6" fill={F} stroke={S} strokeWidth={1.5} />
          <line x1="70" y1="132" x2="60" y2="142" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          <line x1="90" y1="132" x2="100" y2="142" stroke={S} strokeWidth={1.5} strokeLinecap="round" />
          <line x1="74" y1="148" x2="74" y2="154" stroke={S} strokeWidth={2} strokeLinecap="round" />
          <line x1="86" y1="148" x2="86" y2="154" stroke={S} strokeWidth={2} strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// ─── 10. Orrery ───────────────────────────────────────────────────────────────
function OrreryIll() {
  const teeth = Array.from({length:12},(_,i)=>{
    const a = (i/12)*Math.PI*2;
    return { x1:90+Math.cos(a)*76, y1:90+Math.sin(a)*76, x2:90+Math.cos(a)*84, y2:90+Math.sin(a)*84 };
  });
  return (
    <div style={{ width:200, height:200, margin:"auto" }}>
      <svg viewBox="0 0 180 180" fill="none" style={{ width:"100%", height:"100%" }}>
        <circle cx="90" cy="90" r="34" stroke="rgba(180,230,245,0.2)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="90" cy="90" r="57" stroke="rgba(180,230,245,0.15)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="90" cy="90" r="76" stroke="rgba(180,230,245,0.1)" strokeWidth="1" strokeDasharray="3 5" />
        {teeth.map((t,i)=><line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={S} strokeWidth={2} strokeLinecap="round" opacity="0.38" />)}
        <motion.circle cx="90" cy="90" r="14" fill={F} stroke={S} strokeWidth={SW}
          animate={{ r:[14,16,14] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }} />
        <motion.circle cx="90" cy="90" r="8" fill="rgba(255,200,50,0.28)" stroke="rgba(255,200,50,0.6)" strokeWidth={1}
          animate={{ r:[8,11,8], opacity:[0.5,1,0.5] }} transition={{ duration:1.4, repeat:Infinity, ease:"easeInOut" }} />
        {/* Fast inner planet */}
        <motion.g animate={{ rotate:[0,360] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"90px 90px" }}>
          <line x1="90" y1="90" x2="124" y2="90" stroke={S} strokeWidth={1} opacity="0.28" />
          <circle cx="124" cy="90" r="7" fill={F} stroke={S} strokeWidth={SW} />
          <circle cx="124" cy="90" r="3" fill="rgba(180,230,245,0.3)" />
        </motion.g>
        {/* Mid planet with ring */}
        <motion.g animate={{ rotate:[0,360] }} transition={{ duration:9, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"90px 90px" }}>
          <line x1="90" y1="90" x2="147" y2="90" stroke={S} strokeWidth={1} opacity="0.2" />
          <circle cx="147" cy="90" r="9" fill={F} stroke={S} strokeWidth={SW} />
          <ellipse cx="147" cy="90" rx="16" ry="5" fill="none" stroke={S} strokeWidth={1} opacity="0.5" />
          <circle cx="147" cy="90" r="4" fill="rgba(180,230,245,0.22)" />
        </motion.g>
        {/* Slow outer planet with moon */}
        <motion.g animate={{ rotate:[0,360] }} transition={{ duration:19, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"90px 90px" }}>
          <line x1="90" y1="90" x2="166" y2="90" stroke={S} strokeWidth={1} opacity="0.14" />
          <circle cx="166" cy="90" r="11" fill={F} stroke={S} strokeWidth={SW} />
          <circle cx="166" cy="90" r="5" fill="rgba(180,230,245,0.18)" />
          <motion.g animate={{ rotate:[0,360] }} transition={{ duration:2.8, repeat:Infinity, ease:"linear" }} style={{ transformOrigin:"166px 90px" }}>
            <circle cx="180" cy="90" r="4" fill={F} stroke={S} strokeWidth={1} />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

// ─── 11. Crash Bandicoot ──────────────────────────────────────────────────────
function CrashIll() {
  return (
    <div style={{ width:170, height:215, margin:"auto" }}>
      <motion.div animate={{ y:[0,-11,0] }} transition={{ duration:1.1, repeat:Infinity, ease:"easeInOut" }}>
        <svg viewBox="0 0 120 195" fill="none" style={{ width:"100%", height:"auto" }}>
          {/* Hair spikes */}
          <path d="M40 40 L35 18 L46 36" fill={F} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M54 33 L52 11 L62 31" fill={F} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M70 38 L75 16 L80 36" fill={F} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
          {/* Head */}
          <ellipse cx="60" cy="60" rx="30" ry="34" fill={F} stroke={S} strokeWidth={SW} />
          {/* Snout */}
          <ellipse cx="60" cy="70" rx="16" ry="13" fill="rgba(255,255,255,0.11)" stroke={S} strokeWidth={1} />
          {/* Ears */}
          <ellipse cx="29" cy="50" rx="8" ry="10" fill={F} stroke={S} strokeWidth={SW} />
          <ellipse cx="91" cy="50" rx="8" ry="10" fill={F} stroke={S} strokeWidth={SW} />
          {/* Eyes */}
          <ellipse cx="44" cy="52" rx="9" ry="10" fill="rgba(255,255,255,0.9)" stroke={S} strokeWidth={SW} />
          <ellipse cx="76" cy="52" rx="9" ry="10" fill="rgba(255,255,255,0.9)" stroke={S} strokeWidth={SW} />
          <circle cx="46" cy="54" r="5" fill="#1a2535" />
          <circle cx="78" cy="54" r="5" fill="#1a2535" />
          <circle cx="48" cy="51" r="2" fill="white" />
          <circle cx="80" cy="51" r="2" fill="white" />
          {/* Nose */}
          <ellipse cx="60" cy="66" rx="10" ry="7" fill={F} stroke={S} strokeWidth={SW} />
          {/* Grin */}
          <path d="M42 76 Q60 90 78 76" stroke={S} strokeWidth={SW} fill="none" strokeLinecap="round" />
          <rect x="48" y="76" width="8" height="7" rx="2" fill="rgba(255,255,255,0.88)" stroke={S} strokeWidth={1} />
          <rect x="64" y="76" width="8" height="7" rx="2" fill="rgba(255,255,255,0.88)" stroke={S} strokeWidth={1} />
          {/* Body */}
          <path d="M34 92 Q26 116 30 146 Q60 158 90 146 Q94 116 86 92 Q60 85 34 92 Z" fill={F} stroke={S} strokeWidth={SW} />
          {/* Shorts */}
          <path d="M34 120 Q60 130 86 120 L90 146 Q60 158 30 146 Z" fill="rgba(255,255,255,0.07)" stroke={S} strokeWidth={SW} />
          {/* Spinning arms */}
          <motion.g animate={{ rotate:[0,360] }} transition={{ duration:0.55, repeat:Infinity, ease:"linear" }}
            style={{ transformOrigin:"60px 112px" }}>
            <rect x="12" y="107" width="24" height="10" rx="5" fill={F} stroke={S} strokeWidth={SW} />
            <circle cx="10" cy="112" r="7" fill={F} stroke={S} strokeWidth={SW} />
            <rect x="84" y="107" width="24" height="10" rx="5" fill={F} stroke={S} strokeWidth={SW} />
            <circle cx="110" cy="112" r="7" fill={F} stroke={S} strokeWidth={SW} />
          </motion.g>
          {/* Spin motion streaks */}
          <motion.g animate={{ opacity:[0,0.55,0], rotate:[0,180] }}
            transition={{ duration:0.55, repeat:Infinity, ease:"linear" }}
            style={{ transformOrigin:"60px 112px" }}>
            <line x1="2" y1="112" x2="12" y2="112" stroke={S} strokeWidth={1} strokeLinecap="round" />
            <line x1="108" y1="112" x2="118" y2="112" stroke={S} strokeWidth={1} strokeLinecap="round" />
          </motion.g>
          {/* Legs */}
          <rect x="38" y="146" width="14" height="22" rx="7" fill={F} stroke={S} strokeWidth={SW} />
          <rect x="68" y="146" width="14" height="22" rx="7" fill={F} stroke={S} strokeWidth={SW} />
          {/* Shoes */}
          <ellipse cx="45" cy="170" rx="16" ry="8" fill={F} stroke={S} strokeWidth={SW} />
          <ellipse cx="75" cy="170" rx="16" ry="8" fill={F} stroke={S} strokeWidth={SW} />
          <line x1="35" y1="167" x2="55" y2="167" stroke={S} strokeWidth={1} />
          <line x1="65" y1="167" x2="85" y2="167" stroke={S} strokeWidth={1} />
          {/* Shadow */}
          <motion.ellipse cx="60" cy="180" rx="28" ry="5" fill="rgba(0,0,0,0.18)"
            animate={{ scaleX:[1,0.82,1] }} transition={{ duration:1.1, repeat:Infinity, ease:"easeInOut" }} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Carousel Switcher ────────────────────────────────────────────────────────
const ILLUSTRATIONS = [
  { name: "Rocket",      El: RocketIll      },
  { name: "Race Car",    El: RaceCarIll     },
  { name: "Satellite",   El: SatelliteIll   },
  { name: "Paper Plane", El: PaperPlaneIll  },
  { name: "Submarine",   El: SubmarineIll   },
  { name: "Pinball",     El: PinballIll     },
  { name: "Circuit",     El: CircuitIll     },
  { name: "Balloon",     El: BalloonIll     },
  { name: "Snow Globe",  El: SnowGlobeIll   },
  { name: "Orrery",      El: OrreryIll      },
  { name: "Crash",       El: CrashIll       },
];

export function HeroIllustrationSwitcher() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const { El, name } = ILLUSTRATIONS[idx];

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };
  const prev = () => go((idx - 1 + ILLUSTRATIONS.length) % ILLUSTRATIONS.length);
  const next = () => go((idx + 1) % ILLUSTRATIONS.length);

  const btn: React.CSSProperties = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.22)",
    color: "white",
    width: 30,
    height: 30,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontFamily: "system-ui",
    flexShrink: 0,
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
      {/* Fixed-height stage so the switcher doesn't jump */}
      <div style={{ width:220, height:240, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={idx}
            custom={dir}
            initial={{ opacity:0, x: dir * 40, scale:0.9 }}
            animate={{ opacity:1, x:0, scale:1 }}
            exit={{ opacity:0, x: dir * -40, scale:0.9 }}
            transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
            style={{ position:"absolute" }}
          >
            <El />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button style={btn} onClick={prev}>←</button>
        <span style={{ fontFamily:"ui-monospace,monospace", fontSize:11, color:"rgba(255,255,255,0.6)", letterSpacing:1.5, minWidth:90, textAlign:"center" }}>
          {name.toUpperCase()}
        </span>
        <button style={btn} onClick={next}>→</button>
      </div>

      {/* Dot indicators */}
      <div style={{ display:"flex", gap:5 }}>
        {ILLUSTRATIONS.map((_,i)=>(
          <button key={i} onClick={()=>go(i)} style={{
            width: i===idx ? 18 : 6,
            height: 6,
            borderRadius: 3,
            background: i===idx ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.25)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            transition: "all 0.25s",
          }} />
        ))}
      </div>
    </div>
  );
}
