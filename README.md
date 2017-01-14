# JQuery no scroll layer plugin

A jQuery plugin that helps disable scroll events on top of iframes, etc.

A common problem when one is embedding an iframe, is that, when the user is scrolling past this element, the scroll events are caught by the iframe and, instead the usual scroll action that the user is expecting, the scroll happens inside the iframe. Especially when something like a map is in the iframe, the map zooms in and out according the scroll events of the user. 

In maps like Google maps one can embed them via their API and disable the scroll events in the maps programatically, but this is not very easy to do and certainly not a general solution.

Our plugin takes the element you pass to it and covers it with a transparent layer which *"absorbs"* the scroll events of the user. 

If the user clicks on the layer then it disappears allowing the user to interact with that element. A small annoyance there in order to avoid the bigger, more common one.

The plugin makes sure that, when the user is not using the element any more, the transparent element is put back into its place in order to start *"absorbing"* the scroll events again.

## License

GPL v.3.
