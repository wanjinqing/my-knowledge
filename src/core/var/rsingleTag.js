define(function() {
  // Match a standalone tag
  // <img> <img/>  单标签
	return (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
});
