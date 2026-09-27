import Alert from "./Alert";
import Item from "./item";
export default function Items({
  Items,
  onDeleteItem,
  onUpdateItem,
  filterButton,
}) {
  return (
    <ul className="shopping-list list-unstyled">
      {Items.length > 0 ? (
        Items.map((i, index) => (
          <Item
            urun={i}
            key={index}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
            filterButton={filterButton}
          />
        ))
      ) : (
        <Alert />
      )}
    </ul>
  );
}
