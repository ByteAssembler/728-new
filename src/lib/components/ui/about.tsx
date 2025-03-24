import { Link } from "@tanstack/react-router";
import React from "react";
import Image from "~/lib/components/ui/image";

import buttonBackground from "~/assets/about-header.svg";
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
  title,
  titleBackground,
  text,
  imageUrl,
  isImageFirst,
}) => {
  const titleSvg = titleSvgs[titleBackground];
  const portrait = portraits[titleBackground];
  //console.log(buttonBackground);
  //console.log(backgroundTitle);

  return (
    <div className="block pb-5 md:pb-2">
      {/* Mobile Layout (stacked: image → title → text) */}
      <div className="flex flex-col xs:hidden">
        <div className="relative aspect-[3/4] w-full max-w-xs mx-auto mb-3">
          <Image
            src={portrait}
            alt="Picture of Member"
            className="object-cover object-top p-0"
          />
        </div>
        <div className="flex justify-center mb-3">
          <img src={titleSvg} alt="title" className="m-0" />
        </div>
        <p className="text-base">{text}</p>
      </div>

      {/* Tablet/Desktop Layout (title at top, image and text below side by side) */}
      <div className="hidden xs:block">
        <div className="flex justify-center mb-4">
          <img src={titleSvg} alt="title" className="m-0" />
        </div>
        <div className={`flex gap-1 ${isImageFirst ? "flex-row" : "flex-row-reverse"}`}>
          <div className="relative aspect-[3/4] w-1/2 lg:w-2/5 h-auto md:max-h-[30rem] lg:max-h-[28rem]">
            <Image
              src={portrait}
              alt="Picture of Member"
              className="object-cover object-[center_20%] p-0"
            />
          </div>
          {/* Adjust text container width and add more padding on larger screens */}
          <div className="w-1/2 lg:w-3/5">
            <p
              className={`text-base md:text-1xl lg:text-2xl text-white ${
                isImageFirst
                  ? "lg:translate-x-[-1rem] xl:translate-x-[-2rem] lg:pr-4"
                  : "lg:translate-x-[1rem] xl:translate-x-[2rem] lg:pl-4"
              }`}
            >
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
    <h2 className="text-white font-Orbitron font-extrabold text-center text-2xl">
      Über Uns
    </h2>
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:p-10">
      <p className="text-lg md:text-2xl md:w-1/2 text-white">{text}</p>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={dogsen}
          alt="About Us"
          className="w-full max-w-full h-auto object-contain"
        />
      </div>
    </div>
  </div>
);

const NavigationButton: React.FC = () => {
  return (
    <button
      className="p-3 pl-4 pr-4  font-Orbitron font-extrabold text-white"
      style={{
        fontSize: 30,
        backgroundImage: `url(${buttonBackground.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link href="/guardian-of-the-galaxy">Explore</Link>
    </button>
  );
};

export { AboutSection, NavigationButton, PersonalItem };
