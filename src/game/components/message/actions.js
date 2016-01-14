export const showMessage = (text) => {
  return {
    type : 'SHOW_MESSAGE',
    message : text
  };
};

export const dismissMessage = {
  type : 'DISMISS_MESSAGE'
};
