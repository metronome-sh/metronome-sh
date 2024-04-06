function throwMe() {
  throw new Error("throwMe" + Date.now());
}

export const thisThrows = () => {
  console.log("thisThrows");

  throwMe();
  // throw new Error("thisThrows" + Date.now());
};
