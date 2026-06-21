module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "uploads": "uploads" });

  eleventyConfig.addCollection("update", function(collectionApi) {
    return collectionApi.getFilteredByGlob("updates/**/*.md")
      .filter(item => !item.inputPath.toLowerCase().includes("template"))
      .sort((a, b) => b.date - a.date);
  });

  const readableDate = function (dateObj) {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addLiquidFilter("readableDate", readableDate);
  eleventyConfig.addNunjucksFilter("readableDate", readableDate);

  return { dir: { input: ".", output: "_site" } };
};
