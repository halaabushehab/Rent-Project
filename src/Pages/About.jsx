import React from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import avatar from "../assets/avatar.png";
import girl from "../assets/girl.avif";

export default function About() {
  return (
    <>
      <div className="bg-gray-800 w-full h-60 text-amber-50 flex items-center justify-center">
        <p className="text-center text-7xl font-bold">About Us</p>
      </div>

      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              About Us
            </h1>
            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              className="font-normal text-base leading-6 text-gray-700 "
            >
              Welcome to our studio apartment rental platform! We provide cozy
              and modern studio apartments that suit your lifestyle and budget.
              Whether you're a student, a young professional, or just looking
              for a comfortable space, we have the perfect place for you.
            </p>
          </div>
          <div className="lg:w-8/12 mt-5">
            <img
              className="w-190 rounded-lg"
              src={img1}
              alt="A group of People"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className=" lg:w-8/12 mt-5">
            <img
              className="w-190 rounded-lg"
              src={img2}
              alt="A group of People"
            />
          </div>

          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Key Features
            </h1>
            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              className="font-normal text-base leading-6 text-gray-700 "
            >
              We offer modern and comfortable studio apartments equipped with
              all essentials to ensure a perfect living experience. Our key
              features include prime locations near transportation and services,
              flexible lease agreements to suit your needs, and fully furnished
              apartments with modern amenities. Additionally, we provide an easy
              and fast booking system, along with 24/7 support to ensure your
              complete comfort.
            </p>
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Why Choose Us?
            </h1>
            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              className="  text-[50px] leading-6 text-gray-700 "
            >
              Finding the perfect studio apartment has never been easier! We
              offer a hassle-free rental experience with transparent pricing, no
              hidden fees, and flexible lease terms. Our apartments are designed
              for comfort and convenience, making them ideal for students,
              professionals, and travelers. With our user-friendly platform and
              dedicated customer support, you can secure your dream space
              quickly and with confidence.
            </p>
          </div>

          <div className=" lg:w-8/12 mt-5">
            <img
              className="w-190 mt-5 rounded-lg"
              src={img3}
              alt="A group of People"
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-8/ lg:pt-8">
            <div className="grid md:grid-cols-7 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={avatar}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  SM.Rami Abdelhamid
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={avatar}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  PO.Deya’a Abualrub
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={avatar}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  QA.Abdullah ghawanmeh
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={avatar}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-8 mt-4">
                  Bilal Alzaro
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={girl}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  {" "}
                  Hala abu shehab{" "}
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={girl}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Heba maaitah
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden w-2xl rounded-lg "
                  src={girl}
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Ghofran hijazi
                </p>
              </div>
            </div>
          </div>

          <div className="w- lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Our Team
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              We are a passionate team of developers who believe in the power of
              planning and organization. Our mission is to provide users with a
              powerful yet simple tool to help them achieve their goals
              efficiently. Stay connected with us on social media for updates
              and insights
            </p>
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
}
