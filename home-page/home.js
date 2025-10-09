const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipeContainer = document.getElementById('recipeContainer');
const apiKey = 'ae1e9442f43f4c2d952977fef49c5c0d';

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;

  if (!searchTerm) {
    recipeContainer.innerText = 'Please enter a search term.';
    return;
  }

  recipeContainer.textContent = '';
  recipeContainer.innerHTML = '<h2 class="recipe_heading">Recipes</h2>';

    // Wrap loader and text in a flex container so they're centered together
    const loadingDiv = document.createElement('div');
    loadingDiv.style.display = 'flex';
    loadingDiv.style.flexDirection = 'column';
    loadingDiv.style.alignItems = 'center';
    loadingDiv.style.justifyContent = 'center';
    loadingDiv.style.width = '100%';

    const loader = document.createElement('div');
    loader.classList.add('loader');

    const loadingText = document.createElement('p');
    loadingText.textContent = 'Loading recipes...';

    loadingDiv.appendChild(loader);
    loadingDiv.appendChild(loadingText);
    recipeContainer.appendChild(loadingDiv);

  const apiUrl = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${searchTerm}&number=25`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      recipeContainer.innerHTML = '<h2 class="recipe_heading">Recipes</h2>'; // clear spinner
      for (let i = 0; i < data.length; ++i) {
        const recipeName = data[i].title;
        const recipeId = data[i].id;
        const imageType = data[i].imageType;

        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe_item');

        const recipeTitle = document.createElement('h3');
        recipeTitle.classList.add('recipe_title');
        recipeTitle.textContent = recipeName;

        const recipeImage = document.createElement('img');
        recipeImage.src = `https://img.spoonacular.com/recipes/${recipeId}-312x231.${imageType}`;

        recipeItem.addEventListener('click', () => {
          window.open(`recipe-page/recipe.html?id=${recipeId}&title=${recipeName}`, '_blank');
        });

        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeTitle);
        recipeContainer.appendChild(recipeItem);
      }
    })
    .catch(error => console.log(error));
});
