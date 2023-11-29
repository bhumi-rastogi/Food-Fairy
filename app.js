
function fetchRandomMeal(){
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(meals =>
    meals.json()
  )
  .then(mealList => 
    {
      // console.log(mealList);
      var meal = mealList.meals[0];
      // console.log("meal value :: " + JSON.stringify(meal));
      var mealDiv = `<div class= "meal-of-the-day" onclick='displayModal()'>
                         <img alt = "meal photo" src = "${meal.strMealThumb}">
                         <h2> ${meal.strMeal} </h2>     
                         </div>`;
      var randomMealDetail = document.getElementById("random");
      randomMealDetail.innerHTML = mealDiv;


      var content = document.querySelector(".content").innerHTML;
      content += `<ul>
                  <li>${meal.strIngredient1}</li>
                  <li>${meal.strIngredient2}</li>
                  <li>${meal.strIngredient3}</li>
                  <li>${meal.strIngredient4}</li>
                  <li>${meal.strIngredient5}</li>
                  </ul>`;
      document.querySelector(".content").innerHTML = content;

    }
  )
}

fetchRandomMeal();

function fetchAllMealsForCategory(){
  let category = document.querySelector('#inputCategory').value;
  if(category == null || category.length == ''){
    const mealsList = document.getElementById("searched");
    mealsList.innerHTML = '';
    alert('Enter valid category');
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then(meals => 
    meals.json()
  )
  .then(mealList => 
    {
      if(mealList.meals == null){
        const mealsList = document.getElementById("searched");
        mealsList.innerHTML = `No meals available for this category: ${category}`;
        return;
      }

      // console.log(mealList);
      let allMeals = mealList.meals;

      // console.log(allMeals);
      let listHtml = "";

      allMeals.forEach(meal => 
      {
        listHtml += `<div class= "meal-of-the-day" >
                    <img alt = "meal photo" src = "${meal.strMealThumb}" >
                    <h2> ${meal.strMeal} </h2>     
                    </div>` 
      });

      const mealsList = document.getElementById("searched");
      mealsList.innerHTML = listHtml;
    }
  )
}

function displayModal(){
  var modal = document.getElementById("ingredientsModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("ingredientsModal");
  modal.style.display = "none";
}