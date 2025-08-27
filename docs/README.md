# SweetMeSoft JS Documentation

This directory contains the documentation website for SweetMeSoft JS library, designed to be deployed on GitHub Pages.

## Structure

- `index.html` - Main documentation page with API reference
- `interfaces.html` - Detailed TypeScript interfaces documentation
- `examples.html` - Practical examples and code snippets
- `_config.yml` - Jekyll configuration for GitHub Pages
- `README.md` - This file

## GitHub Pages Setup

### Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) that automatically deploys the documentation to GitHub Pages when changes are pushed to the main branch.

### Manual Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/docs" folder
5. Click "Save"

The documentation will be available at: `https://[username].github.io/sweetmesoft-js/`

## Local Development

To view the documentation locally:

1. Clone the repository
2. Navigate to the `docs` folder
3. Serve the files using any local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Open `http://localhost:8000` in your browser

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling and active section highlighting
- **Code Highlighting**: Syntax highlighting for code examples using Prism.js
- **Copy to Clipboard**: Easy copying of code examples
- **Bootstrap Styling**: Modern, professional appearance
- **Cross-referenced**: Links between different documentation sections

## Updating Documentation

The documentation is generated from the TypeScript definition files (`.d.ts`) in the `src` folder. When updating the library:

1. Ensure all public methods have proper JSDoc comments in the TypeScript files
2. Update the documentation pages to reflect any new features or changes
3. Test the documentation locally before pushing changes
4. The GitHub Actions workflow will automatically deploy updates

## Customization

To customize the documentation:

- **Styling**: Modify the CSS in the `<style>` sections of each HTML file
- **Content**: Update the HTML content directly
- **Navigation**: Modify the sidebar navigation in each file
- **Examples**: Add new examples to `examples.html`
- **Interfaces**: Update interface documentation in `interfaces.html`

## Dependencies

The documentation uses the following external libraries:

- Bootstrap 5.3.0 (CSS framework)
- Prism.js (syntax highlighting)
- No build process required - all dependencies are loaded via CDN

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (limited support)

## Contributing

When contributing to the documentation:

1. Ensure all examples are tested and working
2. Follow the existing code style and formatting
3. Update both the main documentation and examples when adding new features
4. Test the documentation on multiple devices and browsers
5. Verify all links work correctly