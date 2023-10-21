import { useContext, useEffect, useState } from "react";
import { setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { AuthContext } from "../contexts/AuthContext";
import moment from 'moment';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState();
  const [inputText3, setInputText3] = useState("");
  const [valid, setValid] = useState(false);
  const [progress, setProgress] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setValid(inputText !== "" && inputText2 !== "" && inputText3 !== "" && user !== undefined && user !== null);
  }, [showModal, inputText, inputText2, inputText3, user]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    // Demo purpose therefore edge case not properly handled
    if ([null, undefined].includes(user)) {
      return;
    }

    setProgress(true);
    const timestamp = moment();
    try {

      const key = nanoid();

       await setDoc({
         collection: "data",
         doc: {
           key,
           data: {
             title: inputText,
             amount: inputText2,
             type: inputText3,
             timestamp:timestamp
           },
         },
       });

       

      setShowModal(false);

      reload();
    } catch (err) {
      console.error(err);
    }

    setProgress(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 fixed-bottom"
        >
          Add
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex flex-col gap-3">
                  
                  <input type="number"
                  min="1"
                  required
                    className="
        form-control
        block
        w-full
        rounded-lg
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none
        resize-none
      "
          
                    placeholder="Amount"
                    onChange={(e) => {
                      setInputText2(e.target.value);
                    }}
                    value={inputText2}
                    disabled={progress}
                  />
                  <input type="text"
                    className="
        form-control
        block
        w-full
        rounded-lg
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none
        resize-none
      "
                    placeholder="Title"
                    onChange={(e) => {
                      setInputText(e.target.value);
                    }}
                    value={inputText}
                    disabled={progress}
                    required
                  />
                  <select placeholder="Select Type" onChange={(e) => {
                      setInputText3(e.target.value);
                    }} disabled={progress} required>
                    <option >Select Type</option>
                    <option value={'income'}>Income</option>
                    <option value={'expense'}>Expense</option>
                  </select>
    
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {progress ? (
                    <div
                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                      <button
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-25"
                        type="button"
                        onClick={add}
                        disabled={!valid}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
