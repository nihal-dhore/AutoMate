"use client";
export default function Signup() {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-sm"
      >
        <label htmlFor="email">
          Work Email <span>(required)</span>
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-400 rounded-sm p-2 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="last-name">
          First Name <span>(required)</span>
        </label>
        <input type="text" id="first-name" />
        <label htmlFor="last-name">
          Last Name <span>(required)</span>
        </label>
        <input type="text" id="last-name" />
        <button
          type="submit"
          disabled={false}
          className="disabled:opacity-70 disabled:border enabled:bg-primary enabled:text-white font-semibold px-4 py-2 rounded-2xl transition-all duration-300"
        >
          Get started free
        </button>
      </form>
    </>
  );
}
