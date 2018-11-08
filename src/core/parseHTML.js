define([
  "../core",
  "./var/rsingleTag",
  "../manipulation" // buildFragment
], function (jQuery, rsingleTag) {

  // data: string of html
  // context (optional): If specified, the fragment will be created in this context, defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string

  // 将html字符串模板转化为dom list;
  jQuery.parseHTML = function (data, context, keepScripts) {
    console.log(data, context, keepScripts)
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;

    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];
    // context: document
    // Single tag
    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = jQuery.buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };

  return jQuery.parseHTML;

});
