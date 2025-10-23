import {
  populateUserArray,
  userData,
  populateProductsArray,
  productsData,
} from './data.mjs';
import { renderResult } from './ui/renderResult.mjs';
const preContainer = document.querySelector('.pre-container');

const getSelectedUserData = populateUserArray(userData);
const getSelectedProductsData = populateProductsArray(productsData);

// console.log(await getSelectedUserData(2));

const generateObjects = async function (num, type = 'users') {
  let toRender;

  if (type === 'users') {
    const userArray = await getSelectedUserData(num);

    toRender = userArray.map(user => {
      return {
        name: user?.name?.first + ' ' + user?.name?.last,
        age: user?.dob?.age,
        address: {
          number: user?.location?.street?.number,
          street: user?.location?.street?.name,
          city: user?.location?.city,
          state: user?.location?.state,
          postcode: user?.location?.postcode,
          country: user?.location?.country,
        },
        email: user?.email,
        picture: user?.picture?.large,
      };
    });
  } else if (type === 'products') {
    const productsArray = getSelectedProductsData(num);

    toRender = productsArray.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        inStock: product.inStock,
        description: product.description,
        category: product.category,
        image: product.image,
      };
    });
  }

  renderResult(toRender, preContainer);
};

export { generateObjects };
