THE LEGAL NOTE — SIMPLE LEGAL BLOG WEBSITE

WHAT'S INCLUDED
- index.html: the website structure
- styles.css: colours, layout and responsive styling
- articles.js: the article content (edit this file to publish your writing)
- script.js: search, topic filters and article reading view

RUN IT ON YOUR COMPUTER
1. Download and extract the ZIP file.
2. Open the folder.
3. Double-click index.html. It should open in your browser.
4. Internet is only needed for the optional Google Fonts; the rest of the site runs locally.

HOW TO ADD AN ARTICLE
1. Open articles.js in Notepad, VS Code or another text editor.
2. Copy one complete article object (from { to }) inside the articles array.
3. Give it a new, unique id number. Update title, category, date, readTime and excerpt.
4. Add the article paragraphs as strings in the body array.
5. Set featured: false for an ordinary article. Set featured: true on only the article you want to feature at the top.
6. Save articles.js and refresh index.html.

Use one of these categories, or add your own:
Constitution, Criminal Law, Civil Law, Technology & Law, Legal Updates, Legal Concepts.

PUT IT ONLINE
This is a static website. You can publish the folder using a static hosting service such as GitHub Pages, Netlify or Cloudflare Pages. Upload all four files together; keep their filenames unchanged. Whenever you add an article, upload the updated articles.js file (or redeploy the folder).

BEFORE LAUNCH
- Replace hello@example.com in index.html with your email address.
- Replace the sample articles in articles.js with your own original, fact-checked writing.
- Change “The Legal Note” to your preferred website name in index.html and update the page title.
- Add your own privacy notice if you later add analytics, comments, a mailing list or collect visitor information.
- The site is a publication/blog, not a law firm website. Its disclaimer says that articles are general information and not legal advice.

IMPORTANT LIMITATION
There is no online admin dashboard or database in this starter version. To publish a new article, edit articles.js and upload the changed file to your hosting service. This keeps the site simple and inexpensive. A secure login-based editor would require a backend or a CMS.
