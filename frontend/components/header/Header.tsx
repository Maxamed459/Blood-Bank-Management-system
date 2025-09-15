import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  return (
    <div className="max-w-[80%] mx-auto p-4 bg-transparent backdrop-blur-[5px] mt-4 rounded-full flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="font-bold text-2xl">LOGO</h1>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/">about</Link>
        <Link href="/">features</Link>
        <Link href="/">services</Link>
        <Link href="/">contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Button>signUp</Button>
        <Button>login</Button>
        <ModeToggle />
      </div>
    </div>
  );
}
