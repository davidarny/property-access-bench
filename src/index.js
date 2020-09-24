const Benchmark = require("benchmark");
const _ = require("lodash");
const chalk = require("chalk");

const suite = new Benchmark.Suite();

const areas = {
  locations: {
    location: {
      settings: {
        timezone: "UTC",
      },
    },
  },
};

console.clear();

console.log(chalk.yellow("Running benchmarks..."));

suite
  .add("Optional Chaining", () => {
    areas.locations?.location?.settings?.timezone;
  })
  .add("Array notation lodash/get", () => {
    _.get(areas, ["locations", "location", "settings", "timezone"]);
  })
  .add("String notation lodash/get", () => {
    _.get(areas, "locations.location.settings.timezone");
  })
  .on("cycle", (event) => console.log(chalk.cyanBright(String(event.target))))
  .on("complete", function () {
    console.log(chalk.green("Fastest is " + this.filter("fastest").map("name")));
  })
  .run({ async: true });
