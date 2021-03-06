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
		localStorage.setItem('bm_store', JSON.stringify(this.state))
		this.renderList()
	},

	addURL: function(url) {
		if(!url.length) { return }
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
		
		// move this function call to didUpdate
		this.renderList(this.state.pages[this.state.selected])


		const thankYou = document.createElement('div')
		thankYou.classList.add('thankYou')

		const content = document.createElement('div')
		content.innerHTML = 'Thank you for submitting your bookmark'

		const close = document.createElement('button')
		close.innerHTML = 'close window'
		close.addEventListener('click', () => {
			thankYou.parentNode.removeChild(thankYou)
		})

		thankYou.appendChild(content)
		thankYou.appendChild(close)

		document.body.appendChild(thankYou)
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
				pages.splice(del.id, 1 ) // replace this with immutable equivalent

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