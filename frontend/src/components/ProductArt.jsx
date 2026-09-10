// ─────────────────────────────────────────────────────────────────────────────
// TODO(ASSETS): Dočasné stylizované vektorové ilustrace produktů ve vizuálním
// jazyku plochých polygonálních kompozic (vzor: delassus.com — vlastní kresba,
// žádná cizí grafika). Až budou hotové reálné assety (foto cut-outy, 360° spin
// nebo .glb modely), tato komponenta se nahradí rendererem assetu z catalog.js
// (asset.type: 'image' | 'frames' | 'glb') — scény se měnit nebudou.
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
      <path d="M108 236 C88 162 152 104 224 116 C296 128 322 202 288 262 C254 322 138 318 108 236 Z" fill="#D96F1A" />
      <path d="M108 236 C88 162 152 104 224 116 C262 122 290 148 302 184 C282 240 220 296 150 292 C126 278 114 258 108 236 Z" fill="#F28C28" />
      <ellipse cx="182" cy="168" rx="52" ry="34" fill="#F5A94E" opacity="0.85" transform="rotate(-18 182 168)" />
      <ellipse cx="248" cy="150" rx="26" ry="16" fill="#E05A3A" opacity="0.45" />
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
      <circle cx="168" cy="216" r="86" fill="#B83848" />
      <path d="M168 130 A86 86 0 0 1 254 216 A86 86 0 0 1 168 302 C 210 260 210 172 168 130 Z" fill="#D94F57" opacity="0.85" />
      {[[150, 180], [180, 200], [146, 226], [184, 246], [160, 266], [196, 166]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#8E2837" />
      ))}
      <circle cx="282" cy="252" r="44" fill="#F7F2E8" />
      <ellipse cx="268" cy="238" rx="14" ry="10" fill="#FFFFFF" opacity="0.9" />
      <path d="M150 138 C158 112 184 100 204 104" stroke="#4E7A3C" strokeWidth="7" fill="none" strokeLinecap="round" />
      <Leaf x={206} y={104} r={-30} fill="#4E7A3C" />
    </>
  ),
  passionfruit: (
    <>
      <circle cx="164" cy="204" r="88" fill="#4A2450" />
      <path d="M164 116 A88 88 0 0 1 252 204 C 226 260 150 290 104 250 C 88 200 116 138 164 116 Z" fill="#5B2D5E" />
      <ellipse cx="132" cy="164" rx="20" ry="30" fill="#7A4472" opacity="0.8" transform="rotate(-16 132 164)" />
      <circle cx="284" cy="248" r="52" fill="#4A2450" />
      <circle cx="284" cy="248" r="42" fill="#F2C230" />
      {[[272, 236], [292, 240], [280, 258], [298, 258], [270, 254]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="5.5" fill="#3B2A1E" />
      ))}
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
      <path d="M226 182 C260 196 276 232 264 264 C252 296 214 310 186 296 C158 282 148 246 160 218 C172 190 196 172 226 182 Z" fill="#E8A0A0" />
      {[[206, 212], [228, 220], [196, 236], [222, 244], [240, 238], [208, 262], [232, 266]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="7" fill="#A82828" />
      ))}
      <ellipse cx="146" cy="176" rx="20" ry="30" fill="#D05252" opacity="0.8" transform="rotate(-18 146 176)" />
    </>
  ),
  kiwi: (
    <>
      <ellipse cx="160" cy="212" rx="72" ry="92" fill="#6E5236" transform="rotate(-12 160 212)" />
      <ellipse cx="160" cy="206" rx="66" ry="86" fill="#8A6B4A" transform="rotate(-12 160 206)" />
      <ellipse cx="140" cy="168" rx="18" ry="30" fill="#A3845E" opacity="0.8" transform="rotate(-20 140 168)" />
      <circle cx="278" cy="240" r="56" fill="#6E5236" />
      <circle cx="278" cy="240" r="47" fill="#8DB63F" />
      <circle cx="278" cy="240" r="16" fill="#E9EFD2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={278 + Math.cos(a) * 30} cy={240 + Math.sin(a) * 30} r="3" fill="#3B2A1E" />;
      })}
    </>
  ),
  avocado: (
    <>
      <path d="M200 92 C238 92 252 130 252 160 C252 176 268 190 268 232 C268 288 238 322 200 322 C162 322 132 288 132 232 C132 190 148 176 148 160 C148 130 162 92 200 92 Z" fill="#33582B" />
      <path d="M200 104 C230 104 240 136 240 162 C240 180 256 194 256 232 C256 280 230 310 200 310 C170 310 144 280 144 232 C144 194 160 180 160 162 C160 136 170 104 200 104 Z" fill="#A8C46B" />
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
      <path d="M104 128 L96 108 L116 118 Z" fill="#6E5236" />
    </>
  ),
  watermelon: (
    <>
      <path d="M92 168 C120 264 190 316 204 316 C218 316 288 264 312 168 C260 144 144 144 92 168 Z" fill="#33582B" />
      <path d="M104 170 C130 252 192 300 204 300 C216 300 274 252 300 170 C252 150 152 150 104 170 Z" fill="#DCE1C9" />
      <path d="M118 172 C142 238 194 282 204 282 C214 282 262 238 286 172 C244 156 160 156 118 172 Z" fill="#E05252" />
      {[[180, 200], [216, 206], [196, 232], [230, 236], [168, 230], [206, 258]].map(([cx, cy]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="4.5" ry="7" fill="#2B1710" />
      ))}
      <path d="M150 176 C170 168 240 168 258 176" stroke="#B03A3A" strokeWidth="5" fill="none" opacity="0.6" />
    </>
  ),
  smoothie: (
    <>
      <path d="M148 116 L152 296 C152 312 164 320 178 320 L222 320 C236 320 248 312 248 296 L252 116 Z" fill="#FFFFFF" opacity="0.28" />
      <path d="M156 148 L159 296 C159 306 168 312 178 312 L222 312 C232 312 241 306 241 296 L244 148 Z" fill="#A83759" />
      <path d="M156 148 L244 148 L243 168 L157 168 Z" fill="#D6698B" />
      <path d="M232 116 L262 60" stroke="#F5F3EC" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="200" cy="116" rx="52" ry="10" fill="#C24B6E" />
      {[[168, 104], [196, 98], [224, 106]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="13" fill="#BE4A6C" />
      ))}
      {[[168, 104], [196, 98], [224, 106]].map(([cx, cy]) => (
        <circle key={`d${cx}${cy}`} cx={cx - 4} cy={cy - 4} r="4" fill="#E88AA5" />
      ))}
      <ellipse cx="176" cy="200" rx="10" ry="40" fill="#C24B6E" opacity="0.7" />
    </>
  ),
  cocoa: (
    <>
      <path d="M150 108 C196 92 246 108 258 168 C268 220 252 288 200 300 C148 288 132 220 142 168 C146 140 148 118 150 108 Z" fill="#A8641F" />
      <path d="M158 114 C196 100 238 114 248 168 C256 216 242 276 200 288 C178 280 160 260 152 232 C146 200 150 150 158 114 Z" fill="#C97B2E" />
      {[176, 200, 224].map((x) => (
        <path key={x} d={`M${x} 118 C ${x - 14} 180 ${x - 14} 240 ${x} 286`} stroke="#A8641F" strokeWidth="5" fill="none" opacity="0.75" />
      ))}
      {[[116, 300], [152, 318], [120, 336]].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="20" ry="13" fill="#5C3A21" transform={`rotate(${i * 24} ${cx} ${cy})`} />
      ))}
      <ellipse cx="116" cy="298" rx="12" ry="7" fill="#7A5138" transform="rotate(-8 116 298)" />
    </>
  ),
  chocolate: (
    <>
      <g transform="rotate(-8 200 210)">
        <rect x="122" y="130" width="164" height="168" rx="14" fill="#3B2417" />
        <rect x="134" y="142" width="140" height="144" rx="8" fill="#4A2E20" />
        {[178, 222].map((x) => (
          <line key={x} x1={x} y1="142" x2={x} y2="286" stroke="#3B2417" strokeWidth="6" />
        ))}
        {[190, 238].map((y) => (
          <line key={y} x1="134" y1={y} x2="274" y2={y} stroke="#3B2417" strokeWidth="6" />
        ))}
        {[[156, 166], [200, 214], [156, 262], [244, 166]].map(([cx, cy]) => (
          <rect key={`${cx}${cy}`} x={cx - 14} y={cy - 14} width="28" height="28" rx="6" fill="#5C3A28" />
        ))}
        <circle cx="200" cy="166" r="6" fill="#D94F7A" />
        <circle cx="156" cy="214" r="6" fill="#F28C28" />
        <circle cx="244" cy="262" r="6" fill="#D94F7A" />
      </g>
      <g transform="rotate(10 300 310)">
        <rect x="282" y="292" width="40" height="40" rx="7" fill="#4A2E20" />
        <circle cx="302" cy="312" r="5" fill="#F28C28" />
      </g>
    </>
  ),
};

// satelitní plovoucí prvky scény (hloubkové vrstvy pro parallax)
export const Satellites = ({ ink }) => (
  <>
    <circle cx="46" cy="80" r="10" fill={ink} opacity="0.25" />
    <circle cx="352" cy="60" r="5" fill={ink} opacity="0.35" />
    <circle cx="368" cy="330" r="8" fill={ink} opacity="0.2" />
    <circle cx="30" cy="320" r="4" fill={ink} opacity="0.35" />
    <path d="M340 150 C352 138 368 136 376 144 C366 154 348 156 340 150 Z" fill={ink} opacity="0.3" />
    <path d="M40 180 C52 168 68 166 76 174 C66 184 48 186 40 180 Z" fill={ink} opacity="0.25" />
  </>
);

export const ProductArt = ({ id, className }) => (
  <svg viewBox="0 0 400 400" className={className} role="img" aria-label={id}>
    <ellipse cx="200" cy="352" rx="112" ry="16" fill="rgba(0,0,0,0.14)" />
    {ART[id] || null}
  </svg>
);
