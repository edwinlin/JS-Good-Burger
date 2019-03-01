const getURL = `http://localhost:3000/burgers`

document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
	const burgerMenu = document.getElementById('burger-menu');
	burgerMenu.addEventListener('submit', handleEditBurgerImage);
	burgerMenu.addEventListener('click', handleBurgerAddDeleteEdit);


	const yourOrders = document.getElementById('order-list');
	const burgerForm = document.getElementById('custom-burger');
	burgerForm.addEventListener('submit', handleCustomBurgerSubmit);

  getBurgers().then(json=>{
  	console.log(json)
  	json.forEach((burger=>{
  		// debugger
  		burgerMenu.innerHTML += createMenuItem(burger);

  	}))
  })//end getBurgers()

function handleEditBurgerImage(event){
	event.preventDefault();
	console.log(event)
}

function editBurgerImage(event){
	const patchImageObj = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},body:JSON.stringify({"image":`${event.target.parentElement.querySelector('input[name="edit-input"]').value}`})
	}

	return fetch(`${getURL}/${event.target.parentElement.dataset.id}`, patchImageObj)
	.then(resp=>resp.json())
}

function handleBurgerAddDeleteEdit(event){
	event.preventDefault();
	if(event.target.className == 'button'){
		// debugger
		yourOrders.innerHTML += addBurgerToOrders(event);
	}
	if(event.target.className == 'delete-btn'){
		deleteBurgerFromDb().then(event.target.parentElement.remove());
		// console.log(event.target.parentElement.dataset.id);
	}
	// if(event.target.className == 'submit-btn'){
	// 	editBurgerImage(event).then(json=>{
	// 		event.target.parentElement.parentElement.querySelector('img').src = json.image
	// 	})
	// }
}

const deleteBurgerObj = {
	method: 'DELETE',
}

function deleteBurgerFromDb(){
	return fetch(`${getURL}/${event.target.parentElement.dataset.id}`, deleteBurgerObj).then(resp=>resp.json())

}

function handleCustomBurgerSubmit(event){
	event.preventDefault();

	postCustomBurger().then(json=>{
		// debugger
		burgerMenu.innerHTML += createMenuItem(json)
		yourOrders.innerHTML += `<div>${json.name}</div>`
	})
	// return 
}

function postCustomBurger(){
	const customBurgerName = burgerForm.querySelector('input[name="name"]').value;
	const customBurgerDesc = burgerForm.querySelector('input[name="description"]').value;
	const customBurgerImage = burgerForm.querySelector('input[name="url"]').value;

	const postBurgerObj = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			name:customBurgerName,
			description: customBurgerDesc,
			image: customBurgerImage
		})
	}
	return fetch('http://localhost:3000/burgers', postBurgerObj)
	.then(resp=>resp.json())
}

function addBurgerToOrders(event){
	const burgerName = event.target.parentElement.querySelector('.burger_title').innerText;
	return `<div>${burgerName}</div>`
}

function createMenuItem(burgerData){
	return `<div class="burger" data-id=${burgerData.id}>
  	<h3 class="burger_title">${burgerData.name}</h3>
    <img src=${burgerData.image}>
    <p class="burger_description">
      ${burgerData.description}
    </p>
    <form method="submit" name="edit-image" data-id=${burgerData.id}>
    Change Image URL: <input type="text" name="edit-input">
    <input type="submit" value="Edit Image" class="submit-btn">
    </form>
    <button style="position:relative" class="delete-btn">Delete Burger</button>
    <button class="button">Add to Order</button>
	</div>`
}

function getBurgers(){
	return fetch(getURL).then(resp=>resp.json())	
}
})//end DOMContentLoaded

