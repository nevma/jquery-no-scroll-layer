/**
 * jquery.nevma.noScrollLayer - v.1.0
 *
 * @author
 * Created by Nevma.gr http://www.nevma.gr/ with <3
 *
 * @description
 * Takes an element and adds a layer on top of it which absorbs scroll and mouse
 * wheel events. Very useful for cases where the element contains, for instance,
 * a map in an iframe and we want to disable zooming in and out of the map.
 * When the user clicks on the element, it is removed, so that interaction with
 * the contents beneath it can be enabled. When the user leaves the element then
 * the no scroll element is re-created.
 */

/**
 * @copyright
 * Copyright (C) 2016 Nevma.gr
 * 
 * @license 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free 
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *  
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function($) {

    // Define jQuery internal plugin object.

    $.noScrollLayer = function( element, options ) {

        // Handy reference to the current object scope.

        var base = this;

        base.element = element;
        base.$element = $(element);



        // Creates the layer that protects user scrolling.
        
        base.createScrollProtectionLayer = function() {

            // Check if layer already exists.

            if ( base.$element.find( '.' + base.options.layerClass ).length > 0 ) {
                return;
            }

            if ( base.options.debug ) {
                console.log( 'Create layer' );
            }

            // Create the layer.

            $( '<div/>' ).
                addClass( base.options.layerClass ).
                css( base.options.layerCSS ).
                appendTo( base.$element );

            // Append it to the main element.

            base.$element.find( '.' + base.options.layerClass ).

                // Disable the mouse wheel event on the main element.

                on( 'wheel', function (event) {
                    if ( base.options.debug ) {
                        console.log( 'Wheel event' );
                    }
                    event.stopPropagation();
                }).

                // When the layer is clicked it must be destroyed to reveal what's beneath it.

                on( 'click', function (event) {
                    if ( base.options.debug ) {
                        console.log( 'Click event (element)' );
                    }
                    event.stopPropagation();
                    base.destroyScrollProtectionLayer();
                });

        };



        // Destroys the layer that protects user scrolling.
        
        base.destroyScrollProtectionLayer = function() {

            if ( base.options.debug ) {
                console.log( 'Destroy layer' );
            }
            base.$element.find( '.' + base.options.layerClass ).remove();

        };



        // Initialises the jQuery plugin object.

        base.initialise = function() {

            base.options = $.extend({}, $.noScrollLayer.options, options);

            // Creates initial elements.

            base.$element.css( base.options.elementCSS );

            base.createScrollProtectionLayer();

            // When body is clicked the layer is re-created.

            $( 'body' ).on( 'click', function () {
            
                if ( base.options.debug ) {
                    console.log( 'Click event (body)' );
                }
                base.createScrollProtectionLayer();
                
            });

            // When the main element is the layer is re-created.

            base.$element.on( 'mouseleave', function () {

                if ( base.options.debug ) {
                    console.log( 'Mouse leave event' );
                }
                base.createScrollProtectionLayer();

            });

        };

        base.initialise();

    };



    // Default options.

    $.noScrollLayer.options = {
        // Whether to output debug messages.
        debug : true,
        // Whether to run on default without being called.
        runOnDefault : true,
        // CSS to apply on the main element.
        elementCSS : {
            position: 'relative'
        },
        // Elements to run on default without being called.
        defaultSelector : '.no-scroll-layer',
        // Class to apply to the no scroll layer for style overrides.
        layerClass : 'no-scroll-element',
        // CSS to apply to the no scroll layer.
        layerCSS : {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
            backgroundColor: 'transparent'
        }
    };



    // Expose a jQuery plugin function.

    $.fn.noScrollLayer = function(options) {

        // Run on currently selected elements and return them for chaining.

        return this.each(function() {

            $.noScrollLayer(this, options);

        });

    };



    // Automatically run on elements with the designated class.
    
    $( function () {

        if ( $.noScrollLayer.options.runOnDefault ) {

            $( $.noScrollLayer.options.defaultSelector ).each( function () {

                $.noScrollLayer( this );

            });

        }
        
    });

})(jQuery);