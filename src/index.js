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
	}
}