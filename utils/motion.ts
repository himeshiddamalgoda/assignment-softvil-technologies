export const createFormConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 1, ease: "easeOut" },
};

export const eventDetailConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 1, easing: "ease-out" },
};

export const eventGridConfig = {
  style: { display: "contents" },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1.4,
    delay:  0.2,
    easing: "ease-out",
  },
};
