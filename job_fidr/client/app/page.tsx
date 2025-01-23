import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href={"http://localhost:5000/login"} >
      Login</Link>
    </div>
  );
}
