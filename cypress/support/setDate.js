

export default (input, value) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, value);
  
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  };

  //