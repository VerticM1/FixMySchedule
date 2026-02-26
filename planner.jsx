import { useState, useEffect, useRef, useCallback } from "react";

// ════════════════════════════════════════════════════════
//  ICONS
// ════════════════════════════════════════════════════════
const I = ({ size=16, stroke="currentColor", fill="none", sw=1.6, children, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display:"block", flexShrink:0, ...style }}>{children}</svg>
);
const Icons = {
  Work:       ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></I>,
  Personal:   ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></I>,
  Health:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>,
  Social:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>,
  Other:      ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></I>,
  Mic:        ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></I>,
  Plus:       ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>,
  X:          ({s,c}) => <I size={s||14} stroke={c||"currentColor"} sw={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>,
  Check:      ({s,c}) => <I size={s||14} stroke={c||"currentColor"} sw={2.5}><polyline points="20 6 9 17 4 12"/></I>,
  Warning:    ({s,c}) => <I size={s||14} stroke={c||"currentColor"}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/></I>,
  Clock:      ({s,c}) => <I size={s||13} stroke={c||"currentColor"}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></I>,
  Loader:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></I>,
  ChevL:      ({s,c}) => <I size={s||16} stroke={c||"currentColor"} sw={2}><polyline points="15 18 9 12 15 6"/></I>,
  ChevR:      ({s,c}) => <I size={s||16} stroke={c||"currentColor"} sw={2}><polyline points="9 18 15 12 9 6"/></I>,
  Calendar:   ({s,c}) => <I size={s||15} stroke={c||"currentColor"}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>,
  Users:      ({s,c}) => <I size={s||15} stroke={c||"currentColor"}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>,
  Repeat:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></I>,
  Sun:        ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></I>,
  Moon:       ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></I>,
  Coffee:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></I>,
  Zap:        ({s,c}) => <I size={s||16} stroke={c||"currentColor"} fill={c||"currentColor"}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></I>,
  AlertCircle:({s,c}) => <I size={s||16} stroke={c||"currentColor"}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5"/></I>,
  Grid:       ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></I>,
  Layout:     ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></I>,
  ArrowR:     ({s,c}) => <I size={s||14} stroke={c||"currentColor"} sw={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>,
  Inbox:      ({s,c}) => <I size={s||16} stroke={c||"currentColor"}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></I>,
  Sparkle:    ({s,c}) => <I size={s||15} stroke={c||"currentColor"} fill={c||"currentColor"}><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/></I>,
  ChevDown:   ({s,c}) => <I size={s||14} stroke={c||"currentColor"} sw={2}><polyline points="6 9 12 15 18 9"/></I>,
  Trash:      ({s,c}) => <I size={s||14} stroke={c||"currentColor"}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></I>,
  UserPlus:   ({s,c}) => <I size={s||15} stroke={c||"currentColor"}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></I>,
  UserMinus:  ({s,c}) => <I size={s||15} stroke={c||"currentColor"}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></I>,
  LinkOff:    ({s,c}) => <I size={s||14} stroke={c||"currentColor"}><path d="M18.84 12.25l1.72-1.71a4.5 4.5 0 0 0-6.36-6.36l-1.72 1.71"/><path d="M5.17 11.75l-1.72 1.71a4.5 4.5 0 0 0 6.36 6.36l1.71-1.71"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/><line x1="16" y1="19" x2="16" y2="22"/><line x1="19" y1="16" x2="22" y2="16"/></I>,
};

// ════════════════════════════════════════════════════════
//  CONSTANTS
// ════════════════════════════════════════════════════════
const C = {
  bg:"#FAFAF8", surface:"#FFFFFF", border:"#E8E7E3", borderH:"#C8C7C1",
  text:"#1A1917", muted:"#8C8A85", mutedL:"#B8B6B0",
  accent:"#7C6FF7", accentS:"#EAE9FD", accentH:"#6B5EE6",
  green:"#4CAF82", greenS:"#E8F5EF",
  rose:"#E86B6B", roseS:"#FDE8E8",
  amber:"#E8A43C", amberS:"#FDF4E3",
  blue:"#4A90D9", blueS:"#E3EEFA",
};
const USERS = [
  {bg:"#7C6FF7", soft:"#EAE9FD", label:"You"},
  {bg:"#4CAF82", soft:"#E8F5EF", label:"Alex"},
  {bg:"#E86B6B", soft:"#FDE8E8", label:"Jordan"},
  {bg:"#E8A43C", soft:"#FDF4E3", label:"Sam"},
  {bg:"#4A90D9", soft:"#E3EEFA", label:"Riley"},
];
const DAYS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CATS  = {
  work:    {color:"#7C6FF7", soft:"#EAE9FD", Icon:Icons.Work},
  personal:{color:"#4CAF82", soft:"#E8F5EF", Icon:Icons.Personal},
  health:  {color:"#E86B6B", soft:"#FDE8E8", Icon:Icons.Health},
  social:  {color:"#E8A43C", soft:"#FDF4E3", Icon:Icons.Social},
  other:   {color:"#4A90D9", soft:"#E3EEFA", Icon:Icons.Other},
};
const RECUR_OPTS = [
  {value:"none",    label:"None"},
  {value:"daily",   label:"Daily"},
  {value:"weekdays",label:"Weekdays"},
  {value:"weekly",  label:"Weekly"},
  {value:"monthly", label:"Monthly"},
];

const USER_COLORS = [
  {bg:"#7C6FF7", soft:"#EAE9FD"},
  {bg:"#4CAF82", soft:"#E8F5EF"},
  {bg:"#E86B6B", soft:"#FDE8E8"},
  {bg:"#E8A43C", soft:"#FDF4E3"},
  {bg:"#4A90D9", soft:"#E3EEFA"},
  {bg:"#B06FD4", soft:"#F0E5FA"},
  {bg:"#E8686B", soft:"#FDE8E8"},
  {bg:"#3BBFBF", soft:"#E0F5F5"},
];

// ════════════════════════════════════════════════════════
//  DATE HELPERS
// ════════════════════════════════════════════════════════
const tdk = (y,m,d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
const today = () => { const n=new Date(); return tdk(n.getFullYear(),n.getMonth(),n.getDate()); };
const parseKey = k => { const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); };
const addDays  = (k,n) => { const d=parseKey(k); d.setDate(d.getDate()+n); return tdk(d.getFullYear(),d.getMonth(),d.getDate()); };
const fmtTime  = t => { if(!t)return""; const[h,m]=t.split(":").map(Number); return `${h%12||12}:${String(m).padStart(2,"0")}${h>=12?"pm":"am"}`; };
const timeToMin= t => { if(!t)return null; const[h,m]=t.split(":").map(Number); return h*60+m; };
const minToTime= m => `${String(Math.floor(m/60)).padStart(2,"0")}:${String(m%60).padStart(2,"0")}`;

function getWeekRange(dateKey) {
  const d = parseKey(dateKey);
  const dow = d.getDay();
  const mon = new Date(d); mon.setDate(d.getDate() - dow);
  return Array.from({length:7}, (_,i) => { const x=new Date(mon); x.setDate(mon.getDate()+i); return tdk(x.getFullYear(),x.getMonth(),x.getDate()); });
}

// Expand recurring base events into a flat map for a given date range
function expandEvents(baseEvents, rangeStart, rangeEnd) {
  const flat = {};
  const addEv = (dk, ev) => { flat[dk] = [...(flat[dk]||[]), ev]; };

  Object.values(baseEvents).flat().forEach(ev => {
    if (!ev.recurrence || ev.recurrence === "none") {
      addEv(ev.date, ev);
      return;
    }
    let cur = ev.date;
    let safety = 0;
    while (cur <= rangeEnd && safety++ < 400) {
      if (cur >= rangeStart) addEv(cur, {...ev, date: cur, _recurring: true});
      const d = parseKey(cur);
      switch(ev.recurrence) {
        case "daily":    cur = addDays(cur, 1); break;
        case "weekdays": { let next = addDays(cur,1); let dd=parseKey(next).getDay(); while(dd===0||dd===6){next=addDays(next,1);dd=parseKey(next).getDay();} cur=next; break; }
        case "weekly":   cur = addDays(cur, 7); break;
        case "monthly":  { const nd=new Date(d); nd.setMonth(nd.getMonth()+1); cur=tdk(nd.getFullYear(),nd.getMonth(),nd.getDate()); break; }
        default: cur = "9999-12-31";
      }
    }
  });
  return flat;
}

function checkConflict(events, newDate, newTime, newDuration, excludeId=null) {
  if (!newTime) return null;
  const nm = timeToMin(newTime);
  const nd = (newDuration ? parseInt(newDuration) : 60);
  const dayEvs = (events[newDate]||[]).filter(e=>e.id!==excludeId && e.time);
  for (const ev of dayEvs) {
    const em = timeToMin(ev.time);
    const ed = ev.duration ? parseInt(ev.duration) : 60;
    if (nm < em + ed && nm + nd > em) return ev;
  }
  return null;
}

// ════════════════════════════════════════════════════════
//  CLAUDE API HELPERS
// ════════════════════════════════════════════════════════
async function claudeCall(prompt, maxTokens=300) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:maxTokens, messages:[{role:"user",content:prompt}] })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

