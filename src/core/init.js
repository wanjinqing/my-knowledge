// Initialize a jQuery object
define([
	"../core",
	"./var/rsingleTag",
	"../traversing/findFilter"
], function( jQuery, rsingleTag ) {

// A central reference to the root jQuery(document)
var rootjQuery,

// Use the correct document accordingly with window argument (sandbox)
document = window.document,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

init = jQuery.fn.init = function( selector, context ) {
  var match, elem;


  // HANDLE: $(""), $(null), $(undefined), $(false)
  if ( !selector ) {
    return this;
  }

  // Handle HTML strings
  if ( typeof selector === "string" ) {
    if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
      // 标签
      match = [ null, selector, null ];
    } else {
      match = rquickExpr.exec( selector );
    }
    
    // match[1] 匹配标签(子表达式)
    
    // Match html or make sure no context is specified for #id
    // 匹配html 或者 没有context的#id
    if ( match && (match[1] || !context) ) {
      // HANDLE: $(html) -> $(array)
      if ( match[1] ) {
        // context 为dom实例 或者 undefined
        context = context instanceof jQuery ? context[0] : context;

        // match[1] = '<div><span></span></div><img>';
        // scripts is true for back-compat
        // Intentionally let the error be thrown if parseHTML is not present
        jQuery.merge( this, jQuery.parseHTML(
          match[1],
          context && context.nodeType ? context.ownerDocument || context : document,
          true
        ) );

        // HANDLE: $(html, props)
        if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
          for ( match in context ) {
            // Properties of context are called as methods if possible
            if ( jQuery.isFunction( this[ match ] ) ) {
              this[ match ]( context[ match ] );

            // ...and otherwise set as attributes
            } else {
              this.attr( match, context[ match ] );
            }
          }
        }

        return this;

      // HANDLE: $(#id)
      } else {
        // 处理 '#box'
        elem = document.getElementById( match[2] );

        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        if ( elem && elem.parentNode ) {
          // Handle the case where IE and Opera return items
          // by name instead of ID
          if ( elem.id !== match[2] ) {
            // '#box'
            return rootjQuery.find( selector );
          }

          // Otherwise, we inject the element directly into the jQuery object
          this.length = 1;
          this[0] = elem;
        }

        this.context = document;
        this.selector = selector;
        return this;
      }

    // HANDLE: $(expr, $(...))
    } else if ( !context || context.jquery ) {

      // $('.list', dom) // 查找dom下的list
      return ( context || rootjQuery ).find( selector );

    // HANDLE: $(expr, context)
    // (which is just equivalent to: $(context).find(expr)
    } else {
      // $('.list', '#box') 查找box下的list
      return this.constructor( context ).find( selector );
    }

  // HANDLE: $(DOMElement)
  } else if ( selector.nodeType ) {
    // 元素
    // $(dom)
    this.context = this[0] = selector;
    this.length = 1;
    return this;
  // HANDLE: $(function)
  // Shortcut for document ready
  } else if ( jQuery.isFunction( selector ) ) {
    // document ready
    return typeof rootjQuery.ready !== "undefined" ?
      rootjQuery.ready( selector ) :
      // Execute immediately if ready is not present
      selector( jQuery );
  }

  if ( selector.selector !== undefined ) {
    this.selector = selector.selector;
    this.context = selector.context;
  }
  return jQuery.makeArray( selector, this );
};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );

return init;

});
