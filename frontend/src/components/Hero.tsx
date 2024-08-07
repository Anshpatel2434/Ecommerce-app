import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="h-screen bg-gray-900 mt-16">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto sm:w-full place-self-center lg:col-span-7">
          <h1 className=" mb-4 text-3xl  font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Discover, Shop, Enjoy –{" "}
            <div className="my-4">Everything You Need </div>
            at Your Fingertips!
          </h1>
          <p className="max-w-2xl mt-14 mb-6 font-light  lg:mb-8 md:text-lg lg:text-2xl text-gray-400">
            Welcome to our e-commerce platform, where convenience meets variety.
            Explore a vast selection of high-quality products, from the latest
            electronics to trendy fashion and home essentials.
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
