export default function FontStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap");

      .font-jakarta {
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
      }

      .font-inter {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
      }
    `}</style>
  );
}
