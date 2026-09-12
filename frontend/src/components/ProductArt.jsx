// ─────────────────────────────────────────────────────────────────────────────
// TODO(ASSETS): Dočasné stylizované vektorové ilustrace produktů a botanických
// prvků (vlastní kresba). Až budou hotové reálné assety (foto cut-outy, 360°
// spin nebo .glb modely), tato komponenta se nahradí rendererem assetu z
// catalog.js (asset.type: 'image' | 'frames' | 'glb') — scény se měnit nebudou.
// ─────────────────────────────────────────────────────────────────────────────

const Leaf = ({ x, y, r = 0, fill = "#3E6B34" }) => (
  <path
    d="M0 0 C14 -16 34 -18 44 -6 C30 6 10 8 0 0 Z"
    fill={fill}
    transform={`translate(${x} ${y}) rotate(${r})`}
  />
);

const ART = {
  mango: (
    <>
      <path d="M108 236 C88 162 152 104 224 116 C296 128 322 202 288 262 C254 322 138 318 108 236 Z" fill="#7E8F42" />
      <path d="M108 236 C88 162 152 104 224 116 C262 122 290 148 302 184 C282 240 220 296 150 292 C126 278 114 258 108 236 Z" fill="#A9B85C" />
      <ellipse cx="248" cy="150" rx="36" ry="24" fill="#E2703A" opacity="0.55" transform="rotate(-14 248 150)" />
      <ellipse cx="182" cy="168" rx="44" ry="28" fill="#C4CF7E" opacity="0.8" transform="rotate(-18 182 168)" />
      <ellipse cx="240" cy="200" rx="18" ry="12" fill="#E8912D" opacity="0.4" />
      <Leaf x={228} y={110} r={-58} fill="#4E7A3C" />
    </>
  ),
  papaya: (
    <>
      <ellipse cx="200" cy="212" rx="82" ry="122" fill="#5E7A38" />
      <ellipse cx="200" cy="208" rx="70" ry="110" fill="#E8912D" />
      <ellipse cx="200" cy="212" rx="40" ry="72" fill="#F5C87E" />
      {[[192, 172], [208, 188], [188, 206], [210, 222], [194, 240], [206, 256], [198, 196]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="5" fill="#3B2A1E" />
      ))}
      <ellipse cx="168" cy="150" rx="18" ry="30" fill="#F7B25C" opacity="0.6" transform="rotate(-12 168 150)" />
    </>
  ),
  dragonfruit: (
    <>
      <path d="M128 260 C96 180 140 108 204 108 C268 108 306 178 278 258 C256 318 152 322 128 260 Z" fill="#C22E63" />
      <path d="M128 260 C96 180 140 108 204 108 C238 108 264 128 278 158 C268 236 216 300 158 296 C142 286 132 274 128 260 Z" fill="#E63E6D" />
      {[
        "M204 108 L192 66 L214 96 Z",
        "M264 140 L288 104 L280 148 Z",
        "M140 148 L116 116 L132 160 Z",
        "M282 210 L316 192 L288 228 Z",
        "M124 218 L92 204 L120 236 Z",
      ].map((d) => (
        <path key={d} d={d} fill="#7BAE3F" />
      ))}
      <ellipse cx="176" cy="160" rx="26" ry="38" fill="#F06E93" opacity="0.7" transform="rotate(-14 176 160)" />
    </>
  ),
  lychee: (
    <>
      <circle cx="200" cy="216" r="92" fill="#B83848" />
      <path d="M200 124 A92 92 0 0 1 292 216 A92 92 0 0 1 200 308 C 248 262 248 170 200 124 Z" fill="#D94F57" opacity="0.85" />
      {[[178, 176], [212, 198], [172, 228], [216, 246], [188, 268], [228, 160]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#8E2837" />
      ))}
      <path d="M192 132 C198 106 220 94 240 96" stroke="#4E7A3C" strokeWidth="7" fill="none" strokeLinecap="round" />
      <Leaf x={240} y={96} r={-20} fill="#4E7A3C" />
    </>
  ),
  passionfruit: (
    <>
      <circle cx="200" cy="205" r="96" fill="#4A2450" />
      <path d="M200 109 A96 96 0 0 1 296 205 C 268 276 168 306 112 258 C 92 202 132 130 200 109 Z" fill="#5B2D5E" />
      <ellipse cx="164" cy="162" rx="22" ry="34" fill="#7A4472" opacity="0.8" transform="rotate(-16 164 162)" />
      <path d="M196 112 C198 96 206 86 218 82" stroke="#4E7A3C" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
  lime: (
    <>
      <circle cx="188" cy="212" r="92" fill="#5E8C33" />
      <path d="M188 120 A92 92 0 0 1 280 212 C 250 280 160 306 110 262 C 92 208 128 140 188 120 Z" fill="#79AE44" />
      <ellipse cx="152" cy="168" rx="24" ry="36" fill="#9CC65F" opacity="0.85" transform="rotate(-18 152 168)" />
      <circle cx="188" cy="118" r="8" fill="#5E8C33" />
      <Leaf x={196} y={112} r={-40} fill="#4E7A3C" />
      {[[218, 232], [236, 210], [204, 254]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#5E8C33" opacity="0.7" />
      ))}
    </>
  ),
  lemon: (
    <>
      <path d="M116 196 C128 140 190 116 238 138 C268 152 288 178 296 200 C306 196 316 200 318 210 C312 222 300 226 292 222 C270 268 204 296 154 268 C122 250 108 226 104 206 C96 208 88 202 88 194 C92 184 106 182 116 196 Z" fill="#D9B22E" />
      <path d="M116 196 C128 140 190 116 238 138 C260 148 278 166 290 186 C270 244 196 292 138 260 C120 244 110 220 116 196 Z" fill="#F2D23C" />
      <ellipse cx="180" cy="168" rx="34" ry="20" fill="#F7E07A" opacity="0.9" transform="rotate(-14 180 168)" />
      <Leaf x={238} y={132} r={-52} fill="#4E7A3C" />
    </>
  ),
  physalis: (
    <>
      <path d="M200 96 C236 140 262 196 252 268 C236 296 164 296 148 268 C138 196 164 140 200 96 Z" fill="#C9A869" />
      <path d="M200 96 C222 128 240 176 238 236 C222 258 178 258 162 236 C160 176 178 128 200 96 Z" fill="#E3C98F" />
      <path d="M200 96 L200 250 M170 132 L182 248 M230 132 L218 248" stroke="#B08F4E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="268" r="42" fill="#D96F1A" />
      <path d="M200 226 A42 42 0 0 1 242 268 A42 42 0 0 1 216 306 C 232 280 226 244 200 226 Z" fill="#E8912D" />
      <ellipse cx="186" cy="254" rx="12" ry="8" fill="#F5B25C" opacity="0.9" />
    </>
  ),
  pawpaw: (
    <>
      <path d="M150 236 C126 168 172 108 232 118 C288 128 306 194 282 252 C258 312 176 306 150 236 Z" fill="#7E8F42" />
      <path d="M150 236 C126 168 172 108 232 118 C262 123 284 146 294 174 C280 240 224 296 168 288 C158 272 152 254 150 236 Z" fill="#A9B85C" />
      <ellipse cx="204" cy="164" rx="34" ry="22" fill="#C4CF7E" opacity="0.9" transform="rotate(-16 204 164)" />
      <path d="M118 268 C108 230 132 200 164 206 C192 212 202 246 188 274 C174 302 130 298 118 268 Z" fill="#8FA04C" />
      {[[214, 196], [236, 210], [198, 226]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#6E7C36" opacity="0.8" />
      ))}
    </>
  ),
  pomegranate: (
    <>
      <path d="M186 118 L178 92 L192 104 L200 84 L208 104 L222 92 L214 118 Z" fill="#8E2424" />
      <circle cx="200" cy="222" r="94" fill="#8E2424" />
      <path d="M200 128 A94 94 0 0 1 294 222 C 268 292 172 320 118 272 C 98 216 136 146 200 128 Z" fill="#B03232" />
      <ellipse cx="158" cy="180" rx="22" ry="34" fill="#D05252" opacity="0.8" transform="rotate(-18 158 180)" />
    </>
  ),
  kiwi: (
    <>
      <ellipse cx="200" cy="210" rx="80" ry="100" fill="#6E5236" transform="rotate(-8 200 210)" />
      <ellipse cx="200" cy="204" rx="74" ry="94" fill="#8A6B4A" transform="rotate(-8 200 204)" />
      <ellipse cx="176" cy="164" rx="20" ry="34" fill="#A3845E" opacity="0.8" transform="rotate(-16 176 164)" />
      {[[186, 250], [216, 258], [200, 272]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3.5" fill="#6E5236" opacity="0.7" />
      ))}
    </>
  ),
  avocado: (
    <>
      <path d="M200 92 C238 92 252 130 252 160 C252 176 268 190 268 232 C268 288 238 322 200 322 C162 322 132 288 132 232 C132 190 148 176 148 160 C148 130 162 92 200 92 Z" fill="#33582B" />
      <path d="M200 104 C230 104 240 136 240 162 C240 180 256 194 256 232 C256 280 230 310 200 310 C170 310 144 280 144 232 C144 194 160 180 160 162 C160 136 170 104 200 104 Z" fill="#A8C46B" />
      <path d="M168 132 C 158 176 158 236 170 292 C 152 258 150 180 160 136 Z" fill="#8FAE55" opacity="0.85" />
      <circle cx="200" cy="238" r="40" fill="#7A5138" />
      <ellipse cx="188" cy="226" rx="14" ry="10" fill="#96684A" opacity="0.9" />
      <ellipse cx="182" cy="150" rx="16" ry="26" fill="#C8DB92" opacity="0.9" transform="rotate(-14 182 150)" />
    </>
  ),
  banana: (
    <>
      <path d="M96 150 C110 250 200 310 300 296 C312 294 316 278 304 272 C220 266 150 226 122 140 C118 128 94 134 96 150 Z" fill="#D9B22E" />
      <path d="M104 132 C122 236 212 296 306 282 C318 280 320 264 308 258 C226 252 158 214 130 124 C126 112 102 116 104 132 Z" fill="#F2D23C" />
      <path d="M128 140 C156 210 226 250 296 258" stroke="#E8C84C" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M118 258 C170 292 240 302 296 292" stroke="#C9A227" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.65" />
      <path d="M104 128 L96 108 L116 118 Z" fill="#6E5236" />
    </>
  ),
  watermelon: (
    <>
      <path d="M92 168 C120 264 190 316 204 316 C218 316 288 264 312 168 C260 144 144 144 92 168 Z" fill="#33582B" />
      <path d="M100 166 C148 146 256 146 304 166" stroke="#26471F" strokeWidth="7" fill="none" opacity="0.55" />
      <path d="M160 300 C 150 262 146 216 148 178" stroke="#26471F" strokeWidth="6" fill="none" opacity="0.4" />
      <path d="M248 300 C 258 262 262 216 260 178" stroke="#26471F" strokeWidth="6" fill="none" opacity="0.4" />
      <path d="M104 170 C130 252 192 300 204 300 C216 300 274 252 300 170 C252 150 152 150 104 170 Z" fill="#DCE1C9" />
      <path d="M118 172 C142 238 194 282 204 282 C214 282 262 238 286 172 C244 156 160 156 118 172 Z" fill="#E05252" />
      {[[180, 200], [216, 206], [196, 232], [230, 236], [168, 230], [206, 258]].map(([cx, cy]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="4.5" ry="7" fill="#2B1710" />
      ))}
      <path d="M150 176 C170 168 240 168 258 176" stroke="#B03A3A" strokeWidth="5" fill="none" opacity="0.6" />
    </>
  ),
};

