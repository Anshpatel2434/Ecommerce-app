import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="sm:flex items-center mx-auto  min-h-screen max-w-screen-xl mt-16">
        <div className="sm:w-1/2 md:w-[40rem] p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="sm:w-1/2 md:w-[40rem] p-5">
          <div className="flex flex-col gap-4 mb-10">
            <div className="my-4 font-bold text-white text-4xl md:text-6xl border-b-4 border-blue-700 py-4">
              About <span className="text-indigo-600">Project</span>
            </div>
            <p className=" text-white text-2xl md:text-3xl text-justify tracking-wide p-2">
              This project, created by Ansh Patel and Siddhant Kotak, aims to
              elevate their web development skills and delve into the expansive
              and dynamic realm of web technologies. Through this initiative,
              they seek to broaden their knowledge, experiment with innovative
              concepts, and remain at the forefront of new trends.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
