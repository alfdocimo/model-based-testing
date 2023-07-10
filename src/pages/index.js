import Image from "next/image";
import { Inter } from "next/font/google";
import { useReducer, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function useKeyDown(key, onKeyDown) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        onKeyDown();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [key, onKeyDown]);
}

function QuestionScreen({ onClickGood, onClickBad, onClose }) {
  useKeyDown("Escape", onClose);

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Hey FE Day 💖{" "}
          <div className="card-actions justify-end">
            <button
              onClick={onClose}
              className="btn btn-square btn-neutral btn-sm"
              data-testid="x-close-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </h2>
        <p>¿Cómo te lo estás pasando?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onClickGood}>
            Increíble
          </button>
          <button className="btn btn-secondary" onClick={onClickBad}>
            No tan bien...
          </button>
        </div>
      </div>
    </div>
  );
}

function FormScreen({ onSubmit, onClose }) {
  useKeyDown("Escape", onClose);

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Hey FE Day 💖{" "}
          <div className="card-actions justify-end">
            <button
              onClick={onClose}
              className="btn btn-square btn-neutral btn-sm"
              data-testid="x-close-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </h2>
        <p>¿Nos podrías indicar en qué podemos mejorar?</p>
        <textarea
          placeholder="Escribe aquí"
          className="text-black textarea textarea-bordered textarea-lg w-full max-w-xs"
        ></textarea>

        <div className="card-actions justify-end">
          <button onClick={onSubmit} className="btn btn-primary">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

function ThanksScreen({ onClose }) {
  useKeyDown("Escape", onClose);

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Hey FE Day 💖{" "}
          <div className="card-actions justify-end">
            <button
              onClick={onClose}
              className="btn btn-square btn-neutral btn-sm"
              data-testid="x-close-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </h2>
        <p>¡Gracias por tu aporte! ✨</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function feedbackReducer(state, event) {
  switch (state) {
    case "question":
      switch (event.type) {
        case "GOOD":
          return "thanks";
        case "BAD":
          return "form";
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    case "form":
      switch (event.type) {
        case "SUBMIT":
          return "thanks";
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    case "thanks":
      switch (event.type) {
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    default:
      return state;
  }
}

function Feedback() {
  const [state, send] = useReducer(feedbackReducer, "question");

  switch (state) {
    case "question":
      return (
        <QuestionScreen
          onClickGood={() => send({ type: "GOOD" })}
          onClickBad={() => send({ type: "BAD" })}
          onClose={() => send({ type: "CLOSE" })}
        />
      );
    case "form":
      return (
        <FormScreen
          onSubmit={(value) => send({ type: "SUBMIT", value })}
          onClose={() => send({ type: "CLOSE" })}
        />
      );
    case "thanks":
      return <ThanksScreen onClose={() => send({ type: "CLOSE" })} />;
    case "closed":
      return <h1>Chau! 👋</h1>;
  }
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Feedback />
    </main>
  );
}
