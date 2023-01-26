const areFieldsFilled = (data) => {
  const { title, thumbnail, price } = data;

  if (!title || !price || !thumbnail ) {
    return false;
  }
  return true;
};

export default areFieldsFilled;
