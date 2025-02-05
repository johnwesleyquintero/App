import React from 'react';

function Button({ children }) {
  return (
    <button role="button">
      {children}
    </button>
  );
}

export default Button;