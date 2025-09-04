import { useState } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

// ✅ PropTypes
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

// ✅ DefaultProps
NewTaskForm.defaultProps = {
  onAdd: () => {},
};

export default NewTaskForm;