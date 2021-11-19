const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// In root product-icons folder, SVG files will be generated from the docs-config.js folder from each product
// To regenerate icons: npm run generate:icons

exec(
  'find ./products -type d -name "node_modules" -prune -o -type f -print | grep "docs-config.js" | grep -v "/.docs/"   ',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    const products = stdout.trim().split("\n");
    if (!fs.existsSync(path.join(__dirname, "./product-icons", "utf8"))) {
      fs.mkdirSync("./product-icons");
    }

    for (let i = 0; i < products.length; i++) {
      let product = require(products[i]);
      if (typeof product.logoSVGContent === "undefined") {
        console.log(`product ${product.product} has no logoSVGContent`);
        continue;
      }
      console.log("creating SVG icon", product.productIconKey);
      fs.writeFileSync(
        `./product-icons/${product.productIconKey}.svg`,
        product.logoSVGContent.toString()
      );
    }
  }
);
