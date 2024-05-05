function throwMe() {
  throw new Error("throwMe");
}

export const thisThrows = () => {
  console.log("thisThrows");

  throwMe();
  // throw new Error("thisThrows" + Date.now());
};
