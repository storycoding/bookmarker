const root = document.getElementById('root')

// create references to all elements in the DOM
const form = document.getElementById('bmk-form')
const formInput = document.getElementById('bmk-input')
const submit = document.getElementById('bmk-submit')
const list = document.getElementById('bmk-list')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

// on load look for state on localstorage, otherwise create an empty one

const store = {
	state : JSON.parse(localStorage.getItem('bm_store')) || {
		count: 1,
		pages: {
			1: [],
		},
		selected: 1
	},

	setState: function(newState) {
		//didUpdate
		this.state = Object.assign( {}, this.state, newState )
		localStorage.setItem('bm_store', JSON.stringify(this.state));
		// display:
			// thank you message
			// link submitted
			// link back to home page
	},

	addURL: function(url) {
		// test if url is valid
		let last = this.state.pages[this.state.count].slice() || []

		if(last.length < 20) {
			last.push(url)
			var count = this.state.count
			
		} else {
			last = [url]
			var count = this.state.count + 1
		}

		const pages = Object.assign({}, this.state.pages)
		pages[count] = last
		this.setState({ count: count, pages : pages })
		
		// change location of this call to didUpdate
		this.renderList(this.state.pages[this.state.selected])
		console.log(store)
	},

	didUpdate: function(newState) {
		// check if parts of the state have been changed
			// re-render components that have been changed
	},

	renderList : function() {
		while ( list.firstChild ) {
			list.removeChild(list.firstChild)
		}

		const newList = this.state.pages[this.state.selected]

		for(let i = 0; i < newList.length; i++) {
			let item = document.createElement('ul')
			let link = document.createElement('a')

			let del = document.createElement('button')
			del.innerHTML = ('delete')
			del.addEventListener('click', () => console.log(del) )

			let edit = document.createElement('button')
			edit.innerHTML = ('edit')
			edit.addEventListener('click', () => console.log(edit) )

			link.href = newList[i]
			link.innerHTML = newList[i]

			item.appendChild(link)
			item.appendChild(edit)
			item.appendChild(del)

			list.appendChild(item)
		}
	}


}

// assign functionality
submit.addEventListener('click', () => { store.addURL(formInput.value)})
prev.addEventListener('click', () => console.log('prev'))
next.addEventListener('click', () => console.log('next'))

store.renderList();

// minify app with google closure compiler
// advanced optimizations
// deploy app