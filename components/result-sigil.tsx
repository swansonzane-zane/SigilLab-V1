type ResultSigilProps = {
  intent: string;
};

type SigilMode =
  | "clarity"
  | "healing"
  | "focus"
  | "protection"
  | "growth"
  | "relationship";

type SigilSpec = {
  label: string;
  sealPath: string;
  strokes: string[];
  accents: string[];
  frame: string;
};

const sigilSpecs: Record<SigilMode, SigilSpec> = {
  clarity: {
    label: "clarity",
    sealPath:
      "M76 54 H164 C172 54 178 60 178 68 V156 C178 167 169 174 158 172 L74 160 C67 159 62 153 62 146 V70 C62 61 68 54 76 54 Z",
    strokes: [
      "M120 42 C116 67 118 91 122 114 C126 138 126 160 119 188",
      "M88 76 C106 84 132 84 154 76",
      "M82 116 C107 110 137 118 160 108",
      "M96 150 C111 142 130 143 146 154",
    ],
    accents: ["M70 92 L90 92", "M150 138 L170 138", "M104 62 L136 62"],
    frame:
      "M54 42 H186 M54 198 H186 M42 54 V186 M198 54 V186",
  },
  healing: {
    label: "healing",
    sealPath:
      "M74 64 C96 48 130 53 147 72 C166 94 160 129 136 151 C119 167 97 172 78 158 C58 143 55 107 69 82 C70 77 71 70 74 64 Z",
    strokes: [
      "M82 128 C101 92 128 78 154 90",
      "M78 150 C102 139 130 139 158 154",
      "M105 58 C96 88 102 113 120 134 C132 149 134 166 124 184",
      "M144 72 C128 101 128 128 148 150",
    ],
    accents: ["M68 104 C78 98 88 98 98 104", "M142 120 C152 114 162 114 172 120"],
    frame:
      "M58 52 C83 40 154 39 184 60 M51 178 C84 198 150 200 186 176",
  },
  focus: {
    label: "focus",
    sealPath:
      "M104 42 H140 L151 74 L139 197 H96 L86 75 Z",
    strokes: [
      "M121 45 L119 194",
      "M93 78 H151",
      "M101 108 H141",
      "M95 139 H148",
      "M106 166 H136",
    ],
    accents: ["M74 70 L96 88", "M166 70 L144 88", "M72 170 L96 154", "M168 170 L144 154"],
    frame:
      "M120 22 V45 M120 198 V218 M60 52 L84 76 M180 52 L156 76",
  },
  protection: {
    label: "protection",
    sealPath:
      "M120 44 L174 70 L166 150 L120 190 L74 150 L66 70 Z",
    strokes: [
      "M120 66 V170",
      "M88 88 C106 78 134 77 154 88",
      "M84 132 C108 144 132 144 156 132",
      "M98 104 L142 154",
      "M142 104 L98 154",
    ],
    accents: ["M58 82 L74 70", "M182 82 L166 70", "M64 162 L78 148", "M176 162 L162 148"],
    frame:
      "M48 48 H192 V192 H48 Z",
  },
  growth: {
    label: "growth",
    sealPath:
      "M68 156 C81 98 112 62 154 50 C168 83 166 132 142 168 C119 202 87 194 68 156 Z",
    strokes: [
      "M96 184 C104 138 123 97 154 58",
      "M105 142 C85 129 77 111 78 92",
      "M118 114 C142 105 156 90 162 70",
      "M112 158 C136 152 154 138 166 118",
    ],
    accents: ["M74 170 C86 178 98 178 110 170", "M138 64 C148 62 158 64 166 70"],
    frame:
      "M52 188 C80 202 160 204 190 184 M54 64 C74 46 110 38 145 42",
  },
  relationship: {
    label: "relationship",
    sealPath:
      "M78 70 C99 52 125 62 120 96 C116 62 146 52 166 72 C188 94 168 135 120 176 C72 134 56 94 78 70 Z",
    strokes: [
      "M92 94 C111 108 130 108 150 94",
      "M91 130 C110 120 130 121 150 132",
      "M104 72 C112 92 111 118 101 148",
      "M137 72 C129 92 130 118 140 148",
    ],
    accents: ["M72 112 H94", "M146 112 H170", "M116 166 H124"],
    frame:
      "M62 64 C82 44 105 42 120 58 C136 42 160 44 180 66",
  },
};

function getSigilSpec(intent: string): SigilSpec {
  const normalized = intent.toLowerCase();

  if (normalized === "balance" || normalized === "protection") {
    return sigilSpecs.protection;
  }

  if (normalized === "release" || normalized === "growth") {
    return sigilSpecs.growth;
  }

  if (normalized === "openness" || normalized === "relationship") {
    return sigilSpecs.relationship;
  }

  if (normalized === "healing" || normalized === "focus") {
    return sigilSpecs[normalized];
  }

  return sigilSpecs.clarity;
}

export function ResultSigil({ intent }: ResultSigilProps) {
  const spec = getSigilSpec(intent);

  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <div className="absolute inset-3 rounded-[2.4rem] border border-[#b08d57]/18 bg-[#15100c] shadow-[0_30px_100px_rgba(0,0,0,0.46)]" />
      <div className="absolute inset-7 rounded-[1.6rem] border border-[#7d1f17]/35 bg-[linear-gradient(145deg,#d5c19a,#9d8057_48%,#5d2a1f)] opacity-95 shadow-[inset_0_0_34px_rgba(58,32,18,0.55)]" />
      <div
        aria-hidden="true"
        className="absolute inset-7 rounded-[1.6rem] opacity-35 [background-image:radial-gradient(rgba(42,28,16,0.38)_1px,transparent_1px),linear-gradient(105deg,transparent_0%,rgba(255,245,210,0.16)_42%,transparent_46%)] [background-size:9px_9px,100%_100%]"
      />
      <div className="absolute inset-12 rotate-[-1.5deg] rounded-[1.2rem] border border-[#2b160f]/35 bg-[#b99a68]/18" />
      <svg
        aria-hidden="true"
        viewBox="0 0 240 240"
        className="relative h-60 w-60 text-[#6f1711] drop-shadow-[0_7px_0_rgba(38,15,9,0.16)] sm:h-64 sm:w-64"
      >
        <path
          d={spec.frame}
          fill="none"
          stroke="#5f4325"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="10 9"
        />
        <path
          d={spec.sealPath}
          fill="#7a1b14"
          fillOpacity="0.88"
          stroke="#2f120c"
          strokeOpacity="0.48"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M62 64 C82 48 153 45 178 66 M57 182 C92 196 153 199 185 176"
          fill="none"
          stroke="#d2b06c"
          strokeLinecap="round"
          strokeOpacity="0.52"
          strokeWidth="1.5"
        />
        {spec.strokes.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#f2d6a0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.88"
            strokeWidth="7"
          />
        ))}
        {spec.strokes.map((path) => (
          <path
            key={`${path}-ink`}
            d={path}
            fill="none"
            stroke="#37130d"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
            strokeWidth="2.2"
          />
        ))}
        {spec.accents.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#d9b870"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.7"
            strokeWidth="3"
          />
        ))}
        <circle cx="120" cy="120" r="7" fill="#e7c071" fillOpacity="0.9" />
      </svg>
      <div className="absolute bottom-7 rounded-sm border border-[#7a1b14]/35 bg-[#2a1711]/82 px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#d8bd82] shadow-[0_10px_28px_rgba(0,0,0,0.26)]">
        {spec.label}
      </div>
    </div>
  );
}
