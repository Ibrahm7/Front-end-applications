import Alert from "./components/Alert";
import AddItemForm from "./components/AddItemForm";
import FilterButtons from "./components/FilterButtons";
import Header from "./components/Header";
import Items from "./components/Item-List";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useState } from "react";

const urunler = [
  { id: 1, name: "Yumurta", completed: true },
  { id: 2, name: "Peynir", completed: true },
  { id: 3, name: "Zeytin", completed: false },
  { id: 4, name: "Et", completed: false },
  { id: 5, name: "Tavuk", completed: true },
];

export default function App() {
  const [items, setItems] = useState(urunler);

  const [filterButton, setFilterButton] = useState("all");

  function handleAddItem(item) {
    //Eski listenin elemanlarını alıp yeni bir listeye kopyalamak.
    setItems((items) => [...items, item]);
    setFilterButton("all");
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((i) => i.id != id));
  }

  function handleUpdateItem(id) {
    const UpdatedItems = (items) =>
      items.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item,
      );

    setItems(UpdatedItems);
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="container">
      <Header />

      <AddItemForm onAddItem={handleAddItem} />

      {items.length > 0 && (
        <FilterButtons
          filterButton={filterButton}
          setFilterButton={setFilterButton}
          handleClearItems={handleClearItems}
        />
      )}

      <Items
        Items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        filterButton={filterButton}
      />
    </div>
  );
}
