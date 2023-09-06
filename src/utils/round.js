export default function roundTwoPlaces(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
