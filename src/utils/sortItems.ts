interface Props {
  items: [];
  key: number;
  order: string;
}

export default function sortItems({ items, key, order }: Props): [] {
  return items.sort((a, b) => {
    if (order === "asc") {
      return a[key] - b[key];
    } else {
      return b[key] - a[key];
    }
  });
}
