import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/img/bg-picture.jpg";
import gameLogo from "../assets/img/gameLogo.png";
import { useToast } from "@chakra-ui/react";
import { request } from "../api/request";
import { setItem } from "../utils/storage";
import { setToast } from "../utils/taost";

const GameLobby = (props) => {
   const [username, setUsername] = useState("");
   const { setIsLobby } = props;
   let history = useNavigate();
   const toast = useToast();

   //onclicking start game button
   const startGame = async () => {
      //if user clicks button without entering username//
      let button = document.getElementById("button");
      if (!username) {
         setToast(toast, "warning", "Enter username to start the game");
         return;
      }

      button.value = "STARTING...";
      let response = await request("POST", "/createUser", { username });

      if (response.success) {
         setItem("user", response.data);
         setIsLobby(false);
         button.value = "START GAME";
         history("/playGame");
      }
   };

   const togglePreLoader = () => {
      let elem = document.getElementById("preloader");
      elem.style.display = "none";
   };

   return (
      <main className="flex w-auto items-center h-[87vh] justify-center align-middle">
         <div
            id="preloader"
            className="w-full flex flex-col justify-center  items-center h-[100vh] absolute top-0 z-20">
            <p className="text-2xl font-bold text-white">Exploding Kitten </p>
         </div>

         <div
            className="z-10  flex flex-col border-2 border-[black]  justify-center
         space-y-8 mr-60 rounded-lg px-6 h-72 
         ">
            <p className=" text-2xl -mb-4  font-bold text-black">
               ENTER USERNAME
            </p>
            <input
               type="text"
               placeholder=""
               className="w-80 px-4 py-2  outline-none rounded-lg border border-black"
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="button"
               value="START GAME"
               id="button"
               className="bg-orange-600 rounded-lg w-full py-2 cursor-pointer border border-black hover:bg-orange-700"
               onClick={() => startGame()}
            />
         </div>
      </main>
   );
};

export default GameLobby;
