import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { closeModall, showModall } from "../modal";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function Libary() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<any>([]);
  let count: number = 1;

  const addDocs = async (value1: string, value2: any) => {
    await addDoc(collection(db, "libary"), {
      title: value1,
      published: value2,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value1 && value2) {
      setLoading(true);
      addDocs(value1, value2);
    }
    setLoading(false);
    getdata();

    closeModall();
  };
  const getdata = async () => {
    let booksArr: any = [];
    setLoading(true);
    const snap = await getDocs(collection(db, "libary"));
    snap.forEach((doc) => {
      booksArr.push({ id: doc.id, ...doc.data() });
    });

    setBooks(booksArr);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);

  const delDocs = async (e: any) => {
    deleteDoc(doc(db, "libary", e));
    getdata();
  };

  const updateDocs = () => {};
  return (
    <div className="max-w-[85%] relative mx-auto  pt-6">

      <button
        onClick={() => showModall()}
        className="py-2 top-6 right-4 rounded-[10px] px-7 bg-white-500 hover:bg-blue-500 hover:text-white border-2 border-blue-500 font-[500] text-[18px] text-blue-500"
      >
        add new book
      </button>

      <div className="overflow-x-auto mt-[96px]  ml-[25px] max-w-[100%] rounded-[0] bg-inherit">
        <table className="table  ">
          {/* head */}
          <thead className="text-inherit font-bold text-[20px]">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="relative">
            {/* row 1 */}

            {loading ? (
              <div className="flex gap-6 pt-[100px] pl-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              books.map((e: any) => (
                <tr key={++count} className=" bg-inherit">
                  <th>{count}</th>
                  <td>{e.title}</td>
                  <td>{e.published}</td>
                  <td className="flex gap-6">
                    <button
                      onClick={() => delDocs(e.id)}
                      className="bg-red-500 hover:bg-red-300 text-white   transition-all px-5 py-2  rounded-[999px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {createPortal(
          <dialog id="my1" className="modal bg-white bg-opacity-[0.9]">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-md btn-circle text-lg btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold mb-6 text-[28px]">Add new book</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3  gap-2">
                  <span className="text-[18px] ml-1">Name</span>
                  <input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    type="text"
                    className="bg-gray-100  py-3 px-4 text-[17px]  w-[100%]"
                    required
                    placeholder="name of the book"
                  />
                </div>
                <div className="flex flex-col mb-8  gap-2">
                  <span className="text-[18px] ml-1">Year</span>
                  <input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    type="number"
                    className={`bg-gray-100  py-3 px-4 text-[17px]  w-[100%] ${
                      loading ? "disabled:bg-green-200" : ""
                    }`}
                    required
                    placeholder="pulished year"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-300 text-white text-[18px] rounded-[15px] font-bold "
                >
                  Submit
                </button>
              </form>
              <div className="modal-action"></div>
            </div>
          </dialog>,
          document.body
        )}
      </div>
    </div>
  );
}

export default Libary;
