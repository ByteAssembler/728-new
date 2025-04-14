import { Link } from "@tanstack/react-router";
import React from "react";
import Image from "~/lib/components/ui/image";

import dogsen from "~/assets/dognig.png";

import moritzImage from "~/assets/Moritz.png";
import moritzSvg from "~/assets/moritz.svg";

import leniImage from "~/assets/Leni.png";
import leniSvg from "~/assets/leni.svg";

import ivanImage from "~/assets/Ivan.png";
import ivanSvg from "~/assets/ivan.svg";

import jonasImage from "~/assets/Jonas.png";
import jonasSvg from "~/assets/jonas.svg";

import florianImage from "~/assets/Florian.png";
import florianSvg from "~/assets/florian.svg";

import philippImage from "~/assets/Philipp.png";
import philippSvg from "~/assets/philipp.svg";

import paulImage from "~/assets/Paul.png";
import paulSvg from "~/assets/paul.svg";

interface FeatureSectionProps {
  title: string;
  titleBackground: number;
  text: string;
  imageUrl: string;
  isImageFirst: boolean;
}

const titleSvgs = [
  moritzSvg,
  leniSvg,
  ivanSvg,
  jonasSvg,
  philippSvg,
  florianSvg,
  paulSvg,
];

const portraits = [
  moritzImage,
  leniImage,
  ivanImage,
  jonasImage,
  philippImage,
  florianImage,
  paulImage,
];

const PersonalItem: React.FC<FeatureSectionProps> = ({
  titleBackground,
  text,
  isImageFirst,
}) => {
  const titleSvg = titleSvgs[titleBackground];
  const portrait = portraits[titleBackground];

  return (
    <div className="block pb-5 md:pb-2">
      {/* Mobile Layout (unter md): Alles untereinander */}
      <div className="block md:hidden">
        <div className="w-full mb-4">
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={portrait}
              alt="Picture of Member"
              className="w-full object-cover object-[center_20%] p-0  mask-b-from-75% mask-b-to-98% "
            />
          </div>
        </div>
        {/* Banner */}
        <div className="w-full mb-4 flex justify-center">
          <img src={titleSvg} alt="title" />
        </div>
        {/* Paragraph */}
        <div className="w-full">
          <p className="text-base md:text-xl lg:text-2xl text-white px-4">{text}</p>
        </div>
      </div>

      {/* Tablet Layout (von md bis lg): Banner oben, darunter zwei Spalten */}
      <div className="hidden md:block lg:hidden">
        <div className="w-full mb-4">
          <img src={titleSvg} alt="title" className="w-full max-w-md mx-auto" />
        </div>

        <div className={`flex ${isImageFirst ? "flex-row" : "flex-row-reverse"} gap-4`}>
          <div className="w-full md:w-1/2">
            <Image
              src={portrait}
              alt="Picture of Member"
              className="w-full object-cover  mask-b-from-65% mask-b-to-98%"
            />
          </div>

          <div className="w-full md:w-1/2 flex items-center px-4">
            <p className="text-base md:text-xl lg:text-2xl text-white">{text}</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout (ab lg): Banner oben, danach 50:50 */}
      <div className="hidden lg:block">
        <div className="w-full mb-4">
          <img src={titleSvg} alt="title" className="w-full max-w-xl mx-auto" />
        </div>

        <div className="flex">
          <div className={`w-1/2 ${isImageFirst ? "" : "order-2"}`}>
            <Image
              src={portrait}
              alt="Picture of Member"
              className="w-full object-cover mask-b-from-70% mask-b-to-98%"
            />
          </div>
          <div
            className={`w-1/2 flex items-center px-4 ${isImageFirst ? "" : "order-1"}`}
          >
            <p className="text-base md:text-xl lg:text-2xl 2xl:text-4xl text-white">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AboutSectionProp {
  text: string;
}

const AboutSection: React.FC<AboutSectionProp> = ({ text }) => (
  <div>
    <h2 className="text-white font-Orbitron font-extrabold text-center text-4xl">
      Über Uns
    </h2>
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:p-10">
      <p className="text-lg md:text-2xl md:w-1/2 2xl:text-4xl text-white">{text}</p>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={dogsen}
          alt="About Us"
          className="md:absolute relative w-full max-w-full h-auto object-contain"
        />
      </div>
    </div>
  </div>
);

const NavigationButton: React.FC = () => {
  const svgString = encodeURIComponent(
    '<svg width="334" height="117" viewBox="0 0 334 117" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M26.3152 10.9933L334 0L317.806 98.1544L0 117L26.3152 10.9933Z" fill="#23CF51"/>\n' +
      "</svg>\n",
  );

  const dataUrl = `url("data:image/svg+xml,${svgString}")`;

  return (
    <Link
      to="/guardian-of-the-galaxy"
      className="p-3 pl-4 pr-4  font-Orbitron font-extrabold text-white hover:opacity-80"
      style={{
        fontSize: 30,
        backgroundImage: dataUrl,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      Entdecke
    </Link>
  );
};

export { AboutSection, NavigationButton, PersonalItem };
