"use client";
import { signOutAction } from "app/actions/signinAction";

export default function Navbar() {
  return (
    <div className="flex justify-end py-2 px-5">
      <button
        className="border border-gray-500 p-2 rounded-xl"
        onClick={async () => await signOutAction()}
      >
        Signout
      </button>
    </div>
  );
}
