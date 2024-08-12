import React, { forwardRef, useEffect, useRef } from "react";

export default function Brand() {
  let refHome = useRef();
  let refAbout = useRef();
  let refContact = useRef();
  let refGallery = useRef();

  forwardRef

  // ref forward
  function handleClickHome(){
    refHome.current.scrollIntoView({behavior: 'smooth'})
  }

  function handleClickAbout(){
    refAbout.current.scrollIntoView({behavior: 'smooth'})
  }

  function handleClickContact(){
    refContact.current.scrollIntoView({behavior:'smooth'});
  }

  function handleClickGallery(){
    refGallery.current.scrollIntoView({behavior:'smooth'});
  }

  return (
    <div>
      <p onClick={handleClickHome}>Home</p>
      <p onClick={handleClickAbout}>About</p>
      <p onClick={handleClickContact}>Contact</p>
      <p onClick={handleClickGallery}>Gallery</p>
      <section ref={refHome} className="h-lvh bg-red-500">
        home
      </section>
      <section ref={refAbout} className="h-lvh bg-blue-300">
        About
      </section>
      <section ref={refContact} className="h-lvh bg-green-300">
        Contact
      </section>
      <section ref={refGallery} className="h-lvh bg-slate-500">
        Gallery
      </section>
    </div>
  );
}
