export default (idOrName: string): "name" | "id" => (
  Number.isNaN(Number.parseInt(idOrName)) ? "name" : "id"
);
