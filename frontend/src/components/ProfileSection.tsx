import { useContext, useEffect } from "react";
import { AppContext, Context } from "../context/AppContext";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useProfile } from "../hooks/useProfile";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();
  const { profile, loading, setProfile, status } = useProfile();
  const { user } = useContext(AppContext) as Context;
  const [firstname, secondname] = user.name.split(" ");

  useEffect(() => {
    setProfile(profile);
  }, [loading]);

  return (
    <>
      {!loading ? (
        <>
          {status === 200 ? (
            <>
              {user.name !== "" ? (
                <section className="bg-gray-900 mt-16 flex font-medium items-center justify-center min-h-screen">
                  <section className="mx-auto bg-gray-800 rounded-2xl flex flex-col justify-center items-center px-8 py-6 shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
                    <div className="mt-6 w-fit mx-auto">
                      <div className="rounded-full font-playwrite flex items-center justify-center text-3xl text-white w-28 h-28 border-4 border-blue-500">
                        {firstname[0] + secondname[0]}
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <h2 className="text-white font-bold text-2xl tracking-wide">
                        {firstname} {secondname}
                      </h2>
                    </div>

                    <div className="mt-4 w-full">
                      <table className="text-white text-xl tracking-wide w-full">
                        <tbody>
                          <tr className="mt-4 flex items-center">
                            <td className="flex items-center">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">Country:</span>
                            </td>
                            <td>
                              {profile?.country}
                              {profile?.country}
                            </td>
                          </tr>
                          <tr className="mt-4 flex items-center">
                            <td className="flex items-center">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">State:</span>
                            </td>
                            <td>{profile?.state}</td>
                          </tr>
                          <tr className="mt-4 flex items-center">
                            <td className="flex items-center">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">City:</span>
                            </td>
                            <td>{profile?.city}</td>
                          </tr>
                          <tr className="mt-4 flex items-center">
                            <td className="flex items-center">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">Pincode:</span>
                            </td>
                            <td>{profile?.pincode}</td>
                          </tr>
                          <tr className="mt-4 flex items-center">
                            <td className="flex items-center">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">Phone no.:</span>
                            </td>
                            <td>{profile?.phone}</td>
                          </tr>
                          <tr className="mt-4 flex flex-col break-all">
                            <td className="flex items-center mb-2">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">Email:</span>
                            </td>
                            <td className="flex">
                              {" "}
                              <FaArrowRight
                                className="mr-2 mt-[0.3rem]"
                                size={20}
                              />{" "}
                              {user.email}
                            </td>
                          </tr>
                          <tr className="mt-4 flex flex-col break-all whitespace-normal">
                            <td className="flex items-center mb-2">
                              <FaRegCircleDot
                                fill="white"
                                size={20}
                                className="mt-[0.3rem] mr-3"
                              />
                              <span className="text-2xl">Address:</span>
                            </td>
                            <td className="flex">
                              <FaArrowRight
                                className="mr-2 mt-[0.3rem]"
                                size={25}
                              />{" "}
                              {profile?.address}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </section>
              ) : (
                <Loading />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <button
                onClick={() => navigate("/setProfile")}
                className="rounded-lg text-white bg-black flex justify-center items-center border-white border-2 text-xl font-semibold p-8"
              >
                Set your Profile
              </button>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileSection;
