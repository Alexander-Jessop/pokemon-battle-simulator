const randNumGen = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default randNumGen;