async function parseVoice(transcript, baseYear, baseMonth) {
  const prompt = `Parse this natural language calendar event. Today is ${today()} (${DAYS[new Date().getDay()]}).

Input: "${transcript}"

Respond ONLY with JSON (no markdown):
{
  "title": "short clean title",
  "date": "YYYY-MM-DD",
  "time": "HH:MM 24hr or null",
  "duration": number_minutes_or_null,
  "category": "work|personal|health|social|other",
  "recurrence": "none|daily|weekdays|weekly|monthly",
  "notes": "any extra context or null",
  "followUp": "a SHORT clarifying question if time OR date is genuinely ambiguous, else null"
}
Rules: If no date given use today. If recurrence words like 'every monday' or 'daily' present, set recurrence. followUp should only ask ONE thing max.`;
  try {
    const txt = await claudeCall(prompt, 300);
    return JSON.parse(txt.replace(/```json|```/g,"").trim());
  } catch {
    return { title: transcript.slice(0,60), date: today(), time: null, recurrence:"none", category:"other", followUp:null };
  }
}

async function generateDigest(weekEvents, todayKey) {
  const summary = Object.entries(weekEvents)
    .filter(([k]) => k >= todayKey)
    .map(([k,evs]) => `${k}: ${evs.map(e=>`${e.title}${e.time?" at "+fmtTime(e.time):""}`).join(", ")}`)
    .join("\n");

  if (!summary.trim()) return "Your week looks clear — a great time to plan ahead.";

  const prompt = `You're a smart calendar assistant. Write a brief, friendly 2-sentence digest for this week's schedule. Be conversational and specific. Don't use bullet points. Don't say "Here is" or start with "I".

Events:
${summary}

Today is ${todayKey}.`;
  try {
    return await claudeCall(prompt, 120);
  } catch {
    return "Here's what your week looks like.";
  }
}

// ════════════════════════════════════════════════════════
//  GREETING
// ════════════════════════════════════════════════════════
function getGreeting() {
  const h = new Date().getHours();
  if (h < 5)  return { text:"Burning the midnight oil", Icon: Icons.Moon };
  if (h < 12) return { text:"Good morning", Icon: Icons.Coffee };
  if (h < 17) return { text:"Good afternoon", Icon: Icons.Sun };
  return { text:"Good evening", Icon: Icons.Moon };
}

