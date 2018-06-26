# Bookmarker

## Managing state as an SPA
Given that the challeng was to create a bookmark application with vanillaJS, I decided to strap together a simulation of a state and render framework inspired in my practice of reactJS

I created a store object with a state property, and worked under the principle of immutability. Checking the state for changes allows me to rerender only the parts that have been updated.