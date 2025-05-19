document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cardContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    let recipeName = urlParams.get('title');
    const apiKey = 'ae1e9442f43f4c2d952977fef49c5c0d';

    recipeName = recipeName.replace(/\b\w/g, l => l.toUpperCase());
    document.title = `${recipeName} - Recipe Website`;

    if (recipeId) {
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/card?apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    container.innerHTML = `<img src="${data.url}" alt="Recipe Card">`;
                } else {
                    container.textContent = 'Recipe card not available';
                }
            })
            .catch(err => {
                container.textContent = 'Failed to load recipe. Error: ' + err;
            });
    } else {
        container.textContent = 'Failed to load recipe';
    }
});