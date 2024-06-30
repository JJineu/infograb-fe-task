export const pressEnter = (event: React.KeyboardEvent, callback: () => void) => {
  if (event.key === 'Enter') {
    callback();
  }
};