// ════════════════════════════════════════════════════════
//  SWIPEABLE USER ROW
// ════════════════════════════════════════════════════════
function SwipeableUserRow({ user, isYou, onRemove }) {
  const [offsetX, setOffsetX]     = useState(0);
  const [dragging, setDragging]   = useState(false);
  const [removing, setRemoving]   = useState(false);
  const startXRef                 = useRef(null);
  const THRESHOLD                 = 72;

  const onPointerDown = (e) => {
    if (isYou) return;
    startXRef.current = e.clientX ?? e.touches?.[0]?.clientX;
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragging || startXRef.current === null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const dx = x - startXRef.current;
    // only allow left-swipe (negative) up to -120
    setOffsetX(Math.max(-120, Math.min(0, dx)));
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (offsetX <= -THRESHOLD) {
      // commit remove: fly out then call onRemove
      setRemoving(true);
      setTimeout(() => onRemove(), 280);
    } else {
      setOffsetX(0);
    }
    startXRef.current = null;
  };

  // reveal amount for background (0–1)
  const reveal = Math.min(1, Math.abs(offsetX) / THRESHOLD);

  return (
    <div style={{ position:"relative", borderRadius:10, overflow:"hidden", marginBottom:6, userSelect:"none" }}
      onMouseDown={onPointerDown} onMouseMove={onPointerMove} onMouseUp={onPointerUp} onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}>

      {/* Red reveal layer */}
      {!isYou && (
        <div style={{ position:"absolute", inset:0, background:C.rose, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:16, opacity: reveal }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, color:"#fff" }}>
            <Icons.LinkOff s={13} c="#fff"/>
            <span style={{ fontSize:12, fontWeight:600 }}>Remove</span>
          </div>
        </div>
      )}

      {/* Foreground card */}
      <div style={{
        display:"flex", alignItems:"center", gap:8, padding:"7px 8px",
        background: removing ? "transparent" : C.surface,
        borderRadius:10, border:`1.5px solid ${C.border}`,
        transform: removing ? `translateX(-100%)` : `translateX(${offsetX}px)`,
        transition: dragging ? "none" : removing ? "transform .28s ease-in" : "transform .22s cubic-bezier(.34,1.56,.64,1)",
        cursor: isYou ? "default" : "grab",
        WebkitUserSelect:"none",
      }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:user.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>
          {user.label[0].toUpperCase()}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, color: isYou ? C.text : C.muted, fontWeight: isYou ? 500 : 400, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {user.label}{isYou ? " (you)" : ""}
          </div>
        </div>
        <div style={{ width:7, height:7, borderRadius:"50%", background:user.bg, flexShrink:0 }}/>
        {!isYou && (
          <div style={{ fontSize:10, color:C.mutedL, opacity: Math.max(0, 1 - reveal * 2) }}>
            ‹ swipe
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ════════════════════════════════════════════════════════
function EventCard({ ev, onDelete, currentUser, sharedUsers, compact=false }) {
  const cat = CATS[ev.category]||CATS.other;
  const CatIcon = cat.Icon;
  const userObj = sharedUsers?.find(u => u.id === ev.user) || sharedUsers?.[0];
  const uc = userObj?.bg || cat.color;
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:11, background:cat.soft, borderRadius:11, padding: compact?"10px 13px":"13px 15px", borderLeft:`3px solid ${uc}` }}>
      <div style={{ width:compact?28:32, height:compact?28:32, borderRadius:8, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
        <CatIcon s={compact?13:15} c={cat.color}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:500, fontSize:compact?13.5:14.5, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ev.title}</div>
        <div style={{ fontSize:11.5, color:C.muted, marginTop:2, display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
          <Icons.Clock s={10} c={C.muted}/>
          {ev.time ? fmtTime(ev.time) : "All day"}
          {ev.duration ? ` · ${ev.duration}min` : ""}
          {ev._recurring && <span style={{ display:"flex", alignItems:"center", gap:2 }}><Icons.Repeat s={10} c={C.muted}/> recurring</span>}
          <span style={{ color:uc, fontWeight:500 }}>{userObj?.label||"You"}</span>
        </div>
        {ev.notes && <div style={{ fontSize:11.5, color:C.muted, marginTop:3, fontStyle:"italic" }}>{ev.notes}</div>}
      </div>
      {ev.user===sharedUsers?.[0]?.id && onDelete && (
        <button onClick={onDelete} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", padding:3, borderRadius:4, transition:"color .15s" }}
          onMouseEnter={e=>e.currentTarget.style.color=C.rose} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
          <Icons.Trash s={12}/>
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════════════════
export default function PlannerApp() {
  const now = new Date();
  const todayKey = today();

  // ── State ──
  const [view, setView]               = useState("digest"); // "digest" | "calendar"
  const [year, setYear]               = useState(now.getFullYear());
  const [month, setMonth]             = useState(now.getMonth());
  const [baseEvents, setBaseEvents]   = useState({});       // raw stored events
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentUser]                 = useState(0);
  const [sharedUsers, setSharedUsers] = useState([
    {id:0, label:"You",    bg:"#7C6FF7", soft:"#EAE9FD"},
    {id:1, label:"Alex",   bg:"#4CAF82", soft:"#E8F5EF"},
    {id:2, label:"Jordan", bg:"#E86B6B", soft:"#FDE8E8"},
  ]);
  const [showInvite, setShowInvite]   = useState(false);
  const [inviteName, setInviteName]   = useState("");
  const [inviteColor, setInviteColor] = useState(0);

  // Voice
  const [listening, setListening]     = useState(false);
  const [transcript, setTranscript]   = useState("");
  const [parsing, setParsing]         = useState(false);
  const [voiceFollowUp, setVoiceFollowUp] = useState(null); // {question, partial}
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const recogRef = useRef(null);

  // Conflict modal
  const [conflict, setConflict]       = useState(null); // {existing, pending}

  // Add modal
  const [showModal, setShowModal]     = useState(false);
  const [form, setForm]               = useState({ title:"", date:todayKey, time:"", duration:"", category:"personal", recurrence:"none", notes:"" });

  // Digest
  const [digest, setDigest]           = useState("");
  const [digestLoading, setDigestLoading] = useState(false);

  // Toast
  const [toast, setToast]             = useState(null);

  // ── Persist ──
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("planner-v3");
        if (r) setBaseEvents(JSON.parse(r.value));
        const u = await window.storage.get("planner-users");
        if (u) setSharedUsers(JSON.parse(u.value));
      } catch {}
    })();
  }, []);

  const save = useCallback(async evs => {
    setBaseEvents(evs);
    try { await window.storage.set("planner-v3", JSON.stringify(evs)); } catch {}
  }, []);

  const saveUsers = useCallback(async (users) => {
    setSharedUsers(users);
    try { await window.storage.set("planner-users", JSON.stringify(users)); } catch {}
  }, []);

  const removeUser = (id) => {
    saveUsers(sharedUsers.filter(u => u.id !== id));
  };

  const addInvite = () => {
    if (!inviteName.trim()) return;
    const col = USER_COLORS[inviteColor];
    const newUser = { id: Date.now(), label: inviteName.trim(), bg: col.bg, soft: col.soft };
    saveUsers([...sharedUsers, newUser]);
    setInviteName(""); setInviteColor(0); setShowInvite(false);
    showToast(`${newUser.label} added to calendar`);
  };

  // ── Expanded events (recurring flattened) ──
  const rangeStart = tdk(year, month-1, 1);
  const rangeEnd   = tdk(year, month+2, 28);
  const events     = expandEvents(baseEvents, rangeStart, rangeEnd);

  // ── Digest generation ──
  useEffect(() => {
    if (view !== "digest") return;
    const week = getWeekRange(todayKey);
    const weekEvs = {};
    week.forEach(dk => { if (events[dk]?.length) weekEvs[dk] = events[dk]; });
    setDigestLoading(true);
    generateDigest(weekEvs, todayKey).then(d => { setDigest(d); setDigestLoading(false); });
  }, [view, JSON.stringify(baseEvents)]);

  // ── Toasts ──
  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3200); };

  // ── Add event ──
  const commitEvent = async (data) => {
    const id = Date.now().toString();
    const myId = sharedUsers[0]?.id ?? 0;
    const ev = { id, title:data.title, date:data.date||todayKey, time:data.time||null, duration:data.duration||null, category:data.category||"personal", recurrence:data.recurrence||"none", user:myId, notes:data.notes||"" };
    const key = ev.date;
    const updated = { ...baseEvents, [key]: [...(baseEvents[key]||[]), ev] };
    await save(updated);
    return ev;
  };

  const tryAddEvent = async (data) => {
    const clash = checkConflict(events, data.date||todayKey, data.time, data.duration);
    if (clash) {
      setConflict({ existing: clash, pending: data });
      return false;
    }
    const ev = await commitEvent(data);
    showToast(`Added: ${ev.title}`);
    return true;
  };

  const deleteEvent = async (baseDate, id) => {
    const updated = { ...baseEvents, [baseDate]: (baseEvents[baseDate]||[]).filter(e=>e.id!==id) };
    await save(updated);
  };

  // ── Voice ──
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast("Voice not supported in this browser","error"); return; }
    const rec = new SR();
    rec.continuous=false; rec.interimResults=true; rec.lang="en-US";
    rec.onstart = () => setListening(true);
    rec.onresult = e => { const t=Array.from(e.results).map(r=>r[0].transcript).join(" "); setTranscript(t); recogRef._last=t; };
    rec.onend = async () => {
      setListening(false);
      const t = recogRef._last;
      if (!t||t.trim().length<2) return;
      setParsing(true);
      try {
        const parsed = await parseVoice(t, year, month);
        if (parsed.followUp) {
          setVoiceFollowUp({ question: parsed.followUp, partial: parsed });
          setParsing(false); setTranscript(""); recogRef._last=""; return;
        }
        await tryAddEvent(parsed);
      } catch { showToast("Couldn't parse — try again","error"); }
      setParsing(false); setTranscript(""); recogRef._last="";
    };
    rec.onerror = () => { setListening(false); showToast("Voice error — try again","error"); };
    recogRef.current = rec; rec.start();
  };
  const stopListening = () => recogRef.current?.stop();

  const submitFollowUp = async () => {
    if (!followUpAnswer.trim()) return;
    const combined = `${voiceFollowUp.partial.title} — ${followUpAnswer}`;
    setParsing(true);
    try {
      const refined = await parseVoice(combined, year, month);
      const merged = { ...voiceFollowUp.partial, ...refined, followUp:null };
      await tryAddEvent(merged);
    } catch { showToast("Couldn't refine — try again","error"); }
    setVoiceFollowUp(null); setFollowUpAnswer(""); setParsing(false);
  };

  // ── Month nav ──
  const prevMonth = () => month===0 ? (setMonth(11),setYear(y=>y-1)) : setMonth(m=>m-1);
  const nextMonth = () => month===11 ? (setMonth(0),setYear(y=>y+1)) : setMonth(m=>m+1);

  // ── Derived ──
  const daysInMonth   = new Date(year, month+1, 0).getDate();
  const firstDay      = new Date(year, month, 1).getDay();
  const cells         = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const weekDays      = getWeekRange(todayKey);
  const todayEvs      = (events[todayKey]||[]).sort((a,b)=>(a.time||"99").localeCompare(b.time||"99"));
  const upcomingDays  = weekDays.filter(d=>d>todayKey && events[d]?.length);
  const totalWeekEvs  = weekDays.reduce((n,d)=>n+(events[d]?.length||0),0);
  const busiestDay    = weekDays.reduce((best,d)=>(events[d]?.length||0)>(events[best]?.length||0)?d:best, weekDays[0]);
  const freeSlots     = weekDays.filter(d=>d>=todayKey && !(events[d]?.length));
  const greeting      = getGreeting();
  const GreetIcon     = greeting.Icon;

  const dayPanelEvents = selectedDay ? (events[selectedDay]||[]).sort((a,b)=>(a.time||"99").localeCompare(b.time||"99")) : [];

  // ════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════
  return (
    <div style={{ fontFamily:"'DM Sans','Helvetica Neue',sans-serif", background:C.bg, minHeight:"100vh", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .hov-day:hover{background:#F0EFEC!important;cursor:pointer}
        .hov-pill:hover{opacity:.8;cursor:pointer}
        .hov-row:hover{background:#F5F4F1!important;cursor:pointer}
        .btn-p{background:${C.text};color:#fff;border:none;border-radius:10px;padding:10px 18px;font-family:inherit;font-size:13.5px;font-weight:500;cursor:pointer;transition:opacity .15s;display:inline-flex;align-items:center;gap:6px}
        .btn-p:hover{opacity:.82}
        .btn-p:disabled{opacity:.45;cursor:not-allowed}
        .btn-g{background:transparent;border:1.5px solid ${C.border};border-radius:10px;padding:8px 14px;font-family:inherit;font-size:13.5px;color:${C.text};cursor:pointer;transition:border-color .15s;display:inline-flex;align-items:center;gap:6px}
        .btn-g:hover{border-color:${C.borderH}}
        .btn-acc{background:${C.accentS};color:${C.accent};border:none;border-radius:10px;padding:10px 18px;font-family:inherit;font-size:13.5px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:opacity .15s}
        .btn-acc:hover{opacity:.85}
        .pulse{animation:pulse 1.5s ease-in-out infinite}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(124,111,247,.35)}50%{box-shadow:0 0 0 10px rgba(124,111,247,0)}}
        .fade{animation:fadeIn .24s ease}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .spin{animation:spin .9s linear infinite}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.22);backdrop-filter:blur(6px);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px}
        .vbar{display:flex;align-items:flex-end;gap:3px;height:20px}
        .vbar span{display:block;width:3px;border-radius:3px;background:#fff;animation:bar .9s ease-in-out infinite}
        .vbar span:nth-child(1){animation-delay:0s}.vbar span:nth-child(2){animation-delay:.11s}.vbar span:nth-child(3){animation-delay:.22s}.vbar span:nth-child(4){animation-delay:.33s}.vbar span:nth-child(5){animation-delay:.44s}
        @keyframes bar{0%,100%{height:5px;opacity:.5}50%{height:17px;opacity:1}}
        input,select,textarea{font-family:inherit}
        input:focus,select:focus,textarea:focus{outline:none;border-color:${C.accent}!important}
        .nav-tab{background:transparent;border:none;font-family:inherit;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:8px;transition:all .15s;color:${C.muted}}
        .nav-tab.active{background:${C.surface};color:${C.text};font-weight:500;box-shadow:0 1px 4px rgba(0,0,0,.06)}
        .nav-tab:hover:not(.active){color:${C.text};background:rgba(0,0,0,.03)}
        .stat-card{background:${C.surface};border:1.5px solid ${C.border};border-radius:13px;padding:16px 18px;flex:1}
        .cat-btn{border-radius:9px;padding:9px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .15s;border:1.5px solid}
        input[type=date]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
        input[type=time]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
      `}</style>

      {/* ── Toast ── */}
      {toast && (
        <div className="fade" style={{ position:"fixed", top:20, right:20, zIndex:300, background:toast.type==="error"?C.rose:C.text, color:"#fff", padding:"11px 15px", borderRadius:12, fontSize:13.5, fontWeight:500, boxShadow:"0 4px 24px rgba(0,0,0,.14)", display:"flex", alignItems:"center", gap:8 }}>
          {toast.type==="error" ? <Icons.Warning s={14} c="#fff"/> : <Icons.Check s={14} c="#fff"/>}
          {toast.msg}
        </div>
      )}

      {/* ── Conflict Modal ── */}
      {conflict && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setConflict(null)}>
          <div className="fade" style={{ background:C.surface, borderRadius:18, padding:28, width:400, boxShadow:"0 20px 60px rgba(0,0,0,.14)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:C.amberS, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icons.AlertCircle s={18} c={C.amber}/>
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:15 }}>Scheduling Conflict</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>This time overlaps with another event</div>
              </div>
            </div>
            <div style={{ background:C.amberS, borderRadius:10, padding:"11px 13px", marginBottom:20, fontSize:13.5 }}>
              <span style={{ color:C.muted, fontSize:12 }}>Existing · {conflict.existing.time ? fmtTime(conflict.existing.time) : "All day"}</span>
              <div style={{ fontWeight:500, marginTop:2 }}>{conflict.existing.title}</div>
            </div>
            <div style={{ fontSize:13.5, color:C.muted, marginBottom:18 }}>
              New: <strong style={{ color:C.text }}>{conflict.pending.title}</strong>
              {conflict.pending.time ? ` at ${fmtTime(conflict.pending.time)}` : ""}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <button className="btn-p" style={{ flex:1 }} onClick={async()=>{ await commitEvent(conflict.pending); showToast(`Added anyway: ${conflict.pending.title}`); setConflict(null); }}>
                <Icons.Plus s={13}/> Add Anyway
              </button>
              <button className="btn-g" onClick={()=>{ setForm({...conflict.pending, time:"", duration:""}); setShowModal(true); setConflict(null); }}>
                Change Time
              </button>
              <button className="btn-g" onClick={()=>setConflict(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Voice Follow-up Modal ── */}
      {voiceFollowUp && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&(setVoiceFollowUp(null),setFollowUpAnswer(""))}>
          <div className="fade" style={{ background:C.surface, borderRadius:18, padding:28, width:400, boxShadow:"0 20px 60px rgba(0,0,0,.14)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:C.accentS, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icons.Mic s={17} c={C.accent}/>
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:15 }}>One more thing…</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>For: <em>{voiceFollowUp.partial.title}</em></div>
              </div>
            </div>
            <div style={{ fontSize:14.5, fontWeight:500, marginBottom:14, color:C.text }}>{voiceFollowUp.question}</div>
            <input
              autoFocus
              placeholder="Type your answer…"
              value={followUpAnswer}
              onChange={e=>setFollowUpAnswer(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&submitFollowUp()}
              style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:14, background:C.bg, marginBottom:14 }}
            />
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-p" style={{ flex:1 }} onClick={submitFollowUp} disabled={parsing}>
                {parsing ? <><span className="spin" style={{display:"inline-flex"}}><Icons.Loader s={14} c="#fff"/></span> Processing…</> : <><Icons.Check s={13}/> Confirm</>}
              </button>
              <button className="btn-g" onClick={()=>{setVoiceFollowUp(null);setFollowUpAnswer("");}}>Skip</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Event Modal ── */}
      {showModal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="fade" style={{ background:C.surface, borderRadius:20, padding:30, width:440, boxShadow:"0 20px 60px rgba(0,0,0,.13)", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22 }}>New Event</div>
              <button onClick={()=>setShowModal(false)} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex", padding:4 }}><Icons.X s={16}/></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <input placeholder="Event title…" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}
                style={{ padding:"12px 14px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:15, width:"100%", background:C.bg }} />

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:".06em" }}>Date</label>
                  <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}
                    style={{ padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:13, width:"100%", background:C.bg }} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:".06em" }}>Time</label>
                  <input type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}
                    style={{ padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:13, width:"100%", background:C.bg }} />
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:".06em" }}>Duration (min)</label>
                  <input type="number" placeholder="60" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))}
                    style={{ padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:13, width:"100%", background:C.bg }} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:".06em" }}>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><Icons.Repeat s={10}/> Repeat</span>
                  </label>
                  <select value={form.recurrence} onChange={e=>setForm(f=>({...f,recurrence:e.target.value}))}
                    style={{ padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:13, width:"100%", background:C.bg, cursor:"pointer" }}>
                    {RECUR_OPTS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Category</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:7 }}>
                  {Object.entries(CATS).map(([k,v])=>{
                    const CatIcon=v.Icon; const sel=form.category===k;
                    return (
                      <button key={k} className="cat-btn" onClick={()=>setForm(f=>({...f,category:k}))}
                        style={{ borderColor:sel?v.color:C.border, background:sel?v.soft:C.bg }}>
                        <CatIcon s={14} c={sel?v.color:C.muted}/>
                        <span style={{ fontSize:10, color:sel?v.color:C.muted, fontWeight:500, textTransform:"capitalize" }}>{k}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea placeholder="Notes (optional)…" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} rows={2}
                style={{ padding:"10px 12px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:13, width:"100%", background:C.bg, resize:"none" }} />
            </div>

            <div style={{ display:"flex", gap:9, marginTop:20 }}>
              <button className="btn-p" style={{ flex:1, justifyContent:"center" }} onClick={async()=>{
                if(!form.title.trim()) return;
                const ok = await tryAddEvent(form);
                if(ok){ setShowModal(false); setForm({title:"",date:todayKey,time:"",duration:"",category:"personal",recurrence:"none",notes:""}); }
              }}>
                <Icons.Plus s={14}/> Add to Calendar
              </button>
              <button className="btn-g" onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ LAYOUT ════════════ */}
      <div style={{ display:"flex", maxWidth:1120, margin:"0 auto", padding:"28px 24px", gap:26 }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width:210, flexShrink:0 }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:28 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:C.text, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icons.Calendar s={16} c="#fff"/>
            </div>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:19, lineHeight:1 }}>Planner</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{MONTHS[month].slice(0,3)} {year}</div>
            </div>
          </div>

          {/* Nav tabs */}
          <div style={{ background:"#F0EFEC", borderRadius:10, padding:3, display:"flex", marginBottom:22 }}>
            <button className={`nav-tab${view==="digest"?" active":""}`} style={{ flex:1 }} onClick={()=>setView("digest")}>
              <Icons.Layout s={13}/> Digest
            </button>
            <button className={`nav-tab${view==="calendar"?" active":""}`} style={{ flex:1 }} onClick={()=>setView("calendar")}>
              <Icons.Grid s={13}/> Month
            </button>
          </div>

          {/* Voice button */}
          <button onClick={listening?stopListening:startListening} disabled={parsing}
            className={listening?"pulse":""}
            style={{ width:"100%", padding:"13px 0", border:"none", borderRadius:12, background:listening?C.accent:parsing?C.border:C.text, color:"#fff", fontFamily:"inherit", fontSize:13.5, fontWeight:500, cursor:parsing?"not-allowed":"pointer", marginBottom:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .2s" }}>
            {parsing
              ? <><span className="spin" style={{display:"inline-flex"}}><Icons.Loader s={15} c="#fff"/></span> Parsing…</>
              : listening
              ? <><div className="vbar">{[0,1,2,3,4].map(i=><span key={i}/>)}</div> Listening…</>
              : <><Icons.Mic s={15} c="#fff"/> Speak to Add</>}
          </button>

          {transcript && (
            <div style={{ background:C.accentS, borderRadius:9, padding:"7px 11px", fontSize:12, color:C.accent, marginBottom:8, fontStyle:"italic", lineHeight:1.4 }}>
              "{transcript}"
            </div>
          )}

          <button className="btn-g" style={{ width:"100%", justifyContent:"center", marginBottom:24 }} onClick={()=>{ setForm({title:"",date:todayKey,time:"",duration:"",category:"personal",recurrence:"none",notes:""}); setShowModal(true); }}>
            <Icons.Plus s={13}/> Add Event
          </button>

          {/* Mini month nav */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, padding:"0 2px" }}>
            <button onClick={prevMonth} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex", padding:"3px 4px" }}><Icons.ChevL s={14}/></button>
            <span style={{ fontSize:13, fontWeight:500 }}>{MONTHS[month].slice(0,3)} {year}</span>
            <button onClick={nextMonth} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex", padding:"3px 4px" }}><Icons.ChevR s={14}/></button>
          </div>

          {/* Shared users */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:".07em", marginBottom:9, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Icons.Users s={11} c={C.muted}/> Shared With</span>
              <button onClick={()=>setShowInvite(v=>!v)} title="Add person"
                style={{ background:showInvite?C.accentS:"none", border:"none", cursor:"pointer", color:showInvite?C.accent:C.muted, display:"flex", alignItems:"center", padding:"3px 5px", borderRadius:6, transition:"all .15s" }}>
                <Icons.UserPlus s={12} c={showInvite?C.accent:C.muted}/>
              </button>
            </div>

            {/* Invite form */}
            {showInvite && (
              <div style={{ background:C.accentS, borderRadius:11, padding:"11px 12px", marginBottom:10 }} className="fade">
                <div style={{ fontSize:11, fontWeight:600, color:C.accent, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Invite Person</div>
                <input
                  autoFocus
                  placeholder="Name…"
                  value={inviteName}
                  onChange={e=>setInviteName(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addInvite()}
                  style={{ width:"100%", padding:"8px 10px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, background:"#fff", marginBottom:9 }}
                />
                {/* Color swatches */}
                <div style={{ display:"flex", gap:5, marginBottom:9, flexWrap:"wrap" }}>
                  {USER_COLORS.map((col,i)=>(
                    <button key={i} onClick={()=>setInviteColor(i)}
                      style={{ width:20, height:20, borderRadius:"50%", background:col.bg, border:inviteColor===i?`2px solid ${C.text}`:"2px solid transparent", cursor:"pointer", padding:0, transition:"transform .12s" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    />
                  ))}
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button className="btn-p" style={{ flex:1, justifyContent:"center", fontSize:12, padding:"7px 0" }} onClick={addInvite}>
                    <Icons.UserPlus s={12}/> Add
                  </button>
                  <button className="btn-g" style={{ fontSize:12, padding:"7px 10px" }} onClick={()=>setShowInvite(false)}>
                    <Icons.X s={11}/>
                  </button>
                </div>
              </div>
            )}

            {sharedUsers.map((u) => (
              <SwipeableUserRow
                key={u.id}
                user={u}
                isYou={u.id === currentUser}
                onRemove={() => removeUser(u.id)}
              />
            ))}

            {sharedUsers.length === 1 && (
              <div style={{ fontSize:11.5, color:C.mutedL, textAlign:"center", padding:"8px 0", fontStyle:"italic" }}>
                Just you — invite someone ↑
              </div>
            )}
          </div>

          {/* Category legend */}
          <div>
            <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:".07em", marginBottom:9 }}>Categories</div>
            {Object.entries(CATS).map(([k,v])=>{
              const CatIcon=v.Icon;
              return (
                <div key={k} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:v.soft, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <CatIcon s={12} c={v.color}/>
                  </div>
                  <span style={{ fontSize:12, color:C.muted, textTransform:"capitalize" }}>{k}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* DIGEST VIEW                               */}
        {/* ══════════════════════════════════════════ */}
        {view === "digest" && (
          <div style={{ flex:1 }} className="fade">
            {/* Greeting header */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:6 }}>
                <GreetIcon s={18} c={C.muted}/>
                <span style={{ fontSize:13.5, color:C.muted }}>{greeting.text}</span>
              </div>
              <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:34, fontWeight:400, lineHeight:1.05 }}>
                {now.toLocaleDateString("en-US",{weekday:"long"})}
              </h1>
              <div style={{ fontSize:14, color:C.muted, marginTop:2 }}>
                {now.toLocaleDateString("en-US",{month:"long", day:"numeric", year:"numeric"})}
              </div>
            </div>

            {/* AI Digest card */}
            <div style={{ background: "linear-gradient(135deg, #1A1917 0%, #2D2B27 100%)", borderRadius:16, padding:"22px 24px", marginBottom:24, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"rgba(124,111,247,.12)" }}/>
              <div style={{ position:"absolute", bottom:-30, right:40, width:80, height:80, borderRadius:"50%", background:"rgba(76,175,130,.08)" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <Icons.Sparkle s={14} c="#7C6FF7"/>
                <span style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:".08em" }}>Weekly Digest</span>
              </div>
              {digestLoading
                ? <div style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,.5)", fontSize:13.5 }}>
                    <span className="spin" style={{display:"inline-flex"}}><Icons.Loader s={14} c="rgba(255,255,255,.5)"/></span> Generating your digest…
                  </div>
                : <p style={{ fontSize:15, color:"rgba(255,255,255,.88)", lineHeight:1.65, position:"relative" }}>{digest}</p>
              }
              {/* Week strip */}
              <div style={{ display:"flex", gap:6, marginTop:20, flexWrap:"wrap" }}>
                {weekDays.map(dk=>{
                  const evCount = events[dk]?.length||0;
                  const isToday = dk===todayKey;
                  const isPast  = dk<todayKey;
                  const d       = parseKey(dk);
                  return (
                    <div key={dk} onClick={()=>{setView("calendar"); setTimeout(()=>setSelectedDay(dk),50);}}
                      style={{ flex:1, minWidth:44, textAlign:"center", cursor:"pointer", opacity:isPast?.45:1, transition:"transform .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>{DAYS[d.getDay()].slice(0,1)}</div>
                      <div style={{ width:32, height:32, borderRadius:"50%", margin:"0 auto", background:isToday?"#fff":evCount>0?"rgba(124,111,247,.3)":"rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:isToday?600:400, color:isToday?C.text:"rgba(255,255,255,.75)", marginBottom:4 }}>
                        {d.getDate()}
                      </div>
                      <div style={{ display:"flex", justifyContent:"center", gap:2 }}>
                        {Array.from({length:Math.min(evCount,3)}).map((_,i)=><div key={i} style={{ width:4, height:4, borderRadius:"50%", background:isToday?"#7C6FF7":"rgba(255,255,255,.4)" }}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:10, marginBottom:24 }}>
              <div className="stat-card">
                <div style={{ fontSize:24, fontWeight:600, fontFamily:"'DM Serif Display',serif" }}>{totalWeekEvs}</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>events this week</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>
                  {busiestDay && events[busiestDay]?.length ? DAYS[parseKey(busiestDay).getDay()] : "—"}
                </div>
                <div style={{ fontSize:12, color:C.muted }}>busiest day</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>
                  {freeSlots.length > 0 ? `${freeSlots.length} day${freeSlots.length>1?"s":""}` : "Packed!"}
                </div>
                <div style={{ fontSize:12, color:C.muted }}>free ahead</div>
              </div>
            </div>

            {/* Today's events */}
            <div style={{ marginBottom:22 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ fontSize:11.5, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:".08em", display:"flex", alignItems:"center", gap:5 }}>
                  <Icons.Sun s={12} c={C.muted}/> Today
                </div>
                <button className="btn-acc" style={{ padding:"5px 12px", fontSize:12 }} onClick={()=>{ setForm(f=>({...f,date:todayKey})); setShowModal(true); }}>
                  <Icons.Plus s={11}/> Add
                </button>
              </div>
              {todayEvs.length === 0
                ? <div style={{ background:C.surface, border:`1.5px dashed ${C.border}`, borderRadius:12, padding:"22px 0", textAlign:"center", color:C.mutedL, fontSize:13.5, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                    <Icons.Inbox s={22} c={C.border}/>
                    Nothing scheduled today
                  </div>
                : <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {todayEvs.map(ev=>(
                      <EventCard key={ev.id+ev.date} ev={ev} currentUser={currentUser} sharedUsers={sharedUsers}
                        onDelete={()=>deleteEvent(ev.date, ev.id)} />
                    ))}
                  </div>
              }
            </div>

            {/* Upcoming this week */}
            {upcomingDays.length > 0 && (
              <div>
                <div style={{ fontSize:11.5, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12, display:"flex", alignItems:"center", gap:5 }}>
                  <Icons.ArrowR s={12} c={C.muted}/> Upcoming
                </div>
                {upcomingDays.map(dk=>{
                  const d    = parseKey(dk);
                  const evs  = (events[dk]||[]).slice(0,3);
                  const more = (events[dk]||[]).length - 3;
                  return (
                    <div key={dk} style={{ marginBottom:14 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:C.muted, marginBottom:7 }}>
                        {d.toLocaleDateString("en-US",{weekday:"long", month:"short", day:"numeric"})}
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {evs.map(ev=>(
                          <EventCard key={ev.id+ev.date} ev={ev} currentUser={currentUser} sharedUsers={sharedUsers} compact onDelete={()=>deleteEvent(ev.date, ev.id)}/>
                        ))}
                        {more>0 && <div style={{ fontSize:12, color:C.muted, paddingLeft:4 }}>+{more} more · <span style={{ cursor:"pointer", textDecoration:"underline" }} onClick={()=>{setView("calendar");setTimeout(()=>setSelectedDay(dk),50);}}>see all</span></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* CALENDAR VIEW                             */}
        {/* ══════════════════════════════════════════ */}
        {view === "calendar" && (
          <div style={{ flex:1 }} className="fade">
            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:34, fontWeight:400, lineHeight:1.05 }}>{MONTHS[month]}</h1>
                <span style={{ fontSize:14, color:C.muted }}>{year}</span>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button className="btn-g" style={{ padding:"8px 10px" }} onClick={prevMonth}><Icons.ChevL s={15}/></button>
                <button className="btn-g" onClick={()=>{setYear(now.getFullYear());setMonth(now.getMonth());}}>Today</button>
                <button className="btn-g" style={{ padding:"8px 10px" }} onClick={nextMonth}><Icons.ChevR s={15}/></button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
              {DAYS.map(d=><div key={d} style={{ textAlign:"center", fontSize:10.5, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:".09em", paddingBottom:10 }}>{d}</div>)}
            </div>

            {/* Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
              {cells.map((day,idx)=>{
                if (!day) return <div key={`e${idx}`}/>;
                const dk     = tdk(year,month,day);
                const isToday= dk===todayKey;
                const isSel  = dk===selectedDay;
                const dayEvs = (events[dk]||[]).slice(0,3);
                const more   = (events[dk]||[]).length-3;
                const hasRecur = (events[dk]||[]).some(e=>e._recurring);
                return (
                  <div key={dk} className="hov-day"
                    onClick={()=>setSelectedDay(dk===selectedDay?null:dk)}
                    style={{ minHeight:90, padding:"8px 6px", borderRadius:10, background:isSel?C.accentS:C.surface, border:`1.5px solid ${isSel?C.accent:isToday?C.text:C.border}`, transition:"all .15s", position:"relative" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                      <div style={{ fontSize:13, fontWeight:isToday?600:400, color:isToday?"#fff":C.text, background:isToday?C.text:"transparent", width:24, height:24, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {day}
                      </div>
                      {hasRecur && <Icons.Repeat s={9} c={C.mutedL}/>}
                    </div>
                    {dayEvs.map(ev=>{
                      const cat=CATS[ev.category]||CATS.other;
                      const userObj=sharedUsers.find(u=>u.id===ev.user);
                      const uc=userObj?.bg||cat.color;
                      return (
                        <div key={ev.id+ev.date} className="hov-pill" style={{ fontSize:10.5, fontWeight:500, color:uc, background:cat.soft, borderRadius:5, padding:"2px 5px", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", borderLeft:`2.5px solid ${uc}` }}>
                          {ev.time?fmtTime(ev.time)+" ":""}{ev.title}
                        </div>
                      );
                    })}
                    {more>0 && <div style={{ fontSize:10, color:C.muted }}>+{more} more</div>}
                  </div>
                );
              })}
            </div>

            {/* Day panel */}
            {selectedDay && (
              <div className="fade" style={{ marginTop:18, background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16, padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                  <div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20 }}>
                      {parseKey(selectedDay).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
                    </div>
                    <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{dayPanelEvents.length} event{dayPanelEvents.length!==1?"s":""}</div>
                  </div>
                  <button className="btn-p" style={{ padding:"8px 14px", fontSize:13 }} onClick={()=>{ setForm(f=>({...f,date:selectedDay})); setShowModal(true); }}>
                    <Icons.Plus s={13}/> Add
                  </button>
                </div>
                {dayPanelEvents.length===0
                  ? <div style={{ textAlign:"center", padding:"30px 0", color:C.muted, fontSize:14, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                      <Icons.Calendar s={26} c={C.border}/>
                      Nothing planned yet
                    </div>
                  : <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                      {dayPanelEvents.map(ev=>(
                        <EventCard key={ev.id+ev.date} ev={ev} currentUser={currentUser} sharedUsers={sharedUsers}
                          onDelete={()=>deleteEvent(ev.date, ev.id)} />
                      ))}
                    </div>
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
