import React from "react";
import { Link } from "@tanstack/react-router";

import dogsen from "~/assets/dognig.png";
import buttonBackground from "~/assets/about-header.svg";

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
  //console.log(buttonBackground);
  //console.log(backgroundTitle);

  return (
    <div className="block pb-5 md:pb-2">
      <div className="flex justify-center">
        <img src={titleSvg} alt="title" className=" m-1 md:m-2"></img>
      </div>

      <div
        className={`min-h-[9rem] flex justify-between ${isImageFirst ? "flex-row" : "flex-row-reverse"
          }`}
      >
        <p className="text-[16px] md:text-[24px] content-center xs:content-normal">
          {text}
        </p>
        <div className="relative w-full aspect-square md:w-[75%] z-0">
          <img
            src={portrait}
            alt="Picture of Member"
            // fill // Makes the image fill the parent container
            className="object-cover z-0 " // Ensures the image scales and covers the container
          />
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
    <h2
      className="font-Orbitron font-extrabold text-center"
      style={{ fontSize: 35 }}
    >
      Über Uns
    </h2>
    <div className="flex gap-1 w-full justify-between flex-col md:text-[24] md:p-10 md:flex-row">
      <p className="text-[16px] md:text-[24px] md:w-1/2">{text}</p>
      <img src={dogsen} alt="About Us" className="w-1/2" />
    </div>
  </div>
);

const NavigationButton: React.FC = () => {
  return (
    <button
      className="p-3 pl-4 pr-4  font-Orbitron font-extrabold text-white"
      style={{
        fontSize: 30,
        backgroundImage: `url(${buttonBackground})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link to="/guardian-of-the-galaxy">Explore</Link>
    </button>
  );
};

export { AboutSection, NavigationButton, PersonalItem };
