const root = document.getElementById('root')

// create references to all elements in the DOM
const form = document.getElementById('bmk-form')
const formInput = document.getElementById('bmk-input')
const submit = document.getElementById('bmk-submit')
const list = document.getElementById('bmk-list')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

// react in a nutshell
const store = {
	state : {
		count: 1,
		pages: {
			1: [],
		},
		selected: 1
	},

	setState: function(newState) {
		//didUpdate
		this.state = Object.assign( {}, this.state, newState )
		
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
		
		console.log(store)
	}

	didUpdate: function() {
		// trigger a re-render here
	}

}

// assign functionality
submit.addEventListener('click', () => { store.addURL(formInput.value)})
prev.addEventListener('click', () => console.log('prev'))
next.addEventListener('click', () => console.log('next'))