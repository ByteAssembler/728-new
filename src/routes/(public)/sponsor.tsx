import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/sponsor")({
  component: SponsorPage,
});

function SponsorPage() {
  return (
    <div className="md:pl-12 p-4 md:p-10 font-Electrolize min-h-screen">
      <div className="flex flex-col items-center mt-20">
        {/* Progress Group Image */}
        <div className="w-full max-w-4xl mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/PROGRESS_GROUP.jpg/2880px-PROGRESS_GROUP.jpg?20161208153140"
            alt="test image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* SVG Logo with Link */}
        <a
          href="https://www.progress.group/de/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-full h-auto md:h-150% md:w-150%"
            viewBox="0 0 514 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_453_7)">
              <path d="M22 12L481.769 0L505.5 97L0 83.5L22 12Z" fill="#008BCC" />
            </g>
            <path
              d="M99.212 72.5V26.42H141.644V34.932H107.724V45.172H134.988V53.748H107.724V63.988H141.644V72.5H99.212ZM147.956 72.5V35.38H176.82C178.441 35.38 179.913 35.7853 181.236 36.596C182.601 37.4067 183.668 38.4733 184.436 39.796C185.247 41.1187 185.652 42.5907 185.652 44.212V72.5H177.268V44.532C177.268 44.3187 177.183 44.148 177.012 44.02C176.884 43.8493 176.713 43.764 176.5 43.764H157.108C156.895 43.764 156.703 43.8493 156.532 44.02C156.404 44.148 156.34 44.3187 156.34 44.532V72.5H147.956ZM201.287 72.5C199.665 72.5 198.193 72.0947 196.871 71.284C195.548 70.4733 194.481 69.4067 193.671 68.084C192.86 66.7613 192.455 65.2893 192.455 63.668V23.988H200.839V35.38H215.303V43.764H200.839V63.348C200.839 63.5613 200.903 63.7533 201.031 63.924C201.201 64.052 201.393 64.116 201.607 64.116H215.303V72.5H201.287ZM229.992 72.5C228.328 72.5 226.834 72.0947 225.512 71.284C224.189 70.4733 223.122 69.4067 222.312 68.084C221.544 66.7613 221.16 65.2893 221.16 63.668V44.212C221.16 42.5907 221.544 41.1187 222.312 39.796C223.122 38.4733 224.189 37.4067 225.512 36.596C226.834 35.7853 228.328 35.38 229.992 35.38H250.536V23.22H258.92V72.5H229.992ZM230.376 64.116H249.768C249.981 64.116 250.152 64.052 250.28 63.924C250.45 63.7533 250.536 63.5613 250.536 63.348V44.532C250.536 44.3187 250.45 44.148 250.28 44.02C250.152 43.8493 249.981 43.764 249.768 43.764H230.376C230.162 43.764 229.97 43.8493 229.8 44.02C229.672 44.148 229.608 44.3187 229.608 44.532V63.348C229.608 63.5613 229.672 63.7533 229.8 63.924C229.97 64.052 230.162 64.116 230.376 64.116ZM273.096 72.5C271.475 72.5 270.003 72.0947 268.68 71.284C267.357 70.4733 266.291 69.4067 265.48 68.084C264.669 66.7613 264.264 65.2893 264.264 63.668V44.212C264.264 42.5907 264.669 41.1187 265.48 39.796C266.291 38.4733 267.357 37.4067 268.68 36.596C270.003 35.7853 271.475 35.38 273.096 35.38H293.128C294.749 35.38 296.221 35.7853 297.544 36.596C298.909 37.4067 299.976 38.4733 300.744 39.796C301.555 41.1187 301.96 42.5907 301.96 44.212V58.164H272.648V63.348C272.648 63.5613 272.712 63.7533 272.84 63.924C273.011 64.052 273.203 64.116 273.416 64.116H301.96V72.5H273.096ZM272.648 50.612H293.576V44.532C293.576 44.3187 293.491 44.148 293.32 44.02C293.192 43.8493 293.021 43.764 292.808 43.764H273.416C273.203 43.764 273.011 43.8493 272.84 44.02C272.712 44.148 272.648 44.3187 272.648 44.532V50.612ZM315.909 72.5C314.287 72.5 312.815 72.0947 311.493 71.284C310.17 70.4733 309.103 69.4067 308.293 68.084C307.482 66.7613 307.077 65.2893 307.077 63.668V44.212C307.077 42.5907 307.482 41.1187 308.293 39.796C309.103 38.4733 310.17 37.4067 311.493 36.596C312.815 35.7853 314.287 35.38 315.909 35.38H344.709V43.764H316.229C316.015 43.764 315.823 43.8493 315.653 44.02C315.525 44.148 315.461 44.3187 315.461 44.532V63.348C315.461 63.5613 315.525 63.7533 315.653 63.924C315.823 64.052 316.015 64.116 316.229 64.116H344.773V72.5H315.909ZM350.144 72.5V23.22H358.528V49.716H365.12L378.368 35.38H387.328V37.684L372.544 53.94L387.264 70.196V72.5H378.368L365.12 58.164H358.528V72.5H350.144ZM400.096 72.5C398.475 72.5 397.003 72.0947 395.68 71.284C394.357 70.4733 393.291 69.4067 392.48 68.084C391.669 66.7613 391.264 65.2893 391.264 63.668V44.212C391.264 42.5907 391.669 41.1187 392.48 39.796C393.291 38.4733 394.357 37.4067 395.68 36.596C397.003 35.7853 398.475 35.38 400.096 35.38H420.128C421.749 35.38 423.221 35.7853 424.544 36.596C425.909 37.4067 426.976 38.4733 427.744 39.796C428.555 41.1187 428.96 42.5907 428.96 44.212V58.164H399.648V63.348C399.648 63.5613 399.712 63.7533 399.84 63.924C400.011 64.052 400.203 64.116 400.416 64.116H428.96V72.5H400.096ZM399.648 50.612H420.576V44.532C420.576 44.3187 420.491 44.148 420.32 44.02C420.192 43.8493 420.021 43.764 419.808 43.764H400.416C400.203 43.764 400.011 43.8493 399.84 44.02C399.712 44.148 399.648 44.3187 399.648 44.532V50.612Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_453_7"
                x="0"
                y="0"
                width="513.5"
                height="105"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="4" dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_453_7"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_453_7"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </a>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-Orbitron font-bold text-2xl mb-4 text-center">
            Danke an unseren Sponsor
          </h2>
          <div className="text-white font-Electrolize text-lg md:text-xl space-y-4">
            <p>
              Wir möchten uns herzlich bei der PROGRESS GROUP für ihre großzügige
              Unterstützung bedanken. Als führendes Unternehmen in der Branche hat die
              PROGRESS GROUP maßgeblich zum Erfolg unseres Projekts beigetragen.
            </p>
            <p>
              Durch ihre finanzielle und technische Unterstützung konnten wir unsere Ideen
              verwirklichen und innovative Lösungen entwickeln. Die PROGRESS GROUP teilt
              unsere Vision und hat uns ermöglicht, über die Grenzen des Möglichen
              hinauszudenken.
            </p>
            <p>
              Die Partnerschaft mit der PROGRESS GROUP ist für uns von unschätzbarem Wert.
              Ihr Engagement für Innovation und Exzellenz inspiriert uns täglich und
              treibt uns an, Höchstleistungen zu erbringen.
            </p>
            <p className="font-bold">
              Vielen Dank für Ihre Unterstützung und das Vertrauen in unser Team!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
