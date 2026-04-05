import React, { useState } from "react";
import AccordionItem from "./AccordianItem";

const data = [
  {
    title: "What types of pet food do you offer?",
    desc: "We offer a wide range of pet food, including options for dogs, cats, birds, and small animals.",
  },
  {
    title: "Can I return or exchange a product?",
    desc: "Absolutely! We have a hassle-free return and exchange policy. Please ensure the product is unopened and in its original condition.",
  },
  {
    title: "Are your products natural and safe for pets?",
    desc: "We prioritize the health and safety of your pets. We thoroughly vet all items to ensure they meet high safety standards.",
  },
  {
    title: "How can I track my order?",
    desc: "After placing an order, you will receive a tracking number via email. You can use this number to monitor your order’s progress from our warehouse to your doorstep.",
  },
  {
    title: "Do you offer discounts or promotions?",
    desc: "Yes, we frequently offer discounts and promotions on our products. You can subscribe to our newsletter or follow us on social media to stay updated on the latest deals.",
  },
];

const Accordion = () => {
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (index === open) {
      setOpen(false);
    } else {
      setOpen(index);
    }
  };

  return (
    <div className="accordion_holder">
        
      {data.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          desc={item.desc}
          open={index === open}
          toggle={() => toggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;