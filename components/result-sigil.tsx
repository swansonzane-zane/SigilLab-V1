type ResultSigilProps = {
  intent: string;
  zodiac?: string;
  birthYear?: number;
  ageBand?: string;
  title?: string;
  headline?: string;
};

type SigilMode =
  | "clarity"
  | "healing"
  | "focus"
  | "protection"
  | "growth"
  | "relationship";

function normalizeMode(intent: string): SigilMode {
  const normalized = intent.toLowerCase();

  if (normalized === "balance" || normalized === "protection") {
    return "protection";
  }

  if (normalized === "release" || normalized === "growth") {
    return "growth";
  }

  if (normalized === "openness" || normalized === "relationship") {
    return "relationship";
  }

  if (normalized === "healing" || normalized === "focus") {
    return normalized;
  }

  return "clarity";
}

function hashText(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeed(props: ResultSigilProps) {
  const seedSource = [
    normalizeMode(props.intent),
    props.zodiac || "",
    String(props.birthYear || ""),
    props.ageBand || "",
    props.title || "",
    props.headline || "",
  ].join("|");

  return hashText(seedSource || props.intent || "sigillab");
}

function pick(seed: number, modulo: number, offset = 0) {
  return Math.abs((seed >> offset) % modulo);
}

function paperShape(seed: number) {
  const left = 74 + pick(seed, 7, 1);
  const right = 166 - pick(seed, 7, 3);
  const top = 24 + pick(seed, 5, 5);
  const bottom = 214 - pick(seed, 6, 7);
  const waist = 7 + pick(seed, 8, 9);

  return `M${left} ${top} C${left + 24} ${top - 9} ${right - 28} ${
    top - 8
  } ${right} ${top + 8} C${right + 6} ${top + 50} ${right + 2} ${
    bottom - 62
  } ${right - waist} ${bottom} C${right - 26} ${bottom + 7} ${left + 24} ${
    bottom + 6
  } ${left - 2} ${bottom - 2} C${left - 9} ${bottom - 56} ${left - 9} ${
    top + 48
  } ${left} ${top} Z`;
}

function buildPseudoSealGlyph(seed: number, mode: SigilMode) {
  const centerX = 120 + pick(seed, 7, 3) - 3;
  const centerY = 121 + pick(seed, 9, 5) - 4;
  const span = 12 + pick(seed, 7, 7);
  const height = 14 + pick(seed, 8, 11);
  const hook = 6 + pick(seed, 6, 13);
  const tilt = pick(seed, 7, 15) - 3;

  const vertical = `M${centerX - 2} ${centerY - height} C${centerX - 5} ${
    centerY - 3
  } ${centerX + 2} ${centerY + 6} ${centerX - 1} ${centerY + height}`;
  const roof = `M${centerX - span} ${centerY - 8 + tilt} C${centerX - 4} ${
    centerY - 16 + tilt
  } ${centerX + 5} ${centerY - 16 + tilt} ${centerX + span - 2} ${
    centerY - 7 + tilt
  }`;
  const waist = `M${centerX - span + 3} ${centerY + 1} C${centerX - 4} ${
    centerY - 3
  } ${centerX + 4} ${centerY - 2} ${centerX + span - 4} ${centerY + 2}`;
  const base = `M${centerX - span + 5} ${centerY + height - 3} C${
    centerX - 3
  } ${centerY + height - 9} ${centerX + 7} ${centerY + height - 8} ${
    centerX + span - 2
  } ${centerY + height - 2}`;

  const extrasByMode: Record<SigilMode, string[]> = {
    clarity: [
      `M${centerX - hook} ${centerY - 1} H${centerX + hook}`,
      `M${centerX + 5} ${centerY - 9} C${centerX + 10} ${centerY - 6} ${
        centerX + 10
      } ${centerY - 1} ${centerX + 6} ${centerY + 4}`,
    ],
    healing: [
      `M${centerX - 8} ${centerY + 3} C${centerX - 1} ${centerY + 12} ${
        centerX + 7
      } ${centerY + 12} ${centerX + 11} ${centerY + 2}`,
      `M${centerX - 5} ${centerY - 10} C${centerX - 11} ${centerY - 5} ${
        centerX - 10
      } ${centerY + 2} ${centerX - 3} ${centerY + 8}`,
    ],
    focus: [
      `M${centerX - 8} ${centerY - 2} H${centerX + 8}`,
      `M${centerX + 9} ${centerY - 10} L${centerX + 2} ${centerY + 10}`,
    ],
    protection: [
      `M${centerX - 10} ${centerY - 10} L${centerX + 10} ${centerY + 10}`,
      `M${centerX + 10} ${centerY - 10} L${centerX - 10} ${centerY + 10}`,
    ],
    growth: [
      `M${centerX - 6} ${centerY + 6} C${centerX - 11} ${centerY - 1} ${
        centerX - 11
      } ${centerY - 8} ${centerX - 4} ${centerY - 12}`,
      `M${centerX + 4} ${centerY + 7} C${centerX + 12} ${centerY + 2} ${
        centerX + 13
      } ${centerY - 7} ${centerX + 6} ${centerY - 13}`,
    ],
    relationship: [
      `M${centerX - 9} ${centerY - 4} C${centerX - 3} ${centerY + 2} ${
        centerX + 3
      } ${centerY + 2} ${centerX + 9} ${centerY - 4}`,
      `M${centerX - 7} ${centerY + 8} C${centerX - 2} ${centerY + 4} ${
        centerX + 1
      } ${centerY + 4} ${centerX + 7} ${centerY + 8}`,
    ],
  };

  return [vertical, roof, waist, base, ...extrasByMode[mode]];
}

function buildArrayLines(seed: number, mode: SigilMode) {
  const lines = [
    `M83 ${47 + pick(seed, 4, 2)} H${156 - pick(seed, 4, 4)}`,
    `M84 ${193 - pick(seed, 5, 6)} H${154 - pick(seed, 4, 8)}`,
    `M${72 + pick(seed, 6, 10)} ${68 + pick(seed, 6, 12)} C${98 + pick(
      seed,
      7,
      14,
    )} ${55 + pick(seed, 8, 16)} ${138 + pick(seed, 7, 18)} ${
      53 + pick(seed, 7, 20)
    } ${165 - pick(seed, 6, 22)} ${69 + pick(seed, 6, 24)}`,
  ];

  const byMode: Record<SigilMode, string[]> = {
    clarity: [
      `M120 ${39 + pick(seed, 4, 1)} C${116 - pick(seed, 3, 3)} ${
        78 + pick(seed, 4, 5)
      } ${117 + pick(seed, 3, 7)} ${158 - pick(seed, 6, 9)} ${
        121 - pick(seed, 3, 11)
      } ${205 - pick(seed, 4, 13)}`,
      `M90 ${60 + pick(seed, 6, 15)} C109 ${67 + pick(seed, 5, 17)} ${
        131 + pick(seed, 5, 19)
      } ${66 + pick(seed, 5, 21)} ${149 - pick(seed, 4, 23)} ${
        60 + pick(seed, 6, 25)
      }`,
    ],
    healing: [
      `M88 ${77 + pick(seed, 7, 1)} C106 ${63 + pick(seed, 8, 3)} ${
        134 + pick(seed, 7, 5)
      } ${68 + pick(seed, 7, 7)} ${152 - pick(seed, 5, 9)} ${
        88 + pick(seed, 7, 11)
      }`,
      `M79 ${182 - pick(seed, 6, 13)} C102 ${198 - pick(seed, 8, 15)} ${
        136 + pick(seed, 7, 17)
      } ${198 - pick(seed, 6, 19)} ${158 - pick(seed, 4, 21)} ${
        181 - pick(seed, 6, 23)
      }`,
    ],
    focus: [
      `M120 ${30 + pick(seed, 5, 1)} V${208 - pick(seed, 7, 3)}`,
      `M${93 + pick(seed, 4, 5)} ${52 + pick(seed, 4, 7)} H${
        149 - pick(seed, 5, 9)
      }`,
    ],
    protection: [
      `M${79 + pick(seed, 4, 1)} ${44 + pick(seed, 4, 3)} H${
        159 - pick(seed, 5, 5)
      } V${195 - pick(seed, 4, 7)} H${80 + pick(seed, 4, 9)} Z`,
      `M${84 + pick(seed, 4, 11)} ${82 + pick(seed, 5, 13)} L${
        156 - pick(seed, 6, 15)
      } ${158 - pick(seed, 5, 17)}`,
    ],
    growth: [
      `M${100 + pick(seed, 6, 1)} ${194 - pick(seed, 5, 3)} C${
        110 + pick(seed, 7, 5)
      } ${146 - pick(seed, 8, 7)} ${126 + pick(seed, 6, 9)} ${
        90 - pick(seed, 7, 11)
      } ${152 + pick(seed, 5, 13)} ${50 + pick(seed, 6, 15)}`,
      `M${84 + pick(seed, 5, 17)} ${188 - pick(seed, 5, 19)} C${
        104 + pick(seed, 5, 21)
      } ${203 - pick(seed, 4, 23)} ${136 + pick(seed, 4, 25)} ${
        204 - pick(seed, 4, 27)
      } ${158 - pick(seed, 5, 29)} ${187 - pick(seed, 5, 31)}`,
    ],
    relationship: [
      `M${83 + pick(seed, 5, 1)} ${64 + pick(seed, 4, 3)} C${
        98 + pick(seed, 4, 5)
      } ${43 + pick(seed, 5, 7)} ${113 + pick(seed, 4, 9)} ${
        43 + pick(seed, 5, 11)
      } 120 ${58 + pick(seed, 5, 13)} C${129 + pick(seed, 4, 15)} ${
        43 + pick(seed, 5, 17)
      } ${146 + pick(seed, 4, 19)} ${44 + pick(seed, 5, 21)} ${
        159 - pick(seed, 5, 23)
      } ${65 + pick(seed, 4, 25)}`,
      `M${91 + pick(seed, 5, 27)} ${84 + pick(seed, 5, 29)} C${
        108 + pick(seed, 4, 31)
      } ${96 + pick(seed, 4, 2)} ${132 + pick(seed, 4, 4)} ${
        96 + pick(seed, 4, 6)
      } ${149 - pick(seed, 4, 8)} ${85 + pick(seed, 5, 10)}`,
    ],
  };

  return [...lines, ...byMode[mode]];
}

function buildTalismanStrokes(seed: number, mode: SigilMode) {
  const central = `M${118 + pick(seed, 5, 1) - 2} ${42 + pick(seed, 6, 3)} C${
    112 + pick(seed, 5, 5)
  } ${78 + pick(seed, 8, 7)} ${123 + pick(seed, 6, 9)} ${
    122 + pick(seed, 7, 11)
  } ${116 + pick(seed, 5, 13)} ${193 - pick(seed, 6, 15)}`;

  const byMode: Record<SigilMode, string[]> = {
    clarity: [
      central,
      `M${90 + pick(seed, 4, 17)} ${74 + pick(seed, 5, 19)} C${
        106 + pick(seed, 4, 21)
      } ${85 + pick(seed, 4, 23)} ${136 + pick(seed, 4, 25)} ${
        84 + pick(seed, 4, 27)
      } ${151 - pick(seed, 5, 29)} ${74 + pick(seed, 5, 31)}`,
      `M${91 + pick(seed, 5, 2)} ${156 - pick(seed, 5, 4)} C${
        112 + pick(seed, 4, 6)
      } ${149 - pick(seed, 5, 8)} ${131 + pick(seed, 4, 10)} ${
        149 - pick(seed, 4, 12)
      } ${149 - pick(seed, 5, 14)} ${159 - pick(seed, 5, 16)}`,
    ],
    healing: [
      central,
      `M${96 + pick(seed, 5, 18)} ${58 + pick(seed, 5, 20)} C${
        109 + pick(seed, 4, 22)
      } ${87 + pick(seed, 6, 24)} ${135 + pick(seed, 5, 26)} ${
        95 + pick(seed, 5, 28)
      } ${151 - pick(seed, 4, 30)} ${86 + pick(seed, 5, 1)}`,
      `M${89 + pick(seed, 5, 3)} ${150 - pick(seed, 5, 5)} C${
        107 + pick(seed, 5, 7)
      } ${136 - pick(seed, 5, 9)} ${135 + pick(seed, 5, 11)} ${
        139 - pick(seed, 5, 13)
      } ${153 - pick(seed, 5, 15)} ${153 - pick(seed, 5, 17)}`,
    ],
    focus: [
      central,
      `M${95 + pick(seed, 4, 19)} ${82 + pick(seed, 4, 21)} C${
        109 + pick(seed, 3, 23)
      } ${87 + pick(seed, 4, 25)} ${135 + pick(seed, 3, 27)} ${
        87 + pick(seed, 4, 29)
      } ${148 - pick(seed, 4, 31)} ${81 + pick(seed, 4, 1)}`,
      `M${100 + pick(seed, 4, 3)} ${153 - pick(seed, 4, 5)} C${
        112 + pick(seed, 4, 7)
      } ${148 - pick(seed, 4, 9)} ${130 + pick(seed, 4, 11)} ${
        148 - pick(seed, 4, 13)
      } ${143 - pick(seed, 4, 15)} ${154 - pick(seed, 4, 17)}`,
    ],
    protection: [
      central,
      `M${92 + pick(seed, 4, 19)} ${89 + pick(seed, 4, 21)} C${
        108 + pick(seed, 4, 23)
      } ${79 + pick(seed, 4, 25)} ${132 + pick(seed, 4, 27)} ${
        79 + pick(seed, 4, 29)
      } ${149 - pick(seed, 4, 31)} ${90 + pick(seed, 4, 1)}`,
      `M${91 + pick(seed, 4, 3)} ${151 - pick(seed, 4, 5)} C${
        110 + pick(seed, 4, 7)
      } ${164 - pick(seed, 4, 9)} ${131 + pick(seed, 4, 11)} ${
        164 - pick(seed, 4, 13)
      } ${150 - pick(seed, 4, 15)} ${152 - pick(seed, 4, 17)}`,
    ],
    growth: [
      central,
      `M${101 + pick(seed, 4, 19)} ${191 - pick(seed, 4, 21)} C${
        111 + pick(seed, 4, 23)
      } ${145 - pick(seed, 6, 25)} ${124 + pick(seed, 5, 27)} ${
        94 - pick(seed, 7, 29)
      } ${151 + pick(seed, 4, 31)} ${54 + pick(seed, 4, 1)}`,
      `M${107 + pick(seed, 4, 3)} ${152 - pick(seed, 4, 5)} C${
        93 + pick(seed, 4, 7)
      } ${138 - pick(seed, 5, 9)} ${84 + pick(seed, 4, 11)} ${
        123 - pick(seed, 5, 13)
      } ${84 + pick(seed, 4, 15)} ${107 - pick(seed, 4, 17)}`,
    ],
    relationship: [
      `M${103 + pick(seed, 4, 19)} ${56 + pick(seed, 4, 21)} C${
        111 + pick(seed, 4, 23)
      } ${88 + pick(seed, 4, 25)} ${111 + pick(seed, 4, 27)} ${
        118 + pick(seed, 4, 29)
      } ${101 + pick(seed, 4, 31)} ${150 - pick(seed, 4, 1)}`,
      `M${139 - pick(seed, 4, 3)} ${57 + pick(seed, 4, 5)} C${
        130 + pick(seed, 4, 7)
      } ${89 + pick(seed, 4, 9)} ${129 + pick(seed, 4, 11)} ${
        119 + pick(seed, 4, 13)
      } ${141 - pick(seed, 4, 15)} ${151 - pick(seed, 4, 17)}`,
      `M${91 + pick(seed, 4, 19)} ${101 + pick(seed, 4, 21)} C${
        109 + pick(seed, 4, 23)
      } ${115 + pick(seed, 4, 25)} ${131 + pick(seed, 4, 27)} ${
        114 + pick(seed, 4, 29)
      } ${151 - pick(seed, 4, 31)} ${101 + pick(seed, 4, 1)}`,
    ],
  };

  return byMode[mode];
}

function buildCinnabarMarks(seed: number) {
  const first = {
    x: 96 + pick(seed, 34, 2),
    y: 94 + pick(seed, 48, 4),
    r: 2 + pick(seed, 3, 6) * 0.6,
  };
  const second = {
    x: 97 + pick(seed, 40, 8),
    y: 90 + pick(seed, 52, 10),
    w: 8 + pick(seed, 8, 12),
    h: 3 + pick(seed, 4, 14),
    rotate: -18 + pick(seed, 36, 16),
  };

  return { first, second };
}

const paperFibers = [
  "M71 52 C91 50 117 53 142 49",
  "M79 88 C104 92 131 89 159 94",
  "M70 133 C96 128 126 134 164 129",
  "M81 174 C105 180 132 176 154 181",
  "M94 37 C90 67 92 92 88 121",
  "M151 55 C157 89 151 126 156 166",
];

export function ResultSigil(props: ResultSigilProps) {
  const mode = normalizeMode(props.intent);
  const seed = createSeed(props);
  const glyphs = buildPseudoSealGlyph(seed, mode);
  const arrayLines = buildArrayLines(seed, mode);
  const strokes = buildTalismanStrokes(seed, mode);
  const cinnabar = buildCinnabarMarks(seed);

  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <div className="absolute inset-4 rounded-[2rem] border border-[#8f6b3d]/14 bg-[#0f0a07] shadow-[0_28px_90px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-10 rotate-[-1deg] rounded-[1.1rem] bg-[#c8b282] shadow-[inset_0_0_42px_rgba(63,37,18,0.28),0_18px_50px_rgba(0,0,0,0.28)]" />
      <div
        aria-hidden="true"
        className="absolute inset-10 rotate-[-1deg] rounded-[1.1rem] opacity-45 [background-image:radial-gradient(rgba(54,35,18,0.36)_0.8px,transparent_0.8px),linear-gradient(96deg,transparent,rgba(255,245,214,0.18)_48%,transparent_52%)] [background-size:7px_7px,100%_100%]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 240 240"
        className="relative h-60 w-60 sm:h-64 sm:w-64"
      >
        <defs>
          <filter id="sigil-ink-soften">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.032"
              numOctaves="2"
              seed={String((seed % 23) + 3)}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <path
          d={paperShape(seed)}
          fill="#c9b27d"
          fillOpacity="0.9"
          stroke="#4a2b18"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        {paperFibers.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#3b2415"
            strokeLinecap="round"
            strokeOpacity="0.13"
            strokeWidth="0.7"
          />
        ))}

        <g opacity="0.82">
          {arrayLines.map((path) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="#6d512c"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.62"
              strokeWidth="0.95"
              strokeDasharray={`${4 + pick(seed, 4, 6)} ${6 + pick(seed, 5, 8)}`}
            />
          ))}
        </g>

        <g filter="url(#sigil-ink-soften)">
          <path
            d={`M92 ${91 + pick(seed, 6, 2)} C104 ${82 + pick(seed, 6, 4)} ${
              135 + pick(seed, 5, 6)
            } ${82 + pick(seed, 5, 8)} ${147 - pick(seed, 4, 10)} ${
              92 + pick(seed, 6, 12)
            } C153 ${107 + pick(seed, 5, 14)} ${153 - pick(seed, 4, 16)} ${
              136 + pick(seed, 5, 18)
            } ${144 - pick(seed, 5, 20)} ${151 - pick(seed, 5, 22)} C127 ${
              159 - pick(seed, 5, 24)
            } ${106 + pick(seed, 5, 26)} ${159 - pick(seed, 5, 28)} ${
              93 + pick(seed, 5, 30)
            } ${149 - pick(seed, 5, 1)} C87 ${134 - pick(seed, 5, 3)} ${
              87 + pick(seed, 4, 5)
            } ${107 + pick(seed, 5, 7)} 92 ${91 + pick(seed, 6, 2)} Z`}
            fill="#8f241b"
            fillOpacity="0.84"
            stroke="#5a1711"
            strokeOpacity="0.66"
            strokeWidth="1"
          />
          <circle
            cx={cinnabar.first.x}
            cy={cinnabar.first.y}
            r={cinnabar.first.r}
            fill="#63130f"
            fillOpacity="0.52"
          />
          <rect
            x={cinnabar.second.x}
            y={cinnabar.second.y}
            width={cinnabar.second.w}
            height={cinnabar.second.h}
            rx="1"
            fill="#6b1812"
            fillOpacity="0.42"
            transform={`rotate(${cinnabar.second.rotate} ${cinnabar.second.x} ${cinnabar.second.y})`}
          />
          {glyphs.map((path) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="#f1dfb7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.9"
              strokeWidth="2.15"
            />
          ))}
        </g>

        <g filter="url(#sigil-ink-soften)">
          {strokes.map((path) => (
            <path
              key={`${path}-wash`}
              d={path}
              fill="none"
              stroke="#5b1a12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.2"
              strokeWidth="4.6"
            />
          ))}
          {strokes.map((path) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="#7d1f17"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.84"
              strokeWidth="2.15"
            />
          ))}
        </g>

        <path
          d={`M${79 + pick(seed, 4, 5)} ${33 + pick(seed, 4, 7)} C${
            102 + pick(seed, 4, 9)
          } ${26 + pick(seed, 5, 11)} ${138 + pick(seed, 4, 13)} ${
            27 + pick(seed, 5, 15)
          } ${160 - pick(seed, 4, 17)} ${36 + pick(seed, 4, 19)} M${
            78 + pick(seed, 4, 21)
          } ${210 - pick(seed, 5, 23)} C${101 + pick(seed, 4, 25)} ${
            216 - pick(seed, 4, 27)
          } ${133 + pick(seed, 4, 29)} ${217 - pick(seed, 4, 31)} ${
            157 - pick(seed, 4, 2)
          } ${211 - pick(seed, 4, 4)}`}
          fill="none"
          stroke="#e3c98d"
          strokeLinecap="round"
          strokeOpacity="0.42"
          strokeWidth="1.1"
        />
      </svg>
      <div className="absolute bottom-7 border border-[#7a1b14]/28 bg-[#1d100b]/86 px-3 py-1.5 text-[11px] font-medium tracking-[0.1em] text-[#ead7aa] shadow-[0_10px_28px_rgba(0,0,0,0.26)]">
        {mode}
      </div>
    </div>
  );
}
