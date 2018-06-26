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

		this.renderList()
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

	createItem: function(id, pages, url) {

		let item = document.createElement('ul')

			let link = document.createElement('a')
			link.href = url
			link.innerHTML = url

			let edit = document.createElement('button')
			edit.innerHTML = ('edit')
			edit.addEventListener('click', () => console.log(edit) )

			let del = document.createElement('button')
			del.id = id
			del.innerHTML = ('delete')

			
			del.addEventListener('click', () => {
				// this is store
				console.log('pages: ', pages)
				pages.splice(del.id, 1 ) // replace this with immutable equivalent

				// hacky equivalent
				this.setState(pages) // to trigger the storage save and render
			})

		item.appendChild(link)
		item.appendChild(edit)
		item.appendChild(del)

		// find parent and append
		list.appendChild(item)
	},

	renderList : function() {
		while ( list.firstChild ) {
			list.removeChild(list.firstChild)
		}

		// for short
		const selected = this.state.selected - 0
		const pages = this.state.pages[selected]
		

		for(let i = 0; i < pages.length; i++) {
			const url = pages[i]
			this.createItem(i, pages, url)
		}
	}


}

// assign functionality
submit.addEventListener('click', () => { store.addURL(formInput.value)})
prev.addEventListener('click', () => console.log('prev'))
next.addEventListener('click', () => console.log('next'))

// triggering the first render
store.renderList()

// minify app with google closure compiler
// advanced optimizations
// deploy app