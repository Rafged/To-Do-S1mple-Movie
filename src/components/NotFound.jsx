export default function NotFound() {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "938px",
    height: "140px",
    margin: "26px auto",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontSize: "32px",
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.5)",
  };

  return <div style={styles}>The page is not found</div>;
}
