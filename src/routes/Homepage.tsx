import { useSignal } from "@preact/signals-react";
import { Link } from "react-router-dom";

export default function Homepage() {
  const count = useSignal(0);

  return (
    <div>
      homepage
      <br />
      count: {count} <button onClick={() => count.value++}>+</button>
      <button onClick={() => count.value--}>-</button>
      <Link to="/get-started">Get started</Link>
    </div>
  );
}
