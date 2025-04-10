"use client";

import type React from "react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/imprint")({
  component: Imprint,
});

function Imprint() {
  return (
    <div className="md:pl-12 p-4 md:p-10 font-Electrolize">
      <div className="flex flex-col xs:p-2 md:p-10">
        <ImprintSection
          title="Angaben gemäß § 5 TMG"
          content={
            <div className="space-y-2">
              <p>Mission Seven To Aid (Mission72A)</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland</p>
            </div>
          }
        />

        <ImprintSection
          title="Kontakt"
          content={
            <div className="space-y-2">
              <p>Telefon: +49 123 456789</p>
              <p>E-Mail: info@mission72a.de</p>
            </div>
          }
        />

        <ImprintSection
          title="Verantwortlich für den Inhalt"
          content={
            <div className="space-y-2">
              <p>Moritz Mustermann</p>
              <p>Projektleiter</p>
              <p>E-Mail: moritz@mission72a.de</p>
            </div>
          }
        />

        <ImprintSection
          title="Haftungsausschluss"
          content={
            <div className="space-y-4">
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
                keine Gewähr übernehmen.
              </p>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
            </div>
          }
        />

        <ImprintSection
          title="Urheberrecht"
          content={
            <div className="space-y-4">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
                des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers.
              </p>
            </div>
          }
        />

        <ImprintSection
          title="Datenschutz"
          content={
            <div className="space-y-4">
              <p>
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe
                personenbezogener Daten möglich. Soweit auf unseren Seiten
                personenbezogene Daten (beispielsweise Name, Anschrift oder
                E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
                freiwilliger Basis.
              </p>
              <p>
                Weitere Informationen zum Datenschutz finden Sie in unserer
                Datenschutzerklärung.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

interface ImprintSectionProps {
  title: string;
  content: React.ReactNode;
}

const ImprintSection: React.FC<ImprintSectionProps> = ({ title, content }) => {
  const svgString = encodeURIComponent(
    '<svg width="334" height="117" viewBox="0 0 334 117" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M26.3152 10.9933L334 0L317.806 98.1544L0 117L26.3152 10.9933Z" fill="#23CF51"/>\n' +
      "</svg>\n",
  );

  const dataUrl = `url("data:image/svg+xml,${svgString}")`;

  return (
    <div className="mb-10">
      <div
        className="inline-block p-3 pl-6 pr-10 mb-4 font-Orbitron font-bold text-white"
        style={{
          backgroundImage: dataUrl,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontSize: 24,
        }}
      >
        {title}
      </div>
      <div className="text-white text-lg md:text-xl pl-4">{content}</div>
    </div>
  );
};

export default Imprint;
