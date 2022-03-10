import React from 'react';
import AppContainer from './AppContainer';
import Header from './Header';

const formFields = [
  {id: 1, type: "text", label: "First Name"},
  {id: 2, type: "text", label: "Last Name"},
  {id: 3, type: "email", label: "Email"},
  {id: 4, type: "date", label: "Date of Birth"},
  {id: 5, type: "tel", label: "Phone"},
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 w-2/5 justify-center bg-white shadow-lg rounded-xl items-center">
      <Header 
        title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"} 
      />
      {formFields.map((field) => 
        <React.Fragment key={field.id}>
          <label className='font-semibold'>{field.label}</label>
          <input 
            className='border-2 border-gray-200 justify-center rounded-lg p-2 w-full items-center'
            type={field.type}
          />
        </React.Fragment>
      )}
      <button type='submit' className='mt-4 shadow-xl px-12 py-2 text-white bg-blue-500 hover:bg-blue-800 rounded-lg font-bold'>Submit</button>
      </div>
    </AppContainer>
  );
}
export default App;
