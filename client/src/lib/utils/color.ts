import { randomNumber } from "@/lib/utils/number";

export const randomColor = () => {
  const min = 0;
  const max = 255;

  const red = randomNumber(min, max);
  const green = randomNumber(min, max);
  const blue = randomNumber(min, max);

  return `rgba(${red}, ${green}, ${blue}, 0.4)`;
}
