import { useContext, useEffect, useState } from "react";
import { listDocs } from "@junobuild/core";
import { AuthContext } from "../contexts/AuthContext";
import Modal from "./Modal";
import moment from 'moment';

const Table = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || '₹');

    useEffect(() => {
      setCurrency(currency);
      localStorage.setItem('currency', currency);
    },[currency])

  useEffect(() => {

    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    const { items } = await listDocs({
      collection: "data",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        }
      }
    });

    setItems(items);
  };

  useEffect(() => {
    if ([undefined, null].includes(user)) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [user]);

//console.log(items);

const calculateIncome = () => {
  return items.reduce((accumulator, item) => {
    if (item.data.type.toLowerCase() === "income") {
      return accumulator + parseFloat(item.data.amount, 2);
    }
    return accumulator;
  }, 0);
};

const calculateExpense = () => {
  return items.reduce((accumulator, item) => {
    if (item.data.type.toLowerCase() === "expense") {
      return accumulator + parseFloat(item.data.amount, 2);
    }
    return accumulator;
  }, 0);
};

const incomeAmount = calculateIncome();
  const expenseAmount = calculateExpense();

  return (
    <>
      <div className="w-[400px] bg-white h-[80%] rounded-2xl p-5">
        <div className="w-full flex justify-center items-center rounded-full p-2">
            <h1 className="font-bold text-gray-700 text-xl pl-2">
              Expense Tracker
            </h1>
        </div>
        <div className="w-full flex justify-between items-center mb-4 bg-gray-100 rounded-full p-2">
            <select placeholder="Select" onChange={(e) => {setCurrency(e.target.value);}} className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500  outline-none'>
                <option value='$' selected={currency === '$'}>$</option>
                <option value='₹' selected={currency === '₹'}>₹</option>
                <option value='£' selected={currency === '£'}>£</option>
            </select>
            <Modal />
        </div>
        <div className="w-full h-[200px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 flex flex-col gap-4 mb-4">
          <div className="grid grid-cols-1 gap-4  h-[50%]">
            <div className="text-center bg-white/20 rounded-xl h-full p-2 flex flex-col justify-center items-center">
              <h2 className="text-white/60 font-bold text-sm leading-none">Net Amount</h2>
              <h2 className="text-white/90 font-bold text-2xl">{currency+parseFloat((incomeAmount-expenseAmount), 2)}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4  h-[50%]">
            <div className="text-center bg-white/20 rounded-xl h-full p-2 flex flex-col justify-center items-center">
              <h2 className="text-white/60 font-bold text-sm leading-none">Expense</h2>
              <h2 className="text-red-800/90 font-bold text-xl">{currency+expenseAmount}</h2>
            </div>
            <div className="text-center bg-white/20 rounded-xl h-full p-2 flex flex-col justify-center items-center">
              <h2 className="text-white/60 font-bold text-sm leading-none">Income</h2>
              <h2 className="text-emerald-800/90 font-bold text-xl">{currency+incomeAmount}</h2>
            </div>
          </div>
        </div>

        <h1 className="text-center w-full font-bold text-gray-700 text-lg mb-4">
          Recent Transactions
        </h1>
        <div className="flex flex-col gap-4 overflow-auto h-[300px] pe-3">
        {items.map((item, index) => {
            const {
              key,
              data: { title, amount, type,timestamp },
            } = item;

            return (
          <div key={key}  className={`flex flex-row justify-between bg-slate-50 p-3 rounded-xl  items-center border-l-4 ${type == 'income' ? 'border-emerald-500' : type == 'expense' ? 'border-red-500' : ''}`}>
            <div className="">
              <h2 className="text-gray-900 font-bold text-lg leading-none">{title}</h2>
              <h2 className="text-gray-600 font-bold text-sm">{moment(timestamp).fromNow()}</h2>
            </div>
            <h2 className={`font-bold text-lg ${type == 'income' ? 'text-emerald-500' : type == 'expense' ? 'text-red-500' : ''}`}>{type == 'income' ? '+' : type == 'expense' ? '-' : ''}{currency+amount}</h2>
          </div>
          );
        })}
        </div>
      </div>
    </>
  );
};


export default Table;