export const ProductArt = ({ id, className }) => (
  <svg viewBox="0 0 400 400" className={className} role="img" aria-label={id}>
    <ellipse cx="200" cy="352" rx="112" ry="16" fill="rgba(0,0,0,0.14)" />
    {ART[id] || null}
  </svg>
);

// ── doplňkový kus kompozice (půlka / celek / kousek) ─────────────────────────
const EXTRA = {
  mango: (
    <>
      <ellipse cx="200" cy="210" rx="105" ry="76" fill="#7E8F42" />
      <ellipse cx="200" cy="204" rx="92" ry="64" fill="#F2C230" />
      {[168, 200, 232].map((x) => (
        <path key={x} d={`M${x} 148 C ${x - 8} 204 ${x - 8} 204 ${x} 262`} stroke="#E0A92E" strokeWidth="5" fill="none" />
      ))}
      {[178, 228].map((y) => (
        <path key={y} d={`M118 ${y} C 200 ${y + 14} 200 ${y + 14} 282 ${y}`} stroke="#E0A92E" strokeWidth="5" fill="none" />
      ))}
      <ellipse cx="176" cy="182" rx="22" ry="12" fill="#F7DC7A" opacity="0.8" />
    </>
  ),
  papaya: (
    <>
      <ellipse cx="200" cy="215" rx="74" ry="108" fill="#6E8A3E" />
      <path d="M200 107 C246 118 274 162 274 215 C274 268 246 312 200 323 C226 280 226 150 200 107 Z" fill="#8FA04C" />
      <ellipse cx="178" cy="168" rx="16" ry="34" fill="#A9B85C" opacity="0.8" transform="rotate(-12 178 168)" />
      <rect x="194" y="96" width="12" height="24" rx="6" fill="#5E7A38" />
    </>
  ),
  dragonfruit: (
    <>
      <circle cx="200" cy="205" r="96" fill="#C22E63" />
      <circle cx="200" cy="205" r="78" fill="#F7F4EE" />
      {[[176, 180], [214, 172], [240, 200], [166, 222], [200, 232], [228, 238], [186, 204], [216, 210]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#2B2420" />
      ))}
      <path d="M254 138 L286 112 L270 156 Z" fill="#7BAE3F" />
      <path d="M146 142 L116 118 L130 160 Z" fill="#7BAE3F" />
    </>
  ),
  lychee: (
    <>
      <circle cx="168" cy="216" r="66" fill="#F7F2E8" />
      <ellipse cx="150" cy="196" rx="20" ry="14" fill="#FFFFFF" opacity="0.9" />
      <circle cx="258" cy="242" r="54" fill="#EFE7DA" />
      <ellipse cx="244" cy="228" rx="15" ry="11" fill="#FFFFFF" opacity="0.85" />
      <path d="M150 158 C158 132 182 118 204 120" stroke="#4E7A3C" strokeWidth="6" fill="none" strokeLinecap="round" />
      <Leaf x={204} y={120} r={-24} fill="#4E7A3C" />
    </>
  ),
  passionfruit: (
    <>
      <circle cx="200" cy="205" r="90" fill="#4A2450" />
      <circle cx="200" cy="205" r="72" fill="#F2C230" />
      {[[178, 186], [212, 178], [234, 204], [172, 224], [204, 226], [222, 212]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="6" fill="#3B2A1E" />
      ))}
      <ellipse cx="176" cy="180" rx="18" ry="12" fill="#F7DC7A" opacity="0.8" />
    </>
  ),
  lime: (
    <>
      <circle cx="200" cy="205" r="92" fill="#5E8C33" />
      <circle cx="200" cy="205" r="76" fill="#DCE8B8" />
      <circle cx="200" cy="205" r="62" fill="#A8CC55" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1="200" y1="205" x2={200 + Math.cos(a) * 60} y2={205 + Math.sin(a) * 60} stroke="#DCE8B8" strokeWidth="6" />;
      })}
      <circle cx="200" cy="205" r="8" fill="#DCE8B8" />
    </>
  ),
  lemon: (
    <>
      <circle cx="200" cy="205" r="92" fill="#D9B22E" />
      <circle cx="200" cy="205" r="76" fill="#F7EFC0" />
      <circle cx="200" cy="205" r="62" fill="#F2D23C" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1="200" y1="205" x2={200 + Math.cos(a) * 60} y2={205 + Math.sin(a) * 60} stroke="#F7EFC0" strokeWidth="6" />;
      })}
      <circle cx="200" cy="205" r="8" fill="#F7EFC0" />
    </>
  ),
  physalis: (
    <>
      <circle cx="200" cy="215" r="72" fill="#D96F1A" />
      <path d="M200 143 A72 72 0 0 1 272 215 C 250 260 190 285 152 262 C 136 220 160 160 200 143 Z" fill="#E8912D" />
      <ellipse cx="172" cy="188" rx="18" ry="12" fill="#F5B25C" opacity="0.9" />
      <path d="M200 143 C204 122 216 112 232 110" stroke="#7C9A4E" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
  pawpaw: (
    <>
      <ellipse cx="200" cy="210" rx="96" ry="72" fill="#7E8F42" />
      <ellipse cx="200" cy="204" rx="80" ry="58" fill="#E8E3B8" />
      {[[172, 198], [200, 206], [228, 198], [186, 226], [214, 226]].map(([cx, cy]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="9" ry="13" fill="#4A3B28" />
      ))}
    </>
  ),
  pomegranate: (
    <>
      <circle cx="200" cy="205" r="94" fill="#8E2424" />
      <circle cx="200" cy="205" r="78" fill="#E8A0A0" />
      {[[170, 176], [204, 168], [236, 182], [162, 214], [198, 208], [234, 216], [176, 246], [210, 244]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="8" fill="#A82828" />
      ))}
    </>
  ),
  kiwi: (
    <>
      <circle cx="200" cy="205" r="98" fill="#6E5236" />
      <circle cx="200" cy="205" r="84" fill="#8DB63F" />
      <circle cx="200" cy="205" r="28" fill="#E9EFD2" />
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <circle key={i} cx={200 + Math.cos(a) * 56} cy={205 + Math.sin(a) * 56} r="4" fill="#3B2A1E" />;
      })}
      <ellipse cx="168" cy="168" rx="20" ry="14" fill="#A8CC55" opacity="0.7" transform="rotate(-20 168 168)" />
    </>
  ),
  avocado: (
    <>
      <path d="M200 100 C234 100 246 134 246 160 C246 176 260 190 260 230 C260 282 234 314 200 314 C166 314 140 282 140 230 C140 190 154 176 154 160 C154 134 166 100 200 100 Z" fill="#33582B" />
      <path d="M200 112 C226 112 236 140 236 162 C236 180 248 194 248 230 C248 274 226 302 200 302 C196 302 192 301 188 300 C214 260 218 160 200 112 Z" fill="#3F6B34" />
      <rect x="194" y="88" width="12" height="20" rx="6" fill="#5E7A38" />
    </>
  ),
  banana: (
    <>
      <path d="M120 160 C136 240 210 290 290 280 C300 278 303 265 293 260 C226 254 172 222 148 152 C144 142 118 146 120 160 Z" fill="#F2D23C" />
      <path d="M148 160 C170 220 230 254 286 260" stroke="#E8C84C" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M120 156 L113 138 L131 147 Z" fill="#6E5236" />
    </>
  ),
  watermelon: (
    <>
      <path d="M120 140 L200 300 L280 140 Z" fill="#33582B" />
      <path d="M132 148 L200 284 L268 148 Z" fill="#DCE1C9" />
      <path d="M144 156 L200 268 L256 156 Z" fill="#E05252" />
      {[[180, 190], [220, 190], [200, 224]].map(([cx, cy]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="5" ry="8" fill="#2B1710" />
      ))}
    </>
  ),
};

