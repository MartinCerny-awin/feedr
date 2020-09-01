import React, { useEffect, useMemo, useState } from 'react';

import MenuSummary from './components/MenuSummary';
import MenuPreview from './components/MenuPreview';
import Filters from './components/Filters';

import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/items');
      const json = await response.json();

      setItems(json.items);
    })();
  }, []);

  const handleAddItem = (id) => {
    if (!selectedIds.find((selectedId) => selectedId === id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveItem = (id) => {
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }
    return items.filter(({ name }) =>
      RegExp(searchTerm.toLowerCase()).test(name.toLowerCase()),
    );
  }, [items, searchTerm]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds],
  );

  const selectedDietaries = useMemo(() => {
    const calculateDietaries = {};

    selectedItems.forEach(({ dietaries }) => {
      dietaries.forEach((dietary) => {
        calculateDietaries[dietary] = Object.prototype.hasOwnProperty.call(
          calculateDietaries,
          dietary,
        )
          ? calculateDietaries[dietary] + 1
          : 1;
      });
    });
    return calculateDietaries;
  }, [selectedItems, selectedIds]);

  return (
    <div className="wrapper">
      <MenuSummary
        numberOfSelectedItems={selectedIds.length}
        selectedDietaries={selectedDietaries}
      />
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <Filters
              filteredItems={filteredItems}
              handleAddItem={handleAddItem}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="col-8">
            <MenuPreview
              selectedItems={selectedItems}
              handleRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
