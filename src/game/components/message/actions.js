export const showMessage = (options) => {
  return {
    type : 'SHOW_MESSAGE',
    closeable : options.closeable !== false,
    message : options.text || '[no message]',
    buttons : options.buttons || [
      {
        text : 'OK',
        action : () => dismissMessage
      }
    ]
  };
};

export const dismissMessage = {
  type : 'DISMISS_MESSAGE'
};
