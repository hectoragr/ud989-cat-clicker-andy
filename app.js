$(function(){

	let model = {
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
		init: function(){
			model.selected = model.cats[0];
			listView.init();
			view.init();
		} 
	};

	let view = {
		render: function() {
			let selectedCat = octopus.getSelectedCat();
			this.catName.textContent = selectedCat.name;
			this.catSrc.src = selectedCat.src;
			this.catCount.textContent = selectedCat.count;
		},
		init: function() {
			this.catLink = document.querySelector('.cat__link');
			this.catName = document.querySelector('.cat__name');
			this.catSrc = document.querySelector('.cat__picture');
			this.catCount = document.querySelector('.cat__counter');
			this.catLink.addEventListener('click', function() {
				octopus.addCount();
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
