import React, { useState } from "react";

const DropDown = ({ title, children }) => {
  const [open, setOpen] = useState(false);
    console.log(children);
  return (
    <div className="mt-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-4 w-full py-3 bg-blue-600 text-white font-bold rounded"
      >
        {open ? `Hide ${title}` : `Show ${title}`}
      </button>

    {open && children}

    

    </div>
    
  );
};


export default DropDown;
