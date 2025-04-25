import React from 'react';

const aboutSections = [
  {
    title: "Introduction",
    content:
      "Arista is a one stop shop for all your fashion and lifestyle needs. Being India's largest e-commerce store for fashion and lifestyle products, Arista aims at providing a hassle free and enjoyable shopping experience to shoppers across the country with the widest range of brands and products on its portal. The brand is making a conscious effort to bring the power of fashion to shoppers with an array of the latest and trendiest products available in the country.",
  },
  {
    title: "Value proposition",
    content:
      "Arista's value proposition revolves around giving consumers the power and ease of purchasing fashion and lifestyle products online. Offerings such as the largest in-season product catalogue, 100% authentic products, cash on delivery and 30 day return policy make Arista, the preferred shopping destination in the country. To make online shopping easier for you, a dedicated customer connect team is on standby to answer your queries 24x7.",
  },
  {
    title: "Brands",
    content:
      "Arista understands its shoppers' needs and caters to them with choice of apparel, accessories, cosmetics and footwear from over 500 leading Indian and international brands. Prominent brands include Adidas, Nike, Puma, Catwalk, Inc 5, United Colors of Benetton, FCUK, Timberland, Avirate, FabIndia and Biba to name a few. You can also shop from some recently introduced labels such as - Roadster, Sher Singh, Dressberry, Kook N Keech and ETC.",
  },
];

const About = () => {
  return (
    <div className='m-3 p-5 relative'>
      <header className='m-2 p-2'>
        <h1 className='text-5xl text-red-400 text-center font-bold'>ABOUT US</h1>
      </header>

      <section className='container bg-gradient-to-tl from-stone-50 via-red-50 to-red-200 flex flex-col space-y-8 p-5 mx-auto'>
        {aboutSections.map((section, index) => (
          <div key={index}>
            {/* heading  */}
            <h1 className='font-semibold text-2xl'>{section.title}</h1>
            {/* para */}
            <p>{section.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
