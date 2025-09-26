"use client";

export default function MenuStyles() {
  return (
    <>
      {/* Global CSS variables & utility classes */}
      <style jsx global>{`
        :root {
          --pos-primary: #ef959d;
          --pos-foreground: #69585f;
          --pos-background: #d9dbbc;
          --pos-secondary: #b8d8ba;
          --pos-accent: #fcddbc;
        }

        .menu-container {
          background: linear-gradient(135deg, #d9dbbc 0%, #fcddbc 100%);
          min-height: 100vh;
        }

        .category-section {
          background: rgba(252, 221, 188, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(184, 216, 186, 0.2);
        }

        .floating-cart {
          background: linear-gradient(135deg, #ef959d 0%, #ef959d 100%);
          box-shadow: 0 10px 30px rgba(239, 149, 157, 0.3);
        }
      `}</style>

      {/* Local keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
