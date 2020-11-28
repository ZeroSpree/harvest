const Image = require("@11ty/eleventy-img");
const svgContents = require("eleventy-plugin-svg-contents");


module.exports = function (eleventyConfig) {
  //eleventyConfig.addWatchTarget("./src/assets/js/");
  eleventyConfig.addWatchTarget("./src/assets/video/");
  eleventyConfig.addWatchTarget("./src/assets/fonts/");
  eleventyConfig.addWatchTarget("./src/assets/pdf/");

  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/video/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("./src/assets/pdf/");
  eleventyConfig.addPassthroughCopy("./src/assets/svg/");

  // Use browsersync hot reload for CSS and JS
  eleventyConfig.setBrowserSyncConfig({
    files: ["dist/assets/css/*.css", "dist/assets/js/"]
  });

  /**
   * Plugin config: eleventy-plugin-svg-contents
   * Provides the svgContents filter
   * Usage: {{ '/src/assets/svg/filename.svg' | svgContents | safe }}
   */
  eleventyConfig.addPlugin(svgContents);

  /**
   * Plugin config: eleventy-img
   * Provides the {% img %} shortcode.
   * Assumes base img directory is ./src/assets/img/
   * Usage: {% img "folder/filename.jpg", "alt text" %}
   */
  eleventyConfig.addNunjucksAsyncShortcode("img", async function (src, alt) {
    const DIR_SOURCE = "/assets/img/min";
    const DIR_DIST = "dist/assets/img/min";

    if (alt === undefined) {
      // empty alt="" works ok
      throw new Error(`Missing \`alt\` on img from: ${src}`);
    }

    let filepath = src.split('.');
    let originalOutputFormat = filepath[filepath.length - 1];
    let sizes = ["(max-width: 3840px) 100vw, 3840px"];

    let stats = await Image('./src/assets/img/' + src, {
      widths: [1024, 2048, 3840],
      formats: ["webp", originalOutputFormat],
      urlPath: DIR_SOURCE,
      outputDir: DIR_DIST
    });

    // default to the largest size available
    let defaultImagePath = stats[originalOutputFormat].pop().url;

    // Iterate over formats and widths

    /*
    <picture>
      <source media="(min-width: 1920px)" srcset="3840">
      <source media="(min-width: 1024px)" srcset="2048">
      <source media="(min-width: 512px)" srcset="1024">
      <img data-src="https://via.placeholder.com/520x347">
    </picture>
    */

    return `<img 
      loading="lazy"
      ${Object.values(stats).map(imageFormat => {
      return `srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}"`
    })}
      sizes="${sizes}"
      src="${defaultImagePath}"
      alt="${alt}">`;
  });

  return {
    pathPrefix: "/harvest/dist/",

    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
  };
};
