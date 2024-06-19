import figlet from "figlet";
import gradient from "gradient-string";

export function Title() {
  const title = figlet.textSync("Modulekill", { font: "Big" });
  const colorizedTitle = gradient.summer.multiline(title);

  console.log(colorizedTitle);
}
