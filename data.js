let responses = [];
const userResponsesSection = document.querySelector('#user-responses');

const fetchUserResponses = async () => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vQqsOCIYbhzBTI7mJoxgz-JIsPSjgSDiB0ldA2c5eWWkJWh-L9U_g25wmPhQNfLcbBcLGz5v0Xg8FTr/pub?output=csv'
  );

  const data = await response.text();
  const results = Papa.parse(data, { header: true });
  responses = results.data;
};

const renderUserResponse = userResponse => {
  const name = userResponse['Full Name'];
  const food = userResponse['Favourite RBI food?'];
  const recommend =
    userResponse['Would you recommend your favourite RBI food to others?'];
  const rsc = userResponse['Which country is your RSC in?'];
  const travel =
    userResponse['Post COVID, what is you first travel destination?'];
  const coding = userResponse['Which coding style do you like?'];
  const googlePhotoId = food.split('id=')[1];

  return `
<div class="user-response">
<h2>${name}</h2>
<img src="https://drive.google.com/thumbnail?id=${googlePhotoId}" alt="Favourite RBI Food"//>
<h1>My favourite RBI food</h1>
<h3>I would rate it: ${recommend}⭐️</h3>
<h4>My RSC is locacted in ${rsc}</h4>
<h5>Post COVID, my first travel destination is ${travel}</h5>
<p>My preference style of coding is ${coding}<p>
</div>
`;
};

const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponseHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponseHTML;
};

fetchAndShowResponses();