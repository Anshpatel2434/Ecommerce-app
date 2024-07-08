import { itemInputType } from "@anshpatel2434/ecommerce";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { itemType, useItems } from "../hooks/useItems";
import toast, { Toaster } from "react-hot-toast";

const RandomItems = () => {
  const { items, loading } = useItems();
  const [cards, setCards] = useState<itemType[]>([]);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (showPopup) {
      toast("Item Added To Cart!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }
  }, [showPopup]);

  function shuffle(array: itemInputType[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  useEffect(() => {
    shuffle(items);
    setCards(
      items.filter((item, index) => {
        return index <= 9 && item;
      })
    );
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col  items-start">
          <div className="w-full h-14 flex flex-col font-bold mt-[-10rem] lg:mt-[-13rem] text-2xl md:text-4xl text-white">
            <div className="ml-[7%] mb-6">Recommended Products</div>
            <div className="w-full md:w-[30rem] border-2 border-blue-700 md:ml-[7%]"></div>
          </div>
          <div className="w-screen mb-20 mt-20 bg-gray-900 flex flex-col px-8 items-center">
            <div className="flex flex-wrap gap-10 md:gap-32 justify-center my-5">
              {cards.map((item, index) => (
                <ItemCard key={index} item={item} setShowPopup={setShowPopup} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomItems;
