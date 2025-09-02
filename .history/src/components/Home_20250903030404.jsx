import Articles from "./Articles";
import Blog from "./Blog";

export default function Home() {
  return (
    <div className="home-page">
      <Blog />
      <Articles />
    </div>
  );
}