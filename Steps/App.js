import  React , {useState} from "react";
// import { useState } from "react";
const messages=[
  "Learn React  ",
  "Apply for jobs",
  "Invest your new income",
];

export default function App(){
    return(
      <div>
        <Steps/>
        <StepMessage step={1}>
          <p>pass in content </p>
        </StepMessage>
        <StepMessage step={2}>
          <p>Read children prop</p>
        </StepMessage>
        {/* <Steps/> */}
      </div>
    );
  }
  function Steps(){
  const [step , setStep] = useState(1);
  const[isOpen,setIsOpen]=useState(true);
  // const [test , setTest] = useState({name:"jonas"});

  function handlePrevious(){
    if(step>1)
    setStep((s)=>s-1);
  }

  function handleNext(){
    // alert("Next");
    if(step<3)
    setStep((s)=>s+1);
    // setTest({name:"fred"});
  }
  

  return(
    <>
    <button className="close" onClick={()=>setIsOpen((is)=>!is)}>&times;</button>

    { isOpen &&(
    <div className="steps">
    <div className="numbers">
      <div className={`${step >= 1 ? "active" :""}`}>1</div>
       <div className={`${step >= 2 ? "active":""}`}>2</div>
        <div className={`${step >= 3 ? "active" :""}`}>3</div>
    </div>
     <StepMessage step={step}>
      {messages[step-1]}
      <div className="buttons">
        <button backgroundColor="#e7e7e7" textColor="#333" onClick={()=> alert(`Learn how to ${messages[step-1]}`)}>Learn how</button>
      </div>
     </StepMessage>
       <div className="buttons">
        <button style={{backgroundColor:"#7950f2",color:"#fff"}} onClick={handlePrevious}>Previous 👈</button>
        <button style={{backgroundColor:"#7950f2",color:"#fff"}} onClick={handleNext}>Next 👉</button>
       </div>
    </div>
    )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
