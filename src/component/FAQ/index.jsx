import React from 'react';
import {Accordion,AccordionItem,AccordionItemHeading, AccordionItemButton,AccordionItemPanel} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const items = [
    {
        question: "How can I get my order delivered faster?",
        answer: "Sorry, currently we do not have any service available to expedite the order delivery. In future, if we are offering such service and your area pincode is serviceable, you will receive a communication from our end.",
    },
    {
        question: "I have received a partial item/partial order or an Untenanted/Void packet?",
        answer: "Kindly reach out to us for pilferage within 72 hours of delivery failing which the claim will not be entertained. Whilst we investigate, request you to please make note of the below pointers:Please do not use the item for which claim is being raised.",
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping typically takes 5-7 business days depending on your location.",
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 14-day return policy. Items must be unused and in original packaging.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship worldwide with additional shipping charges.",
    },
    {
        question: "How can I track my order?",
        answer: "After your order is shipped, we will send you a tracking link via email.",
    },
];

const index = () => {
  return (
    <>
    <div className='bg-gradient-to-tl from-stone-50 via-red-50 to-red-200 p-5 '>
        <h1 className='text-center text-red-400 font-bold text-5xl p-5'>Frequently Asked Questions</h1>
    <div className=' m-30'>
      <Accordion allowZeroExpanded>
    {items.map((item,index) => (
        <AccordionItem key={item.index}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.question}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.answer}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>
    </div>
    </div>
   
    </>
   
  )
}
export default index
