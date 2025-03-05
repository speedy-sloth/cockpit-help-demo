export const helpContent = {
  "button-help": "<div class=\"paragraph\">\n<p>Click the <strong>Button</strong> to perform an action.\nIt&#8217;s that simple, baby.</p>\n</div>",
  "field-help": "<div class=\"paragraph\">\n<p>Enter text in the <strong>Field</strong> to provide input.\nPress <strong>Enter</strong> to submit.</p>\n</div>",
  "redirects": "<div id=\"preamble\">\n<div class=\"sectionbody\">\n<div class=\"paragraph\">\n<p>You can view redirects that you have created or add them directly yourself from the Cockpit. You must publish any changes you make to redirects.\nUse the <strong>Add</strong> button to create a new redirect, <strong>Upload</strong> to import redirects from a file, and <strong>Publish</strong> to apply changes.</p>\n</div>\n<div class=\"imageblock zoom\">\n<div class=\"content\">\n<img src=\"/images/redirects.jpg\" alt=\"redirects\">\n</div>\n</div>\n</div>\n</div>\n<div class=\"sect1\">\n<h2 id=\"_good_to_knows\">Good to knows</h2>\n<div class=\"sectionbody\">\n<div class=\"ulist\">\n<ul>\n<li>\n<p>The redirects server is a proxy server.</p>\n</li>\n<li>\n<p>Redirects are evaluated in order of appearance when entered. The first match is accepted.</p>\n</li>\n<li>\n<p>We use the Source URL to detect duplicate entries when you add a single redirect or batch import redirects (CSV).</p>\n</li>\n<li>\n<p>If the redirect you enter is a duplicate, you get a 409 error code, showing the duplicate already exists. If there are any duplicates in a batch import of redirects, the entire batch is rejected. However, we notify you in the cockpit of the specific duplicate entries so you can remove them from the batch.</p>\n</li>\n<li>\n<p>Only <code>3xx</code> status codes are acceptable.\nDifferent codes affect the browser in different ways. For more, see here.</p>\n</li>\n</ul>\n</div>\n</div>\n</div>",
  "tabs-help": "<div class=\"paragraph\">\n<p>Switch between <strong>Tabs</strong> to view different sections.\nClick a tab to activate it.</p>\n</div>"
};