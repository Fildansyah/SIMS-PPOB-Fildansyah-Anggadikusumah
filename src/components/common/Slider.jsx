"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 3;
  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-1/3 flex-shrink-0 px-2">
              <div className="relative w-full h-40 rounded-xl overflow-hidden">
                <Image
                  src={image}
                  alt="Banner"
                  unoptimized
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity "
      >
        <MdChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity"
      >
        <MdChevronRight />
      </button>
    </div>
  );
};

export default Slider;
