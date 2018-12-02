$(function(){

	let model = {
		admin: false,
		selected: null,
		cats: [
		{
		id: 0,
		name: "Flores Patrick",
		src: "cat_picture1.jpg",
		count: 0
		},
		{
		id: 1,
		name: "Donovan Rowe",
		src: "cat_picture2.jpeg",
		count: 0
		},
		{
		id: 2,
		name: "Whitley Bright",
		src: "cat_picture3.jpeg",
		count: 0
		},
		{
		id: 3,
		name: "Berger Ray",
		src: "cat_picture4.jpeg",
		count: 0
		},
		{
		id: 4,
		name: "Nanette Glover",
		src: "cat_picture5.jpeg",
		count: 0
		}]};

	let octopus = {
		getAllCats: function() {
			return model.cats;
		},
		getSelectedCat: function() {
			return model.selected;
		},
		selectCat: function(cat) {
			model.selected = cat;
		},
		addCount: function() {
			model.selected.count += 1;
			view.render();
		},
		updateCat: function(cat) {
			console.log(cat);
			model.selected.name = cat.name;
			model.selected.src = cat.src;
			model.selected.count = parseInt(cat.count);
			model.cats[model.selected.id] = model.selected;
			this.disableAdmin();
			listView.render();
			view.render();
		},
		isAdmin: function() {
			return model.admin;
		},
		toggleAdmin: function() {
			model.admin = !model.admin;
			view.render();
		},
		disableAdmin: function() {
			model.admin = false;
			view.render();
		},
		init: function(){
			model.selected = model.cats[0];
			listView.init();
			view.init();
		} 
	};

	let view = {
		render: function() {
			let selectedCat = octopus.getSelectedCat();
			let adminMode = octopus.isAdmin();
			this.catName.textContent = selectedCat.name;
			this.catSrc.src = selectedCat.src;
			this.catCount.textContent = selectedCat.count;
			if (adminMode) {
				this.adminName.value = selectedCat.name;
				this.adminPic.value = selectedCat.src;
				this.adminCount.value = selectedCat.count;
				this.adminForm.setAttribute('style', 'display: block');
			}else {
				this.adminForm.setAttribute('style', 'display: none');
			}
		},
		init: function() {
			this.catLink = document.querySelector('.cat__link');
			this.catName = document.querySelector('.cat__name');
			this.catSrc = document.querySelector('.cat__picture');
			this.catCount = document.querySelector('.cat__counter');
			this.adminBtn = document.querySelector('.admin__button');
			this.adminForm = document.querySelector('.update__cat');
			this.adminCancel = document.querySelector('.update__cancel');
			this.adminSave = document.querySelector('.update__save');
			this.adminName = document.querySelector('input[name=update__name]');
			this.adminPic = document.querySelector('input[name=update__pic]');
			this.adminCount = document.querySelector('input[name=update__clicks]');
			this.adminBtn.addEventListener('click', function() {
				octopus.toggleAdmin();
			});
			this.catLink.addEventListener('click', function() {
				octopus.addCount();
			});
			this.adminCancel.addEventListener('click', function(e) {
				e.preventDefault();
				octopus.disableAdmin();
			});
			this.adminSave.addEventListener('click', function(e) {
				e.preventDefault();
				let cat = {
					name: view.adminName.value,
					src: view.adminPic.value,
					count: view.adminCount.value
				}
				octopus.updateCat(cat);
			});
			this.adminForm.addEventListener('submit', function(e) {
				e.preventDefault();
			});
			this.render();
		}
	}

	let listView = {
		render: function() {
			let cats = octopus.getAllCats();
			this.catList.innerHTML = '';
			for (let cat of cats) {
				let btn = document.createElement('button');
				btn.textContent = cat.name;
				btn.addEventListener('click', ((catCopy) => {
					return function() {
						octopus.selectCat(catCopy);
						view.render();
					} 
				})(cat));
				this.catList.appendChild(btn);
			}
		},
		init: function() {
			this.catList = document.querySelector('.cat__list');
			this.render();
		}
	};

	octopus.init();
});
