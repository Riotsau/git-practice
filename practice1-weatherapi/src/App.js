import { useEffect, useState } from "react";
import axios from "axios";
const init = [
  {
    name: "Boots",
    number: 2,
    id: 1,
  },
  {
    name: "Shoes",
    number: 3,
    id: 2,
  },
  {
    name: "socks",
    number: 5,
    id: 3,
  },
];
export default function App() {
  const [items, setItems] = useState(init);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div>
      <Weather />
      <PackingList items={items} onHandleAddItem={handleAddItem} />
      <AddItem onHandleAddItem={handleAddItem} />
    </div>
  );
}

function Weather() {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=f1ae9669b74a49fdb42213857231109&q=Sydney"
      )
      .then(function (response) {
        // handle success
        console.log("response", response.data);
        setWeather(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      });
  }, []);
  return (
    <div className="weather">
      {weather && (
        <>
          {weather.location.name}'s current temperature is{" "}
          {weather.current.temp_c} degree,{" "}
          {weather.current.temp_c > 10
            ? "not suitable for skiing"
            : "good for skiing"}{" "}
          🌡️
        </>
      )}
    </div>
  );
}
function PackingList({ items, onHandleAddItem }) {
  return (
    <div>
      <h2 className="title">What we need for skiing⛷️</h2>
      <div className="items">
        {items.map((item) => (
          <PackingItem
            item={item}
            key={item.id}
            onHandleAddItem={onHandleAddItem}
          />
        ))}
      </div>
    </div>
  );
}
function PackingItem({ item }) {
  return (
    <div className="item">
      {item.number} {item.name}
    </div>
  );
}
function AddItem({ onHandleAddItem }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  // const[id]
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !number || number > 10) return;
    const id = crypto.randomUUID();
    const newItem = { name, number, id: { id } };
    onHandleAddItem(newItem);
  }
  return (
    <div>
      <form className="add-item-form">
        <div className="add-item">
          <label>What else do we need?🟰</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>How many do we need?🎿</label>

          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}