export const ExtraArt = ({ id, className }) => (
  <svg viewBox="0 0 400 400" className={className} role="img" aria-label={`${id} — doplněk`}>
    <ellipse cx="200" cy="316" rx="92" ry="13" fill="rgba(0,0,0,0.12)" />
    {EXTRA[id] || null}
  </svg>
);

// ── botanický prvek každého druhu — nenápadná lineární kresba do pozadí ───────
const FLORA = {
  // mangovník: hustá lata drobných květů
  mango: (
    <>
      <path d="M100 176 C100 140 100 108 100 72" />
      <path d="M100 124 C82 110 72 94 68 72" />
      <path d="M100 124 C118 110 128 94 132 72" />
      <path d="M100 150 C84 142 74 132 70 116" />
      <path d="M100 150 C116 142 126 132 130 116" />
      {[[68, 64], [132, 64], [66, 108], [134, 108], [100, 60], [84, 88], [116, 88], [78, 96], [122, 96]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  // papája: krémově bílý hvězdicovitý pětiplátečný květ
  papaya: (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="100" cy="74" rx="13" ry="30" transform={`rotate(${i * 72} 100 104)`} />
      ))}
      <circle cx="100" cy="104" r="7" fill="currentColor" stroke="none" />
      <path d="M100 134 C100 152 100 164 100 176" />
    </>
  ),
  // dračí ovoce: obří noční květ kaktusu („královna noci")
  dragonfruit: (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d="M100 104 C 90 74 92 50 100 30 C 108 50 110 74 100 104"
          transform={`rotate(${i * 45} 100 104)`}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = ((i * 45 + 22) * Math.PI) / 180;
        return (
          <line
            key={`s${i}`}
            x1={100 + Math.cos(a) * 14}
            y1={104 + Math.sin(a) * 14}
            x2={100 + Math.cos(a) * 34}
            y2={104 + Math.sin(a) * 34}
            strokeWidth="2"
          />
        );
      })}
      <circle cx="100" cy="104" r="8" fill="currentColor" stroke="none" />
    </>
  ),
  // liči: drobné nazelenalé květy v trsu + lesklý tmavě zelený list
  lychee: (
    <>
      <path d="M42 74 C 74 40 130 38 158 66 C 132 96 74 104 42 74 Z" />
      <path d="M42 74 C 82 68 122 66 158 66" strokeWidth="2" />
      <path d="M100 178 C100 158 100 146 100 136" />
      {[[90, 126], [110, 124], [100, 114], [84, 138], [116, 136], [100, 136]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4.5" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  // marakuja: ikonický květ mučenky s paprskovitou korunkou
  passionfruit: (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="100" cy="62" rx="10" ry="30" transform={`rotate(${i * 36} 100 100)`} />
      ))}
      {Array.from({ length: 26 }).map((_, i) => {
        const a = (i / 26) * Math.PI * 2;
        return (
          <line
            key={`c${i}`}
            x1={100 + Math.cos(a) * 16}
            y1={100 + Math.sin(a) * 16}
            x2={100 + Math.cos(a) * 44}
            y2={100 + Math.sin(a) * 44}
            strokeWidth="1.8"
          />
        );
      })}
      <path d="M100 100 L100 76" />
      <circle cx="100" cy="70" r="5.5" fill="currentColor" stroke="none" />
      <circle cx="88" cy="82" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="112" cy="82" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  // limetka: malý bílý pětiplátečný květ + trnitá větev
  lime: (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="66" cy="56" rx="10" ry="22" transform={`rotate(${i * 72} 66 80)`} />
      ))}
      <circle cx="66" cy="80" r="5.5" fill="currentColor" stroke="none" />
      <path d="M112 176 C 130 146 142 118 146 84" />
      <path d="M132 136 L148 130" />
      <path d="M141 106 L156 100" />
      <path d="M146 84 C 152 66 164 58 176 58 C 172 74 160 84 146 84 Z" />
    </>
  ),
  // citron: bílý květ s nádechem do fialova na vnější straně plátků
  lemon: (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="110" cy="60" rx="10" ry="22" transform={`rotate(${i * 72} 110 84)`} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={`o${i}`}
          d="M110 44 C 104 30 106 22 110 16"
          strokeWidth="2"
          opacity="0.55"
          transform={`rotate(${i * 72} 110 84)`}
        />
      ))}
      <circle cx="110" cy="84" r="5.5" fill="currentColor" stroke="none" />
      <path d="M64 176 C 76 152 84 132 88 112" />
      <path d="M74 148 L60 142" />
      <path d="M88 112 C 82 96 70 88 58 88 C 62 102 74 112 88 112 Z" />
    </>
  ),
  // mochyně: papírový lampionek (kalich)
  physalis: (
    <>
      <path d="M100 34 C 132 66 146 108 140 150 C 122 168 78 168 60 150 C 54 108 68 66 100 34 Z" />
      <path d="M100 34 L100 160" />
      <path d="M78 56 C 84 100 84 130 82 158" />
      <path d="M122 56 C 116 100 116 130 118 158" />
      <path d="M100 34 C 100 26 102 22 108 18" />
      <circle cx="100" cy="142" r="14" opacity="0.6" />
    </>
  ),
  // asimina: tmavě vínový zvonkovitý květ
  pawpaw: (
    <>
      <path d="M100 24 C 100 40 100 48 100 56" />
      <path d="M100 56 C 82 72 72 94 74 118 C 88 110 96 92 100 74 C 104 92 112 110 126 118 C 128 94 118 72 100 56 Z" />
      <path d="M100 74 C 92 86 88 98 90 110 C 96 104 99 94 100 86 C 101 94 104 104 110 110 C 112 98 108 86 100 74 Z" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="100" cy="66" r="4" fill="currentColor" stroke="none" />
    </>
  ),
  // granátové jablko: sytě oranžovo-červený trubkovitý květ se zvlněným okvětím
  pomegranate: (
    <>
      <path d="M88 156 C 84 122 88 92 100 76 C 112 92 116 122 112 156 C 104 162 96 162 88 156 Z" />
      <path d="M100 76 L86 58 L96 68 L100 46 L104 68 L114 58 L100 76" />
      <path d="M92 120 C 96 126 104 126 108 120" strokeWidth="2" />
      <path d="M90 138 C 96 144 104 144 110 138" strokeWidth="2" />
      <path d="M100 162 C 100 170 100 174 100 180" />
    </>
  ),
  // kiwi: velký srdčitý list liány + úponek
  kiwi: (
    <>
      <path d="M100 158 C 62 128 52 88 72 66 C 88 52 100 62 100 78 C 100 62 112 52 128 66 C 148 88 138 128 100 158 Z" />
      <path d="M100 150 L100 82" strokeWidth="2" />
      <path d="M100 118 C 88 112 80 104 76 94" strokeWidth="2" />
      <path d="M100 118 C 112 112 120 104 124 94" strokeWidth="2" />
      <path d="M140 162 C 158 154 166 140 160 130 C 155 124 147 128 149 136" strokeWidth="2.5" />
    </>
  ),
  // avokádo: velký lesklý oválný list
  avocado: (
    <>
      <path d="M100 26 C 142 58 154 110 100 172 C 46 110 58 58 100 26 Z" />
      <path d="M100 36 L100 162" strokeWidth="2" />
      <path d="M100 70 C 84 74 74 84 70 96" strokeWidth="2" />
      <path d="M100 70 C 116 74 126 84 130 96" strokeWidth="2" />
      <path d="M100 106 C 88 110 80 118 76 128" strokeWidth="2" />
      <path d="M100 106 C 112 110 120 118 124 128" strokeWidth="2" />
      <path d="M78 66 C 72 82 70 96 72 110" strokeWidth="2" opacity="0.5" />
    </>
  ),
  // banán: velké tmavé „srdce" — květ banánovníku visící z trsu
  banana: (
    <>
      <path d="M100 178 C 100 170 100 164 100 158" />
      <path d="M100 158 C 128 134 140 102 132 72 C 124 44 76 44 68 72 C 60 102 72 134 100 158 Z" />
      <path d="M74 92 C 88 102 112 102 126 92" strokeWidth="2" />
      <path d="M72 116 C 88 126 112 126 128 116" strokeWidth="2" />
      <ellipse cx="84" cy="56" rx="4" ry="9" />
      <ellipse cx="100" cy="50" rx="4" ry="9" />
      <ellipse cx="116" cy="56" rx="4" ry="9" />
    </>
  ),
  // vodní meloun: žlutý květ + členěný list + plazivá liána s úponkem
  watermelon: (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return <circle key={i} cx={62 + Math.cos(a) * 16} cy={58 + Math.sin(a) * 16} r="13" />;
      })}
      <circle cx="62" cy="58" r="6" fill="currentColor" stroke="none" />
      <path d="M124 158 C 106 156 98 142 104 130 C 92 124 92 106 106 102 C 106 88 122 80 134 90 C 146 80 162 88 162 102 C 176 108 176 126 164 132 C 170 146 158 158 144 154 C 140 164 128 166 124 158 Z" />
      <path d="M124 154 L128 108" strokeWidth="2" />
      <path d="M160 176 C 178 170 188 158 182 148 C 177 142 168 146 171 154" strokeWidth="2.5" />
    </>
  ),
};

export const ProductFlora = ({ id, ink, className }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke={ink}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: ink }}
    aria-hidden
  >
    {FLORA[id] || null}
  </svg>
);
