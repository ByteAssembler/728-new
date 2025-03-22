import { createFileRoute } from '@tanstack/react-router'
import { AboutSection, NavigationButton, PersonalItem } from '~/lib/components/ui/about';

export const Route = createFileRoute('/(public)/about')({
  component: About,
})

const features = [
  {
    title: "Unser Projektleiter: Moritz",
    titleBackground: 0,
    text:
      "Moritz sorgt dafür, dass alles im Team rund läuft. Er koordiniert die Aufgaben, überwacht den Fortschritt und stellt sicher, dass alle gut zusammenarbeiten. Neben der Organisation kümmert er sich um die Kommunikation nach außen, die Ressourcenplanung und die Projektstruktur. Er arbeitet an der Autosteuerung, testet Sensoren und entwickelt 3D-Modelle für wichtige Mechanismen",
    imageUrl: "@/assets/Moritz.jpg",
  },
  {
    title: "Die Bastlerin: Leni",
    titleBackground: 1,
    text:
      "Leni hält das Team auf Kurs, indem sie die Arbeitsqualität überprüft und Fortschritte dokumentiert. Sie arbeitet an der Materialliste, plant den Hebemechanismus und hilft bei der 3D-Modellierung. Außerdem sorgt sie für eine präzise Protokollierung und verbessert die Projektorganisation",
    imageUrl: "@/assets/Leni.png",
  },
  {
    title: "Der Erbauer: Ivan",
    titleBackground: 2,
    text:
      "Ivan ist der Technik-Experte im Team. Er testet Motoren, Sensoren und kümmert sich um die Elektronik des Autos. Er arbeitet intensiv an der Stromversorgung, programmiert Steuerungen und optimiert den Hebemechanismus mit Elektromagneten",
    imageUrl: "@/assets/Ivan.png",
  },
  {
    title: "Unser Designer: Jonas",
    titleBackground: 3,
    text:
      "Jonas bringt kreative Ideen ins Projekt ein und kümmert sich um das Design der Webseite. Er arbeitet an der Benutzeroberfläche und sorgt für die Umsetzung der Seite. Außerdem hilft er bei der Gestaltung von Logo und Trikots",
    imageUrl: "@/assets/Jonas.png",
  },
  {
    title: "Der Alleskönner: Philipp",
    titleBackground: 4,
    text:
      "Philipp bringt technisches Wissen ins Team. Er entwickelt den Webserver, arbeitet an der Autosteuerung und programmiert wichtige Software-Komponenten. Er hat außerdem Docker eingerichtet und sorgt für die technische Infrastruktur",
    imageUrl: "@/assets/Philipp.png",
  },
  {
    title: "Der Softwarefreak: Florian",
    titleBackground: 5,
    text:
      "Florian analysiert Vorschläge und bewertet ihre Machbarkeit. Er entwickelt die Autosoftware, testet Sensoren und verbessert die Steuerung. Außerdem sorgt er für eine funktionierende Kommunikation zwischen Hardware und Software",
    imageUrl: "@/assets/Florian.png",
  },
  {
    title: "Der 3D Künstler: Paul",
    titleBackground: 6,
    text:
      "Paul achtet darauf, dass Meetings strukturiert ablaufen. Er plant Pausen und stellt sicher, dass jeder zu Wort kommt. Zudem ist er aktiv in der 3D-Modellierung und entwickelt wichtige Bauteile für das Auto",
    imageUrl: "@/assets/Pual.png",
  },
  // Add more features as needed
];

function About() {
  return (
    <div className="md:pl-12 p-4 md:p-10 font-Electrolize">
      <div className="flex justify-center pb-7">
        <NavigationButton />
      </div>

      <AboutSection text="Wir sind Mission Seven To Aid (Mission72A) – ein engagiertes Team mit dem Ziel, ein autonomes Rettungsfahrzeug zu entwickeln, das in Krisensituationen Leben rettet. Unsere Vision ist es, moderne Technik einzusetzen, um Menschen und Rettungskräfte zu schützen. Mit Kreativität, Wissen und starkem Teamgeist stellen wir uns jeder Herausforderung. Unser Projekt „Guardian of the Galaxy“ soll nicht nur Innovation vorantreiben, sondern auch einen wichtigen gesellschaftlichen Beitrag leisten" />
      <div className="flex flex-col xs:p-2 md:p-10">
        <h2
          className="font-Orbitron font-extrabold text-center"
          style={{ fontSize: 35 }}
        >
          Über das Team
        </h2>
        {features.map((feature, index) => (
          <PersonalItem
            key={index}
            title={feature.title}
            titleBackground={feature.titleBackground}
            text={feature.text}
            imageUrl={feature.imageUrl}
            isImageFirst={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
