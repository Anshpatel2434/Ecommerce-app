import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileInputs = () => {
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  async function createProfile() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/profile/createProfile`,
        userInput,
        {
          headers: headers,
        }
      );
      console.log(res.status);
      if (res.status !== 200) {
        toast((t) => (
          <div className="bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
            <span className="font-bold">Error in creating profile</span>
            <button
              className="ml-2 text-red-500"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              ❌
            </button>
          </div>
        ));
      } else {
        toast("Profile created successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      alert("Error while sending request");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field:
      | "address"
      | "phone"
      | "city"
      | "state"
      | "state"
      | "pincode"
      | "country"
  ) {
    setUserInput({
      ...userInput,
      [field]: e.target.value,
    });
  }

  return (
    <div className="w-screen h-full p-6 bg-gray-800 flex items-center mt-16 justify-center">
      <Toaster />
      <div className="container max-w-screen-md mx-auto py-10 flex flex-col items-center">
        <div className="text-white text-5xl font-bold font-playwrite mb-10 ">
          Set Your Profile
        </div>
        <div className="px-8">
          <div className="bg-gray-900 border-white border-2 rounded shadow-lg p-4 px-4 md:p-12 mb-6">
            <div className="lg:col-span-2 gap-4">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 text-white  md:grid-cols-5">
                <div className="md:col-span-5 mb-6">
                  <label className="text-xl">Address :</label>
                  <input
                    onChange={(e) => handleChange(e, "address")}
                    type="text"
                    className="h-14 text-lg text-black border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-3 mb-6">
                  <label className="text-xl">Phone no. :</label>
                  <input
                    onChange={(e) => handleChange(e, "phone")}
                    type="tel"
                    className="h-10 text-lg text-black border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2 mb-6">
                  <label className="text-xl">City : </label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e, "city")}
                    className="h-10 border text-black text-lg mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                  />
                </div>

                <div className="md:col-span-2 mb-4 md:mr-4">
                  <label className="text-xl">Country : </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      onChange={(e) => handleChange(e, "country")}
                      placeholder="Country"
                      className="px-4 text-lg text-black appearance-none outline-none  w-full bg-transparent"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 mb-4  md:mr-4">
                  <label className="text-xl">State : </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      onChange={(e) => handleChange(e, "state")}
                      placeholder="State"
                      className="px-4 text-lg text-black appearance-none outline-none  w-full bg-transparent"
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-xl">Zipcode : </label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e, "pincode")}
                    className="transition-all text-lg text-black flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="10008"
                  />
                </div>

                <div className="md:col-span-5 text-center mt-6">
                  <div className="inline-flex items-end">
                    <button
                      onClick={createProfile}
                      className="bg-black text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInputs;
