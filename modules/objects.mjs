import { populateUserArray, userData } from './data.mjs';
const preContainer = document.querySelector('.pre-container');

const getSelected = populateUserArray(userData);

const generateObjects = async function (num, type = 'users') {
  let toRender;

  if (type === 'users') {
    const userArray = await getSelected(num);

    console.log(userArray);

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

    // toRender = users;
  } else {
    //// MAKE THE CALL THE FREE PRODUCT API
    toRender = userArray.map(user => user?.login?.username);
  }

  let text = `
    <pre>
      <code>const arrayIpsum = ${JSON.stringify(toRender)}</code>
    </pre>`;

  preContainer.innerHTML = '';

  preContainer.insertAdjacentHTML('beforeend', text);
};

export { generateObjects };
