import React, { useState } from 'react';
import { PersonalInformation, AddressInformation, AccountInformation } from '../../pages';

const DaftarContainer: React.FC = () => {

    const [step, setStep] = useState<number>(1);

    // fungsi tombol next
    const handleNext = () => {
      if (step === 3) {
        handleFormSubmit();
      } else setStep ((prevState) => prevState + 1);
    };

    // fungsi tombol previous
    const handlePrevious = () => { 
      if (step === 1) {
          return
      }
      setStep((prevState) => prevState - 1)
  }

    const handleFormSubmit = () => {
      console.log();
    };

    return (
        <div className="app">
            {step === 1 && (
            <PersonalInformation 
            onNext={handleNext}/>
            )} 
            {step === 2 && (
            <AddressInformation 
            onNext={handleNext} 
            onPrevious={handlePrevious}/>
            )}
            {step === 3 && (
            <AccountInformation 
            onNext={handleNext} 
            onPrevious={handlePrevious}/>
            )}
      </div>
    )
}
export default DaftarContainer