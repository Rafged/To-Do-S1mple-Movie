import PropTypes from "prop-types";

function Footer({ count, onClearCompleted }) {
  return (
    <footer className="footer">
      <span>{count} item{count !== 1 ? "s" : ""} left</span>
      <button onClick={onClearCompleted} style={{ marginLeft: "12px" }}>
        Clear Completed
      </button>
    </footer>
  );
}

// ✅ PropTypes
Footer.propTypes = {
  count: PropTypes.number,
  onClearCompleted: PropTypes.func,
};

// ✅ DefaultProps
Footer.defaultProps = {
  count: 0,
  onClearCompleted: () => {},
};

export default Footer;