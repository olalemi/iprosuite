import { useContext } from "react";
import { UserContext } from "../utility/UserProvider";
interface CustomModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

function Modal({ showModal, setShowModal }: CustomModalProps) {
  const { filter, toggleFilter, resetFilter } = useContext(UserContext);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex sm:mb-32 md:mb-0 overflow-x-hidden
           overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Filter</h3>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black m float-right text-3xl 
                    leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row gap-12">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Select Year
                    </h3>

                    {Object.keys(filter).map(
                      (key) =>
                        key.includes("-") && (
                          <label className="inline-flex items-center" key={key}>
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600"
                              checked={filter[key]}
                              onChange={() => toggleFilter(key)}
                            />
                            <span className="ml-2 text-gray-700">{key}</span>
                          </label>
                        ),
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Mission Status
                    </h3>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={filter["success"]}
                        onChange={() => toggleFilter("success")}
                      />
                      <span className="ml-2 text-gray-700">Success</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={filter["failed"]}
                        onChange={() => toggleFilter("failed")}
                      />
                      <span className="ml-2 text-gray-700">Failed</span>
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase  
                     text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={resetFilter}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="   fixed inset-0 z-40 bg-black bg-opacity-60 "></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
