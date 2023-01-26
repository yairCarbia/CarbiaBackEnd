import { faker } from '@faker-js/faker';
faker.locale = 'es';

const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(),
  };
};
export default generateProduct;