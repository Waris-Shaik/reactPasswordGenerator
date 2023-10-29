import { useEffect, useCallback, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  // refHook
  const passwordRef = useRef("");

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password]);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`";


    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);
    }

    setPassword(pass);

   

  },[length, numAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGenerator()
  },[length, numAllowed, charAllowed, passwordGenerator])


  return (
    <div>




    <div className="header">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-4xl text-white text-center my-10">
      Password Generator
      </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} placeholder="Password.." className="outline-none w-full py-1 px-3" readOnly ref={passwordRef} />

          <button className="px-4 py-2 bg-blue-400 text-white font-extrabold" onClick={copyPasswordToClipBoard} >copy</button>
        </div>
         

      <div className="flex text-sm gap-x-2">

        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={50} value={length} className="cursor-pointer" onChange={(e)=> setLength(e.target.value)} id="length" />
          <label htmlFor="length">Length({length})</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numAllowed}  onChange={()=> setNumAllowed((prev)=> !prev)}  id="numbers" />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed}  onChange={()=> setCharAllowed((prev)=> !prev)}  id="characters" />
          <label htmlFor="characters">Characters</label>
        </div>

      </div>






      </div>

    </div>

      
 


    </div>
  )
}

export default App