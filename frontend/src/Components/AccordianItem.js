import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const AccordionItem = ({ title, desc, open, toggle }) => {
  return (
    <div className="accordionItem" onClick={toggle}>
      <div className="accordionItem__flex faq-p">
        <span>{title}</span> {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      <div className={`desc ${open ? "show" : ""}`}>
        {open && <span className="faq-p">{desc}</span>}
      </div>
    </div>
  );
};

export default AccordionItem;