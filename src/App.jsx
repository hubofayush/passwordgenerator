import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghyjklmnopqrstuvwxyz";

    if (number) string += "01234546789";
    if (character) string += "!@#$%^&*()_+-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setpassword(pass);
  }, [length, number, character]);

  const passRef = useRef();

  const copyClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, number, character, generatePassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            readOnly
            value={password}
            className="outline-none w-full py-1 px-3"
            style={{
              width: "20rem",
            }}
            ref={passRef}
          />
          <button
            className="bg-blue-700 text-white p-1 rounded-e-lg"
            onClick={copyClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-2">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length {length}</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              id="number"
              onChange={() => setnumber((prev) => !prev)}
            />
            <label htmlFor="number">numbers</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              id="char"
              onChange={() => setcharacter((prev) => !prev)}
            />
            <label htmlFor="char">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
